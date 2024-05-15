// //getAccessToken 메소드
// //(accessTokenExpireDate 확인 - 만료 시 3번 메소드 호출, 새로운 accessToken 반환 /

// import { useStorage } from '@/lib/useStorage';

// //만료x 시 기존 accessToken 반환)
// export async function useAccessToken() {
//   const { userInfo, addUserInfo, removeUserInfo } = useStorage();
//   const accessToken = userInfo.accessToken;
//   const accessTokenExpires = userInfo.accessTokenExpires;

//   async function getRefreshToken() {
//     const { userInfo, addUserInfo, removeUserInfo } = useStorage();
//     const refreshToken = userInfo.refreshToken;
//     const refreshTokenExpires = userInfo.refreshTokenExpires;
//     //check if refreshToken is expired
//     if (refreshTokenExpires && refreshTokenExpires.getTime() <= Date.now()) {
//       alert('you need to login again');
//       return false;
//     } else {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/users/refresh`,
//         {
//           method: 'POST',
//           credentials: 'include',
//           body: JSON.stringify({ refreshToken }),
//           headers: {
//             'Content-type': 'application/json',
//           },
//         }
//       );
//       //store new accessToken in localStorage
//       if (res.ok) {
//         const data = await res.json();
//         const accessTokenExpires = new Date(Date.now() + 30 * 60 * 1000);
//         const refreshTokenExpires = new Date(
//           Date.now() + 7 * 24 * 60 * 60 * 1000
//         );
//         addUserInfo({
//           ...data.data,
//           accessTokenExpires: accessTokenExpires,
//           refreshTokenExpires: refreshTokenExpires,
//         });
//         return data;
//       } else {
//         throw new Error('Failed to refresh token');
//       }
//     }
//   }

//   //if accessToken is expired
//   if (accessTokenExpires && accessTokenExpires.getTime() <= Date.now()) {
//     return (await getRefreshToken()).data.accessToken;
//   } else {
//     return accessToken;
//   }
// }

import { useState, useEffect, useCallback } from 'react';
import { useStorage } from '@/lib/useStorage';

export function useAccessToken() {
  const { userInfo, addUserInfo, removeUserInfo } = useStorage();
  const [accessToken, setAccessToken] = useState<string>('');
  const [accessTokenExpires, setAccessTokenExpires] = useState(
    userInfo.accessTokenExpires
  );

  const getRefreshToken = useCallback(async () => {
    const refreshToken = userInfo.refreshToken;
    const refreshTokenExpires = userInfo.refreshTokenExpires;
    const userId = userInfo.userId;
    const lastAccessToken = userInfo.accessToken;

    if (refreshTokenExpires && refreshTokenExpires <= Date.now()) {
      console.error('You need to login again');
      return false;
    } else {
      console.log(refreshToken);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/refresh`,
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            userId: userId,
            refreshToken: `Bearer ${refreshToken}`,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        const newAccessTokenExpires = Date.now() + 30 * 60 * 1000;
        const newRefreshTokenExpires = Date.now() + 7 * 24 * 60 * 60 * 1000;

        addUserInfo({
          ...data.data,
          accessTokenExpires: newAccessTokenExpires,
          refreshTokenExpires: newRefreshTokenExpires,
        });

        setAccessToken(data.data.accessToken);
        setAccessTokenExpires(newAccessTokenExpires);

        return data.data.accessToken;
      } else {
        throw new Error('Failed to refresh token');
      }
    }
  }, [addUserInfo]);

  useEffect(() => {
    const checkAccessToken = async () => {
      console.log('check access token');
      if (accessTokenExpires && accessTokenExpires <= Date.now()) {
        console.log('need to refresh token');
        try {
          const newAccessToken = await getRefreshToken();
          setAccessToken(newAccessToken);
        } catch (error) {
          console.error(error);
        }
      } else {
        setAccessToken(userInfo.accessToken!);
      }
    };
    checkAccessToken();
  }, [userInfo]);

  return { accessToken, getRefreshToken };
}

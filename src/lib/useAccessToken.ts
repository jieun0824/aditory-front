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

// import { useState, useEffect, useCallback } from 'react';
// import { useStorage } from '@/lib/useStorage';

// export function useAccessToken() {
//   const { userInfo, addUserInfo, removeUserInfo } = useStorage();
//   const [accessToken, setAccessToken] = useState<string>('');
//   const [accessTokenExpires, setAccessTokenExpires] = useState(
//     userInfo.accessTokenExpires
//   );

//   const getRefreshToken = useCallback(async () => {
//     const refreshToken = userInfo.refreshToken;
//     const refreshTokenExpires = userInfo.refreshTokenExpires;
//     const userId = userInfo.userId;
//     const lastAccessToken = userInfo.accessToken;

//     if (refreshTokenExpires && refreshTokenExpires <= Date.now()) {
//       console.error('You need to login again');
//       return false;
//     } else {
//       console.log(refreshToken);
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/users/refresh`,
//         {
//           method: 'POST',
//           credentials: 'include',
//           body: JSON.stringify({
//             userId: userId,
//             refreshToken: `Bearer ${refreshToken}`,
//           }),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (res.ok) {
//         const data = await res.json();
//         console.log(data);
//         const newAccessTokenExpires = Date.now() + 10 * 60 * 1000;
//         const newRefreshTokenExpires = Date.now() + 6 * 60 * 60 * 1000;

//         addUserInfo({
//           ...data.data,
//           userId: data.data.userId,
//           username: data.data.username,
//           nickname: data.data.nickname,
//           accessToken: data.data.accessToken,
//           refreshToken: data.data.refreshToken,
//           accessTokenExpires: newAccessTokenExpires,
//           refreshTokenExpires: newRefreshTokenExpires,
//         });

//         setAccessToken(data.data.accessToken);
//         setAccessTokenExpires(newAccessTokenExpires);

//         return data.data.accessToken;
//       } else {
//         throw new Error('Failed to refresh token');
//       }
//     }
//   }, [addUserInfo]);

//   useEffect(() => {
//     const checkAccessToken = async () => {
//       console.log('check access token');
//       if (accessTokenExpires && accessTokenExpires <= Date.now()) {
//         console.log('need to refresh token');
//         try {
//           const newAccessToken = await getRefreshToken();
//           setAccessToken(newAccessToken);
//         } catch (error) {
//           console.error(error);
//         }
//       } else {
//         setAccessToken(userInfo.accessToken!);
//       }
//     };
//     checkAccessToken();
//   }, [userInfo]);

//   return { accessToken, getRefreshToken };
// }

import { useState, useEffect, useCallback } from 'react';
import jwtDecode from 'jsonwebtoken';
import { useStorage } from '@/lib/useStorage';

interface DecodedToken {
  exp: number;
  iat: number;
  iss: string;
  role: string;
  userId: string;
  username: string;
}

export function useAccessToken() {
  const { userInfo, addUserInfo, removeUserInfo } = useStorage();
  const [accessToken, setAccessToken] = useState<string>('');

  const decodeToken = (token: string) => {
    try {
      return jwtDecode.decode(token);
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  };

  const getRefreshToken = useCallback(async () => {
    const refreshToken = userInfo.refreshToken;
    const userId = userInfo.userId;

    // const decodedRefreshToken = decodeToken(refreshToken);

    // if (decodedRefreshToken && decodedRefreshToken.exp * 1000 <= Date.now()) {
    //   console.error('You need to login again');
    //   removeUserInfo();
    //   return false;
    // } else {
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
      console.log(data);

      const newAccessToken = data.data.accessToken;
      const newRefreshToken = data.data.refreshToken;

      const newDecodedAccessToken = decodeToken(newAccessToken) as DecodedToken;
      const newDecodedRefreshToken = decodeToken(
        newRefreshToken
      ) as DecodedToken;

      addUserInfo({
        ...data.data,
        userId: data.data.userId,
        username: data.data.username,
        nickname: data.data.nickname,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        accessTokenExpires: newDecodedAccessToken?.exp * 1000,
        refreshTokenExpires: newDecodedRefreshToken?.exp * 1000,
      });

      setAccessToken(newAccessToken);

      return newAccessToken;
    } else {
      throw new Error('Failed to refresh token');
    }
    // }
  }, [addUserInfo, decodeToken]);

  useEffect(() => {
    const checkAccessToken = async () => {
      console.log('check access token');
      const decodedAccessToken = decodeToken(
        userInfo.accessToken!
      ) as DecodedToken;
      const decodedRefreshToken = decodeToken(
        userInfo.refreshToken!
      ) as DecodedToken;
      console.log(decodedAccessToken, decodedRefreshToken);
      const accessTokenExpires = decodedAccessToken!.exp * 1000;
      const refreshTokenExpires = decodedRefreshToken?.exp * 1000;
      if (refreshTokenExpires && refreshTokenExpires <= Date.now()) {
        console.error('Refresh token expired. Logging out...');
        removeUserInfo();
      } else if (accessTokenExpires && accessTokenExpires <= Date.now()) {
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
  }, [userInfo, getRefreshToken, decodeToken]);

  return { accessToken, getRefreshToken };
}

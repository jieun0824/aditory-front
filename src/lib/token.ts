//refreshToken 메소드 - refresh Token 활용
//만약 현재시간>refreshTokenExpireDate 면 안내 pop-up 과 함께 로그아웃 되었다는 문구,
//page read-only 로 전환

import { useStorage } from './useStorage';

export async function getRefreshToken() {
  const { userInfo, addUserInfo, removeUserInfo } = useStorage();
  const refreshToken = userInfo.refreshToken;
  const refreshTokenExpires = userInfo.refreshTokenExpires;
  //check if refreshToken is expired
  if (refreshTokenExpires && refreshTokenExpires.getTime() <= Date.now()) {
    alert('you need to login again');
    return false;
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/refresh`,
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ refreshToken }),
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
    //store new accessToken in localStorage
    if (res.ok) {
      const data = await res.json();
      const accessTokenExpires = new Date(Date.now() + 30 * 60 * 1000);
      const refreshTokenExpires = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      );
      addUserInfo({
        ...data.data,
        accessTokenExpires: accessTokenExpires,
        refreshTokenExpires: refreshTokenExpires,
      });
      return data;
    } else {
      throw new Error('Failed to refresh token');
    }
  }
}

//getAccessToken 메소드
//(accessTokenExpireDate 확인 - 만료 시 3번 메소드 호출, 새로운 accessToken 반환 /
//만료x 시 기존 accessToken 반환)
export async function getAccessToken() {
  const { userInfo, addUserInfo, removeUserInfo } = useStorage();
  const accessToken = userInfo.accessToken;
  const accessTokenExpires = userInfo.accessTokenExpires;
  const refreshToken = userInfo.refreshToken;
  const refreshTokenExpires = userInfo.refreshTokenExpires;

  //if accessToken is expired
  if (accessTokenExpires && accessTokenExpires.getTime() <= Date.now()) {
    return (await getRefreshToken()).data.accessToken;
  } else {
    return accessToken;
  }
}

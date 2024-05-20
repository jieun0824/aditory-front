import useIsLoggedIn from '@/store/useIsLoggedIn';

export default function useLoggedIn(responseMessage: string) {
  const setIsNotLoggedIn = useIsLoggedIn((state: any) => state.setIsLoggedIn);
  if (responseMessage == '만료된 토큰입니다.') {
    setIsNotLoggedIn(true);
  } else {
    setIsNotLoggedIn(false);
  }
}

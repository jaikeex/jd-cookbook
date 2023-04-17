import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setLogout } from 'store/authSlice';
import { LOGOUT_QUERY } from 'features/Navbar/graphql';

interface IUseLogout {
  logout: () => Promise<boolean>;
  loading: boolean;
}

export const useLogout = (): IUseLogout => {
  const dispatch = useDispatch();

  const [logoutQuery, { loading, client }] = useLazyQuery(LOGOUT_QUERY, {
    fetchPolicy: 'no-cache'
  });

  const logout = async (): Promise<boolean> => {
    const response = await logoutQuery();

    if (response && response.data) {
      await client.clearStore();
      dispatch(setLogout());
      return true;
    }

    return false;
  };

  return { logout, loading };
};

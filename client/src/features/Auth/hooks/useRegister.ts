import { useMutation } from '@apollo/client';
import { REGISTER_USER_MUTATION } from '@auth/graphql';
import { useDispatch } from 'react-redux';
import { addMessage } from 'store/messageSlice';

interface IUseRegister {
  register: (username: string, email: string, password: string) => Promise<boolean>;
  loading: boolean;
}

export const useRegister = (): IUseRegister => {
  const dispatch = useDispatch();
  const [registerMutation, { loading }] = useMutation(REGISTER_USER_MUTATION);

  const register = async (username: string, email: string, password: string) => {
    const response = await registerMutation({ variables: { username, email, password } });

    if (response && response.data) {
      dispatch(
        addMessage({
          message: 'Account successfully created. Please check your email for verification.',
          severity: 'success'
        })
      );
      return true;
    }

    return false;
  };

  return { register, loading };
};

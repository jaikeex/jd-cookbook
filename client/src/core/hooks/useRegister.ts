import { useMutation } from '@apollo/client';
import type { ApolloError } from '@apollo/client';
import { REGISTER_USER_MUTATION } from 'core';

interface IUseRegister {
  register: (username: string, email: string, password: string) => Promise<boolean>;
  loading: boolean;
}

export const useRegister = (): IUseRegister => {
  const [registerMutation, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    fetchPolicy: 'no-cache'
  });

  const register = async (username: string, email: string, password: string) => {
    const response = await registerMutation({ variables: { username, email, password } });

    if (response && response.data) {
      return true;
    }

    return false;
  };

  return { register, loading };
};

import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
  useMutation
} from '@apollo/client';
import { UPLOAD_FILE_MUTATION } from 'core/graphql';

interface UploadFileData {
  uploadFile: string;
}

interface IUseFileUpload {
  uploadFile: (
    options?: MutationFunctionOptions<UploadFileData, OperationVariables, DefaultContext, ApolloCache<any>> | undefined
  ) => Promise<FetchResult<UploadFileData>>;
  uploadedFile?: string | null;
  loading: boolean;
}

export const useFileUpload = (): IUseFileUpload => {
  const [uploadFile, { data, loading }] = useMutation<UploadFileData>(UPLOAD_FILE_MUTATION, {
    context: { useMultipart: true }
  });

  return { uploadFile, uploadedFile: data?.uploadFile, loading };
};

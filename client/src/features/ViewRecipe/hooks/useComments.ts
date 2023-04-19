import { useMutation, useQuery } from '@apollo/client';
import { COMMENT_RECIPE_MUTATION, GET_COMMENTS_QUERY } from '@viewRecipe/graphql';
import type { Comment } from 'types';

interface IUseComments {
  comments: Comment[];
  postComment: (text: string) => void;
  loading: boolean;
}

export const useComments = (recipeId: string): IUseComments => {
  const [commentRecipeMutation] = useMutation(COMMENT_RECIPE_MUTATION);
  const { data, loading } = useQuery(GET_COMMENTS_QUERY, {
    variables: { id: recipeId }
  });

  const postComment = async (text: string) => {
    await commentRecipeMutation({
      variables: { id: recipeId, text: text },
      refetchQueries: [{ query: GET_COMMENTS_QUERY, variables: { id: recipeId } }]
    });
  };

  return {
    comments: data?.getComments || [],
    postComment,
    loading
  };
};

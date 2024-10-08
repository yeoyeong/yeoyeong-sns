import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postToFollowApi } from '../api/postUserFollow-api';
import { Following } from '../../lib/types/follow';

const usePostUserFollow = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postToFollowApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
      queryClient.invalidateQueries({
        queryKey: ['post_follow', variables.followingId],
      });
    },
    onError: error => {
      alert('오류가 발생하였습니다. 관리자에게 문의해주세요');
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('Unknown error occurred:', error);
      }
    },
  });

  const followingHandler = async ({ followerId, followingId }: Following) => {
    if (!followerId || !followingId) return;
    try {
      await mutation.mutateAsync({ followerId, followingId });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    followingHandler,
  };
};

export default usePostUserFollow;
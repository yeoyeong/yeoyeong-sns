'use client';

import Link from 'next/link';
import message_icon from '@/_shared/asset/icon/message_icon.png';
import Likes from '@/_features/likes/ui/likes';
import Image from 'next/image';
import UserIcon from '@/_widget/user/UserIcon';
import setting_icon from '@/_shared/asset/icon/setting_icon.png';
import { useUserStore } from '@/_shared/util/userStore';
import useOutsideClick from '@/_shared/lib/hooks/useOutsideClick';
import FollowButton from '@/_features/followers/ui/FollowButton';
import { GetPostType } from '../lib/type/getPostType';
import PostListComments from './post-list.comments';
import PostListItem from './post-list.item';
import PostSetting from './post-list.postSetting';

type Props = {
  data: GetPostType;
};
export default function PostCard({ data }: Props) {
  const {
    id,
    content,
    weather,
    picture,
    created_at: createdAt,
    likesCount,
    user_id,
  } = data;
  const { user } = useUserStore();
  const { isOpen, setIsOpen, ref } = useOutsideClick();

  return (
    <div className='mt-6 border-b border-solid border-gray-200 pb-6'>
      <div className='flex justify-between'>
        <Link
          href={`/${data.users.userId}`}
          className='flex items-center gap-1 py-2'>
          <div className='block h-[27px] w-[27px] overflow-hidden rounded-full'>
            <UserIcon profileImg={data.users.profileImg} />
          </div>
          <p className='text-lg font-bold'>{data.users.nickname}</p>
        </Link>
        <div className='flex items-center'>
          {user && user.uid !== user_id ? (
            <FollowButton followerId={user.uid} followingId={user_id} />
          ) : (
            <div className='relative' ref={ref}>
              <button
                className='flex h-[32px] items-center'
                type='button'
                onClick={() => setIsOpen(true)}>
                <Image src={setting_icon} width={16} alt='설정 아이콘' />
              </button>
              {isOpen && <PostSetting postId={id} />}
            </div>
          )}
        </div>
      </div>
      <PostListItem
        content={content}
        picture={picture}
        weather={weather}
        postId={data.id}
        createdAt={createdAt}
      />
      <div className='mt-4 flex gap-1'>
        <Likes post_id={data.id} likesCount={likesCount} />
        <div>
          <Image src={message_icon} alt='채팅 아이콘' height={24} />
        </div>
      </div>
      <PostListComments post_id={data.id} commentsCount={data.commentsCount} />
    </div>
  );
}
'use client';

import { User } from 'next-auth';
import { FC } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';

import { AvatarProps } from '@radix-ui/react-avatar';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name'>;
  sizeImg: number;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, sizeImg, ...props }) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <Image
          src={user.image}
          alt="Profile picture"
          referrerPolicy="no-referrer"
          width={sizeImg}
          height={sizeImg}
          priority
        />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;

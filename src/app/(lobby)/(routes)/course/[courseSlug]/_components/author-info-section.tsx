'use client';

import UserAvatar from '@/components/layouts/UserAvatar';
import { Badge } from '@/components/ui/badge';
import { User } from '@prisma/client';

type AuthorInfoSectionProps = {
  user: Pick<User, 'image' | 'name'>;
  name: string;
  courseCount: number | string;
};

const AuthorInfoSection = ({
  user,
  name,
  courseCount
}: AuthorInfoSectionProps) => {
  return (
    <div className="flex flex-col px-4 md:px-6 bg-white">
      <h2>Instructor</h2>
      <div className="w-full mt-1 p-4 flex gap-2 items-center lg:rounded-md lg:border lg:border-input">
        <UserAvatar
          className="w-14 h-14 lg:w-16 lg:h-16"
          user={user}
          sizeImg={100}
        />
        <div className="flex flex-col">
          <h3>{name}</h3>

          <Badge variant={'outline'} className="text-sm flex gap-2 w-fit">
            <span>{courseCount}</span>
            Courses
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfoSection;

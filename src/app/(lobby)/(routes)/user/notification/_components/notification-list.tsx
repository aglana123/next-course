import { cn } from '@/lib/utils';
import { RequestStatus } from '@prisma/client';
import Image from 'next/image';
import { FC } from 'react';

type NotificationListProps = {
  title: string;
  author_name: string;
  src: string;
  status: RequestStatus;
};

const NotificationList: FC<NotificationListProps> = ({
  title,
  author_name,
  src,
  status
}) => {
  return (
    <div className="flex justify-between p-4 border border-input bg-white rounded">
      <div className="flex gap-2 w-full items-center h-full">
        <Image
          className="h-[40px] object-cover aspect-video"
          src={src}
          width={71.11}
          height={40}
          alt="img"
        />
        <div className="flex flex-col justify-center h-full">
          <p className="font-medium">{title}</p>
          <small>By {author_name}</small>
        </div>
      </div>
      <div
        className={cn(
          'text-medium px-4 text-black/80',
          status === 'APPROVED' && 'text-emerald-500',
          status === 'REJECTED' && 'text-rose-500'
        )}
      >
        {status}
      </div>
    </div>
  );
};

export default NotificationList;

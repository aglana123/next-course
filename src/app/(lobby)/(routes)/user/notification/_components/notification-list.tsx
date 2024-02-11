'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RequestStatus } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

type NotificationListProps = {
  courseId: string;
  title: string;
  author_name: string;
  src: string;
  status: RequestStatus;
  courseSlug: string;
};

const NotificationList: FC<NotificationListProps> = ({
  title,
  author_name,
  src,
  status,
  courseId,
  courseSlug
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOnClick = async (event: 'ENROLL' | 'DELETE') => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}/enroll/access`);
      if (event !== 'ENROLL') {
        router.refresh();
        return;
      }
      router.refresh();
      router.push(`/course/${courseSlug}`);
    } catch (error) {
      console.log('[NOTIFICATION_ACTION]', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="flex items-center gap-2">
        <div className="gap-2">
          {status === 'APPROVED' && (
            <Button
              onClick={() => {
                handleOnClick('ENROLL');
              }}
              isLoading={isLoading}
            >
              Enroll Course
            </Button>
          )}
          {status === 'REJECTED' && (
            <Button
              onClick={() => {
                handleOnClick('DELETE');
              }}
              isLoading={isLoading}
              variant="destructive"
            >
              Delete
            </Button>
          )}
        </div>
        <div
          className={cn(
            'text-medium px-6 text-black/80 border border-input py-2 rounded-3xl',
            status === 'APPROVED' && 'text-emerald-500',
            status === 'REJECTED' && 'text-rose-500'
          )}
        >
          {status}
        </div>
      </div>
    </div>
  );
};

export default NotificationList;

'use client';

import { Circle, LockKeyhole } from 'lucide-react';
import Image from 'next/image';
import { FC, useState } from 'react';
import TeacherNotificationAction from './teacher-notification-action';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type TeacherNotificationListProps = {
  sender_name: string;
  src: string;
  title: string;
  public_access: string;
  courseId: string;
  sender_id: string;
};

const TeacherNotificationList: FC<TeacherNotificationListProps> = ({
  sender_name,
  src,
  title,
  public_access,
  courseId,
  sender_id
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAcceptRequest = async () => {
    try {
      setIsLoading(true);
      await axios.post(`/api/courses/${courseId}/enroll/access/teacher`, {
        studentId: sender_id,
        isApproved: 'true'
      });

      toast.success('Success Accept Request');
    } catch (error) {
      console.log('[ACCEPT_REQUEST_CLIENT]', error);
      toast.error('Something when wrong');
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  const handleRejectRequest = async () => {
    try {
      setIsLoading(true);
      await axios.post(`/api/courses/${courseId}/enroll/access/teacher`, {
        studentId: sender_id
      });

      toast.success('Success Reject Request');
    } catch (error) {
      console.log('[REJECT_REQUEST_CLIENT]', error);
      toast.error('Something when wrong');
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };
  return (
    <div className="bg-white px-4 pb-6 pt-2 border border-input rounded">
      <div className="flex mb-4 items-center gap-1">
        <Circle className="fill-teal-500 h-4 w-4 stroke-none" />
        <p>
          <strong>{sender_name}</strong> Meminta Akses Ke Private Course Anda
        </p>
      </div>
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center">
          <Image
            className="h-[40px] object-cover aspect-video"
            src={src}
            width={71.11}
            height={40}
            alt={`image of ${title}`}
          />
          <div className="flex flex-col">
            <p>{title}</p>
            <span className="text-rose-500 flex gap-1 items-center text-sm">
              <LockKeyhole className="w-3 h-3" />
              {public_access}
            </span>
          </div>
        </div>
        <TeacherNotificationAction
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default TeacherNotificationList;

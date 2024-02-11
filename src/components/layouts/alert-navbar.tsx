'use client';

import { getNotification } from '@/actions/get-notification';
import { RequestAccess } from '@prisma/client';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AlertNavbar = ({ userId }: { userId: string }) => {
  const [notification, setNotification] = useState<{
    RequestAccess: RequestAccess[];
  } | null>(null);

  useEffect(() => {
    const getUserNotification = async () => {
      try {
        const item = await getNotification(userId);
        setNotification(item);
      } catch (error) {
        console.log('[NOTIFICATION]', error);
        setNotification(null);
      }
    };

    getUserNotification();
  }, [userId]);

  const hasNotification = Boolean(notification?.RequestAccess?.length);
  return (
    <Link className="relative" href="/user/notification">
      <span className="sr-only">notification link button</span>
      <Bell className="stroke-primary" />
      {hasNotification ? (
        <div className="absolute h-3 w-3 flex items-center justify-center top-0 -right-1 rounded-full bg-primary text-[10px]" />
      ) : null}
    </Link>
  );
};

export default AlertNavbar;

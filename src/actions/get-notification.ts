'use server';

import db from '@/lib/db';

export const getNotification = async (userId: string) => {
  try {
    const notification = await db.user.findUnique({
      where: { id: userId },
      select: {
        RequestAccess: {
          where: {
            userId: userId
          }
        }
      }
    });

    return notification;
  } catch (error) {
    console.error('NOTIFICATION SERVER', error);
    return null;
  }
};

import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { z } from 'zod';

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getAuthSession();
    const user = session?.user;

    if (!user) {
      return new NextResponse('Unauthorized. Missing Session', {
        status: 401
      });
    }

    const deleteNotification = await db.requestStatusInfo.delete({
      where: {
        courseId_userId: {
          courseId: params.courseId,
          userId: user.id
        }
      }
    });

    return NextResponse.json(deleteNotification);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data passed', {
        status: 422
      });
    }
    console.log('[ENROLL_COURSE]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}

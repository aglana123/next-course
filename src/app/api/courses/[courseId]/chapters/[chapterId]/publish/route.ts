import { NextResponse } from 'next/server';

import db from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: { chapterId: string; courseId: string } }
) {
  try {
    const session = await getAuthSession();
    const { chapterId, courseId } = params;

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const teacher = await db.user.findUnique({
      where: {
        id: session.user.id,
        role: 'TEACHER'
      }
    });

    if (!teacher) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const current = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId
      },
      select: {
        description: true,
        title: true,
        video_url: true
      }
    });

    if (!(current?.title && current?.description && current.video_url)) {
      return new NextResponse('Missing Field', { status: 404 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId
      },
      data: {
        is_published: true
      }
    });
    return NextResponse.json(chapter);
  } catch (error) {
    console.log('[PUBLISH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

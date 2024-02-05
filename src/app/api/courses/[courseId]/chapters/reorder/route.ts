import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getAuthSession();
    const { list } = await req.json();

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

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        author_id: teacher.id
      }
    });

    if (!ownCourse) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position }
      });
    }

    return new NextResponse('Success', { status: 200 });
  } catch (error) {
    console.log('[REORDER]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

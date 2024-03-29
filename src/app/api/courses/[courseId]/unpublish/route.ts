import { NextResponse } from 'next/server';

import db from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export async function PATCH(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const session = await getAuthSession();
		const { courseId } = params;

		if (!session?.user) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const teacher = await db.user.findUnique({
			where: {
				id: session.user.id,
				role: 'TEACHER',
			},
		});

		if (!teacher) {
			return new NextResponse('Forbidden', { status: 403 });
		}

		const course = await db.course.update({
			where: {
				id: courseId,
				author_id: teacher.id,
			},
			data: {
				is_published: false,
			},
		});
		return NextResponse.json(course);
	} catch (error) {
		console.log('[UNPUBLISH_COURSE]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

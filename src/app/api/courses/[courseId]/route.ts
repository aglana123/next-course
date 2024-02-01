import { NextResponse } from 'next/server';

import db from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import slugify from 'slugify';

export async function PATCH(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const session = await getAuthSession();
		const { courseId } = params;
		const values = await req.json();

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
		if (!values?.title) {
			const course = await db.course.update({
				where: {
					id: courseId,
					author_id: teacher.id,
				},
				data: {
					...values,
				},
			});
			return NextResponse.json(course);
		}

		const slug = slugify(values.title, {
			lower: true,
		});

		const course = await db.course.update({
			where: {
				id: courseId,
				author_id: teacher.id,
			},
			data: {
				...values,
				slug,
			},
		});
		return NextResponse.json(course);
	} catch (error) {
		console.log('[COURSE_ID]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const session = await getAuthSession();

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

		const deleteCourse = await db.course.delete({
			where: { id: params.courseId, author_id: teacher.id },
		});

		return NextResponse.json(deleteCourse);
	} catch (error) {
		console.log('[COURSE_ID_DELETE]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

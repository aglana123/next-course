import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { z } from 'zod';

export async function POST(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const session = await getAuthSession();
		const user = session?.user;

		if (!user) {
			return new NextResponse('Unauthorized. Missing Session', {
				status: 401,
			});
		}

		//check if course already enroll by user
		const userCourses = await db.user.findUnique({
			where: {
				id: user.id,
				NOT: {
					EnrolledCourse: {
						some: {
							courseId: params.courseId,
						},
					},
				},
			},
		});

		if (!userCourses) {
			return new NextResponse('Course already enrolled by user', {
				status: 409,
			});
		}

		const addCourse = await db.enrolledCourse.create({
			data: {
				courseId: params.courseId,
				userId: user.id,
			},
		});

		return NextResponse.json(addCourse);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new NextResponse('Invalid request data passed', {
				status: 422,
			});
		}
		console.log('[ENROLL_COURSE]', error);

		return new NextResponse('Internal Error', { status: 500 });
	}
}

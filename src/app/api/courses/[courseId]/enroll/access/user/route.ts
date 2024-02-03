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

		const course = await db.course.findUnique({
			where: {
				id: params.courseId,
				public_access: 'Private',
				is_published: true,
				NOT: {
					AccessPrivateCourses: {
						some: {
							userId: user.id,
						},
					},
				},
			},
			select: {
				author_id: true,
			},
		});

		if (!course) {
			return new NextResponse('Forbidden', {
				status: 403,
			});
		}

		const [sendToTeacher, reqAccessStatus] = await Promise.all([
			db.requestAccess.create({
				data: {
					senderId: user.id,
					senderName: user.name!,
					courseId: params.courseId,
					userId: course.author_id,
				},
			}),
			db.requestStatusInfo.create({
				data: {
					courseId: params.courseId,
					userId: user.id,
				},
			}),
		]);

		if (!sendToTeacher || !reqAccessStatus) {
			return new NextResponse('Invalid request data passed', {
				status: 422,
			});
		}

		return NextResponse.json(reqAccessStatus);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new NextResponse('Invalid request data passed', {
				status: 422,
			});
		}
		console.log('[COURSES]', error);

		return new NextResponse('Internal Error', { status: 500 });
	}
}

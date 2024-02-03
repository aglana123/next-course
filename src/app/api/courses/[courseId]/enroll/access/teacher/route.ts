import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { z } from 'zod';

export async function POST(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const { studentId, isApproved } = await req.json();

		if (!studentId) {
			return new NextResponse('Bad Request', {
				status: 400,
			});
		}
		const session = await getAuthSession();
		const user = session?.user;

		if (!user) {
			return new NextResponse('Unauthorized. Missing Session', {
				status: 401,
			});
		}

		const teacher = await db.user.findUnique({
			where: {
				id: user.id,
				role: 'TEACHER',
			},
			select: {
				id: true,
				role: true,
			},
		});
		if (!teacher) {
			return new NextResponse('Unauthorized', {
				status: 401,
			});
		}

		const course = await db.course.findUnique({
			where: {
				id: params.courseId,
				public_access: 'Private',
				is_published: true,
				author_id: teacher.id,
				NOT: {
					AccessPrivateCourses: {
						some: {
							userId: studentId,
						},
					},
				},
			},
		});

		if (!course) {
			return new NextResponse('Forbidden', {
				status: 403,
			});
		}

		if (!isApproved) {
			const [sendToTeacher, reqAccessStatus] = await Promise.all([
				db.requestAccess.delete({
					where: {
						courseId_userId_senderId: {
							courseId: params.courseId,
							userId: teacher.id,
							senderId: studentId,
						},
					},
				}),
				db.requestStatusInfo.update({
					where: {
						courseId_userId: {
							userId: studentId,
							courseId: params.courseId,
						},
					},
					data: {
						status: 'REJECTED',
					},
				}),
			]);

			return NextResponse.json(sendToTeacher);
		}

		const [privateAccess, sendToTeacher, reqAccessStatus] =
			await Promise.all([
				db.accessPrivateCourses.create({
					data: {
						courseId: course.id,
						userId: studentId,
					},
				}),
				db.requestAccess.delete({
					where: {
						courseId_userId_senderId: {
							courseId: params.courseId,
							userId: teacher.id,
							senderId: studentId,
						},
					},
				}),
				db.requestStatusInfo.update({
					where: {
						courseId_userId: {
							userId: studentId,
							courseId: params.courseId,
						},
					},
					data: {
						status: 'APPROVED',
					},
				}),
			]);

		if (!sendToTeacher || !reqAccessStatus || !privateAccess) {
			return new NextResponse('Invalid request data passed', {
				status: 422,
			});
		}

		return NextResponse.json(privateAccess);
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

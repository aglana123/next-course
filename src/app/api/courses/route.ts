import { NextResponse } from 'next/server';
import slugify from 'slugify';

import db from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { z } from 'zod';

export async function POST(req: Request) {
	try {
		const { title } = await req.json();

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

		const slug = slugify(title, {
			lower: true,
		});

		const course = await db.course.create({
			data: {
				title,
				author_id: teacher.id,
				slug,
			},
		});

		return NextResponse.json(course);
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

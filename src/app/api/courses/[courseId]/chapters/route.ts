import { getAuthSession } from '@/lib/auth';
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const { title } = await req.json();
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

		const lastChapter = await db.chapter.findFirst({
			where: {
				courseId: params.courseId,
			},
			orderBy: {
				position: 'desc',
			},
		});

		const newPosition = lastChapter ? lastChapter.position + 1 : 1;

		const chapter = await db.chapter.create({
			data: {
				title,
				courseId: params.courseId,
				position: newPosition,
			},
		});

		return NextResponse.json(chapter);
	} catch (error) {
		console.log('[CHAPTER_POST]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

import db from '@/lib/db';
import { Chapter } from '@prisma/client';

interface GetChapterProps {
	userId: string;
	courseId: string;
	chapterId: string;
}

export const getChapter = async ({
	userId,
	courseId,
	chapterId,
}: GetChapterProps) => {
	try {
		const course = await db.course.findUnique({
			where: {
				is_published: true,
				id: courseId,
			},
			select: {
				author: {
					select: { name: true },
				},
			},
		});

		const chapter = await db.chapter.findUnique({
			where: {
				id: chapterId,
				is_published: true,
			},
		});

		if (!chapter || !course) {
			throw new Error('Chapter or course not found');
		}

		let muxData = null;
		let nextChapter: Chapter | null = null;

		nextChapter = await db.chapter.findFirst({
			where: {
				courseId: courseId,
				is_published: true,
				position: {
					gt: chapter?.position,
				},
			},
			orderBy: {
				position: 'asc',
			},
		});

		const userProgress = await db.userProgress.findUnique({
			where: {
				userId_chapterId: {
					userId,
					chapterId,
				},
			},
		});

		return {
			chapter,
			course,
			muxData,
			nextChapter,
			userProgress,
		};
	} catch (error) {
		console.log('[GET_CHAPTER]', error);
		return {
			chapter: null,
			course: null,
			muxData: null,
			nextChapter: null,
			userProgress: null,
		};
	}
};

import db from '@/lib/db';
import { Chapter } from '@prisma/client';

interface GetChapterProps {
	courseSlug: string;
	chapterId: string;
	userId: string;
}

export const getChapter = async ({
	userId,
	courseSlug,
	chapterId,
}: GetChapterProps) => {
	try {
		const course = await db.course.findUnique({
			where: {
				is_published: true,
				slug: courseSlug,
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

		const nextChapter = await db.chapter.findFirst({
			where: {
				courseId: course.id,
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
			nextChapter,
			userProgress,
		};
	} catch (error) {
		console.log('[GET_CHAPTER]', error);
		return {
			chapter: null,
			course: null,
			nextChapter: null,
			userProgress: null,
		};
	}
};

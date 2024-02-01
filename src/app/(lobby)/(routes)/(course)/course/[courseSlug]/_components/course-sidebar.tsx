import { Chapter, Course } from '@prisma/client';
import { CourseProgress } from '@/components/course-progress';

import { CourseSidebarItem } from './course-sidebar-item';
import { sessionUser } from '@/lib/session-user';

interface CourseSidebarProps {
	course: Course & {
		chapters: Chapter[];
	};
	progressCount: number;
}

export const CourseSidebar = async ({
	course,
	progressCount,
}: CourseSidebarProps) => {
	await sessionUser();

	return (
		<div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
			<div className="p-8 flex flex-col border-b">
				<h2>{course.title}</h2>
				<div className="mt-10">
					<CourseProgress value={progressCount} />
				</div>
			</div>
			<div className="flex flex-col w-full">
				{course.chapters.map((chapter) => (
					<CourseSidebarItem
						key={chapter.id}
						id={chapter.id}
						label={chapter.title}
						isCompleted={true}
						courseSlug={course.slug}
					/>
				))}
			</div>
		</div>
	);
};

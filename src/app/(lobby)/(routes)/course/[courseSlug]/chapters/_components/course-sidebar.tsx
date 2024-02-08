import { Chapter, Course, UserProgress } from '@prisma/client';
import { CourseProgress } from '@/components/course-progress';
import { CourseSidebarItem } from './course-sidebar-item';

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({
  course,
  progressCount
}: CourseSidebarProps) => {
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
            isCompleted={chapter.userProgress?.[0]?.isCompleted || false}
            courseSlug={course.slug}
          />
        ))}
      </div>
    </div>
  );
};

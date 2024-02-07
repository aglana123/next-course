import { FC } from 'react';
import ActionSection from './action-section';
import CourseInfoSection from './course-info-section';
import { CourseSectionProps } from './mobile-course-section';

export const DesktopCourseSection: FC<CourseSectionProps> = ({
  course,
  studentsCount
}) => (
  <section className="w-5/12 xl:w-4/12 hidden lg:flex flex-col bg-white rounded-md overflow-hidden px-6 py-8 gap-2 h-fit">
    <CourseInfoSection
      title={course.title}
      description={course.description!}
      author_name={course.author.name}
      course_updateAt={course.updatedAt}
      studentsCount={studentsCount}
    />
    <ActionSection
      course={course}
      courseId={course.id}
      publicAccess={course.public_access}
    />
  </section>
);

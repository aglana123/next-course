import { Course } from '@prisma/client';
import { FC } from 'react';
import CourseInfoSection from './course-info-section';
import ActionSection from './action-section';

export type CourseSectionProps = {
  course: Course & { author: { name: string } };
  studentsCount: number;
};

export const MobileCourseSection: FC<CourseSectionProps> = ({
  course,
  studentsCount
}) => (
  <section className="flex lg:hidden flex-col rounded-md overflow-hidden gap-6">
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

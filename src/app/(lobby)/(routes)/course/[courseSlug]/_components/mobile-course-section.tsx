import { FC } from 'react';
import CourseInfoSection from './course-info-section';
import ActionSection from './action-section';
import db from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { CourseSectionProps } from './desktop-course-section';
import AuthActionSection from './auth-action-section';

export const MobileCourseSection: FC<CourseSectionProps> = async ({
  course,
  studentsCount
}) => {
  const session = await getAuthSession();
  const userId = session?.user.id || null;

  if (!userId) {
    return (
      <section className="flex lg:hidden flex-col rounded-md overflow-hidden gap-6">
        <CourseInfoSection
          title={course.title}
          description={course.description!}
          author_name={course.author.name}
          course_updateAt={course.updatedAt}
          studentsCount={studentsCount}
        />
        <ActionSection course={course} />
      </section>
    );
  }

  const isPublicAccess = course.public_access === 'Public' ? true : false;

  const [hasAccessToCourse, isEnrolledInCourse] = await Promise.all([
    db.accessPrivateCourses
      .findFirst({
        where: {
          courseId: course.id,
          userId: userId
        }
      })
      .then((result) => !!result),
    db.enrolledCourse
      .findFirst({
        where: {
          courseId: course.id,
          userId: userId
        }
      })
      .then((result) => !!result)
  ]);

  console.log(hasAccessToCourse, isEnrolledInCourse);

  return (
    <section className="flex lg:hidden flex-col rounded-md overflow-hidden gap-6">
      <CourseInfoSection
        title={course.title}
        description={course.description!}
        author_name={course.author.name}
        course_updateAt={course.updatedAt}
        studentsCount={studentsCount}
      />
      <AuthActionSection
        hasAccessToCourse={hasAccessToCourse}
        isEnrolledInCourse={isEnrolledInCourse}
        isPublicAccess={isPublicAccess}
        course={course}
      />
    </section>
  );
};

import { Chapter, Course } from '@prisma/client';
import { FC } from 'react';
import CourseInfoSection from './course-info-section';
import ActionSection from './action-section';
import db from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import AuthActionSection from './auth-action-section';

export type CourseDataType = Course & {
  author: { name: string };
  chapters: Chapter[];
};

export type CourseSectionProps = {
  course: CourseDataType;
  studentsCount: number;
};

export const DesktopCourseSection: FC<CourseSectionProps> = async ({
  course,
  studentsCount
}) => {
  const session = await getAuthSession();
  const userId = session?.user.id || null;

  if (!userId) {
    return (
      <section className="w-5/12 xl:w-4/12 hidden lg:flex flex-col bg-white rounded-md overflow-hidden px-6 py-8 gap-2 h-fit shadow shadow-black/30">
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
    <section className="w-5/12 xl:w-4/12 hidden lg:flex flex-col bg-white rounded-md overflow-hidden px-6 py-8 gap-2 h-fit shadow shadow-black/30">
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

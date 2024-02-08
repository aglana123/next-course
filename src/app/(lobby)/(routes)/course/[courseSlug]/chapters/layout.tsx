import { redirect } from 'next/navigation';
import db from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { CourseSidebar } from './_components/course-sidebar';
import { getProgress } from '@/actions/get-progress';

const CourseLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { courseSlug: string };
}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect('/');
  }

  const course = await db.course.findUnique({
    where: {
      is_published: true,
      slug: params.courseSlug,
      enrolled_courses: {
        some: {
          userId: session.user.id
        }
      }
    },
    include: {
      chapters: {
        where: {
          is_published: true
        },
        include: {
          userProgress: {
            where: {
              userId: session.user.id
            }
          }
        },
        orderBy: {
          position: 'asc'
        }
      }
    }
  });

  if (!course) {
    return redirect('/');
  }

  const progress = await getProgress(session.user.id, course.id);

  return (
    <div className="h-full">
      <div className="hidden lg:flex h-full w-80  pt-[64px] lg:pt-[80px] flex-col fixed inset-y-0 right-0 bg-white shadow shadow-black/20">
        <CourseSidebar progressCount={progress} course={course} />
      </div>
      <main className="lg:pr-80 pt-[64px] lg:pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;

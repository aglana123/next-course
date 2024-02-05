import { getAuthSession } from '@/lib/auth';
import { Category, Chapter, Course } from '@prisma/client';
import { LayoutDashboard, ListChecks } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Actions } from './_components/action';
import { TitleForm } from './_components/title-form';
import db from '@/lib/db';
import { DescriptionForm } from './_components/description-form';
import { ImageForm } from './_components/image-form';
import { CategoryForm } from './_components/category-form';
import { ChaptersForm } from './_components/chapters-form';
import { Banner } from '@/components/banner';
import AccessForm from './_components/access-form';

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const session = await getAuthSession();
  const user = session?.user;
  if (!user) {
    return redirect('/');
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      author_id: user.id
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc'
        }
      }
    }
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  if (!course) {
    return redirect('/');
  }

  const requiredFields = [
    course.title,
    course.public_access,
    course.description,
    course.imageUrl,
    course.category_id,
    course.chapters.some((chapter) => chapter.is_published)
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.is_published && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1>Course setup</h1>
            <p className=" text-slate-700">
              Complete all fields {completionText}
            </p>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.is_published}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 ">
          <div className="bg-white p-4 rounded shadow-sm shadow-black/20">
            <div className="flex items-center gap-x-2">
              <LayoutDashboard />
              <h2>Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.slug
              }))}
            />
            <AccessForm
              initialData={course.public_access}
              courseId={course.id}
            />
          </div>
          <div className="space-y-6 bg-white p-4 rounded shadow-sm shadow-black/20">
            <div>
              <div className="flex items-center gap-x-2">
                <ListChecks />
                <h2>Course chapters</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;

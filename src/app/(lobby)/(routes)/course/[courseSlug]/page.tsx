import Image from 'next/image';
import { redirect } from 'next/navigation';
import CourseFacilitiesSection from './_components/course-facilities-section';
import AuthorInfoSection from './_components/author-info-section';
import ChaptersList from './_components/chapters-list';
import { MobileCourseSection } from './_components/mobile-course-section';
import { DesktopCourseSection } from './_components/desktop-course-section';
import { getCourse } from '@/actions/get-course';

const CourseIdPage = async ({ params }: { params: { courseSlug: string } }) => {
  const data = await getCourse(params.courseSlug);

  if (!data?.course) {
    return redirect('/');
  }

  const course = data.course;

  const { author, chapters } = course;
  const courseCount = author.createdCourses.length ?? 0;
  const chapterCount = chapters.length ?? 0;

  return (
    <div className="container px-0 md:px-4 xl:px-16 py-4 mt-[64px] lg:mt-[80px] w-full flex gap-4">
      <div className="w-full lg:w-7/12 xl:w-8/12 lg:bg-white rounded-md overflow-hidden lg:shadow shadow-black/30">
        <div className="relative aspect-video">
          <Image
            className="object-cover aspect-video"
            src={course.imageUrl!}
            alt={`hero image of ${course.title} course`}
            fill
            sizes="(max-width: 400px) 100vw, (max-width: 700px) 50vw, (max-width: 900px) 33vw, 450px"
            quality={80}
          />
        </div>
        <div className="flex flex-col gap-6 bg-white px-4 py-6">
          <MobileCourseSection
            course={data.course}
            studentsCount={data.studentsCount}
          />
          <CourseFacilitiesSection chapterCount={chapterCount} />
          <ChaptersList chapters={chapters} />
          <AuthorInfoSection
            user={author}
            name={author.name}
            courseCount={courseCount}
          />
        </div>
      </div>
      <DesktopCourseSection
        course={data.course}
        studentsCount={data.studentsCount}
      />
    </div>
  );
};

export default CourseIdPage;

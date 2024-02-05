import { getChapter } from '@/actions/get-chapter';
import { Preview } from '@/components/preview';
import { Separator } from '@/components/ui/separator';
import VideoPlayer from '@/components/video-player';
import { redirect } from 'next/navigation';
import { CourseProgressButton } from './_components/course-progress-button';
import { getAuthSession } from '@/lib/auth';

const ChapterIdPage = async ({
  params
}: {
  params: { chapterId: string; courseSlug: string };
}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect('/');
  }

  const { chapter, course, nextChapter, userProgress } = await getChapter({
    chapterId: params.chapterId,
    courseSlug: params.courseSlug,
    userId: session.user.id
  });

  if (!chapter || !course) {
    return redirect('/');
  }
  return (
    <div className="flex flex-col max-w-4xl mx-auto pb-20">
      <div className="p-4">
        <VideoPlayer url={chapter.video_url!} />
      </div>
      <div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>

          <CourseProgressButton
            slug={course.slug}
            chapterId={params.chapterId}
            courseId={course.id}
            nextChapterId={nextChapter?.id}
            isCompleted={userProgress?.isCompleted}
          />
        </div>
        <Separator />
        <div>
          <Preview value={chapter.description!} />
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;

import { getChapter } from '@/actions/get-chapter';
import { Preview } from '@/components/preview';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import VideoPlayerSections from './_components/video-player-sections';

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
      <VideoPlayerSections
        title={chapter.title}
        slug={course.slug}
        chapterId={params.chapterId}
        courseId={course.id}
        nextChapterId={nextChapter?.id}
        isCompleted={userProgress?.isCompleted}
        video_url={chapter.video_url!}
      />
      <Separator />
      <div>
        <Preview value={chapter.description!} />
      </div>
    </div>
  );
};

export default ChapterIdPage;

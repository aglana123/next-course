'use client';

import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle } from 'lucide-react';
import VideoPlayer from '@/components/video-player';

interface VideoPlayerSectionsProps {
  title: string;
  chapterId: string;
  courseId: string;
  slug: string;
  video_url: string;
  isCompleted?: boolean;
  nextChapterId?: string;
}

const VideoPlayerSections: FC<VideoPlayerSectionsProps> = ({
  title,
  chapterId,
  courseId,
  slug,
  video_url,
  isCompleted,
  nextChapterId
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleCompliteAction = async (event: 'onClick' | 'onEnded') => {
    try {
      setIsLoading(true);
      if (event === 'onEnded' && isCompleted === true) {
        return;
      }
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted
        }
      );
      if (!isCompleted && nextChapterId) {
        router.push(`/course/${slug}/chapters/${nextChapterId}`);
      }

      toast.success('Progress updated');
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;
  return (
    <>
      <div className="p-4">
        <VideoPlayer
        
          onEnded={() => {
            handleCompliteAction('onEnded');
          }}
          url={video_url}
        />
      </div>
      <div className="p-4 flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>

        <Button
          onClick={() => {
            handleCompliteAction('onClick');
          }}
          disabled={isLoading}
          type="button"
          variant={isCompleted ? 'secondary' : 'default'}
          className="w-full md:w-auto"
        >
          {isCompleted ? 'Completed' : 'Mark as complete'}
          <Icon className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </>
  );
};

export default VideoPlayerSections;

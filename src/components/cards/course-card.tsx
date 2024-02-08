import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PublicAccess } from '@prisma/client';
import Image from 'next/image';
import { Lock, BookOpen } from 'lucide-react';
import Link from 'next/link';

type CourseCardProps = {
  title: string;
  desc: string;
  course_access: PublicAccess;
  src: string;
  teacher: string;
  slug: string;
};

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  desc,
  src,
  teacher,
  course_access,
  slug
}) => {
  return (
    <Link href={`/course/${slug}`}>
      <Card className="rounded-md overflow-hidden h-full">
        <CardHeader className="p-0">
          <div className="aspect-video relative">
            <Image
              className="object-cover aspect-video"
              fill
              quality={80}
              sizes="(max-width: 400px) 100vw, (max-width: 700px) 50vw, (max-width: 900px) 33vw, 20vw"
              src={src}
              alt="card-img"
            />
          </div>
        </CardHeader>
        <hr />
        <CardContent className="flex flex-col py-6 px-4 h-full">
          <h3 className="line-claps-with-ellipsis font-semibold">{title}</h3>
          <div className="flex flex-col mb-2">
            <p className="line-claps-with-ellipsis">{desc}</p>
            <small className="text-black/80 text-xs">By {teacher}</small>
          </div>
          {course_access === 'Public' ? (
            <small className="font-medium flex gap-2 whitespace-nowrap items-center">
              <BookOpen className="bg-teal-500 rounded-md text-white p-1 h-5 w-5" />{' '}
              {course_access}
            </small>
          ) : (
            <small className="font-medium flex gap-2 whitespace-nowrap items-center">
              <Lock className="bg-rose-500 rounded-md text-white p-1 h-5 w-5" />{' '}
              {course_access}
            </small>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;

import { readableDate } from '@/helpers/readableDate';
import { Info, School } from 'lucide-react';

type CourseInfoSectionProps = {
  title: string;
  description: string;
  author_name: string;
  course_updateAt: Date;
  studentsCount: number | string;
};

const CourseInfoSection = ({
  title,
  description,
  author_name,
  course_updateAt,
  studentsCount
}: CourseInfoSectionProps) => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl mb-2">{title}</h1>
      <p className="mb-1">{description}</p>
      <span className="text-xs md:text-sm mb-1">
        Dibuat oleh <strong>{author_name}</strong>
      </span>
      <div className="flex gap-4 text-black/80">
        <span className="flex gap-2 items-center text-xs">
          <Info className="w-4 h-4" /> Terakhir Diupdate{' '}
          {readableDate(course_updateAt)}
        </span>
        <span className="flex gap-2 items-center text-xs">
          <School className="w-4 h-4" />
          {studentsCount} students
        </span>
      </div>
    </div>
  );
};

export default CourseInfoSection;

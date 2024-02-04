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
	studentsCount,
}: CourseInfoSectionProps) => {
	return (
		<div>
			<h1 className="mb-2 text-3xl md:text-4xl">{title}</h1>
			<p className="leading-5 font-medium text-base">{description}</p>
			<span className="text-sm">
				Dibuat oleh{' '}
				<span className="font-semibold text-xs">{author_name}</span>
			</span>
			<div className="flex gap-4 text-muted-foreground">
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

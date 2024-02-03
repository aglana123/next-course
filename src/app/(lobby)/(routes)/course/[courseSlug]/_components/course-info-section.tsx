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
			<h1>{title}</h1>
			<div className="flex flex-col py-2 space-y-1">
				<h3 className="font-normal">{description}</h3>
				<small>
					Dibuat oleh <strong>{author_name}</strong>
				</small>
				<div className="flex gap-4">
					<small className="flex gap-2 items-center">
						<Info className="w-4 h-4" /> Terakhir Diupdate{' '}
						{readableDate(course_updateAt)}
					</small>
					<small className="flex gap-2 items-center">
						<School className="w-4 h-4" />
						{studentsCount} students
					</small>
				</div>
			</div>
		</div>
	);
};

export default CourseInfoSection;

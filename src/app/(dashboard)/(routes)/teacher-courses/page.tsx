import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

const CoursesTeacher = () => {
	return (
		<div className="flex flex-col">
			<div className="flex justify-between">
				<Button variant={'outline'}>Filter Kursus</Button>
				<Link href={'/teacher-courses/create'}>
					<Button className="flex gap-2">
						Buat Kursus <PlusIcon className="w-5 h-5" />
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default CoursesTeacher;

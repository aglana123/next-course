import { DataTable } from './_components/data-table';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import { columns } from './_components/columns';

const CoursesTeacher = async () => {
	const session = await getAuthSession();

	if (!session?.user) {
		return redirect('/');
	}

	const courses = await db.course.findMany({
		where: { author_id: session.user.id },
		orderBy: {
			createdAt: 'desc',
		},
	});
	return (
		<div className="p-6 bg-white rounded shadow shadow-black/30">
			<DataTable
				columns={columns}
				data={courses}
			/>
		</div>
	);
};

export default CoursesTeacher;

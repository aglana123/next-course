import { redirect } from 'next/navigation';

const TeacherDashboard = () => {
	return redirect(`/teacher/courses`);
};

export default TeacherDashboard;

import { redirect } from 'next/navigation';
import Sidebar from './_components/sidebar';
import { getAuthSession } from '@/lib/auth';
import NavbarTeacher from './_components/navbar-teacher';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getAuthSession();
	const user = session?.user;
	if (user?.role !== 'TEACHER') {
		return redirect('/');
	}
	return (
		<div className="w-full h-full flex flex-1">
			<Sidebar />
			<div className="lg:ml-[300px] container max-md:px-0 py-6">
				<NavbarTeacher user={user} />
				{children}
			</div>
		</div>
	);
};

export default DashboardLayout;

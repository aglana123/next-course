import { redirect } from 'next/navigation';
import Sidebar from '../../_components/sidebar';
import { getAuthSession } from '@/lib/auth';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getAuthSession();
	const user = session?.user;
	if (user?.role !== 'TEACHER') {
		return redirect('/');
	}
	return (
		<div className="w-full h-full flex flex-1">
			<Sidebar />
			<div className="ml-[300px] container py-6">{children}</div>
		</div>
	);
};

export default DashboardLayout;

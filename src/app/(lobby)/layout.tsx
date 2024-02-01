import Navbar from '@/components/layouts/Navbar';
import { getAuthSession } from '@/lib/auth';

type LobbyLayoutProps = {
	children: React.ReactNode;
};

const LobbyLayout: React.FC<LobbyLayoutProps> = async ({ children }) => {
	const currentUser = await getAuthSession();
	return (
		<>
			<Navbar user={currentUser?.user} />
			<div>{children}</div>
		</>
	);
};

export default LobbyLayout;

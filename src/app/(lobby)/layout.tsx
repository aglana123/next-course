import Navbar from '@/components/layouts/Navbar';

type LobbyLayoutProps = {
	children: React.ReactNode;
};

const LobbyLayout: React.FC<LobbyLayoutProps> = async ({ children }) => {
	return (
		<>
			<Navbar />
			<div>{children}</div>
		</>
	);
};

export default LobbyLayout;

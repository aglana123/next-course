'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

type ClientProviderProps = {
	children: React.ReactNode;
};

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<Toaster />
				{children}
			</SessionProvider>
		</QueryClientProvider>
	);
};

export default ClientProvider;

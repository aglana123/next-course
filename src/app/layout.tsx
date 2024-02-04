import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import ClientProvider from '@/provider/ClientProvider';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';

const poppins = Poppins({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'NextCourse',
	description: 'Unlock Your Potential with Premier Learning Solution',
	category: 'course website',
	authors: { name: 'BagasKelana' },
	keywords: [
		'Next.js',
		'React',
		'JavaScript',
		'TypeScript',
		'Course',
		'Web Development',
		'Mobile Development',
		'Machine Learning',
	],
	creator: 'M Hilal Bagas Kelana',
	publisher: 'M Hilal Bagas Kelana',
	openGraph: {
		title: 'NextCourse',
		description: 'Unlock Your Potential with Premier Learning Solution',
		url: '',
		siteName: 'NextCourse',
		images: '',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'NextCourse',
		description: 'Unlock Your Potential with Premier Learning Solution',
		images: [''],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<ClientProvider>
					<NextSSRPlugin
						routerConfig={extractRouterConfig(ourFileRouter)}
					/>
					{children}
				</ClientProvider>
			</body>
		</html>
	);
}

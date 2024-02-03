'use client';

import { Button } from '@/components/ui/button';
import { PublicAccess } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ActionSection = ({
	courseId,
	publicAccess,
}: {
	courseId: string;
	publicAccess: PublicAccess;
}) => {
	const router = useRouter();
	const handleEnrollCourse = async () => {
		try {
			const enrollCourse = await axios.post(
				`/api/courses/${courseId}/enroll`
			);
			toast.success('Enroll Success');
			console.log(enrollCourse);
			router.push('/my-courses');
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		}
	};
	return (
		<div className="px-4 py-10 w-full flex gap-4 justify-center bg-slate-50 border-y border-input">
			<Button
				variant={'secondary'}
				className="h-fit py-4 text-lg px-8 font-semibold">
				Add to Wishlist
			</Button>
			{publicAccess === 'Public' ? (
				<Button
					onClick={handleEnrollCourse}
					variant={'ghost'}
					className="h-fit font-semibold py-4 text-lg px-8 bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90">
					Enroll Now
				</Button>
			) : (
				<>
					<Button
						onClick={handleEnrollCourse}
						variant={'ghost'}
						className="h-fit font-semibold py-4 text-lg px-8 bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90">
						Get Access
					</Button>
					<span className="text-xs text-destructive/80">
						Kursus ini memiliki akses privat. Untuk mengaksesnya,
						Anda perlu meminta izin dari pemilik kursus.
					</span>
				</>
			)}
		</div>
	);
};

export default ActionSection;

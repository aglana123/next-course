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
		<div className=" py-4 w-full flex flex-col gap-4 justify-center ">
			<div className="flex flex-col gap-4 justify-center">
				{publicAccess === 'Public' ? (
					<Button
						onClick={handleEnrollCourse}
						variant={'ghost'}
						className="h-fit font-medium py-4 text-lg  rounded-md bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90">
						Enroll Now
					</Button>
				) : (
					<>
						<Button
							onClick={handleEnrollCourse}
							variant={'ghost'}
							className="h-fit font-medium py-4 text-lg  rounded-md bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90">
							Get Access
						</Button>
					</>
				)}
				<Button
					variant={'secondary'}
					className="h-fit py-4 text-lg px-6 font-medium rounded-md">
					Add to Wishlist
				</Button>
			</div>
			{publicAccess === 'Private' && (
				<span className="text-xs text-destructive">
					*Kursus ini memiliki akses privat. Klik{' '}
					<strong className="text-xs">{`"Get Access" `}</strong>
					untuk meminta izin pemilik kursus.
				</span>
			)}
		</div>
	);
};

export default ActionSection;

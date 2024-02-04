import { Button } from '@/components/ui/button';

const HomePageAction = () => {
	return (
		<div className="flex gap-4 max-lg:justify-center">
			<Button
				variant="secondary"
				className="rounded-md px-5 py-3 text-base font-medium h-fit">
				Enroll Courses
			</Button>
			<Button className="rounded-md px-5 py-3 text-base font-medium h-fit">
				Become Teacher
			</Button>
		</div>
	);
};

export default HomePageAction;

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface CourseProgressProps {
	value: number;
}

export const CourseProgress = ({ value }: CourseProgressProps) => {
	return (
		<div>
			<Progress
				className="h-2 bg-primary/30"
				value={value}
			/>
			<p className={cn('font-medium mt-2 text-primary')}>
				{Math.round(value)}% Complete
			</p>
		</div>
	);
};

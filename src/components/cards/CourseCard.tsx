import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatRupiah } from '@/helpers/formatRupiah';
import Image from 'next/image';

type CourseCardProps = {
	title: string;
	desc: string;
	price: number;
	src: string;
	teacher: string;
};

const CourseCard: React.FC<CourseCardProps> = ({
	title,
	desc,
	price,
	src,
	teacher,
}) => {
	return (
		<Card className="rounded overflow-hidden">
			<CardHeader className="p-0">
				<div className="aspect-square relative">
					<Image
						className="object-cover aspect-square"
						fill
						quality={80}
						sizes="(max-width: 400px) 100vw, (max-width: 700px) 50vw, (max-width: 900px) 33vw, 20vw"
						src={src}
						alt="card-img"
						priority
					/>
				</div>
			</CardHeader>
			<hr />
			<CardContent className="flex flex-col py-4 px-6 h-full">
				<h3 className="line-claps-with-ellipsis font-semibold">
					{title}
				</h3>
				<div className="flex flex-col mb-2">
					<p className="line-claps-with-ellipsis ">{desc}</p>
					<small className="text-black/80 text-xs">
						By {teacher}
					</small>
				</div>
				<h3 className="font-semibold">Rp {formatRupiah(price)}</h3>
			</CardContent>
		</Card>
	);
};

export default CourseCard;

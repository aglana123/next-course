import { categoriesAsset } from '@/asset/categories';
import CoursesSection from '@/components/CoursesSection';
import { Button } from '@/components/ui/button';
import db from '@/lib/db';
import Image from 'next/image';

export default async function Home() {
	const courses = await db.course.findMany({
		where: {
			is_published: true,
		},
		include: {
			author: {
				select: {
					name: true,
				},
			},
		},
		take: 8,
	});

	return (
		<main className="mt-[64px] lg:mt-[80px] w-full flex flex-col gap-y-20">
			<section className="bg-white">
				<div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 lg:grid-cols-12 h-full pt-4">
					<div className="place-self-center lg:col-span-6 py-8 lg:py-16">
						<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none max-lg:text-center lg:text-5xl xl:text-6xl">
							Unlock Your Potential with Premier Learning
							Solutions
						</h1>
						<p className="max-w-2xl max-lg:text-center mb-6 font-light text-black/80 lg:mb-8 md:text-lg lg:text-xl">
							Discover Courses or Become an Educator: Your Journey
							to Personal and Professional Growth Begins Here.
							Join Our Global Community of Learners and Educators
							Today.
						</p>
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
					</div>
					<div className="relative h-full lg:h-[558px] max-lg:pt-6 lg:col-span-6 max-lg:row-start-1 w-full flex justify-center">
						<Image
							className="static lg:absolute object-cover h-full sm:w-full max-lg:aspect-square max-lg:rounded-full max-lg:overflow-hidden max-lg:border border-input w-64 max-w-sm lg:max-w-2xl overflow-visible"
							height={670}
							width={718}
							src="/landing-page/pngwing.com (18).png"
							alt="hero image for landing page"
						/>
					</div>
				</div>
			</section>
			<section className="py-6">
				<div className="flex flex-col items-center max-w-screen-xl px-4 mx-auto ">
					<div className="mb-8 max-w-sm text-center">
						<h2 className="font-bold text-3xl md:text-4xl text-primary mb-2">
							Categories Section
						</h2>
						<p>
							Browse through the course categories that catch your
							eye.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-stretch">
						{categoriesAsset.map((category) => (
							<div
								key={category.slug}
								className="flex z-10 flex-col items-center py-8 px-6 gap-4 bg-white rounded-md shadow-sm shadow-black/30 max-w-md">
								<Image
									src={category.img}
									alt={`image category of ${category.slug}`}
									width={100}
									height={100}
								/>
								<div className="w-full text-center flex flex-col gap-2">
									<h3>{category.name}</h3>
									<p>{category.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<section className="py-6">
				<div className="flex flex-col items-center max-w-screen-xl px-4 mx-auto h-full">
					<div className="mb-8 max-w-sm text-center">
						<h2 className="font-bold text-3xl md:text-4xl text-primary mb-2">
							Courses Section
						</h2>
						<p>
							Browse through the course categories that catch your
							eye.
						</p>
					</div>

					<CoursesSection courses={courses} />
				</div>
			</section>
		</main>
	);
}

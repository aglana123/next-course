import db from '@/lib/db';
import Image from 'next/image';
import HomePageAction from './_components/home-page-action';
import FeaturedCategoriesSection from './_components/featured-categories-section';
import FeaturedCoursesSection from './_components/featured-courses-section';
import { getAuthSession } from '@/lib/auth';

export default async function Home() {
	const session = await getAuthSession();

	const user = session?.user ?? null;
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
							Unlock Your Potential with{' '}
							<span className="text-primary">
								Premier Learning Solutions
							</span>
						</h1>
						<p className="max-w-2xl max-lg:text-center mb-6 font-light text-black/80 lg:mb-8 md:text-lg lg:text-xl">
							Discover Courses or Become an Educator: Your Journey
							to Personal and Professional Growth Begins Here.
							Join Our Global Community of Learners and Educators
							Today.
						</p>
						<HomePageAction user={user} />
					</div>
					<div className="relative h-full lg:h-[558px] max-lg:pt-6 lg:col-span-6 max-lg:row-start-1 w-full flex justify-center">
						<Image
							className="static lg:absolute object-cover h-full sm:w-full max-lg:aspect-square max-lg:rounded-full max-lg:overflow-hidden max-lg:border border-input w-64 max-w-sm lg:max-w-2xl overflow-auto"
							height={670}
							width={718}
							src="/landing-page/pngwing.com (18).png"
							alt="hero image for landing page"
							priority
						/>
					</div>
				</div>
			</section>
			<section className="py-6">
				<FeaturedCategoriesSection />
			</section>
			<section className="py-6">
				<FeaturedCoursesSection courses={courses} />
			</section>
		</main>
	);
}

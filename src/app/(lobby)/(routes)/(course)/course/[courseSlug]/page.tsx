import { Button } from '@/components/ui/button';
import db from '@/lib/db';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import AuthorSection from './_components/author-section';
import CourseInfoSection from './_components/course-info-section';
import CourseFacilitiesSection from './_components/course-facilities-section';

const CourseIdPage = async ({ params }: { params: { courseSlug: string } }) => {
	const course = await db.course.findUnique({
		where: {
			slug: params.courseSlug,
			is_published: true,
		},
		include: {
			chapters: {
				where: {
					is_published: true,
				},
				orderBy: {
					position: 'asc',
				},
			},
			author: {
				select: {
					image: true,
					name: true,
					id: true,
					createdCourses: true,
				},
			},
			enrolled_courses: true,
		},
	});

	if (!course) {
		return redirect('/');
	}

	const studentsCount = course.enrolled_courses.length ?? 0;
	const courseCount = course.author.createdCourses.length ?? 0;
	const chapterCount = course.chapters.length ?? 0;

	return (
		<div className="container px-0 md:px-4 xl:px-16 py-4 mt-[64px] lg:mt-[80px] w-full">
			<div className="flex w-full gap-4">
				<div className="w-full lg:w-7/12 xl:w-8/12 md:bg-white rounded-md overflow-hidden">
					<div className="relative aspect-video">
						<Image
							className="object-cover aspect-video"
							src={course.imageUrl!}
							alt={`hero image of ${course.title} course`}
							fill
							quality={80}
						/>
					</div>
					<section className="flex lg:hidden flex-col rounded-md overflow-hidden px-4 md:px-6 pt-6 lg:py-8 gap-4 h-fit bg-white">
						<CourseInfoSection
							title={course.title}
							description={course.description!}
							author_name={course.author.name}
							course_updateAt={course.updatedAt}
							studentsCount={studentsCount}
						/>
						<div className="md:px-4 py-10 w-full flex gap-4 justify-center md:bg-slate-50 md:border-y md:border-input">
							<Button
								variant={'secondary'}
								className="h-fit py-4 text-lg px-8 font-semibold">
								Add to Wishlist
							</Button>
							<Button
								variant={'ghost'}
								className="h-fit font-semibold py-4 text-lg px-8 bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90">
								Enroll Now
							</Button>
						</div>

						<AuthorSection
							user={course.author}
							name={course.author.name}
							courseCount={courseCount}
						/>
					</section>

					<CourseFacilitiesSection chapterCount={chapterCount} />
				</div>
				<section className="w-5/12 xl:w-4/12 hidden lg:flex flex-col bg-white rounded-md overflow-hidden px-6 py-8 gap-2 h-fit">
					<CourseInfoSection
						title={course.title}
						description={course.description!}
						author_name={course.author.name}
						course_updateAt={course.updatedAt}
						studentsCount={studentsCount}
					/>

					<div className="px-4 py-10 w-full flex gap-4 justify-center bg-slate-50 border-y border-input">
						<Button
							variant={'secondary'}
							className="h-fit py-4 text-lg px-8 font-semibold">
							Add to Wishlist
						</Button>
						<Button
							variant={'ghost'}
							className="h-fit font-semibold py-4 text-lg px-8 bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90">
							Enroll Now
						</Button>
					</div>

					<AuthorSection
						user={course.author}
						name={course.author.name}
						courseCount={courseCount}
					/>
				</section>
			</div>
		</div>
	);
};

export default CourseIdPage;

//redirect(`/course/${course.slug}/chapters/${course.chapters[0].id}`);

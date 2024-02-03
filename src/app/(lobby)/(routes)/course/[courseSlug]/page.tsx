import db from '@/lib/db';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import CourseInfoSection from './_components/course-info-section';
import CourseFacilitiesSection from './_components/course-facilities-section';
import ActionSection from './_components/action-section';
import AuthorInfoSection from './_components/author-info-section';

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
						<ActionSection
							courseId={course.id}
							publicAccess={course.public_access}
						/>

						<AuthorInfoSection
							user={course.author}
							name={course.author.name}
							courseCount={courseCount}
						/>
					</section>

					<CourseFacilitiesSection chapterCount={chapterCount} />
					<div className="flex flex-col px-4 md:px-6 py-6 bg-white">
						<h2 className="mb-4">Konten Kursus</h2>
						{course.chapters.map((chapter) => (
							<div
								key={chapter.id}
								className="flex border border-input p-4 font-medium">
								{chapter.title}
							</div>
						))}
					</div>
				</div>
				<section className="w-5/12 xl:w-4/12 hidden lg:flex flex-col bg-white rounded-md overflow-hidden px-6 py-8 gap-2 h-fit">
					<CourseInfoSection
						title={course.title}
						description={course.description!}
						author_name={course.author.name}
						course_updateAt={course.updatedAt}
						studentsCount={studentsCount}
					/>
					<ActionSection
						courseId={course.id}
						publicAccess={course.public_access}
					/>
					<AuthorInfoSection
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

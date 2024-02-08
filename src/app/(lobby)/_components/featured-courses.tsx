import CourseCard from '@/components/cards/course-card';
import db from '@/lib/db';

const FeaturedCourses = async () => {
  const courses = await db.course.findMany({
    where: {
      is_published: true
    },
    include: {
      author: {
        select: {
          name: true
        }
      }
    },
    take: 8
  });
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 place-items-stretch">
      {courses.map((course) => (
        <CourseCard
          slug={course.slug}
          key={course.id}
          title={course.title}
          desc={course.description!}
          src={course.imageUrl!}
          teacher={course.author.name}
          course_access={course.public_access}
        />
      ))}
    </section>
  );
};

export default FeaturedCourses;

import db from '@/lib/db';

export const getCourse = async (courseSlug: string) => {
  try {
    const [course, studentsCount] = await Promise.all([
      db.course.findUnique({
        where: { slug: courseSlug, is_published: true },
        include: {
          chapters: {
            where: { is_published: true },
            orderBy: { position: 'asc' }
          },
          author: {
            select: { image: true, name: true, id: true, createdCourses: true }
          }
        }
      }),
      db.enrolledCourse.count({
        where: {
          course: {
            slug: courseSlug
          }
        }
      })
    ]);

    return { course, studentsCount };
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
};

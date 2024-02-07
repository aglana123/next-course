import db from '@/lib/db';

export const getCourse = async (courseSlug: string) => {
  try {
    const course = await db.course.findUnique({
      where: { slug: courseSlug, is_published: true },
      include: {
        chapters: {
          where: { is_published: true },
          orderBy: { position: 'asc' }
        },
        author: {
          select: { image: true, name: true, id: true, createdCourses: true }
        },
        enrolled_courses: true
      }
    });
    return course;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
};

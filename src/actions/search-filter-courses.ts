'use server';

import { firstLetterToUpper } from '@/helpers/firstLetterToUpper';
import db from '@/lib/db';
import { Course, CoursesLevel, PublicAccess } from '@prisma/client';

type QueryProps = {
  title?: { contains: string; mode: 'insensitive' };
  is_published: boolean;
  category_id?: string;
  level?: CoursesLevel;
  public_access?: PublicAccess;
};

type SearchParamsProps = {
  limit?: string;
  page?: string;
  q?: string;
  level?: CoursesLevel;
  category?: string;
  access?: PublicAccess;
  sort?: string;
};

type CoursesReturn = (Course & { author: { name: string } })[];

const searchFilterCourses = async (searchParams: SearchParamsProps) => {
  const { q: slug, category, level, access, sort } = searchParams;
  const query: QueryProps = { is_published: true };
  const sorting: { createdAt?: 'desc' | 'asc' } = {};

  if (slug) {
    query.title = { contains: slug, mode: 'insensitive' };
  }

  if (category) {
    query.category_id = category;
  }

  if (level) {
    query.level = firstLetterToUpper(level) as CoursesLevel;
  }

  if (access) {
    query.public_access = firstLetterToUpper(access) as PublicAccess;
  }

  if (sort && sort !== 'relevance') {
    sorting.createdAt = 'desc';
  }

  try {
    const courses = await db.course.findMany({
      where: query,
      include: { author: { select: { name: true } } },
      orderBy: sorting
    });

    return courses as CoursesReturn;
  } catch (error) {
    console.log('Error fetching courses:', error);
    throw error as Error;
  }
};

export default searchFilterCourses;

'use server';

import db from '@/lib/db';
import { Course } from '@prisma/client';

export interface searchCoursesProps {
  slug: string;
}

export type SearchResults =
  | (Course & { category: { name: string } | null })[]
  | null;

const searchCourses = async (
  params: searchCoursesProps
): Promise<SearchResults> => {
  try {
    const { slug } = params;

    const searchCourses = await db.course.findMany({
      where: {
        title: {
          contains: slug,
          mode: 'insensitive'
        },
        is_published: true
      },
      include: {
        category: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });

    return searchCourses;
  } catch (error: any) {
    console.log('[SEARCH_COURSES]', error);
    return null;
  }
};

export default searchCourses;

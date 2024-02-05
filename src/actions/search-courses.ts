'use server';

import db from '@/lib/db';
import { Course, Category, User } from '@prisma/client';

export interface searchCoursesProps {
  slug: string;
}

export interface SearchResults {
  searchCourses: Course[] | null;
  searchCategories: Category[] | null;
  searchTeachers: User[] | null;
}

const searchCourses = async (
  params: searchCoursesProps
): Promise<SearchResults> => {
  try {
    const { slug } = params;

    const searchCoursesPromise = db.course.findMany({
      where: {
        title: {
          contains: slug,
          mode: 'insensitive'
        },
        is_published: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 4
    });

    const searchCategoriesPromise = db.category.findMany({
      where: {
        name: {
          contains: slug,
          mode: 'insensitive'
        }
      }
    });

    const searchTeachersPromise = db.user.findMany({
      where: {
        name: {
          contains: slug,
          mode: 'insensitive'
        },
        role: 'TEACHER'
      }
    });

    const [searchCourses, searchCategories, searchTeachers] = await Promise.all(
      [searchCoursesPromise, searchCategoriesPromise, searchTeachersPromise]
    );

    console.log(searchCourses);

    return { searchCourses, searchCategories, searchTeachers };
  } catch (error: any) {
    console.log('[SEARCH_COURSES]', error);
    return {
      searchCourses: null,
      searchCategories: null,
      searchTeachers: null
    };
  }
};

export default searchCourses;

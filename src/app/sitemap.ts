import { type MetadataRoute } from 'next';

import db from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const courses = await db.course.findMany({
		select: {
			id: true,
			is_published: true,
			slug: true,
		},
	});

	const categories = await db.category.findMany();

	const coursesRoutes = courses.map((course) => ({
		url: `${process.env.NEXT_PUBLIC_APP_URL}/course/${course.slug}`,
		lastModified: new Date().toISOString(),
	}));

	const categoriesRoutes = categories.map((category) => ({
		url: `${process.env.NEXT_PUBLIC_APP_URL}/courses?category=${category.slug}`,
		lastModified: new Date().toISOString(),
	}));

	const routes = ['', 'course', 'teacher/courses'].map((route) => ({
		url: `${process.env.NEXT_PUBLIC_APP_URL}/${route}`,
		lastModified: new Date().toISOString(),
	}));

	return [...routes, ...coursesRoutes, ...categoriesRoutes];
}

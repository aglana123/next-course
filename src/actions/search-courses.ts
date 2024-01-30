'use server';

import db from '@/lib/db';
import { Course, CoursesLevel, PublicAccess } from '@prisma/client';

export interface searchProductsProps {
	slug?: string;
	level?: CoursesLevel;
	category_id?: string;
	public_access?: PublicAccess;
}

const searchProducts = async (
	params: searchProductsProps
): Promise<Course[]> => {
	try {
		const { slug, level, category_id, public_access } = params;
		let query: searchProductsProps = {};

		if (slug) {
			query.slug = slug;
		}

		if (level) {
			query.level = level;
		}
		if (category_id) {
			query.category_id = category_id;
		}
		if (public_access) {
			query.public_access = public_access;
		}

		const filteredProducts = await db.course.findMany({
			where: query,
			orderBy: {
				createdAt: 'desc',
			},
			take: 10,
		});

		return filteredProducts;
	} catch (error: any) {
		throw new Error(error);
	}
};

export default searchProducts;

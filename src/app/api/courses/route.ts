import db from '@/lib/db';

import { z } from 'zod';

export async function GET(req: Request) {
	try {
		const url = new URL(req.url);

		const { limit, page, slug, level, category_id, public_access } = z
			.object({
				slug: z.string(),
				level: z.string(),
				category_id: z.string(),
				public_access: z.string(),
				limit: z.string(),
				page: z.string(),
			})
			.parse({
				slug: url.searchParams.get('slug'),
				level: url.searchParams.get('level'),
				category_id: url.searchParams.get('category_id'),
				public_access: url.searchParams.get('public_access'),
				limit: url.searchParams.get('limit'),
				page: url.searchParams.get('page'),
			});

		let result;

		return Response.json(result);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid request data passed', { status: 422 });
		}

		console.log(error);

		return new Response('Could not fetch more posts', { status: 500 });
	}
}

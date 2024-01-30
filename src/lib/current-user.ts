import db from './db';
import { getAuthSession } from './auth';

export const currentUser = async () => {
	const session = await getAuthSession();
	const user_id = session?.user.id;

	if (!user_id) {
		return null;
	}

	const user = await db.user.findUnique({
		where: {
			id: user_id,
		},
	});
	return user;
};

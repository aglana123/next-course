import { getAuthSession } from './auth';
import { redirect } from 'next/navigation';

export const sessionUser = async (redirectTo: string = '/') => {
	const session = await getAuthSession();
	const user = session?.user;

	if (!user) {
		return redirect(redirectTo);
	}
	return user;
};

'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormLabel,
	FormMessage,
	FormItem,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
	title: z.string().min(1, {
		message: 'Title is required',
	}),
});

const AddCourse = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const response = await axios.post('/api/courses', values);
			router.push(`/teacher/courses/${response.data.id}`);
			toast.success('Course created');
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		}
	};

	return (
		<div className="px-6 py-10 bg-white rounded shadow-md shadow-black/30 w-fit">
			<h2>Beri Nama Kursusmu</h2>
			<p>
				Apa nama yang ingin kamu berikan di kursusmu? Jangan kuatir,
				kamu bisa merubahnya nanti.
			</p>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 mt-8">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<h3>Judul Kursus</h3>
								</FormLabel>
								<FormControl>
									<Input
										disabled={isSubmitting}
										placeholder="e.g. 'Advanced web development'"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Apa yang akan kamu ajarkan di kursus ini?
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex items-center gap-x-2">
						<Link href="/">
							<Button
								type="button"
								variant="ghost">
								Batal
							</Button>
						</Link>
						<Button
							type="submit"
							disabled={!isValid || isSubmitting}>
							Lanjutkan
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default AddCourse;

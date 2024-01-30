'use client';
import { FC, useCallback } from 'react';
import { Circle } from 'lucide-react';
import { Category } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import FilterList from './FilterList';

type SearchFilterProps = {
	categories: Category[];
};

const levels = [
	{ slug: 'beginner', name: 'Beginner' },
	{ slug: 'intermediate', name: 'Intermediate' },
	{ slug: 'advanced', name: 'Advanced' },
];
const courseAccess = [
	{ slug: 'public', name: 'Public' },
	{ slug: 'private', name: 'Private' },
];

const SearchFilter: FC<SearchFilterProps> = ({ categories }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();


	const selectedCategory = searchParams.get('category');
	const selectedLevel = searchParams.get('level');
	const selectedAccess = searchParams.get('access');

	const changeQuery = useCallback(
		(key: string, value: string) => {
			const url = new URLSearchParams(searchParams);
			if (
				value === selectedCategory ||
				value === selectedLevel ||
				value === selectedAccess
			) {
				url.delete(key);
				const searchQuery = url.toString();
				return router.push(`${pathname}/?${searchQuery}`);
			}
			url.set(key, value);
			const searchQuery = url.toString();

			router.push(`${pathname}/?${searchQuery}`);
		},
		[
			searchParams,
			selectedCategory,
			selectedLevel,
			selectedAccess,
			pathname,
			router,
		]
	);

	return (
		<div className="py-10 lg:py-4 px-4 z-10 flex flex-col gap-4">
			<div className="flex flex-col">
				<h3 className="py-4">Kategori</h3>
				{categories?.map((category) =>
					category.slug === selectedCategory ? (
						<FilterList
							key={category.slug}
							slug={category.slug}
							onClick={() => {
								changeQuery('category', category.slug);
							}}>
							<Circle className="w-4 h-4 stroke-none fill-primary" />
							{category.name}
						</FilterList>
					) : (
						<FilterList
							key={category.slug}
							slug={category.slug}
							onClick={() => {
								changeQuery('category', category.slug);
							}}>
							<Circle className="w-4 h-4" />
							{category.name}
						</FilterList>
					)
				)}
			</div>
			<Separator />
			<div className="flex flex-col">
				<h3 className="py-4">Level</h3>
				{levels?.map((level) =>
					level.slug === selectedLevel ? (
						<FilterList
							key={level.slug}
							slug={level.slug}
							onClick={() => {
								changeQuery('level', level.slug);
							}}>
							<Circle className="w-4 h-4 stroke-none fill-primary" />
							{level.name}
						</FilterList>
					) : (
						<FilterList
							key={level.slug}
							slug={level.slug}
							onClick={() => {
								changeQuery('level', level.slug);
							}}>
							<Circle className="w-4 h-4" />
							{level.name}
						</FilterList>
					)
				)}
			</div>
			<Separator />
			<div className="flex flex-col">
				<h3 className="py-4 ">Akses</h3>
				{courseAccess?.map((access) =>
					access.slug === selectedAccess ? (
						<FilterList
							key={access.slug}
							slug={access.slug}
							onClick={() => {
								changeQuery('access', access.slug);
							}}>
							<Circle className="w-4 h-4 stroke-none fill-primary" />
							{access.name}
						</FilterList>
					) : (
						<FilterList
							key={access.slug}
							slug={access.slug}
							onClick={() => {
								changeQuery('access', access.slug);
							}}>
							<Circle className="w-4 h-4" />
							{access.name}
						</FilterList>
					)
				)}
			</div>
		</div>
	);
};

export default SearchFilter;

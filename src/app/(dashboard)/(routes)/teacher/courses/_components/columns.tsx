'use client';

import { Course } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export const columns: ColumnDef<Course>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}>
					Course
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="flex gap-2 items-center whitespace-nowrap">
					<Image
						className="object-cover aspect-video max-lg:hidden"
						width={50}
						height={50}
						src={row.original.imageUrl || '/pngwing.com (13).png'}
						alt={`course photo for ${row.getValue('title')}`}
					/>
					{row.getValue('title')}
				</div>
			);
		},
	},
	{
		accessorKey: 'public_access',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}>
					Public Access
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<Badge
					variant={
						row.getValue('public_access') === 'Private'
							? 'destructive'
							: 'outline'
					}>
					{row.getValue('public_access')}
				</Badge>
			);
		},
	},
	{
		accessorKey: 'is_published',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}>
					Published
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const isPublished = row.getValue('is_published') || false;

			return (
				<Badge variant={isPublished ? 'default' : 'secondary'}>
					{isPublished ? 'Published' : 'Draft'}
				</Badge>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const { id } = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="h-4 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<Link href={`/teacher/courses/${id}`}>
							<DropdownMenuItem>
								<Pencil className="h-4 w-4 mr-2" />
								Edit
							</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

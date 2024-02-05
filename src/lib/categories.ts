import { Category } from '@prisma/client';
import db from './db';

export const fetchCategories = async () => {
  const categories = await db.category.findMany();

  if (!categories?.length) {
    return null;
  }
  return categories as Category[];
};

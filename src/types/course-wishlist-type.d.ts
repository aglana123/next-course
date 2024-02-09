export type CourseWishlistType = Course & {
  author: { name: string };
  chapters: Chapter[];
};

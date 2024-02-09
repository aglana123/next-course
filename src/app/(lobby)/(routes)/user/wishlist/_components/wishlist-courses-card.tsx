'use client';

import CourseCard from '@/components/cards/course-card';
import useWishlist from '@/hooks/use-wishlist';

const WishlistCoursesCard = () => {
  const { items: courses } = useWishlist();
  return (
    <>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course_access={course.public_access}
          desc={course.description!}
          slug={course.slug}
          src={course.imageUrl!}
          teacher={course.author.name}
          title={course.title}
        />
      ))}
    </>
  );
};

export default WishlistCoursesCard;

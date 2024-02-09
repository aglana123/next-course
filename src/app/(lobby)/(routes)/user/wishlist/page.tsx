import WishlistCoursesCard from './_components/wishlist-courses-card';

const WishlistPage = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 place-items-stretch">
      <WishlistCoursesCard />
    </section>
  );
};

export default WishlistPage;

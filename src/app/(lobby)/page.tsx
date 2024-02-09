import FeaturedCategoriesSection from './_components/featured-categories-section';
import FeaturedCoursesSection from './_components/featured-courses-section';
import HeroHome from './_components/hero-home';
export default function Home() {
  return (
    <main className="mt-[64px] lg:mt-[80px] w-full flex flex-col gap-y-20">
      <section className="relative bg-white/80 max-lg:pb-6">
        <HeroHome />
      </section>
      <section className="py-6">
        <FeaturedCategoriesSection />
      </section>
      <section className="py-6">
        <FeaturedCoursesSection />
      </section>
    </main>
  );
}

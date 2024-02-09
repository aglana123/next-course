import HeroDescription from './hero-description';
import HeroImages from './hero-images';

const HeroHome = () => {
  return (
    <div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 lg:grid-cols-12 h-full pt-4">
      <HeroDescription />
      <HeroImages />
    </div>
  );
};

export default HeroHome;

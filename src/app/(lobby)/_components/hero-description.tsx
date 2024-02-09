import HomePageAction from './home-page-action';

const HeroDescription = () => {
  return (
    <div className="place-self-center lg:col-span-6 py-8 lg:py-16">
      <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none max-lg:text-center lg:text-5xl xl:text-6xl">
        Unlock Your Potential with{' '}
        <span className="text-primary">Premier Learning Solutions</span>
      </h1>
      <p className="max-w-2xl max-lg:text-center mb-6 font-light text-black/80 lg:mb-8 md:text-lg lg:text-xl">
        Discover Courses or Become an Educator: Your Journey to Personal and
        Professional Growth Begins Here. Join Our Global Community of Learners
        and Educators Today.
      </p>
      <HomePageAction />
    </div>
  );
};

export default HeroDescription;

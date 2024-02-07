import Image from 'next/image';
import HomePageAction from './home-page-action';
import { getAuthSession } from '@/lib/auth';
import { BookOpen, Heart, Trophy } from 'lucide-react';

const HeroHome = async () => {
  const session = await getAuthSession();

  const user = session?.user ?? null;
  return (
    <div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 lg:grid-cols-12 h-full pt-4">
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
        <HomePageAction user={user} />
      </div>
      <div className="relative h-fit w-fit lg:h-[558px] max-lg:my-8 lg:col-span-6 max-lg:row-start-1 place-self-center flex justify-center rounded-full lg:rounded-none">
        <Image
          className="object-cover h-full sm:w-full max-lg:aspect-square max-lg:rounded-full max-lg:overflow-hidden max-lg:border border-input w-64 max-w-sm lg:max-w-2xl overflow-visible drop-shadow-xl"
          height={670}
          width={718}
          src="/landing-page/pngwing.com (18).png"
          alt="hero image for landing page"
          priority
        />
        <div className="px-4 lg:px-8 py-2 lg:py-4 bg-white w-fit absolute -right-6 lg:top-10 lg:right-10 shadow shadow-black/20 rounded-md">
          <Heart className="stroke-rose-600 h-6 w-6 sm:h-8 sm:w-8 lg:w-10 lg:h-10 stroke-1" />
        </div>
        <div className="px-4 lg:px-8 py-2 lg:py-4 bg-white w-fit absolute -left-8 top-14  lg:top-24 lg:left-28 shadow shadow-black/20 rounded-md">
          <Trophy className="text-sky-600 stroke-1 h-6 w-6 sm:h-8 sm:w-8 lg:w-10 lg:h-10" />
        </div>
        <div className="px-4 lg:px-8 py-2 lg:py-4 bg-white w-fit absolute bottom-0 lg:bottom-10 left-0 lg:left-10 shadow shadow-black/20 rounded-md">
          <BookOpen className="text-teal-600 stroke-1 h-6 w-6 sm:h-8 sm:w-8 lg:w-10 lg:h-10" />
        </div>
      </div>
    </div>
  );
};

export default HeroHome;

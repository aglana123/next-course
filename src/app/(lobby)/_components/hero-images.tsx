import { BookOpen, Heart, Trophy } from 'lucide-react';
import Image from 'next/image';

const HeroImages = () => {
  return (
    <div className="relative h-fit w-fit lg:h-[558px] max-lg:my-8 lg:col-span-6 max-lg:row-start-1 place-self-center flex justify-center rounded-full lg:rounded-none">
      <Image
        className="object-cover h-full sm:w-full max-lg:aspect-square max-lg:rounded-full max-lg:border border-input w-64 max-w-sm lg:max-w-2xl drop-shadow-xl"
        height={670}
        width={718}
        placeholder="blur"
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
      HeroDescription
    </div>
  );
};

export default HeroImages;

'use client';
import { categoriesAsset } from '@/asset/categories';
import Image from 'next/image';

const FeaturedCategoriesSection = () => {
  return (
    <div className="flex flex-col items-center max-w-screen-xl px-4 mx-auto ">
      <div className="mb-8 max-w-sm text-center">
        <h2 className="font-bold text-3xl md:text-4xl text-primary mb-2">
          Categories Section
        </h2>
        <p>Browse through the course categories that catch your eye.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-stretch">
        {categoriesAsset.map((category) => (
          <div
            key={category.slug}
            className="flex z-10 flex-col items-center py-8 px-6 gap-4 bg-white rounded-md shadow-sm shadow-black/30 max-w-md"
          >
            <Image
              src={category.img}
              alt={`image category of ${category.slug}`}
              width={100}
              height={100}
            />
            <div className="w-full text-center flex flex-col gap-2">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategoriesSection;

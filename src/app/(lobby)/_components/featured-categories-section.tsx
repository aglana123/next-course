import { categoriesAsset } from '@/asset/categories';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedCategoriesSection = () => {
  return (
    <div className="flex flex-col items-center max-w-screen-xl px-4 mx-auto ">
      <div className="mb-8 max-w-md text-center">
        <h2 className="font-bold text-3xl md:text-4xl text-primary mb-2">
          Categories Section
        </h2>
        <p>Browse through the course categories that catch your eye.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-stretch">
        {categoriesAsset.map((category) => (
          <Link key={category.slug} href={`/courses?category${category.slug}`}>
            <div className="group/category flex flex-col items-center py-10 px-6 gap-4  bg-white rounded-md shadow-md shadow-black/30 h-full w-full">
              <Image
                className="animate-up-down"
                src={category.img}
                alt={`image category of ${category.slug}`}
                width={100}
                height={100}
              />
              <div className="w-full text-center flex flex-col gap-2">
                <h3 className="font-semibold group-hover/category:text-primary">
                  {category.name}
                </h3>
                <p className="max-w-md">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategoriesSection;

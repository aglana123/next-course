import { categoriesAsset } from '@/asset/categories';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import CategoryList from './category-list';

const CategoriesPopUp = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <span className="text-primary font-medium">Categories</span>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={15}
        hideWhenDetached={true}
        className="flex flex-col w-[245px]"
      >
        {categoriesAsset.map((category) => (
          <CategoryList
            withCircle={true}
            key={category.slug}
            name={category.name}
            slug={category.slug}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default CategoriesPopUp;

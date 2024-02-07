import Image from 'next/image';

const SearchCoursesList = ({
  course_slug,
  url,
  title,
  category_name
}: {
  course_slug: string;
  url: string;
  title: string;
  category_name: string;
}) => {
  return (
    <a href={`/course/${course_slug}`}>
      <div className="group/search flex gap-2 py-2">
        <Image
          className="object-cover h-[50px] w-[100px] aspect-video overflow-hidden"
          src={url}
          alt={`image of ${title}`}
          width={100}
          height={50}
        />
        <div className="w-full">
          <p className="font-medium group-hover/search:text-primary">{title}</p>
          <small>{category_name}</small>
        </div>
      </div>
    </a>
  );
};

export default SearchCoursesList;

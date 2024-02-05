import { IconText } from '@/components/icon-text';
import {
  BookOpen,
  BookText,
  LucideIcon,
  Smartphone,
  SmileIcon,
  TextIcon
} from 'lucide-react';

export type courseFacilitiesType = {
  icon: LucideIcon;
  text: string;
  variant: 'default' | 'violet' | 'fuchsia';
}[];

const CourseFacilitiesSection = ({
  chapterCount
}: {
  chapterCount: number | string;
}) => {
  const courseFacilities: courseFacilitiesType = [
    {
      icon: BookOpen,
      text: `${chapterCount} Chapters`,
      variant: 'default'
    },
    {
      icon: Smartphone,
      text: `Akses di Mobile dan Desktop`,
      variant: 'violet'
    },
    { icon: TextIcon, text: `Artikel`, variant: 'fuchsia' },
    {
      icon: BookText,
      text: `Deskripsi dan penjelasan`,
      variant: 'default'
    },
    {
      icon: SmileIcon,
      text: `Ucapan Selamat Dari Saya :)`,
      variant: 'violet'
    }
  ];

  return (
    <div className="flex flex-col px-4 md:px-6 mt-4 pt-4 md:pt-0 bg-white">
      <h2>Kursus Ini Meliputi</h2>
      <div className="flex flex-wrap gap-2 mt-2">
        {courseFacilities.map((facility) => (
          <IconText
            key={facility.text}
            icon={facility.icon}
            text={facility.text}
            variant={facility.variant}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseFacilitiesSection;

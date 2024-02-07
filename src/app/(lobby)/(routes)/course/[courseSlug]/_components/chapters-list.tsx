import { Chapter } from '@prisma/client';

const ChaptersList = ({ chapters }: { chapters: Chapter[] }) => {
  return (
    <div className="flex flex-col">
      <h2 className="mb-2">Konten Kursus</h2>
      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          className="flex border border-input p-4 font-medium"
        >
          {chapter.title}
        </div>
      ))}
    </div>
  );
};

export default ChaptersList;

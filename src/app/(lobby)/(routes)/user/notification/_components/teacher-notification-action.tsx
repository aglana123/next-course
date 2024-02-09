import { Button } from '@/components/ui/button';
import { FC } from 'react';

type TeacherNotificationActionProps = {
  onAccept: () => Promise<void>;
  onReject: () => Promise<void>;
  isLoading: boolean;
};

const TeacherNotificationAction: FC<TeacherNotificationActionProps> = ({
  onAccept,
  onReject,
  isLoading
}) => {
  return (
    <div className="flex gap-2 px-4">
      <Button onClick={onReject} isLoading={isLoading} variant={'secondary'}>
        Tolak
      </Button>
      <Button onClick={onAccept} isLoading={isLoading}>
        Terima
      </Button>
    </div>
  );
};

export default TeacherNotificationAction;

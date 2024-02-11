import { getAuthSession } from '@/lib/auth';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import NotificationList from './_components/notification-list';
import TeacherNotificationList from './_components/teacher-notification-list';

const NotificationPage = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect('/');
  }

  if (session.user.role !== 'TEACHER') {
    const statusInfo = await db.user.findUnique({
      where: {
        id: session.user.id,
        role: 'STUDENT'
      },
      select: {
        RequestStatusInfo: {
          include: {
            course: {
              include: { author: { select: { name: true } } }
            }
          }
        }
      }
    });

    const statusAccessUser = statusInfo?.RequestStatusInfo ?? null;

    return (
      <div className="flex flex-col gap-1">
        {statusAccessUser?.map((data) => (
          <NotificationList
            courseSlug={data.course.slug}
            courseId={data.courseId}
            key={data.courseId}
            author_name={data.course.author.name}
            src={data.course.imageUrl!}
            title={data.course.title}
            status={data.status}
          />
        ))}
      </div>
    );
  }

  const notification = await db.user.findUnique({
    where: {
      id: session.user.id,
      role: 'TEACHER'
    },
    select: {
      RequestStatusInfo: {
        include: {
          course: {
            include: { author: { select: { name: true } } }
          }
        },
        orderBy: {
          updatedAt: 'asc'
        }
      },
      RequestAccess: {
        include: {
          course: true
        },
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  });

  const statusAccessUser = notification?.RequestStatusInfo ?? null;
  const requestAccessTeacher = notification?.RequestAccess ?? null;
  const isStatusRequestEmpty = !statusAccessUser?.length ?? true;
  const isMessagesTeacherEmpty = !requestAccessTeacher?.length ?? true;

  return (
    <div className="flex flex-col gap-4 ">
      {!isStatusRequestEmpty && (
        <>
          <h3>Access Request Status</h3>
          <div className="flex flex-col gap-1">
            {statusAccessUser?.map((data) => (
              <NotificationList
                courseSlug={data.course.slug}
                courseId={data.courseId}
                key={data.courseId}
                author_name={data.course.author.name}
                src={data.course.imageUrl!}
                title={data.course.title}
                status={data.status}
              />
            ))}
          </div>
        </>
      )}
      {!isMessagesTeacherEmpty && (
        <>
          <h3>Access Request Message</h3>
          <div className="gap-1">
            {requestAccessTeacher?.map((data) => (
              <TeacherNotificationList
                key={`${data.senderId}${data.course.id}`}
                courseId={data.courseId}
                title={data.course.title}
                src={data.course.imageUrl!}
                public_access={data.course.public_access}
                sender_name={data.senderName}
                sender_id={data.senderId}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPage;

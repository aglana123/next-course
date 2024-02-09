import UserNavbarRouteList from './user-navbar-route-list';

const userRoutes = [
  { label: 'Learning', href: '/user/learning' },
  { label: 'Wishlist', href: '/user/wishlist' },
  { label: 'Notification', href: '/user/notification' }
];

const UserNavbarRoutes = () => {
  return (
    <div className="flex w-full gap-4">
      {userRoutes.map((route) => {
        return (
          <UserNavbarRouteList
            key={route.label}
            href={route.href}
            label={route.label}
          />
        );
      })}
    </div>
  );
};

export default UserNavbarRoutes;

import UserNavbar from './_components/user-navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container px-4 xl:px-16 py-4 mt-[64px] lg:mt-[80px]">
      <UserNavbar />
      {children}
    </div>
  );
};

export default Layout;

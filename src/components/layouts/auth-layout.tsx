import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="mx-auto flex h-screen justify-center gap-0 bg-white p-10 lg:gap-10">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;

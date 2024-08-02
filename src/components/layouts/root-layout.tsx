import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import Navbar from "../navbar";

const RootLayout = () => {
  return (
    <main className="mx-auto max-w-4xl py-10">
      <Navbar />
      <div className="mt-10">
        <Outlet />
      </div>
      <Toaster />
    </main>
  );
};

export default RootLayout;

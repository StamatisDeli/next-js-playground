import { useSession, signIn, signOut } from "next-auth/react";

import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { data: session, status } = useSession();
  console.log("session", session);
  console.log("status", status);
  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <Navbar />
      {status === "authenticated" ? (
        <main>{children}</main>
      ) : (
        <div className="w-full h-full flex flex-col mt-auto mx-auto mb-auto items-center max-w-sm border rounded-md p-6">
          <h2 className="text-2xl">Sign in</h2>
          <br />
          <button
            className="p-4 rounded-md border"
            onClick={() =>
              signIn("credentials", {
                username: "example",
                password: "password",
              })
            }
          >
            Sign in
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}

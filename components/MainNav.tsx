import Link from "next/link";
import ToggleMode from "./ToggleMode";
import { ModeToggle } from "./mode-toogle-site";
import MainNavLinks from "./MainNavLinks";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

const MainNav = async () => {
  const session = await getServerSession(options);

  return (
    <div className="flex justify-between">
      <MainNavLinks role={session?.user?.role} />

      <div className="flex items-center gap-2">
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}

        <ToggleMode />
        <ModeToggle />
      </div>
    </div>
  );
};

export default MainNav;

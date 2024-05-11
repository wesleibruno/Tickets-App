import Link from "next/link";
import ToggleMode from "./ToggleMode";
import { ModeToggle } from "./mode-toogle-site";
import MainNavLinks from "./MainNavLinks";

const MainNav = () => {
  return (
    <div className="flex justify-between">
      <MainNavLinks />

      <div className="flex items-center gap-2">
        <Link href="/">Logout</Link>
        <ToggleMode />
        <ModeToggle />
      </div>
    </div>
  );
};

export default MainNav;

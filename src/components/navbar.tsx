import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex justify-between">
      <Button variant="link" className="pl-0">
        <Link to="/">Fullstack Test</Link>
      </Button>
    </nav>
  );
};

export default Navbar;

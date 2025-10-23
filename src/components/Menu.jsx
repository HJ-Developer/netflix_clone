import { Link, useNavigate } from "react-router-dom";
import { BellIcon, Search, User2Icon } from "lucide-react";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../assets/firebase";
import { toast } from "react-toastify";

const Menu = () => {
  const currentHash = window.location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.getElementById("root");
    const nav = document.querySelector("#menu");
    const handleScroll = () => {
      if (root.scrollTop > 50) {
        nav.classList.remove("_translucend");
      } else {
        nav.classList.add("_translucend");
      }
    };

    root.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (path) => {
    setTimeout(() => {
      navigate(path);
    }, 100);
  };

  const sign = () => {
    return (
      <header>
        <nav id="menu" className="_translucend _compaq-plus">
          <div>
            <i className="logo --menu" onClick={() => handleNavigate("/")}></i>
            <i className="icon">sign out</i>
          </div>
        </nav>
      </header>
    );
  };

  const compaq = () => {
    return (
      <header>
        <nav id="menu" className="_translucend">
          <div>
            <i className="logo --menu" onClick={() => handleNavigate("/")}></i>
          </div>
        </nav>
      </header>
    );
  };

  const full = () => {
    return (
      <header>
        <nav id="menu" className="_translucend">
          <div>
            <i className="logo --menu " onClick={() => handleNavigate("/")}></i>
            <ul className="menu">
              <Link to={"/"} className="--li">
                Home
              </Link>
              <Link className="--li _disabled">TV Shows</Link>
              <Link className="--li _disabled">Movies</Link>
              <Link className="--li _disabled">News & Popular</Link>
              <Link className="--li _disabled">My List</Link>
            </ul>
          </div>
          <div className="btns">
            <form className="_disabled">
              {/* <input type="search" name="searchInput" id="searchInput" /> */}
              <i className="icon">
                <Search className="--search" />
              </i>
            </form>
            <i className="icon --notification  _disabled">
              <BellIcon />
            </i>
            <i
              className="icon --account"
              onClick={() => handleNavigate("/account")}
            >
              <User2Icon />
            </i>
          </div>
        </nav>
      </header>
    );
  };

  if (currentHash === "/sign") {
    return compaq();
  } else if (currentHash === "/subscription" || currentHash === "/account") {
    return sign();
  } else {
    return full();
  }
};
export default Menu;

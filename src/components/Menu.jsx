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
            <i
              className="icon"
              onClick={() => {
                signOut(auth);
                const notify = toast.success("Logging out...", {
                  position: "bottom-right",
                  autoClose: 1200,
                });
                setTimeout(() => navigate("/"), 1500);
              }}
            >
              sign out
            </i>
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
              <Link to={"/shows"} className="--li">
                TV Shows
              </Link>
              <Link to={"/movies"} className="--li">
                Movies
              </Link>
              <Link to={"/news"} className="--li">
                News & Popular
              </Link>
              <Link to={"/sign"} className="--li">
                My List
              </Link>
            </ul>
          </div>
          <div className="btns">
            <form>
              {/* <input type="search" name="searchInput" id="searchInput" /> */}
              <i className="icon">
                <Search className="--search" />
              </i>
            </form>
            <i className="icon --notification">
              <BellIcon />
            </i>
            <i
              className="icon --account"
              onClick={() => handleNavigate("/subscription")}
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

import { useEffect, useState } from "react";
import { auth } from "../assets/firebase";
import { Link } from "react-router-dom";
import { LanguagesIcon } from "lucide-react";

const Footer = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setTimeout(() => {
        setUser(user);
      }, 300);
    });
  });
  return (
    <div className="footer">
      <div className="_container">
        <Link to={"#"}>questions? contact us</Link>
      </div>
      <div className="_container --links">
        <ul>
          <li className="_link">
            <Link>FAQ</Link>
          </li>
          <li className="_link">
            <Link to={"/account"}>account</Link>
          </li>
          <li className="_link">
            <Link>invetsor relations</Link>
          </li>
          <li className="_link">
            <Link>ways to watch</Link>
          </li>
          <li className="_link">
            <Link>privacy</Link>
          </li>
          <li className="_link">
            <Link>corporate information</Link>
          </li>
          <li className="_link">
            <Link>speed test</Link>
          </li>
          <li className="_link">
            <Link>only on netflix</Link>
          </li>
        </ul>
        <ul>
          <li className="_link">
            <Link>help center</Link>
          </li>
          <li className="_link">
            <Link>media center</Link>
          </li>
          <li className="_link">
            <Link>jobs</Link>
          </li>
          <li className="_link">
            <Link>terms of use</Link>
          </li>
          <li className="_link">
            <Link>cookie preferences</Link>
          </li>
          <li className="_link">
            <Link>contact us</Link>
          </li>
          <li className="_link">
            <Link>legal notices</Link>
          </li>
        </ul>
      </div>
      <div className="_container --last">
        <div>
          <i className="_icon">
            <LanguagesIcon />
          </i>
          <select name="language">
            <option value="english" selected>
              english
            </option>
          </select>
        </div>
        <h3>netflix angola</h3>
        {/* <h4></h4> */}
      </div>
    </div>
  );
};
export default Footer;

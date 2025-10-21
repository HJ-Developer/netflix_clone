import { useEffect, useState } from "react";
import { auth } from "../assets/firebase";

const Footer = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setTimeout(() => {
        setUser(user);
      }, 300);
    });
  });
  return <div>Footer </div>;
};
export default Footer;

import { useEffect, useState } from "react";
import { auth } from "../assets/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const allowed = auth.currentUser;

    if (allowed) {
      setUser(auth.currentUser);
    } else {
      navigate("/sign");
    }
  }, []);

  const handleSubscription = () => {
    const allowed = sessionStorage.setItem("safeToSubscribe", true);
    navigate("/subscription");
  };
  const handleLogout = () => {
    signOut(auth);
    const notify = toast.success("Logging out...", {
      position: "bottom-right",
      autoClose: 1200,
    });
    const allowed = sessionStorage.removeItem("safeToSubscribe");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    user && (
      <div className="_accountContainer">
        <h1>Welcome to Netflix, {user?.displayName || user?.email}</h1>
        <p>Registered since {user?.metadata.creationTime}</p>
        <div>
          <button onClick={handleSubscription}>Subscription</button>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
    )
  );
};

export default Account;

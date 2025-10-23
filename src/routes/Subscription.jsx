import { auth } from "../assets/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { CheckIcon } from "lucide-react";
import { useRecoilState } from "recoil";
import { subscriptionState } from "../assets/atom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Subscription = () => {
  const [subscription, setSubscription] = useRecoilState(subscriptionState);
  const [currentPlan, setCurrentPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const allowed = sessionStorage.getItem("safeToSubscribe");
    if (!allowed) {
      if (auth.currentUser) {
        const notify = toast.error("You must be log in first!", {
          position: "bottom-right",
          autoClose: 1200,
        });
        return;
      }
      const notify = toast.error("Please use the account area!", {
        position: "bottom-right",
        autoClose: 1200,
      });
      setTimeout(() => {
        navigate("/account");
      }, 1500);
    } else {
      setTimeout(() => {
        sessionStorage.removeItem("safeToSubscribe");
      }, 500);
    }
  }, []);

  useEffect(() => {
    const btn = document.getElementById("subscribeBtn");
    setSubscription(currentPlan);
    if (currentPlan)
      setTimeout(() => {
        btn.classList.remove("--invalid");
        btn.style.cursor = "pointer";
      }, 200);
  }, [currentPlan]);

  const setPlan = (plan) => {
    const prev = document.querySelectorAll(".--checked");
    const active = document.querySelectorAll(`._${plan}`);

    prev.forEach((e) => e?.classList.remove("--checked"));

    active.forEach((e) => e?.classList.add("--checked"));

    if (plan === "planA") {
      setCurrentPlan("Basic");
    } else if (plan === "planB") {
      setCurrentPlan("Premium");
    } else if (plan === "planC") {
      setCurrentPlan("Standard");
    } else {
      setCurrentPlan(null);
    }
  };
  const handleSubscription = () => {
    console.log(subscription);
    if (subscription) {
      sessionStorage.setItem("safeToCheckout", "true");
      setTimeout(() => {
        navigate("/checkout");
      }, 500);
    } else {
      alert("need to choose a plan!");
    }
  };

  return (
    <section className="_subsContainer">
      <Helmet>
        <title>Netflix - Subscription</title>
      </Helmet>
      <div className="_sub">
        <div className="--box -first">
          <h2>Choose the plan tht's right for you</h2>
          <ul className="_advantages">
            <li>
              <CheckIcon className="icon" />{" "}
              <span>Watch all you want. Ad-free.</span>
            </li>
            <li>
              <CheckIcon className="icon" />{" "}
              <span>Recomendations just for you.</span>
            </li>
            <li>
              <CheckIcon className="icon" />{" "}
              <span>Change or cancel your plan anytime.</span>
            </li>
          </ul>
        </div>
        <div className="--box -second">
          <i className="planIcon _planA" onClick={() => setPlan("planA")}>
            Basic
          </i>
          <i className="planIcon _planB" onClick={() => setPlan("planB")}>
            Premium
          </i>
          <i className="planIcon _planC" onClick={() => setPlan("planC")}>
            Standard
          </i>
        </div>
      </div>
      <div className="--box -third">
        <ul className="_pros-cons">
          <li>
            <span>Monthly price</span>
            <div>
              <i className="icon _planA">AED29</i>
              <i className="icon _planB">AED56</i>
              <i className="icon _planC">AED39</i>
            </div>
          </li>
          <li>
            <span>Video Quality</span>
            <div>
              <i className="icon _planA">Good</i>
              <i className="icon _planB">Best</i>
              <i className="icon _planC">Better</i>
            </div>
          </li>
          <li>
            <span>Resolution</span>
            <div>
              <i className="icon _planA">720p</i>
              <i className="icon _planB">4K+HDR</i>
              <i className="icon _planC">1080p</i>
            </div>
          </li>
          <li>
            <span>Watch on your TV, computer, mobile phone and tablet</span>
            <div>
              <i className="icon _planA">
                <CheckIcon />
              </i>
              <i className="icon _planB">
                <CheckIcon />
              </i>
              <i className="icon _planC">
                <CheckIcon />
              </i>
            </div>
          </li>
        </ul>
      </div>
      <div className="--box -fourth">
        <button
          onClick={handleSubscription}
          className="_subBtn --invalid"
          id="subscribeBtn"
        >
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default Subscription;

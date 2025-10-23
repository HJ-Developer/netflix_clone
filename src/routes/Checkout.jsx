import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardDetails from "../components/CardDetails";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Checkout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const allowed = sessionStorage.getItem("safeToCheckout");
    if (!allowed) {
      const notify = toast.error("You must choose a subscription plan!", {
        position: "bottom-right",
        autoClose: 1200,
      });
      setTimeout(() => {
        navigate("/subscription");
      }, 550);
    } else {
      setTimeout(() => {
        sessionStorage.removeItem("safeToCheckout");
      }, 500);
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Netflix - Checkout</title>
      </Helmet>
      <CardDetails />
    </>
  );
};

export default Checkout;

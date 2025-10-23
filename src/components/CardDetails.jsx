// import "../assets/CardDetails.css";

import {
  CalendarIcon,
  CreditCardIcon,
  LockIcon,
  User2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CardDetails = () => {
  const navigate = useNavigate();
  const [card, setCard] = useState({
    cardno: "",
    cardtype: "far fa-credit-card",
    expirydt: "",
  });
  const [cNo, setCNo] = useState("");
  const [cED, setCED] = useState("");
  const [cSC, setCSC] = useState("");
  const [cHN, setCHN] = useState("");

  // useEffect(() => {
  //   const allowed = sessionStorage.getItem("safeToPayment");
  //   if (!allowed) {
  //     const notify = toast.error("You must choose a subscription plan!", {
  //       position: "bottom-right",
  //       autoClose: false,
  //     });
  //     setTimeout(() => {
  //       navigate("/subscription");
  //     }, 550);
  //   } else {
  //     setTimeout(() => {
  //       sessionStorage.removeItem("safeToPayment");
  //     }, 500);
  //   }
  // }, [navigate]);

  useEffect(() => {
    console.log([cNo, cED, cSC, cHN].join("\n"));

    const No = document.querySelector("#_cardNo");
    const ED = document.querySelector("#_cardED");
    const SC = document.querySelector("#_cardSC");
    const HN = document.querySelector("#_cardHN");
    if (cNo == "") {
      No.classList.remove("_filled");
      No.classList.add("_empty");
    } else if (cNo !== "") {
      No.classList.add("_filled");
      No.classList.remove("_empty");
    }
    if (cED == "") {
      ED.classList.remove("_filled");
      ED.classList.add("_empty");
    } else if (cED !== "") {
      ED.classList.add("_filled");
      ED.classList.remove("_empty");
    }
    if (cSC == "") {
      SC.classList.remove("_filled");
      SC.classList.add("_empty");
    } else if (cSC !== "") {
      SC.classList.add("_filled");
      SC.classList.remove("_empty");
    }
    if (cHN == "") {
      HN.classList.remove("_filled");
      HN.classList.add("_empty");
    } else if (cHN !== "") {
      HN.classList.add("_filled");
      HN.classList.remove("_empty");
    }
  }, [cNo, cED, cSC, cHN]);

  const onChange = (e) => {
    var cartype_new = cardnumber(e?.target.value);
    setCard({
      ...card,
      cardno: e.target.value,
      cardtype: cartype_new,
    });
  };
  const cardnumber = (inputtxt) => {
    var matches = inputtxt.match(/(\d+)/);
    var cardno = "";
    if (matches) {
      cardno = inputtxt.split(" - ").join("");
    }
    var cardtype1 = card.cardtype;
    //var visa = /^(?:4[0-9]{16}(?:[0-9]{3})?)$/;
    var visa = /^(?:4[0-9]{2}?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{3})$/;
    var amexpRegEx = /^(?:3[47][0-9]{3})$/;
    var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{5})$/;
    if (visa.test(cardno) === true) {
      //eg:4651970022334445
      cardtype1 = "far fa fa-3x fa-cc-visa  carddetail-cardtype";
    } else if (mastercardRegEx.test(cardno) === true) {
      cardtype1 = "far fa fa-3x fa-cc-mastercard carddetail-cardtype";
    } else if (amexpRegEx.test(cardno) === true) {
      cardtype1 = "far fa fa-3x fa-cc-amex carddetail-cardtype";
    } else if (discovRegEx.test(cardno) === true) {
      cardtype1 = "far fa fa-3x fa-cc-discover carddetail-cardtype";
    }
    return cardtype1;
  };

  const cc_format = (value) => {
    const v = value.replace(/[^0-9]/gi, "").substr(0, 16);

    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts.length > 1 ? parts.join(" - ") : value;
  };
  const expriy_format = (value) => {
    const expdate = value;
    const expDateFormatter =
      expdate.replace(/\//g, "").substring(0, 2) +
      (expdate.length > 2 ? "/" : "") +
      expdate.replace(/\//g, "").substring(2, 4);

    return expDateFormatter;
  };
  const onChangeExp = (e) => {
    setCard({
      ...card,
      expirydt: e?.target.value,
    });
  };

  const handlePay = (e) => {
    e.preventDefault();

    // if (!(cNo && cED && cSC && cHN)) {
    //   const notify = toast.error("Please fill all the fields correctly!", {
    //     position: "bottom-right",
    //     autoClose: 1500,
    //   });
    //   return;
    // }

    if (cNo.length < 25) {
      const notify = toast.error("The card number must be 16 characters long", {
        position: "bottom-right",
        autoClose: 1500,
      });
      return;
    } else if (cED < 5) {
      console.log(cNo.length);
      const notify = toast.error("Please fill the expiration date correctly", {
        position: "bottom-right",
        autoClose: 1500,
      });
      return;
    } else if (cSC.length < 3) {
      const notify = toast.error(
        "The Security Code (CCV or CVV) must be 3 characters long",
        {
          position: "bottom-right",
          autoClose: 1500,
        }
      );
      return;
    } else if (cHN.length < 3) {
      const notify = toast.error("Your name seems too short", {
        position: "bottom-right",
        autoClose: 1500,
      });
      return;
    }
    const notify = toast.success("Subscribed successfully. Redirecting", {
      position: "bottom-right",
      autoClose: 1500,
    });

    setTimeout(() => {
      navigate("/account");
    });
  };

  return (
    <>
      <div className="_maxContainer">
        <form className="_paymentForm" onSubmit={handlePay}>
          <div className="_cardDetails-wrapper">
            <div className="_card-field">
              <p className="_error"></p>
              <input
                name="card-number"
                id="_cardNo"
                type="text"
                className=""
                data-mask="0000 0000 0000 0000"
                /* placeholder="XXXX-XXXX-XXXX-XXXX" */
                value={cc_format(card.cardno)}
                onChange={onChange}
                onKeyUp={(e) => setCNo(e.target.value)}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                minLength={16}
              />
              <label htmlFor="_cardNo">Card Number</label>
              <i /* className={card.cardtype} */ className="_icon">
                <CreditCardIcon />
              </i>
            </div>
            <div className="_card-field">
              <p className="_error"></p>
              <input
                type="text"
                name="expiry-data"
                id="_cardED"
                className=""
                /* placeholder="mm / yy" */
                onChange={onChangeExp}
                onKeyUp={(e) => setCED(e.target.value)}
                value={expriy_format(card.expirydt)}
              />
              <label htmlFor="_cardED">Expiration Date</label>
              <i className="_icon">
                <CalendarIcon />
              </i>
            </div>
            <div className="_card-field">
              <p className="_error"></p>
              <input
                name="security-code"
                type="password"
                id="_cardSC"
                className=""
                data-mask="000"
                /* placeholder="000" */
                maxLength="3"
                pattern="[0-9][0-9][0-9]"
                onChange={(e) => {
                  setCSC(e?.target.value);
                }}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <label htmlFor="_cardSC">CCV/CVV</label>
              <i className="_icon">
                <LockIcon />
              </i>
            </div>
            <div className="_card-field">
              <p className="_error"></p>
              <input
                name="holer-name"
                type="text"
                id="_cardHN"
                className="" /* placeholder="" */
                onChange={(e) => {
                  setCHN(e?.target.value);
                }}
              />
              <label htmlFor="_cardHN">Card Holder Name</label>
              <i className="_icon">
                <User2Icon />
              </i>
            </div>
          </div>
          <input
            name="pay-btn"
            className="_payBtn"
            type="submit"
            value={"Pay now"}
          />
        </form>
      </div>
    </>
  );
};

export default CardDetails;

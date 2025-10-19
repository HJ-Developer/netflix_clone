import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../assets/firebase.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Sign = () => {
  return (
    <div className="_principal">
      <ToastContainer />
      <Signin view="_current" />
      <Signup />
    </div>
  );
};

const switchBox = (latest, current) => {
  const oldBox = document.querySelector(`#${latest}`);
  const newBox = document.querySelector(`#${current}`);

  oldBox.reset();
  newBox.reset();
  const sms1 = document.querySelector("._alert1");
  const sms2 = document.querySelector("._alert2");

  sms1?.classList.contains("--visible")
    ? sms1.classList.remove("--visible")
    : null;
  sms2?.classList.contains("--visible")
    ? sms2.classList.remove("--visible")
    : null;

  // if (sms?.classList.contains("--visible")) sms?.classList.remove("--visible");
  setTimeout(() => {
    oldBox.classList.remove("_current");
  }, 100);
  setTimeout(() => {
    newBox.classList.add("_current");
  }, 400);
};

const Signin = ({ view }) => {
  const navigate = useNavigate();
  // const sms = document.querySelector("._alert1");
  // const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });

  const handleSignin = async (e) => {
    e.preventDefault();

    // try {
    //   await signInWithEmailAndPassword(
    //     auth,
    //     credentials.email,
    //     credentials.password
    //   ).then(() => {
    //     const f = document.getElementById("signin");
    //     f.reset();
    //     localStorage.setItem("logged", "true");
    //     setTimeout(() => {
    //       navigate("/");
    //     }, 100);
    //   }, localStorage.removeItem("logged"));
    // } catch (err) {
    //   console.error(err);
    //   if (!sms?.classList.contains("--visible"))
    //     sms?.classList.add("--visible");
    // }
    try {
      signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      ).then(
        () => {
          const user = auth.currentUser;
          if (user) {
            const notify = toast.success(
              "User created succefully! Just a sec...",
              {
                position: "bottom-right",
                autoClose: false,
              }
            );

            setTimeout(() => navigate("/"), 500);
          } else {
            const notify = toast.error(
              "Failed to login! Please check your credentials",
              {
                position: "bottom-right",
                autoClose: 1800,
              }
            );
          }
        },
        () => {
          const notify = toast.error(
            "Failed to login! Please check your credentials",
            {
              position: "bottom-center",
              autoClose: 1800,
            }
          );
        }
      );
    } catch (err) {
      console.log(err.message);
      toast.error(err.message, { position: "bottom-right", autoClose: 1800 });
    }
  };
  return (
    <>
      <form onSubmit={handleSignin} className={view} id="signin">
        <p className="_alert1">
          *please check your credentialas or try again later
        </p>
        <h1>sign in</h1>
        <input
          type="email"
          name="userMail"
          className="field"
          placeholder="Email"
          required
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <input
          type="password"
          name="userPassword"
          className="field"
          placeholder="Password"
          required
          minLength={6}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <input type="submit" value="sign in" />
        <h3>
          new to netflix?
          <span
            className="_link"
            onClick={() => {
              switchBox("signin", "signup");
            }}
          >
            sign up
          </span>
        </h3>
      </form>
    </>
  );
};

const Signup = ({ view }) => {
  const sms = document.querySelector("._alert2");
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });
  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   const password = document.querySelector("#signupPassword").value;
  //   const checkPassword = document.querySelector("#signupPasswordDouble").value;

  //   if (password === checkPassword) {
  //     try {
  //       await createUserWithEmailAndPassword(
  //         auth,
  //         credentials.email,
  //         credentials.password
  //       ).then(
  //         () => {
  //           const f = document.querySelector("#signup");
  //           f.reset();
  //           alert("Registered succesfully!");

  //           setTimeout(() => {
  //             switchBox("signup", "signin");
  //           }, 200);
  //         },
  //         () => {
  //           if (!sms?.classList.contains("--visible"))
  //             sms?.classList.add("--visible");
  //         }
  //       );
  //     } catch (err) {
  //       if (!sms.classList.contains("--visible"))
  //         sms.classList.add("--visible");
  //     }
  //   } else {
  //     console.log(`1: ${password} 2: ${checkPassword}`);
  //     sms.innerHTML = "*passwords doesn't match!";
  //     if (!sms.classList.contains("--visible")) sms.classList.add("--visible");
  //   }
  // };
  const handleSignup = async (e) => {
    e.preventDefault();
    const password = document.querySelector("#signupPassword").value;
    const checkPassword = document.querySelector("#signupPasswordDouble").value;

    if (password === checkPassword) {
      try {
        createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        ).then(
          async () => {
            const user = auth.currentUser;
            if (user) {
              const notify = toast.success(
                "User created succefully!\nRedirecting...",
                {
                  position: "bottom-right",
                  autoClose: 1800,
                }
              );
              await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                userName: "user",
              });
              console.log("User created succefully!");
              setTimeout(() => {
                switchBox("signup", "signin");
              }, 2100);
            }
          },
          () => {
            const notify = toast.error("Failed to create user!", {
              position: "bottom-right",
              autoClose: 1800,
            });
          }
        );
      } catch (err) {
        const notify = toast.error(err, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } else {
      console.log("Passwords doesn't match!");
      const notify = toast.error("Passwords doesn't match!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSignup} className={view} id="signup">
        <p className="_alert2">*please enter valid credentialas</p>
        <h1>sign up</h1>
        <input
          type="email"
          name="userMail"
          className="field"
          placeholder="Email"
          required
          id="signupMail"
          onChange={(e) => {
            setCredentials({ ...credentials, email: e.target.value });
          }}
        />
        <input
          type="password"
          name="userPassword"
          className="field"
          placeholder="Password"
          required
          id="signupPassword"
          minLength={6}
          onChange={(e) => {
            setCredentials({ ...credentials, password: e.target.value });
          }}
        />
        <input
          type="password"
          name="checkPassword"
          className="field"
          placeholder="Confirm Password"
          required
          id="signupPasswordDouble"
          minLength={6}
        />
        <input type="submit" value="sign up" />
        <h3>
          already have an account?
          <span
            className="_link"
            onClick={() => {
              switchBox("signup", "signin");
            }}
          >
            sign in
          </span>
        </h3>
      </form>
    </>
  );
};

export default Sign;

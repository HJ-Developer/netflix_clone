import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// import {useRoutes} from "react-router-dom"
import { useState, useEffect, createContext, useContext, useMemo } from "react";
import { auth } from "../assets/firebase";

import React from "react";

const useAuth = () => {
  return <div>useAuth</div>;
};

export default useAuth;

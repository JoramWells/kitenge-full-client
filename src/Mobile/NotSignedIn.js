import { SearchIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
// import LoginDropdown from "./LoginDropdown";
import { Navbar } from "../components/styles";

export default function NotSignedIn() {
  return (
    <Navbar className=" shadow-md ">
      <Link to="/" className="text-gray-800 font-bold text-xl">
        Do3ens
      </Link>

      <div className=" rounded-md px-4 text-lg  flex flex-row content-center items-center space-x-2">
        <SearchIcon className="text-gray-500 h-5" />
        <Link
          to="/login"
          className=" py-0.5 px-1 rounded-md active:ring-gray-500 active:bg-black active:ring-0 active:bg-opacity-20 text-xl text-gray-800"
        >
          Login
        </Link>
      </div>
    </Navbar>
  );
}

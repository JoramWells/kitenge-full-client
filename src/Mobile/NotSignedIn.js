import React from "react";
import { Link } from "react-router-dom";
import ModalClass from "../Generic/ModalClass";
import LoginDropdown from "./LoginDropdown";

export default function NotSignedIn() {
  return (
    <nav className="bg-white w-full p-4 flex content-center  items-center shadow-lg fixed top-0 z-10">
      <div>
        <Link to="/" className="text-gray-700 font-medium text-xl">
          Kitenge
        </Link>
      </div>
      <ModalClass/>
      <div>
        <LoginDropdown />
      </div>
    </nav>
  );
}

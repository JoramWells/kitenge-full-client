import { SearchIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import LoginDropdown from "./LoginDropdown";

export default function NotSignedIn() {
  return (
    <Navbar className=" shadow-md ">
      <Link to="/" className="text-gray-800 font-bold text-xl">
        Do3ens
      </Link>
      
      <div className=" rounded-md px-4 text-lg active:ring-gray-500 active:bg-black active:ring-0 active:bg-opacity-20 flex flex-row content-center items-center space-x-2">
      <SearchIcon className="text-gray-500 h-5" />
        <Link to="/login"  className="ring-1 ring-gray-300 py-0.5 px-1 rounded-md">Login</Link>
      </div>
    </Navbar>
  );
}

const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 10;
  padding: 0.5rem;
  width: 100%;
  background-color: white;
`;

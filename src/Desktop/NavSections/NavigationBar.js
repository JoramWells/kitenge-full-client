import React, { useContext, useRef, useState } from "react";
import RightMenu from "./RightMenu";
import { message } from "antd";
import { Link, withRouter } from "react-router-dom";
import { searchItems } from "../../_actions/searchActions";
import { useDispatch } from "react-redux";
import { SearchIcon, MenuIcon } from "@heroicons/react/solid";
import { CameraIcon } from "@heroicons/react/outline";
import { Navbar } from "../../components/styles";
import Sidenav from "../sidenav/Sidenav";
import {UserContext} from '../../users/UserContext'

function NavigationBar(props, activateOption) {
  const value = useContext(UserContext)
  const searchRef = useRef();
  const [sidebar, setSidebar] = useState(true);
  const activate = () => setSidebar(!sidebar);
  const dispatch = useDispatch();
  async function handleSubmit(e) {
    e.preventDefault();
    const term = searchRef.current.value;
    dispatch(searchItems({ searchTerm: term, min_search: "1" }));
    message.info("Waaaaaaat!!!");
    props.history.push("/searched");
    // await axios.post('/andeyo',{keyword:"amazing",min_videos:1}).then(response=>{
    //   setPosts(response.data)
    //   console.log(posts)
    // }).catch(err=>console.log(err))
  }

  return (
    <>
      <Navbar className="desktop__navbar" data-testid="nav">
        <div className="p-2 flex flex-row space-x-2 items-center justify-center content-center">
          <div className="hover:cursor-pointer active:bg-black active:bg-opacity-20 hover:rounded-full p-1.5">
            <MenuIcon
              className="h-5 text-gray-700"
              onClick={activateOption ? activate : null}
            />
          </div>
          <h1 style={{marginBottom:".2rem"}}>
            <Link
              to="/"
              className=" font-extrabold text-xl"
              style={{ color: "#2F4858" }}
            >
              {value}
            </Link>
          </h1>
        </div>

        <div
          style={{ width: "30rem" }}
          className="bg-gray-200 flex flex-row items-center content-center space-x-2 rounded-full"
        >
          <div className="flex flex-row content-center items-center">
            <CameraIcon className="h-10 p-2 mr-1 text-gray-300 hover:cursor-pointer" />
          </div>
          <form className="w-full flex flex-row" onSubmit={handleSubmit}>
            <input
              placeholder="Search..."
              className=" text-sm w-full focus:outline-none bg-transparent"
              ref={searchRef}
            />

            <SearchIcon
              className="h-10 text-gray-400 p-1.5 hover:cursor-pointer"
              onClick={handleSubmit}
            />
          </form>
        </div>
        {/* <div
          style={{
            position: "fixed",
            width: "50%",
            height: "100px",
            top: "53px",
            backgroundColor: "white",
            zIndex: "4",
            left: "50%",
            right: "50%",
            transform: " translate(-50%, 0%)",
            visibility: visible,
          }}
          className="rounded-md shadow-md p-2"
        >
          <XIcon className="h-5" onClick={() => setVisible("hidden")} />
          Searchin...
        </div> */}

        <div>
          <RightMenu mode="horizontal" />
        </div>
      </Navbar>
      <Sidenav sidebar={sidebar} />
    </>
  );
}

export default withRouter(NavigationBar);

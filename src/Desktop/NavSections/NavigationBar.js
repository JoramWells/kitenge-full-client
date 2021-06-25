import React, { useRef, useState } from "react";
// import LeftMenu from "./NavSections/LeftMenu";
import RightMenu from "./RightMenu";
import { message } from "antd";
import { Link, withRouter } from "react-router-dom";
import { searchItems } from "../../_actions/searchActions";
import { useDispatch } from "react-redux";
import {
  SearchIcon,
  MenuIcon,
  CreditCardIcon,
  ClockIcon,
  ThumbUpIcon,
  DotsCircleHorizontalIcon,
  HomeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/solid";
import { CameraIcon } from "@heroicons/react/outline";
import { Navbar, Sidenav, Li } from "../../components/styles";

function NavigationBar(props, activateOption) {
  const searchRef = useRef();
  const [visible, setVisible] = useState("hidden");
  const [sidebar, setSidebar] = useState(false);
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
        <div className="p-2 flex flex-row space-x-2 items-center justify-center">
          <div className="hover:cursor-pointer active:bg-black active:bg-opacity-20 hover:rounded-full p-1.5">
            <MenuIcon
              className="h-5 text-gray-700   "
              onClick={activateOption ? activate : null}
            />
          </div>

          <Link to="/" className=" font-semibold text-xl" style={{color:"#2F4858"}}>
            Do3ensKE
          </Link>
        </div>

        <div
          style={{ width: "30rem" }}
          className="bg-gray-50 flex flex-row items-center content-center space-x-2 rounded-full"
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
      <Sidenav
        className={
          sidebar
            ? "nav-menu active flex flex-row items-center content-center"
            : "nav-menu"
        }
      >
        <ul className="leading-8 ">
          <Li>
            <HomeIcon className="h-5 ml-3 text-gray-500 mr-4" />
            <div className="hover:text-gray-700 text-gray-900 font-semibold">
              Home
            </div>
          </Li>

          <hr className="text-white p-2" />
          <Li>
            <CreditCardIcon className="h-5 ml-3  text-gray-500 mr-4" />
            <div className="hover:text-gray-700 text-gray-900 font-semibold">
              Purchases{" "}
            </div>
          </Li>
          <Li>
            <ShoppingBagIcon className="h-5 ml-3  text-gray-500 mr-4" />
            <Link
              to="/produc/manage"
              className="hover:text-gray-700 text-gray-900 font-semibold"
            >
              Your products
            </Link>
          </Li>

          <Li>
            <ClockIcon className="h-5 ml-3 text-gray-500 mr-4" />
            <div className="hover:text-gray-700 text-gray-900 font-semibold">
              Recent purchases{" "}
            </div>
          </Li>
          <hr className="text-white py-2" />
          <Li>
            <ThumbUpIcon className="h-5 ml-3  text-gray-500 mr-4" />
            <div className="hover:text-gray-700 text-gray-900 font-semibold">
              Liked Items
            </div>
          </Li>
          <Li>
            <DotsCircleHorizontalIcon className="h-5 ml-3 text-gray-500 mr-4" />
            <div className="hover:text-gray-700 text-gray-900 font-semibold">
              More Items
            </div>
          </Li>
        </ul>
      </Sidenav>
    </>
  );
}

export default withRouter(NavigationBar);

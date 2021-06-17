import React, { useState } from "react";
// import LeftMenu from "./NavSections/LeftMenu";
import RightMenu from "./RightMenu";
import { message } from "antd";
import { Link, withRouter } from "react-router-dom";
import { searchItems } from "../../_actions/searchActions";
import { useDispatch } from "react-redux";
import { SearchIcon, XIcon } from "@heroicons/react/solid";
import styled from "styled-components";

function NavigationBar(props) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  async function onSearch() {
    dispatch(searchItems({ keyword: "amazing", min_videos: "1" }));
    message.info("Waaaaaaat!!!");
    // await axios.post('/andeyo',{keyword:"amazing",min_videos:1}).then(response=>{
    //   setPosts(response.data)
    //   console.log(posts)
    // }).catch(err=>console.log(err))
    setTimeout(() => {
      props.history.push("/searched");
    }, 1000);
  }

  return (
    <Navbar className="desktop__navbar shadow-md ">
      <div className="p-2">
        <Link to="/" className="text-gray-500 font-semibold text-2xl">
          Dozens
        </Link>
        {/* <Row justify="center">
          <Col span={6}>
            <Search placeholder="Search.." onSearch={onSearch} />
          </Col>
        </Row> */}
      </div>

      <div
        style={{ width: "30rem" }}
        className="bg-gray-100 flex flex-row items-center content-center space-x-2 rounded-full"
      >
        <SearchIcon className="h-10 text-gray-400 p-1.5" />
        <input
          placeholder="Search..."
          className=" text-sm w-full focus:outline-none bg-transparent"
        />
        <XIcon className="h-10 text-gray-400 p-1.5" />
      </div>
      <div
      
        style={{
          position: "fixed",
          width: "50%",
          height: "200px",
          top: "60px",
          backgroundColor: "gray",
          zIndex: "1",
          left: "50%",
          right: "50%",
          transform: " translate(-50%, 0%)",
          visibility: "hidden",
        }}
      >
        hdsjhdsjd
      </div>

      <div>
        <RightMenu mode="horizontal" />
      </div>
    </Navbar>
  );
}

export default withRouter(NavigationBar);

const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* position: fixed; */
  width: 100%;
  top: 0%;
  z-index: 1;
  background-color: white;
  padding: 0.3rem;
`;

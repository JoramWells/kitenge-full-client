import React, { useState } from "react";
// import LeftMenu from "./NavSections/LeftMenu";
import RightMenu from "./RightMenu";
import {  message } from "antd";
import { Link, withRouter } from "react-router-dom";
import { searchItems } from "../../_actions/searchActions";
import { useDispatch } from "react-redux";


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
    <nav className="desktop__navbar flex flex-row items-center justify-between bg-white shadow-md static top-0 w-full z-10">
      <div className="p-2 m-2">
        <Link to="/" className="text-gray-700 font-extrabold text-2xl">
          <b>OnlineShop</b>
        </Link>
        {/* <Row justify="center">
          <Col span={6}>
            <Search placeholder="Search.." onSearch={onSearch} />
          </Col>
        </Row> */}
      </div>

      <div className="p-2">
        <RightMenu mode="horizontal" />
      </div>
    </nav>
  );
}

export default withRouter(NavigationBar);

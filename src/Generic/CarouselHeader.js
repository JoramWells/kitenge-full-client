import React from "react";
import { Input, Col, Row, message } from "antd";
import { searchItems } from "../_actions/searchActions";
import { useDispatch } from "react-redux";
import {withRouter} from 'react-router-dom'

const { Search } = Input;

function CarouselHeader(props) {
  const dispatch = useDispatch();

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
    <>
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#ffa010",
          marginBottom: "1rem",
          position: "sticky",
          top: "0",
          zIndex: "1",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
        }}
        className="carousel__header"
      >
        <Row justify="center">
          <Col span={6}>
            <Search placeholder="Search.." onSearch={onSearch} />
          </Col>
        </Row>
      </div>
    </>
  );
}
export default withRouter(CarouselHeader)

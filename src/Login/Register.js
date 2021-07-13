import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";
// import PhoneInput from "react-phone-input-2";
// import axios from "axios";
import { Avatar, message, Divider } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import Cookie from "js-cookie";
import { register } from "../_actions/userActions";
import { LockClosedIcon, MailIcon } from "@heroicons/react/solid";
import { UserAddIcon } from "@heroicons/react/outline";
import { Row } from "../components/styles";
import Btn from "../buttonComponent/Button";
import { Helmet } from "react-helmet";

export default function SignUp(props) {
  const userRegister = useSelector((state) => state.userRegister);
  const { loading } = userRegister;
  const CLIENT_ID =
    "266388441735-5a4sfpj0lpk8nvjkf52ppoqqul0139st.apps.googleusercontent.com";
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("wtf");
  const dispatch = useDispatch();

  const closeHandler = () => {
    history.goBack();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(register(name, email, password, avatar, phone, address));
    const userFailure = Cookie.getJSON("userFailure");
    const userSuccess = Cookie.getJSON("userInfo");

    if (userFailure) {
      message.error("email already exists");
    } else {
      message.success("Successfully registered");
    }

    // if (userSuccess) {

    //   // history.goBack();
    // }
  };
  function login() {
    props.history.push("/login");
  }

  function responseSuccess(response) {
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setAvatar(response.profileObj.imageUrl);

    // console.log(response.tokenObj);
  }
  function responseFailure(response) {
    console.log(response);
  }

  return (
    <>
      <Helmet>
        <title>Dozens Kenya - Register account, Welcome</title>
        <link rel="canonical" href="https://dozenskenya.co.ke"></link>
        <meta
          name="description"
          content="Quality goods,affordable prices, same day delivary"
        />
      </Helmet>
      <div className="form__container">Dozens Kenya</div>

      <div className="form">
        <Row>
          <Avatar src={avatar} />
          <CloseCircleOutlined
            className="close"
            style={{ fontSize: "1.5rem" }}
            onClick={closeHandler}
          />
        </Row>
        {/* <Divider> */}
          <div style={{ color: "#F4C430" }} className="text-2xl font-bold flex justify-center">
            Sign-up
          </div>
        {/* </Divider> */}
        <form onSubmit={submitHandler}>
          <div style={{ margin: "1rem 0 1rem 0" }}>
            <label className="form__label">Name</label>
            <div className="form__div ">
              <UserAddIcon className="h-5 text-gray-400 " />
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter name"
                className={"focus:outline-none  p-1 w-full bg-transparent  "}
              />
            </div>
          </div>

          <input
            name="avatar"
            id="avatar"
            type="text"
            hidden
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <div style={{ margin: "1rem 0 1rem 0" }}>
            <label className="form__label">Email Address</label>
            <div className="form__div">
              <MailIcon className="h-5 text-gray-400 " />
              <input
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter email"
                className={"focus:outline-none  p-1 w-full bg-transparent  "}
              />
            </div>
          </div>
          <div style={{ margin: "1rem 0 1rem 0" }}>
            <label className="form__label">Password</label>
            <div className="form__div">
              <LockClosedIcon className="h-5 text-gray-400 " />
              <input
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter password"
                className={"focus:outline-none  p-1 w-full bg-transparent  "}
              />
            </div>
          </div>

          <p onClick={login} style={{ color: "grey" }} className="login">
            Already have an account? Sign in
          </p>
          <div style={{margin:".9rem 0 .9rem 0", display:"flex", flexDirection:"row", justifyContent:"center"}}>
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={responseSuccess}
              onFailure={responseFailure}
              style={{ display: "block" }}
              className="link"
            />
          </div>
          <Btn
            text="Sign Up"
            buttonStyle="btn-primary-solid"
            loading={loading}
            onClick={submitHandler}
          />
        </form>
      </div>
    </>
  );
}

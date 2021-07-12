import React, { useCallback, useState } from "react";
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
  const [address, setAddress] = useState("");
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
    <div className="form">
      <Row>
        <Avatar src={avatar} style={{ margin: "0.3rem" }} />
        <CloseCircleOutlined
          className="close"
          style={{ fontSize: "1.5rem" }}
          onClick={closeHandler}
        />
      </Row>
      <Divider>
        <div style={{ color: "#F4C430" }} className="text-2xl font-bold">
          Sign up
        </div>
      </Divider>
      <form  onSubmit={submitHandler}>
        <div className="flex my-4 flex-row ring-1 ring-gray-300 p-1 items-center rounded-md text-gray-600 txt-sm cursor-pointer hover:shadow-md">
          <UserAddIcon className="h-5 text-gray-400 " />
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter name"
            className={"focus:outline-none  p-1 w-full bg-transparent  "}
          />
        </div>

        <input
          name="avatar"
          id="avatar"
          type="text"
          hidden
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <div className="flex flex-row my-4 ring-1 ring-gray-300 p-1 items-center rounded-md text-gray-600 txt-sm cursor-pointer hover:shadow-md">
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

        {/* <Form.Item required>
              <Input
                id="address"
                name="address"
                placeholder="Enter your location"
                prefix={<StopOutlined style={iconStyles} />}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={inputStyles}
              />
            </Form.Item> */}
        {/* <Form.Item label="Location" required>
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <Input
                        {...getInputProps({
                          placeholder: "Enter your location",
                        })}
                      />
                      <div>
                        {loading ? <div>Loading...</div> : null}
                        {suggestions.map((suggestion) => {
                          return (
                            <div {...getSuggestionItemProps(suggestion)}>
                              <p>{suggestion.description}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </Form.Item> */}
        {/* <Form.Item
              required
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            >
              <PhoneInput
                country={"ke"}
                preferredCountries={["ke", "ug", "tz"]}
                placeholder="254799980846"
              />
            </Form.Item> */}
        <div className="flex my-4 flex-row ring-1 ring-gray-300 p-1 items-center rounded-md text-gray-600 txt-sm cursor-pointer hover:shadow-md">
          <LockClosedIcon className="h-5 text-gray-400 " />
          <input
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter password"
            className={"focus:outline-none  p-1 w-full bg-transparent  "}
          />
        </div>

        <p onClick={login} style={{ color: "grey" }} className="login">
          Already have an account? Sign in
        </p>
        <div>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={responseSuccess}
            onFailure={responseFailure}
            style={{ display: "block" }}
            className="link"
          />
        </div>
        <Btn text="Sign Up" buttonStyle="btn-primary-solid" loading={loading} />
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import PhoneInput from "react-phone-input-2";
// import axios from "axios";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Avatar,
  Card,
  message,
} from "antd";
import {
  CloseCircleOutlined,
  LockOutlined,
  MailOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Cookie from "js-cookie";
import { register } from "../_actions/userActions";

const iconStyles={
  color:"grey",
}
const inputStyles={
  borderTop:"0",
  borderLeft:"0",
  borderRight:"0"
}

export default function SignUp() {
  const CLIENT_ID =
    "266388441735-5a4sfpj0lpk8nvjkf52ppoqqul0139st.apps.googleusercontent.com";
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [load,setLoad] = useState(false)
  const dispatch = useDispatch();

  const closeHandler = () => {
    history.goBack();
  };

  const submitHandler = async (e) => {
    setLoad(true)
    e.preventDefault();
    await dispatch(register(name, email, password, avatar, phone, address));
    const userFailure = Cookie.getJSON("userFailure");
    if (!userFailure) {
      
      console.log();
    } else {
      setLoad(false)
      message.warn(userFailure.message);
    }

    const userSuccess = Cookie.getJSON("userInfo");
    if (!userSuccess) console.log();
    else {
      setLoad(false)
      message.success("Successfully registered");
      history.goBack();
    }
  };

  function responseSuccess(response){
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setAvatar(response.profileObj.imageUrl);

    setPassword("JoramWells18.");
    // props.history.push('/')
    console.log(response.tokenObj);
    // await axios.post("/getToken", response.tokenObj.id_token);
  };
  function responseFailure(response){
    console.log(response);
    // props.history.push('/')
  };

  return (
    <>
      <Row
        justify="space-around"
        align="middle"
        style={{ marginBottom: "1rem" }}
      >
        <Card style={{ width: "25rem", marginTop: "4rem" }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Avatar src={avatar} style={{ margin: "0.3rem" }} />
            </Col>
            <Col>
              <CloseCircleOutlined
                className="close"
                style={{ fontSize: "1.5rem" }}
                onClick={closeHandler}
              />
            </Col>
          </Row>
          <Form layout="vertical" size="large" onSubmit={submitHandler}>
            <Form.Item required>
              <Input
                prefix={<UserOutlined style={iconStyles} />}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                style={inputStyles}
              />
            </Form.Item>
            <Form.Item
              hidden
              name="avatar"
              value={avatar}
              rules={[{ message: "Enter image" }]}
              onChange={(e) => setAvatar(e.target.value)}
            >
              <Input />
            </Form.Item>
            <Form.Item required>
              <Input
                prefix={<MailOutlined style={iconStyles} />}
                value={email}
                id="email"
                name="email"
                
                placeholder="jorammanoah1@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyles}
              />
            </Form.Item>

            <Form.Item required>
              <Input
                id="address"
                name="address"
                placeholder="Enter your location"
                prefix={<StopOutlined style={iconStyles} />}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={inputStyles}
              />
            </Form.Item>
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
            <Form.Item
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
            </Form.Item>

            <Form.Item >
              <Input.Password
                prefix={<LockOutlined style={iconStyles} />}
                id="password"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyles}
              />
            </Form.Item>
            <Form.Item>
              <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Sign in with Google"
                onSuccess={responseSuccess}
                onFailure={responseFailure}
                style={{ display: "block" }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                onClick={submitHandler}
                block
                loading={load}
                className="cart"
                style={{borderRadius:"5px", border:"0" }}
              >
                SIGN UP
              </Button>
            </Form.Item>

            <Row
              justify="space-around"
              align="middle"
              style={{ padding: "1rem" }}
            >
              <Col>
                <Link to="/login">Already have an account? Sign in</Link>
              </Col>
              <Col></Col>
            </Row>
          </Form>
        </Card>
      </Row>
    </>
  );
}

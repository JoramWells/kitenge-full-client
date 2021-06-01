import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../_actions/userActions";
import { Card, Row, message, Divider } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import Cookie from "js-cookie";
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/solid";
import { findByDisplayValue } from "@testing-library/dom";

export default function SignIn(props) {
  const history = useHistory();
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  function closeHandler() {
    history.goBack();
  }
  function register() {
    props.history.push("/register");
  }

  useEffect(() => {
    if (userInfo) {
      history.goBack();
    }
    return () => {};
  }, [userInfo]);

  return (
    <div>
      <div
        className="m-auto block"
        // justify="space-around"
        // align="middle"
        // style={{ marginTop: "5rem", marginBottom: "2rem" }}
      >
        <Card
          style={{
            width: "25rem",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
        >
          <Row justify="end">
            <CloseCircleOutlined
              className="close"
              style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}
              onClick={closeHandler}
            />
          </Row>
          <Divider>SIGN IN</Divider>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Email is invalid")
                .required("Email is required"),
              password: Yup.string()
                .min(6, "Password must be atleast 6 characters")
                .required("Password is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async () => {
                let dataToSubmit = {
                  email: values.email,
                  password: values.password,
                };
                await dispatch(signin(dataToSubmit));
                const userFailure = Cookie.getJSON("userFailure");

                if (!userFailure) {
                  console.log();
                } else {
                  setFormErrorMessage(userFailure.message);
                }

                const userSuccess = Cookie.getJSON("userInfo");
                if (!userSuccess) console.log();
                else {
                  message.success("Successfully login");
                  props.history.push("/");
                }

                setSubmitting(false);
              }, 500);
            }}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col space-x-4 items-place-start mx-2 mt-8">
                    {/* <div>Email Address</div> */}
                    <div className="flex flex-row bg-yellow-200 p-1 items-center rounded-full text-gray-600 txt-sm">
                      <AtSymbolIcon className="h-5 text-gray-400 " />
                      <input
                        id="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="johndoe@gmail.com"
                        className={
                          "focus:outline-none  p-2 w-full rounded-full bg-yellow-200 focus:bg-yellow-200 "
                        }
                      />
                    </div>
                    <div>
                      {errors.email && touched.email && (
                        <div className="text-red-400 m-0">{errors.email}</div>
                      )}
                    </div>
                  </div>

                  <div className="mx-2 mt-8">
                    <div className="bg-yellow-200 p-1 rounded-full flex flex-row items-center m-1">
                      <LockClosedIcon className="h-5 text-gray-400" />
                      <input
                        id="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Enter password"
                        type="password"
                        className="focus:outline-none p-2 bg-yellow-200 active:bg-yellow-200 focus-within:bg-yellow-200 w-full rounded-full"
                      />
                    </div>
                    <div>
                      {errors.password && touched.password && (
                        <div className="input-password">{errors.password}</div>
                      )}
                    </div>
                    <div>
                      {formErrorMessage && (
                        <label>
                          <p
                            style={{
                              color: "#ff0000bf",
                              fontSize: "0.7rem",
                              border: "1px solid",
                              padding: "1rem",
                              borderRadius: "10px",
                            }}
                          >
                            {formErrorMessage}
                          </p>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col m-4">
                    <p
                      onClick={register}
                      className="text-gray-500 font-medium tx-sm text-center cursor-pointer"
                    >
                      Don't have an account? Sign Up.
                    </p>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-blue-400 p-2 rounded-full  focus:outline-none text-white font-medium text-lg"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </Card>
      </div>
    </div>
  );
}

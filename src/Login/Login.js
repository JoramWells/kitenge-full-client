import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../_actions/userActions";
import { message, Divider } from "antd";
import Cookie from "js-cookie";
import { LockClosedIcon, MailIcon } from "@heroicons/react/solid";
import Btn from "../buttonComponent/Button";
import { Helmet } from "react-helmet";

export default function SignIn(props) {
  const history = useHistory();
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loadingUser, userInfo } = userSignin;

  const dispatch = useDispatch();
  function register() {
    props.history.push("/register");
  }

  useEffect(() => {
    if (userInfo) {
      history.goBack();
    }
    return () => {};
  }, [userInfo, history]);

  return (
    <>
      <Helmet>
        <title>Dozens Kenya login to your account</title>
        <link rel="canonical" href="https://dozenskenya.co.ke/login"></link>
        <meta
          name="description"
          content="Quality goods,affordable prices, same day delivary"
        />
      </Helmet>
      <div className="form__container">Dozens Kenya</div>

      <div className="form">
        <Divider>
          <div style={{ color: "#F4C430" }} className="text-2xl font-bold">
            Sign- In
          </div>
        </Divider>

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
                return null;
              } else {
                setFormErrorMessage(userFailure.message);
              }

              const userSuccess = Cookie.getJSON("userInfo");
              if (!userSuccess) return null;
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
                  <label className="form__label">Email Address</label>
                  <div className="form__div">
                    <MailIcon className="h-5 text-gray-400 " />
                    <input
                      id="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="johndoe@gmail.com"
                      className={
                        "focus:outline-none  p-1 w-full bg-transparent  "
                      }
                    />
                  </div>
                  <div>
                    {errors.email && touched.email && (
                      <div className="text-red-400 m-0">{errors.email}</div>
                    )}
                  </div>

                <div className=" mt-8">
                  <label className="form__label">Password</label>
                  <div className="form__div">
                    <LockClosedIcon className="h-5 text-gray-400" />
                    <input
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter password"
                      type="password"
                      className="focus:outline-none p-1  w-full"
                    />
                  </div>
                  <div>
                    {errors.password && touched.password && (
                      <div className="">{errors.password}</div>
                    )}
                  </div>
                  <div>
                    {formErrorMessage && (
                      <div className="text-red-400 text-sm p-1">
                        {formErrorMessage}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mt-14">
                  <p
                    onClick={register}
                    className="text-gray-500  tx-sm text-center cursor-pointer"
                  >
                    Don't have an account? Sign Up.
                  </p>
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <Btn
                    buttonStyle="btn-primary-solid"
                    text="Sign In"
                    Icon={LockClosedIcon}
                    loading={loadingUser}
                  />
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
      <footer style={{ bottom: "0", position: "fixed", width: "100%" }}>
        <div className="form__footer">
          <div className="form__item" className="form__item">
            Conditions
          </div>
          <div className="form__item">Terms of Service</div>
          <div className="form__item">Help</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div className="form__item">&copy;2020-2021</div>
          <div className="form__item">dozenskenya.co.ke,Inc</div>
        </div>
      </footer>
    </>
  );
}

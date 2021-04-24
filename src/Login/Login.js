import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../_actions/userActions";
import { Form, Input, Button, Card, Row, Col, message } from "antd";
import {
  CloseCircleOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";

const Cookie = require("js-cookie");

export default function SignIn() {
  const history = useHistory();
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const closeHandler = () => {
    history.goBack();
  };

  useEffect(() => {
    if (userInfo) {
      history.goBack();
    }
    return () => {};
  }, [userInfo]);

  return (
    <Row justify="space-around" align="middle" style={{ marginTop: "5rem", marginBottom:"2rem" }}>
      <Card style={{ width: "25rem" }}>
        <Row justify="end">
          <Col>
            <CloseCircleOutlined
              className="close"
              style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
              onClick={closeHandler}
            />
          </Col>
        </Row>

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
                history.goBack();
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
              <Form onSubmit={handleSubmit} layout="vertical" size="large">
                <Form.Item required>
                  <Input
                    prefix={<MailOutlined />}
                    id="email"
                    placeholder="Enter email addrress"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={
                      errors.email && touched.email
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                </Form.Item>

                <Form.Item required>
                  <Input.Password
                    id="password"
                    prefix={<LockOutlined />}
                    placeholder="Enter password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={
                      errors.password && touched.password
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.password && touched.password && (
                    <div className="input-password">{errors.password}</div>
                  )}
                </Form.Item>
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
                      {formErrorMessage}{" "}
                    </p>{" "}
                  </label>
                )}

                <Form.Item>
                  <Row>
                    <Col>
                      <Button type="link">
                        <Link to="/register">
                          Don't have an account? Sign Up
                        </Link>
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item>
                  <Button
                    className="cart"
                    htmlType="submit"
                    type="primary"
                    onClick={handleSubmit}
                    loading={isSubmitting}
                    // disabled={!phone}
                    block
                    style={{ border: "none" }}
                  >
                    LOGIN!
                  </Button>
                </Form.Item>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </Row>
  );
}

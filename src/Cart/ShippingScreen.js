import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, message, Space, Table, Image } from "antd";
import { confirmPayment, makePayment } from "../_actions/paymentActions";
import NumberFormat from "react-number-format";

const columns = [
  {
    title: "Product",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "image",
    dataIndex: "image",
    key: "image",
    render: (img) => (
      <Image
        src={img}
        alt="image file"
        style={{ width: "50px", height: "50px", objectFit: "contain" }}
      />
    ),
  },
  {
    title: "qty",
    dataIndex: "qty",
    key: "qty",
  },

  {
    title: "price",
    dataIndex: "price",
    key: "price",
  },
];

const Cookie = require("js-cookie");

export default function ShippingScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const paymentDetail = useSelector((state) => state.payment);
  let qt = "";
  const [payment, setPayment] = useState([]);
  const { loading, paymentDetails, error } = paymentDetail;
  const confirmDetails = useSelector((state) => state.confirmDetails);
  const { loadingDetails, confirmPaymentDetails, errorDetails } =
    confirmDetails;

  const payDetail = Cookie.getJSON("paymentDetails");
  // const {} = confirmPayment;
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  function confirmPay() {
    {
      loading
        ? message.info("loading...")
        : error
        ? message.warn("error")
        : // await dispatch(confirmPayment(paymentDetails.CheckoutrequestID))
          console.log("pays " + paymentDetails);
    }
  }
  // console.log(payment)
  async function paymentHandler(e) {
    e.preventDefault();
    await dispatch(makePayment("+254799980846", 1));
    //  setTimeout( ()=>{
    //    dispatch(confirmPayment(paymentDetails.CheckoutRequestID))

    // },2000)
  }
  // if(!payDetail){
  // }else{
  //   setTimeout( async()=>{
  //     await dispatch(confirmPayment(paymentDetails.CheckoutrequestID))

  //   },1000)

  //   message.success('Finished..')

  // }
  useEffect(() => {
    confirmPay();

    console.log(payDetail);
    return () => {};
  }, []);

  // if (payDetail) {
  //   message.info(payDetail.ResponseDescription);
  //   setTimeout(() => {
  //      dispatch(confirmPay(payDetail.CheckoutRequestID));
  //   }, 2000);
  // }
  // const confirmPaid = Cookie.getJSON("confirmPaid");
  // if(confirmPaid){

  // }

  return (
    <>
      <div
        className="flex flex-row justify-around"
        style={{ paddingTop: "5rem", height: "100%" }}
      >
        <div>
          <Table columns={columns} dataSource={cartItems} />
        </div>
        <div className="bg-white p-4 shadow-md" style={{ width: "25rem" }}>
          <div className="text-gray-700 text-lg font-semibold flex flex-row space-x-8">
            <p>Name :{" "} </p>
            <p>{userInfo.name} </p>
            
          </div>
          <div className="text-gray-500 font-semibold flex flex-row space-x-8">
            <p>Email :</p>
            <p>{userInfo.email}</p>
            </div>
          <div className="text-gray-500 flex flex-row space-x-4">
            <p>Phon No. </p>
            <p>{userInfo.phone}</p>
            </div>
          <div className="text-gray-500 text-xs flex flex-row space-x-2">
            <p>Location: </p>
            <p>{userInfo.address}</p>
            </div>

          <div className="flex flex-row space-x-2">
            <p className="text-gray-500">Total items: </p>
            <div>
            {cartItems.reduce((a, c) => a + c.qty, 0)}
            </div>
             </div>
          <div className="flex flex-row space-x-2">
            <p className="text-gray-500">Total amount:</p>
            <NumberFormat
              value={(qt = cartItems.reduce((a, c) => a + c.price * c.qty, 0))}
              thousandSeparator={true}
              displayType={"text"}
              prefix="Kshs: "
              suffix=" /="
              className="text-red-400 font-semibold"
            />
          </div>
          <div>
            <button
              onClick={paymentHandler}
              className="p-1 rounded-md"
              style={{
                backgroundColor: "#47817F",
                border: "0",
                display: "block",
              }}
            >
              BUY NOW!!
            </button>
          </div>
        </div>
      </div>
      <Row>
        {loading ? (
          <>{message.info("loading..")}</>
        ) : error ? (
          <> {message.warn(error)} </>
        ) : (
          <div>
            {!paymentDetails ? (
              <div></div>
            ) : (
              <Space>
                <Button
                  onClick={() => confirmPay(paymentDetails.CheckoutRequestID)}
                  size="large"
                  type="primary"
                  block
                  style={{ margin: "2rem" }}
                >
                  Please Confirm
                </Button>
                <>
                  {loadingDetails ? (
                    <div>Loading...</div>
                  ) : errorDetails ? (
                    <div>{message.warn(errorDetails)}</div>
                  ) : (
                    <div>
                      {!confirmPaymentDetails ? (
                        <div></div>
                      ) : (
                        <Col>
                          {message.info(confirmPaymentDetails.ResultDesc)}
                        </Col>
                      )}
                    </div>
                  )}
                </>
              </Space>
            )}
          </div>
        )}
      </Row>
    </>
  );
}

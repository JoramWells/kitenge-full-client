import { MailIcon, UserAddIcon } from "@heroicons/react/solid";
import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "../_actions/userActions";
import Btn from "../buttonComponent/Button";

export default function AccountSettings(props) {
  const userID = props.match.params.id;
  const usernameRef = createRef()
  const UserUpdate = useSelector((state) => state.userUpdate);
  const UserDetails = useSelector((state) => state.listUser);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { loading, user, error } = UserDetails;
  const { loadingUser, userInfo } = UserUpdate;
  const dispatch = useDispatch();
  const userEdit = (e) => {
    e.preventDefault();
    dispatch(updateUser(userID, username, emailAddress, password, phone, address));
  };
  useEffect(() => {
    dispatch(detailsUser(userID));
    // setUsername(user.username)
    return () => {};
  }, []);

  return (
    <div className="account__settings">
      <div className="form">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <form onSubmit={userEdit}>
            <div>
              <img
                src={user ? user.avatar : null}
                style={{ width: "20px", height: "20px", borderRadius: "50px" }}
                alt="logo"
              />
            </div>
            {/* <input
                  name="name"
                  id="name"
                  className="focus:outline-none "
                  placeholder="Item name"
                  value={user.name}
                  onChange={(e) => setUsername(e.target.value)}
                /> */}
            <div className="flex my-4 flex-row ring-1 ring-gray-300 p-1 items-center rounded-md text-gray-600 txt-sm cursor-pointer hover:shadow-md">

              <UserAddIcon className="h-5 text-gray-400 " />
              <input
                 name="name"
                 id="name"
                 className="focus:outline-none "
                 placeholder="Item name"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-row my-4 ring-1 ring-gray-300 p-1 items-center rounded-md text-gray-600 txt-sm cursor-pointer hover:shadow-md">
              <MailIcon className="h-5 text-gray-400 " />
              <input
                  name="email"
                  id="email"
                  className="focus:outline-none "
                  placeholder="Email Address"
                  value={user.email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-row my-4 ring-1 ring-gray-300 p-1 items-center rounded-md text-gray-600 txt-sm cursor-pointer hover:shadow-md">
              <MailIcon className="h-5 text-gray-400 " />
              <input
                id="phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={user.phone}
                placeholder="Phone"
                className={"focus:outline-none  p-1 w-full bg-transparent  "}
              />
            </div>
            <div className="flex flex-row my-4 ring-1 ring-gray-300 p-1 items-center rounded-md text-gray-600 txt-sm cursor-pointer hover:shadow-md">
              <MailIcon className="h-5 text-gray-400 " />
              <input
                id="address"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                value={user.address}
                placeholder="Address"
                className={"focus:outline-none  p-1 w-full bg-transparent  "}
              />
            </div>
            <Btn
              text="Save"
              buttonStyle="btn-primary-solid"
              loading={loadingUser}
              onClick={(e)=>userEdit(e)}
            />
          </form>
        )}
      </div>
    </div>
  );
}

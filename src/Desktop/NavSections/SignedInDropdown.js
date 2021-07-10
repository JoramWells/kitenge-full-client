import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  CogIcon,
  LoginIcon,
  StopIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";

export default function LoginDropdown({ avatar, userId }) {
  return (
    <div className="w-56 text-right ">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center text-sm font-medium text-white bg-black rounded-full bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <img
              src={avatar}
              alt="logo"
              loading="lazy"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50px",
              }}
            />
            {/* <UserCircleIcon className="w-5 h-5  hover:text-yellow-100" /> */}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <LoginIcon
                        className="w-5 h-5 mr-2 text-gray-700"
                        aria-hidden="true"
                      />
                    ) : (
                      <LoginIcon
                        className="w-5 h-5 mr-2 text-gray-700"
                        aria-hidden="true"
                      />
                    )}
                    <Link to="/login">Login</Link>
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <CogIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    <Link to={`/settings/${userId}`}>
                      Settings
                    </Link>
                    
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <StopIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    ) : (
                      <StopIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    )}
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

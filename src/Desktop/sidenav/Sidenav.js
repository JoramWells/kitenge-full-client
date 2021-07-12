import { ClockIcon, CreditCardIcon, DotsCircleHorizontalIcon, HomeIcon, ShoppingBagIcon, ThumbUpIcon, XIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { Sidenav, Li } from "../../components/styles";

export default function SideNav({sidebar}) {


  return (
    <Sidenav
      className={
        sidebar
          ? "nav-menu active flex flex-row  content-center"
          : "nav-menu"
      }
    >

        
      <ul className="leading-8 ">
         <Li>
          <HomeIcon className="h-5 ml-3 text-gray-500 mr-4" />
          <div className="hover:text-gray-700 text-gray-900 font-semibold">
            Home
          </div>
        </Li>
        <Li>
          <HomeIcon className="h-5 ml-3 text-gray-500 mr-4" />
          <div className="hover:text-gray-700 text-gray-900 font-semibold">
            Coupons
          </div>
        </Li>

        <hr className="text-white p-2" />
        <Li>
          <CreditCardIcon className="h-5 ml-3  text-gray-500 mr-4" />
          <div className="hover:text-gray-700 text-gray-900 font-semibold">
            Purchases{" "}
          </div>
        </Li>
        <Li>
          <ShoppingBagIcon className="h-5 ml-3  text-gray-500 mr-4" />
          <Link
            to="/produc/manage"
            className="hover:text-gray-700 text-gray-900 font-semibold"
          >
            Your products
          </Link>
        </Li>

        <Li>
          <ClockIcon className="h-5 ml-3 text-gray-500 mr-4" />
          <div className="hover:text-gray-700 text-gray-900 font-semibold">
            Recent purchases{" "}
          </div>
        </Li>
        <hr className="text-white py-2" />
        <Li>
          <ThumbUpIcon className="h-5 ml-3  text-gray-500 mr-4" />
          <div className="hover:text-gray-700 text-gray-900 font-semibold">
            Liked Items
          </div>
        </Li>
        <Li>
          <DotsCircleHorizontalIcon className="h-5 ml-3 text-gray-500 mr-4" />
          <div className="hover:text-gray-700 text-gray-900 font-semibold">
            More Items
          </div>
        </Li>
      </ul>
    </Sidenav>
  );
}

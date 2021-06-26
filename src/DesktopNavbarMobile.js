import React from "react";
import NavigationBar from "./Desktop/NavSections/NavigationBar";
import NavMobile from "./Mobile/NavMobile";
import { UserProvider } from "./users/UserContext";

export default function DesktopNavbarMobile() {
  return (
    <>
      <UserProvider>
        <div className="mobile__navbar">
          <NavMobile />
        </div>
        <div className="desktop__navbar" style={{position:"sticky", top:"0"}}>
          <NavigationBar activateOption />
        </div>
      </UserProvider>
    </>
  );
}

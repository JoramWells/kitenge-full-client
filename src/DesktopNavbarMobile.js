import React from "react";
import NavigationBar from "./Desktop/NavSections/NavigationBar"
import NavMobile from "./Mobile/NavMobile"


export default function DesktopNavbarMobile() {
  return (
    <>
      <div className="mobile__navbar">
        <NavMobile />
      </div>
      <div className="desktop__navbar">
        <NavigationBar activateOption />
      </div>
    </>
  );
}

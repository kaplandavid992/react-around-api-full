import aroundUsLogo from "../images/logoAroundUS.svg";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import HeaderLinks from "./HeaderLinks";
import HeaderMobileExpanded from "./HeaderMobileExpanded";

function Header({loggedIn,email,logOut}) {

  const headerLink = {email:'',path:'',text:''};
  const location = useLocation();
  const [expandedIsHidden, setExpandedIsHidden] = useState(true);

  const handleExpand = () => {
    setExpandedIsHidden(false);
  };

  const handleCollapse = () => {
    setExpandedIsHidden(true);
  };

  if (loggedIn && location.pathname === "/") {
    headerLink.text = "Log out";
    headerLink.path = "/signin";
    headerLink.email = email;
  } else if (location.pathname === "/signup") {
    headerLink.text = "Log in";
    headerLink.path = "/signin";
  } else if (location.pathname === "/signin") {
    headerLink.text = "Sign up";
    headerLink.path = "/signup";
  }

  return (
    <>
      <HeaderMobileExpanded
        logOut={logOut}
        headerLink={headerLink}
        handleCollapse={handleCollapse}
        expandedIsHidden={expandedIsHidden}
      />
      <div className="header">
        <img
          src={aroundUsLogo}
          alt="around the us logo"
          className={"header__title-logo"}
        />
        {loggedIn && (
          <HamburgerMenu
            expandedIsHidden={expandedIsHidden}
            handleExpand={handleExpand}
            handleCollapse={handleCollapse}
          />
        )}
        <HeaderLinks
          headerLink={headerLink}
          logOut={logOut}
          loggedIn={loggedIn}
        />
      </div>
    </>
  );
}

export default Header;

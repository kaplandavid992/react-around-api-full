import hamMen from "../images/hamMen.png";
import exitIcon from "../images/exit_icon.png";
import React from 'react';

export default function HamburgerMenu({expandedIsHidden, handleExpand, handleCollapse}) {
  
  return (
    <div className={`header__hamburger ${expandedIsHidden}`}>
      {expandedIsHidden ? (
        <>
          <img
            className="header__hamburger-icon"
            src={hamMen}
            alt="hamburger dropdown menu"
            onClick={handleExpand}
          />
          <img
            className="header__hamburger-icon"
            src={hamMen}
            alt="hamburger dropdown menu"
            onClick={handleExpand}
          />
          <img
            className="header__hamburger-icon"
            src={hamMen}
            alt="hamburger dropdown menu"
            onClick={handleExpand}
          />
        </>
      ) : (
        <img className="header__hamburger-icon" src={exitIcon} alt="collapse" onClick={handleCollapse} />
      )}
    </div>
  );
}

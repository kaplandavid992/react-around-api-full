import { Link } from "react-router-dom";
import React from 'react';

export default function HeaderLinks({headerLink,logOut,loggedIn}) {
  const email = headerLink.email;
  const path = headerLink.path;
  const text = headerLink.text;
  
  const hideLinksWrap = loggedIn ? "header__links-wrap_hidden" : "";
  return (
    <div className={`header__links-wrap ${hideLinksWrap}`}>
      <a className="header__link header__link_email " href={"mailto:" + email}>
        {email}
      </a>
      <Link className="header__link" onClick={logOut} to={path}>
        {text}
      </Link>
    </div>
  );
}

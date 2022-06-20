import React from 'react';

function HeaderMobileExpanded({
  headerLink,
  logOut,
  expandedIsHidden,
  handleCollapse,
}) {
  const email = headerLink.email;
  const path = headerLink.path;
  const text = headerLink.text;
  const expandedIsHiddenClass = expandedIsHidden
    ? "header__expanded_hidden"
    : "";

  return (
    <div
      className={`header__expanded  ${expandedIsHiddenClass}`}
      onClick={handleCollapse}
    >
      <a className="header__expanded-email" href={"mailto:" + email}>
        {email}
      </a>
      <a className="header__expanded-link" href={path} onClick={logOut}>
        {text}
      </a>
    </div>
  );
}

export default HeaderMobileExpanded;

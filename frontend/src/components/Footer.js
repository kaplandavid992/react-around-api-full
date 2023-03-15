import React from "react";

function Footer() {
  return (
    <div className="footer">
      <p className="footer__text">© {new Date().getFullYear()} David Kaplan</p>
    </div>
  );
}

export default Footer;

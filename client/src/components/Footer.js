import React from "react";

const Footer = function Footer() {
  return (
    <footer className="p-4 mt-5 text-center text-white bg-dark">
      Copyright &copy; {new Date().getFullYear()} Dev Connector
    </footer>
  );
};

export default Footer;

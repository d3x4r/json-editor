import React from "react";
import { PageHeader } from "antd";
import "./Header.css";

const Header: React.FC = () => (
  <PageHeader
    className="header"
    title="Page Header"
    subTitle="Header subtitle"
  />
);

export default Header;

import React,{useState} from "react";
import Header from "../Header/Index";
import "./css/styles.css";
import Table from "./Table";
import { Col, Row } from "antd";
import { Menu } from 'antd';

const { SubMenu } = Menu;
const Index = (props) => {
  const [message, setMessage] = useState([]);
  const callback = (a) => {
    setMessage(a);
  };
  console.log(message);
  return (   
        <Table />
  );
};

export default Index;

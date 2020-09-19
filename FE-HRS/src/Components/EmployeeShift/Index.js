import React,{useState} from "react";
import Header from "../Header/Index";
import "./css/styles.css";
import Table from "./Table";
import { Col, Row } from "antd";
import { Menu } from 'antd';
import HeaderTop from '../Header/Header';
import MenuBar from '../Header/Index';
const { SubMenu } = Menu;
const Index = (props) => {
  const [message, setMessage] = useState([]);
  const callback = (a) => {
    setMessage(a);
  };
  console.log(message);
  return (
    <div className="row">
      <div className="col-xl-2"><MenuBar e={5} message={message}/></div>
      <div className="col-xl-10">
        <HeaderTop test={callback}/>
        <Table />
      </div>
    </div>
  );
};

export default Index;

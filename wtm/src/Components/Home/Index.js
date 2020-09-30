import React,{useEffect,useState} from "react";
import { Result, Button, Row, Col, Switch } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import HeaderTop from '../Header/Header';
import MenuBar from '../Header/Index';
import Header from '../Header/Index';
import { history } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
const Index = (props) => {
  const [id,setId]=useState("");
  useEffect(()=>{
    setId(localStorage.getItem("id"))
  })
  if(localStorage.getItem('id')===null){
    window.location.href='/login';
  }
  const onLogout=()=>{
    localStorage.removeItem('id');
    window.location.href='/login';
}
  return (
    <Result
      status="403"
      title="Welcome to HR System"
      subTitle="Customize your HR System"
      style={{ marginTop: 100 }}
      extra={
        <Button translate="yes" type="primary" onClick={onLogout}>Log out</Button>
      }
    />)

};

export default Index;

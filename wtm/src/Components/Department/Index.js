import React, { useState,useEffect } from 'react';
import HeaderTop from '../Header/Header';
import MenuBar from '../Header/Index';
import Table from './Table';
const Index = (props) => {
    const [id,setId]=useState("");
  useEffect(()=>{
    setId(localStorage.getItem("id"))
  })
  if(id===null){
    window.location.href='/login';
  }
    return (
         <Table />
    );
}

export default Index;
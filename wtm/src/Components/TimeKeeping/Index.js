import React,{useEffect,useState} from 'react';
import Table from './Table';
const  Index=(props)=>{
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
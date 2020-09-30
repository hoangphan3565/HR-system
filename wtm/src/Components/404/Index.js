import React,{useEffect,useState} from 'react';
import { Result, Button } from 'antd';
const Index = (props) => {
    const [id,setId]=useState("");
    useEffect(()=>{
      setId(localStorage.getItem("id"))
    })
    if(id===null){
      window.location.href='/login';
    }
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary">Back Home</Button>}
            style={{marginTop:100}}
        />
    );
}

export default Index;
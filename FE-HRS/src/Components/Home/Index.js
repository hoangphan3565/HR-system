import React from "react";
import { Result, Button,Row,Col } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import HeaderTop from '../Header/Header';
import MenuBar from '../Header/Index';
import Header from '../Header/Index';
const Index = (props) => {
  return (
    <div>

      <div className="row">
            <div className="col-xl-2"><MenuBar e={4}/></div>
            <div className="col-xl-10">
                <HeaderTop />
                <Result
                status="403"
                title="Welcome to HR System"
                subTitle="Customize your HR System"
                style={{marginTop:100}}
                extra={
                  <Button translate="yes" type="primary">Log out</Button>
                }
            />
            </div>
        </div>
    </div>
  );
};

export default Index;

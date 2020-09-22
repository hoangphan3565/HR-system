import React, { useState, useEffect } from "react";
import { Menu, Switch, Badge, Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import "./css/styles.css";
import Media from "react-media";
import {
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
  LogoutOutlined,
  BulbOutlined,
  TeamOutlined,
  ApartmentOutlined,
  AuditOutlined,
  SolutionOutlined,
  SplitCellsOutlined,
  ContactsOutlined,
  NotificationOutlined, BellOutlined,
  AlignLeftOutlined
} from "@ant-design/icons";
const MenuBar = (props) => {
  const [size, setSize] = useState(316.5);
  const { SubMenu } = Menu;
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [pos,setPos]=useState(localStorage.getItem("pos"));
  const [marginLeft,setMarginLeft]=useState(localStorage.getItem("marginLeft"));
  const changeTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");

  };
  localStorage.setItem("theme", theme);
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    collapsed === false ? setCollapsed(true) : setCollapsed(false);
    size === 316.5 ? setSize(80) : setSize(316.5);
    pos==="relative"?setPos("absolute"):setPos("relative");
  }
  localStorage.setItem("pos",pos);


  return (
    <div>
      <Media
        query="(max-width: 599px)"
        render={() => (
          <Menu mode="horizontal">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/home">Home</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Infomations">
              <Menu.Item key="3" >
                <Link to="/employee" style={{ color: "blue" }}>Employees</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<ApartmentOutlined />}>
                <Link to="/department" style={{ color: "blue" }}>Departments</Link>
              </Menu.Item>
              <Menu.Item key="5"><Link to="/empshift" style={{ color: "blue" }}>Working Shift Management</Link>
              </Menu.Item>
              <Menu.Item key="6"><Link to="/position" style={{ color: "blue" }}>Positions</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<CalendarOutlined />} title="Date">
              <Menu.Item key="7"><Link to="/holidays" style={{ color: "blue" }}>Holidays</Link></Menu.Item>
              <Menu.Item key="8">Leave</Menu.Item>
              <Menu.Item key="9">Attandance</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<SettingOutlined />} title="Settings">

            </SubMenu>
          </Menu>
        )}
      />

      <Media
        query="(min-width: 599px)"
        render={() => (
          <div>
            <div className="intro">
              <div id="cs">
                <Button icon={<AlignLeftOutlined />} shape="circle-outline" onClick={toggle}></Button>
              </div>
              <div id="as">
                <Badge count={99}>
                  <Avatar id="as" icon={<BellOutlined />} size="small" />
                </Badge>
              </div>
              <div id="bs">
                <Badge count={1}>
                  <Avatar id="as" icon={<NotificationOutlined />} size="small" />
                </Badge>
              </div>
            </div>
            <Menu
              defaultSelectedKeys={[`${props.e}`]}
              defaultOpenKeys={["sub1", "sub2", "sub3"]}
              mode="inline"
              theme={theme}
              id="bannerleft"
              inlineCollapsed={collapsed}
             style={{backgroundColor:theme==="light"?"aliceblue":"#1f1f1f",width:size}}
            >
              <Menu.Item key="1" id="home" icon={<HomeOutlined />}>
                <Link to="/home" id="home">Home</Link>
              </Menu.Item>
              <SubMenu key="sub2" icon={<CalendarOutlined />} title="Date">
                <Menu.Item key="7" icon={<CalendarOutlined />}><Link to="/holidays" >Holidays</Link></Menu.Item>
                <Menu.Item key="10" icon={<CalendarOutlined />}><Link to="/timekeepings" >TimeKeeping</Link></Menu.Item>
                <Menu.Item key="8" icon={<SplitCellsOutlined />} >Leave</Menu.Item>
                <Menu.Item key="9" icon={<ContactsOutlined />}>Attandance</Menu.Item>
              </SubMenu>
              <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Infomations">
                <Menu.Item key="3" icon={<TeamOutlined />}>
                  <Link to="/employee">Employees</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<ApartmentOutlined />}><Link to="/department" >Departments</Link></Menu.Item>
                <Menu.Item key="5" icon={<AuditOutlined />}><Link to="/empshift" >Working Shift Management</Link></Menu.Item>
                <Menu.Item key="6" icon={<SolutionOutlined />}><Link to="/position" >Positions</Link></Menu.Item>
              </SubMenu>          
              <SubMenu key="sub3" icon={<SettingOutlined />} title="Settings">
                <Menu.Item icon={<BulbOutlined />}>
                  <Switch
                    checked={theme === 'light'}
                    onChange={changeTheme}
                    checkedChildren="Light"
                    unCheckedChildren="Dark"
                  ></Switch>
                </Menu.Item>
                <Menu.Item icon={<LogoutOutlined />}>
                  <Link>Log Out</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>

        )}
      />
    </div>
  );
};

export default MenuBar;

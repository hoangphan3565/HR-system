import React from 'react';
import { Calendar, Badge, Popconfirm, Button, message, Modal } from 'antd';
import { useState } from 'react';
import moment from 'moment';
const CLD = (props) => {
  const getListData=(value)=>{
    let listData;
    switch (value.date()) {
      case moment('Apr 1', 'MMM DD'):
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  const onSelect = (value) => {
    console.log(value);
  };
  const [test, setTest] = useState("");
  const [test1, setTest1] = useState(false);
  return (
    <div className="container">
      <Calendar dateCellRender={dateCellRender}  onSelect={onSelect} />
    </div>

  );
}

export default CLD;
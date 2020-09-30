import React from 'react';
import {Divider, Button} from 'antd';
import {TagTwoTone} from '@ant-design/icons'
import UserActivityService from '../../Services/UserActivityService';
function Item(props) {
    const Check=()=>{
        UserActivityService.del(props.e.ura_ID,1).then(res=>{

        });
    }
    return (
        <div onClick={Check} className="check">
            <TagTwoTone />
            <p style={{fontSize:12,color:"black"}}>{props.e.activityName}</p>
            <p style={{fontSize:10,float:"right"}}>{props.e.datetime}</p>
            <Divider></Divider>
        </div>
    );
}

export default Item;
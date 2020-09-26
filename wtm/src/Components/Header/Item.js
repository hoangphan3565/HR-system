import React from 'react';
import {Divider, Button} from 'antd';
import UserActivityService from '../../Services/UserActivityService';
function Item(props) {
    const Check=()=>{
        UserActivityService.del(props.e.ura_ID,1).then(res=>{

        });
    }
    return (
        <div onClick={Check} className="check">
            <p style={{fontSize:12}}>{props.e.activityName}</p>
            <p style={{fontSize:10,float:"right"}}>{props.e.deleleDate}</p>
            <Divider></Divider>
        </div>
    );
}

export default Item;
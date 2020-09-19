import React from 'react';
import MenuBar from '../Header/Index';
import HeaderTop from '../Header/Header';
import Calendar from './CLD';
import './css/styles.css';
const Index=(props)=>{
    return (
        <div className="row">
        <div className="col-xl-2"><MenuBar e={7}/></div>
        <div className="col-xl-10">
            <HeaderTop/>
            <Calendar />
        </div>
    </div>
    );
}

export default Index;
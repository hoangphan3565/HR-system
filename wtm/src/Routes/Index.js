import React from "react";
import EmployeeShift from '../Components/EmployeeShift/Index';
import Employee from '../Components/Employee/Index';
import Home from '../Components/Home/Index';
import Department from '../Components/Department/Index';
import Position from '../Components/Positions/Index';
import Holidays from '../Components/Holidays/Index';
import Timekeepings from '../Components/TimeKeeping/Index';
import Error from '../Components/404/Index';
import DailyShift from '../Components/DailyShift/Index';
import Shift from '../Components/Shifts/Index';
import DailySchedule from '../Components/DailySchedules/Index';
const routes = [
    {
        path: "/empshift",
        exact: true,
        main: () => <EmployeeShift />
    },
    {
        path: "/employee",
        exact: true,
        main: () => <Employee />
    },
    {
        path: "/home",
        exact: true,
        main: () => <Home />
    },
    {
        path: "/department",
        exact: true,
        main: () => <Department />
    },
    {
        path: "/position",
        exact: true,
        main: () => <Position />
    }
    ,
    {
        path: "/holidays",
        exact: true,
        main: () => <Holidays />
    },
    {
        path: "/holidays",
        exact: true,
        main: () => <Holidays />
    }, {
        path: "/timekeepings",
        exact: true,
        main: () => <Timekeepings />
    },
    {
        path: "/dailyshifts",
        exact: true,
        main: () => <DailyShift  />
    },
    {
        path: "/dailyschedules",
        exact: true,
        main: () => <DailySchedule />
    },
    {
        path: "/shifts",
        exact: true,
        main: () => <Shift  />
    },
    {
        path: "*",
        main: () => <Error />
    }

];
export default routes;

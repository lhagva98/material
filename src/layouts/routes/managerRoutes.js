import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
//import ApartmentIcon from '@material-ui/icons/Apartment';
import BusinessIcon from '@material-ui/icons/Business';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Dashboard from "@material-ui/icons/Dashboard";

import EmployeePage from 'views/EmployeePage';
import PlanPage from 'views/PlanPage-manager';
import AssignmentPage from 'views/AssignmentPage';


const routes = [
    {
        path: "/employee",
        name: "Ажилчид",
        icon: GroupIcon,
        component: EmployeePage,
        layout: "/manager"
    },
    {
        path: "/plan",
        name: "Төлөвлөгөө",
        icon: AssignmentIcon,
        component: PlanPage,
        layout: "/manager"
    },
    {
        path: "/assignment",
        name: "Ажлууд",
        icon: ListAltIcon,
        component: AssignmentPage,
        layout: "/manager"
    },
]

export default routes;
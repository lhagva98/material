import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
//import ApartmentIcon from '@material-ui/icons/Apartment';
import BusinessIcon from '@material-ui/icons/Business';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Dashboard from "@material-ui/icons/Dashboard";

import DashboardPage from 'views/DashboardPage';
import CompanyPage from 'views/CompanyPage';
import DepartmentPage from 'views/DepartmentPage';
import EmployeePage from 'views/EmployeePage';
import PlanPage from 'views/PlanPage';
import AssignmentPage from 'views/AssignmentPage-employee';

const routes = [
    {
        path: "/assignment",
        name: "Миний ажлууд",
        icon: ListAltIcon,
        component: AssignmentPage,
        layout: "/employee"
    },
]

export default routes;
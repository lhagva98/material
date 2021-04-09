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
import AssignmentPage from 'views/AssignmentPage';

const routes = [
    // {
    //     path: "/dashboard",
    //     name: "Үзүүлэлт",
    //     icon: Dashboard,
    //     component: DashboardPage,
    //     layout: "/home"
    // },
    // {
    //     path: "/company",
    //     name: "Төслүүд",
    //     icon: BusinessIcon,
    //     component: CompanyPage,
    //     layout: "/home"
    // },
    {
        path: "/project",
        name: "Төсөл",
        icon: BusinessIcon,
        component: DepartmentPage,
        layout: "/home",
        exact: true
    },
    // {
    //     path: "/employee",
    //     name: "Ажилчид",
    //     icon: GroupIcon,
    //     component: EmployeePage,
    //     layout: "/home"
    // },
    // {
    //     path: "/plan",
    //     name: "Төлөвлөгөө",
    //     icon: AssignmentIcon,
    //     component: PlanPage,
    //     layout: "/home"
    // },
    // {
    //     path: "/assignment",
    //     name: "Ажлууд",
    //     icon: ListAltIcon,
    //     component: AssignmentPage,
    //     layout: "/home"
    // },
]

export default routes;
import BusinessIcon from '@material-ui/icons/Business';
import DepartmentPage from 'views/DepartmentPage';

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
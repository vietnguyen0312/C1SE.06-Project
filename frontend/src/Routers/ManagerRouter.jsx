import MainLayout from "../Layout/PrivateLayout/MainLayout";
import ProtectedRoute from "./ProtectedRouter";
import Dashboard from "../Layout/PrivateLayout/Dashboard";
import Profile from "../Layout/PrivateLayout/Profile";
import Bookings from "../Layout/PrivateLayout/Bookings";
import Rooms from "../Layout/PrivateLayout/Rooms";
import Employee from "../Layout/PrivateLayout/EmployeeAndCustomerList/Employee";
import Customer from "../Layout/PrivateLayout/EmployeeAndCustomerList/Customer";
import Service from "../Layout/PrivateLayout/EmployeeAndCustomerList/Service";
const ManagerRouter = [
    {
        // element: <ProtectedRoute role='MANAGER' />,
        children: [
            {
                path: "/manager",
                element: <MainLayout />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                    {
                        path: "bookings",
                        element: <Bookings />,
                    },
                    {
                        path: "rooms",
                        element: <Rooms />,
                    },
                    {
                        path: "employee",
                        element: <Employee />,
                    },
                    {
                        path: "customer",
                        element: <Customer />,
                    },
                    {
                        path: "service",
                        element: <Service />,
                    },
                ],
            }
        ]
    }
];

export default ManagerRouter;
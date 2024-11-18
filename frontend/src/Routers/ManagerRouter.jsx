import MainLayout from "../Layout/PrivateLayout/MainLayout";
import ProtectedRoute from "./ProtectedRouter";
import Dashboard from "../Layout/PrivateLayout/Dashboard";
import Profile from "../Layout/PrivateLayout/Profile";
import Bookings from "../Layout/PrivateLayout/Bookings";
import Rooms from "../Layout/PrivateLayout/Rooms";
import EmployeeAndCustomerList from "../Layout/PrivateLayout/EmployeeAndCustomerList/EmployeeAndCustomerList";
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
                        path: "employee-customer-list",
                        element: <EmployeeAndCustomerList />,
                    },
                ],
            }
        ]
    }
];

export default ManagerRouter;
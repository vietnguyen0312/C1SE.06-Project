import MainLayout from "../Layout/PrivateLayout/MainLayout";
import ProtectedRoute from "./ProtectedRouter";
import Dashboard from "../Layout/PrivateLayout/Dashboard";
import Profile from "../Layout/PrivateLayout/Profile";
import Bookings from "../Layout/PrivateLayout/Bookings";
const ManagerRouter = [
    {
        element: <ProtectedRoute role='MANAGER' />,
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
                ],
            }
        ]
    }
];

export default ManagerRouter;
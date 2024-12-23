import MainLayout from "../Layout/PrivateLayout/MainLayout";
import ProtectedRoute from "./ProtectedRouter";
import Dashboard from "../Layout/PrivateLayout/Dashboard";
import CreateBlog from "../Layout/PrivateLayout/CreateBlog";
import ManageBlog from "../Layout/PrivateLayout/ManageBlog";
import EditBlog from "../Layout/PrivateLayout/EditBlog";
import Profile from "../Layout/PrivateLayout/Profile";
import Bookings from "../Layout/PrivateLayout/Bookings";
import Rooms from "../Layout/PrivateLayout/Rooms";
import Employee from "../Layout/PrivateLayout/Employee";
import Customer from "../Layout/PrivateLayout/Customer";
import Service from "../Layout/PrivateLayout/Service";
import Manager from "../Layout/PrivateLayout/Manager";
const ManagerRouter = [
    {
//         element: <ProtectedRoute role='MANAGER' />,
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
                        path: "createBlog",
                        element: <CreateBlog />,
                    },
                    {
                        path: "editBlog/:id",
                        element: <EditBlog />,
                    },
                    {
                        path: "blogs",
                        element: <ManageBlog />,
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
                    {
                        path: "listManager",
                        element: <Manager />,
                    },
                ],
            }
        ]
    }
];

export default ManagerRouter;
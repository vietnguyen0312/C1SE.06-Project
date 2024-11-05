import MainLayout from "../Layout/PrivateLayout/MainLayout";
import ProtectedRoute from "./ProtectedRouter";

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
                        element: <div>Manager</div>,
                    },
                ],
            }
        ]
    }
];

export default ManagerRouter;
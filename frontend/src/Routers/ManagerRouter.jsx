import MainLayout from "../Layout/ManagerLayout/MainLayout";
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
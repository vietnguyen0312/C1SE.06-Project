import MainLayout from "../Layout/PublicLayout/MainLayout";
import ProtectedRoute from "./ProtectedRouter";
import UserProfile from "../Layout/PublicLayout/UserProfile/UserProfile";

const CustomerRouter = [
    {
        element: <ProtectedRoute role='CUSTOMER' />,
        children: [
            {
                path: "/customer",
                element: <MainLayout />,
                children: [
                    {
                        path: "userProfile",
                        element: <UserProfile />
                    },
                ],
            }
        ]
    }
];

export default CustomerRouter;
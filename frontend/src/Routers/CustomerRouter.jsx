import MainLayout from "../Layout/PublicLayout/MainLayout";
import ProtectedRoute from "./ProtectedRouter";
import UserProfileLayout from "../Layout/PublicLayout/UserProfile/UserProfileLayout";

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
                        element: <UserProfileLayout />
                    },
                ],
            }
        ]
    }
];

export default CustomerRouter;
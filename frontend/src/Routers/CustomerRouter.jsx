import MainLayout from "../Layout/PublicLayout/MainLayout";
import ProtectedRoute from "./ProtectedRouter";
import UserProfileLayout from "../Layout/PublicLayout/UserProfile/UserProfileLayout";
import HistoryTicketBill from '../Layout/PublicLayout/HistoryBill/HistoryTicketBill';

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
                    {
                        path: "historyTicketBill",
                        element: <HistoryTicketBill />
                    },
                ],
            }
        ]
    }
];

export default CustomerRouter;
import MainLayout from "../Layout/PublicLayout/MainLayout";
import ProtectedRoute from "./ProtectedRouter";
import UserProfileLayout from "../Layout/PublicLayout/UserProfile/UserProfileLayout";
import HistoryTicketBill from '../Layout/PublicLayout/HistoryBill/HistoryTicketBill';
import HistoryBookingRoom from '../Layout/PublicLayout/HistoryBill/HistoryBookingRoom';
import Booking from '../components/Booking';
import TicketLayout from '../Layout/PublicLayout/Ticket/TicketLayout';

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
                    {
                        path: "historyBookingRoom",
                        element: <HistoryBookingRoom />
                    },
                    {
                        path: "booking",
                        element: <Booking />
                    },
                    {
                        path: "ticket",
                        element: <TicketLayout />
                    },
                ],
            }
        ]
    }
];

export default CustomerRouter;
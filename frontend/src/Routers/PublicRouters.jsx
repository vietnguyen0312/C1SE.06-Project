import Home from '../Layout/PublicLayout/Home';
import Blogs from '../components/Blogs';
import Services from '../components/Services'
import MainLayoutPublic from '../Layout/PublicLayout/MainLayout';
import Error403 from '../Layout/PublicLayout/Error403';
import { Navigate, Outlet } from "react-router-dom";
import Authentication from '../components/Authentication';
import OtpSubmit from '../components/OtpSubmit';

const UnthorizedRoute = () => {
    const isAuthenticated = localStorage.getItem('token');
    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}

const PublicRouters = [
    {
        path: "/",
        element: <MainLayoutPublic />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "services",
                element: <Services />
            },
            {
                path: "blogs",
                element: <Blogs />
            },
        ],
    },
    {
        element: <UnthorizedRoute />,
        children: [
            {
                path: "/authentication",
                element: <Authentication />
            },
        ],
    },
    {
        path: "/403",
        element: <Error403 />
    },
    {
        path: "/otp-submit",
        element: <OtpSubmit />
    }

];

export default PublicRouters;

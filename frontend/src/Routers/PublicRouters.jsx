import Home from '../Layout/PublicLayout/Home/Home';
import Blogs from '../components/Blogs';
import MainLayoutPublic from '../Layout/PublicLayout/MainLayout';
import Error403 from '../Layout/PublicLayout/Error403';
import { Navigate, Outlet } from "react-router-dom";
import Authentication from '../components/Authentication';
import OtpSubmit from '../components/OtpSubmit';
import About from '../Layout/PublicLayout/About/About';
import Contact from '../Layout/PublicLayout/Contact/Contact'
import Hotels from '../Layout/PublicLayout/Hotels/Hotels';
import BlogHome from '../Layout/PublicLayout/BlogHome/BlogHome';
import Booking from '../Layout/PublicLayout/Hotels/Booking';
import BlogDetail from '../Service/BlogForDetail';
import ServiceLayout from '../Layout/PublicLayout/ServiceLayout/ServiceLayout';

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
                element: <ServiceLayout />
            },
            {
                path: "blogs",
                element: <Blogs />
            },
            {
                path: "blogDetail/:id",  
                element: <BlogDetail/> 
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "hotels",
                element: <Hotels />
            },
            {
                path: "blogHome",
                element: <BlogHome />
            },
            {
                path: "booking",
                element: <Booking />
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

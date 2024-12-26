import Home from '../Layout/PublicLayout/Home/Home';
import Blogs from '../components/Blogs';
import MainLayoutPublic from '../Layout/PublicLayout/MainLayout';
import Error403 from '../Layout/PublicLayout/Error403/Error403';
import { Navigate, Outlet } from "react-router-dom";
import Authentication from '../components/Authentication';
import About from '../Layout/PublicLayout/About/About';
import Contact from '../Layout/PublicLayout/Contact/Contact'
import BlogHome from '../Layout/PublicLayout/BlogHome/BlogHome';
import BlogDetail from '../Service/BlogForDetail';
import ServiceLayout from '../Layout/PublicLayout/ServiceLayout/ServiceLayout';
import Hotel from '../components/Hotels';
import Checkout from '../components/Checkout';
import EmailInput from '../components/ForgotPassword/emailInput';
import Notify from '../components/ForgotPassword/notify';
import ResetPassword from '../components/ForgotPassword/resetPassword';
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
                element: <BlogDetail />
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
                element: <Hotel />
            },
            {
                path: "blogHome",
                element: <BlogHome />
            },
        ],
    },
    {
        path: "checkout",
        element: <Checkout />
    },
    {
        element: <UnthorizedRoute />,
        children: [
            {
                path: "/authentication",
                element: <Authentication />
            },
            {
                path: "/emailInput",
                element: <EmailInput />
            },
            {
                path: "/notify",
                element: <Notify />
            },
            {
                path: "/resetPassword",
                element: <ResetPassword />
            },
        ],
    },
    {
        path: "/403",
        element: <Error403 />
    },
];

export default PublicRouters;

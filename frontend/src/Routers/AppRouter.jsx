import { createBrowserRouter, RouterProvider } from "react-router-dom";
import publicRoutes from './PublicRouters';
import customerRoutes from './CustomerRouter';
import staffRoutes from './StaffRouter';

const router = createBrowserRouter([
    ...publicRoutes,
    ...staffRoutes,
    ...customerRoutes,
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
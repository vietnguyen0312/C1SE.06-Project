import { createBrowserRouter, RouterProvider } from "react-router-dom";
import publicRoutes from './PublicRouters';
import managerRoutes from './ManagerRouter';
import customerRoutes from './CustomerRouter';
const router = createBrowserRouter([
    ...publicRoutes,
    ...managerRoutes,
    ...customerRoutes,
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
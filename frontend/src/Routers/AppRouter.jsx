import { createBrowserRouter, RouterProvider } from "react-router-dom";
import publicRoutes from './PublicRouters';
import managerRoutes from './ManagerRouter';

const router = createBrowserRouter([
    ...publicRoutes,
    ...managerRoutes,
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
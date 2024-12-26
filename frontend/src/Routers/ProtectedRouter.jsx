import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
    const token = localStorage.getItem('token');
    if (token) {
        let jwtData = token.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        let roles = decodedJwtData.scope.split(' ');
        return roles.includes(role) ? <Outlet /> : <Navigate to="/403" />;
    }
    return <Navigate to="/authentication" />;
}

export default ProtectedRoute;

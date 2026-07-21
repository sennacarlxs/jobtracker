import { Routes, Route } from "react-router-dom";
import LoginAndRegister from "../pages/login";
import Dashboard from "../pages/dashboard";
import { PrivateRoute, GuestRoute } from "./route-guards";

const AppRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<GuestRoute><LoginAndRegister /></GuestRoute>} />
            <Route path="/dashboard" element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            } />
        </Routes>
    )
}

export default AppRoutes;
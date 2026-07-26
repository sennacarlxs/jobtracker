import { Routes, Route } from "react-router-dom";
import LoginAndRegister from "../pages/login";
import Dashboard from "../pages/dashboard";
import Statistics from "../pages/dashboard/statistics";
import { DashboardLayout } from "../components/layout/dashboard-layout";
import { PrivateRoute, GuestRoute } from "./route-guards";

const AppRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<GuestRoute><LoginAndRegister /></GuestRoute>} />
            <Route element={
                <PrivateRoute>
                    <DashboardLayout />
                </PrivateRoute>
            }>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/estatisticas" element={<Statistics />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;
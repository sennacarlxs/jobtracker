import { Routes, Route } from "react-router-dom";
import LoginAndRegister from "../pages/login";

const AppRoutes = () => {
    return (
        
        <Routes>
            <Route path="/" element={<LoginAndRegister />} />
        </Routes>
    )
}

export default AppRoutes;
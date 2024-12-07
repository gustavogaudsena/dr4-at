import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
    const token = localStorage.getItem('session');

    return token ? <Outlet /> : <Navigate to='/signin' />
}

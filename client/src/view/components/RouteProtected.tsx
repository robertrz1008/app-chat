import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AppContext';
import { AppContextIn } from '../../interfaces/contextInterfaces';

const ProtectedRoute: React.FC = () => {
    const {isAutenticate, loading} = useAuth() as AppContextIn

    if(loading) return <h1>Cargando</h1>

    if(!isAutenticate && !loading) return <Navigate to={"/login"} replace/>

    return <Outlet/>
};

export default ProtectedRoute;
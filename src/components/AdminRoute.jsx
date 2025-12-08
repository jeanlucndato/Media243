import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

const AdminRoute = () => {
    const { adminUser, loading } = useAdmin();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#0a0a0a',
                color: '#fff',
                fontSize: '1.2rem'
            }}>
                Loading...
            </div>
        );
    }

    if (!adminUser) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;

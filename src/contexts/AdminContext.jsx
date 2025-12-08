import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const AdminProvider = ({ children }) => {
    const [adminUser, setAdminUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);

    // Admin login
    const adminLogin = async (email, password) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });

            const { user, token } = response.data;

            // Check if user is admin
            if (!user.isAdmin) {
                throw new Error('Access denied. Admin privileges required.');
            }

            localStorage.setItem('admin_token', token);
            setAdminUser(user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setLoading(false);
            return user;
        } catch (error) {
            setLoading(false);
            throw new Error(error.response?.data?.message || error.message || 'Login failed');
        }
    };

    // Admin logout
    const adminLogout = () => {
        localStorage.removeItem('admin_token');
        delete axios.defaults.headers.common['Authorization'];
        setAdminUser(null);
        setStats(null);
    };

    // Fetch statistics
    const fetchStats = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/stats`);
            setStats(response.data.data);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching stats:', error);
            throw error;
        }
    };

    // User Management
    const fetchUsers = async (params = {}) => {
        try {
            const response = await axios.get(`${API_URL}/admin/users`, { params });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch users');
        }
    };

    const updateUser = async (userId, updates) => {
        try {
            const response = await axios.put(`${API_URL}/admin/users/${userId}`, updates);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update user');
        }
    };

    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`${API_URL}/admin/users/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete user');
        }
    };

    // Movie Management
    const fetchMovies = async (params = {}) => {
        try {
            const response = await axios.get(`${API_URL}/admin/movies`, { params });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch movies');
        }
    };

    const createMovie = async (movieData) => {
        try {
            const response = await axios.post(`${API_URL}/admin/movies`, movieData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create movie');
        }
    };

    const updateMovie = async (movieId, updates) => {
        try {
            const response = await axios.put(`${API_URL}/admin/movies/${movieId}`, updates);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update movie');
        }
    };

    const deleteMovie = async (movieId) => {
        try {
            const response = await axios.delete(`${API_URL}/admin/movies/${movieId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete movie');
        }
    };

    // Category Management
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/categories`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch categories');
        }
    };

    const createCategory = async (categoryData) => {
        try {
            const response = await axios.post(`${API_URL}/admin/categories`, categoryData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create category');
        }
    };

    const updateCategory = async (categoryId, updates) => {
        try {
            const response = await axios.put(`${API_URL}/admin/categories/${categoryId}`, updates);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update category');
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            const response = await axios.delete(`${API_URL}/admin/categories/${categoryId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete category');
        }
    };

    // Check authentication on mount
    useEffect(() => {
        const checkAdminAuth = async () => {
            const token = localStorage.getItem('admin_token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const response = await axios.get(`${API_URL}/auth/verify-token`);
                    if (response.data.user.isAdmin) {
                        setAdminUser(response.data.user);
                    } else {
                        adminLogout();
                    }
                } catch (error) {
                    adminLogout();
                }
            }
            setLoading(false);
        };
        checkAdminAuth();
    }, []);

    const value = {
        adminUser,
        loading,
        stats,
        adminLogin,
        adminLogout,
        fetchStats,
        fetchUsers,
        updateUser,
        deleteUser,
        fetchMovies,
        createMovie,
        updateMovie,
        deleteMovie,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        isAdmin: !!adminUser
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within AdminProvider');
    }
    return context;
};

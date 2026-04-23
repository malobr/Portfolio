import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import LiveProjectDetail from './pages/LiveProjectDetail';
import ProjectDetail from './pages/ProjectDetail';
import PostDetail from './pages/PostDetail';
import AdminDashboard from './pages/Admin/Dashboard';
import Login from './pages/Admin/Login';
import '../css/app.css';

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/trabalhos/:slug" element={<LiveProjectDetail />} />
                <Route path="/repos/:slug" element={<ProjectDetail />} />
                <Route path="/blog/:slug" element={<PostDetail />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

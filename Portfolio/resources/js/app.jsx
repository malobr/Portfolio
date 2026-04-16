import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import LiveProjectDetail from './pages/LiveProjectDetail';
import ProjectDetail from './pages/ProjectDetail';
import '../css/app.css';

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/trabalhos/:slug" element={<LiveProjectDetail />} />
                <Route path="/projetos/:slug" element={<ProjectDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

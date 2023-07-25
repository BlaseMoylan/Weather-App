import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UrlProvider } from './context/UrlContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import 'semantic-ui-css/semantic.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UrlProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </UrlProvider>
);

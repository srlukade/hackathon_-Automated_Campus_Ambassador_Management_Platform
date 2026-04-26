import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import AmbassadorPage from './pages/AmbassadorPage';
import OrgDashboard from './pages/OrgDashboard';
import './App.css';

function AppInner() {
  const { view } = useApp();
  if (view === 'ambassador') return <AmbassadorPage />;
  if (view === 'org') return <OrgDashboard />;
  return <LandingPage />;
}

function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

export default App;

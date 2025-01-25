import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import Admin from './components/AdminDashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Dashboard - no Header/Footer */}
        <Route path="/admin-dashboard" element={<Admin />} />

        {/* Other Routes with Header and Footer */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <main>
                <AppRoutes />
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

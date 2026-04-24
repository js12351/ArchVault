/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { UploadPage } from './pages/UploadPage';
import { DashboardPage } from './pages/DashboardPage';
import { ViewPage } from './pages/ViewPage';
import { LandingPage } from './pages/LandingPage';
import { LandingPage2 } from './pages/LandingPage2';
import { LandingPage2Service } from './pages/LandingPage2Service';
import { LandingPage2Project } from './pages/LandingPage2Project';
import { LandingPage2BookCall } from './pages/LandingPage2BookCall';
import { Lock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

function PasscodeScreen({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    // Take only the last character in case of paste or multiple chars
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError('');

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.join('').length === 4) {
      verifyCode(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyCode = async (fullCode: string) => {
    if (fullCode === '0365') {
      setIsSuccess(true);
      inputRefs.current.forEach(input => input?.blur());
      setTimeout(() => {
        setIsAuthenticating(true);
        localStorage.setItem('archvault_auth', 'true');
        onAuthenticated();
      }, 1200); // Wait to show the checkmark animation
    } else {
      setError('Incorrect passcode');
      setTimeout(() => {
        setCode(['', '', '', '']);
        setError('');
        inputRefs.current[0]?.focus();
      }, 600);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-colors duration-500 ${
          isSuccess ? 'bg-green-500 text-white' : 'bg-arch-black text-white'
        }`}
      >
        {isSuccess ? (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle className="w-8 h-8" />
          </motion.div>
        ) : (
          <Lock className="w-8 h-8" />
        )}
      </motion.div>
      
      <h2 className="text-2xl font-serif text-gray-900 mb-2">
        {isSuccess ? 'Access Granted' : 'Enter Passcode'}
      </h2>
      <p className="text-gray-500 mb-8 max-w-sm">
        {isSuccess 
          ? 'Redirecting to your workspace...' 
          : ''}
      </p>
      
      <div className="flex gap-3 mb-6">
        {code.map((digit, index) => (
          <motion.input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            disabled={isSuccess || isAuthenticating}
            className={`w-14 h-16 text-center text-2xl font-semibold rounded-xl border-2 outline-none transition-all ${
              error 
                ? 'border-red-500 text-red-500 bg-red-50' 
                : isSuccess 
                  ? 'border-green-500 text-green-600 bg-green-50'
                  : 'border-gray-200 focus:border-arch-black focus:ring-2 focus:ring-arch-black/20 bg-gray-50'
            }`}
            animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
            autoFocus={index === 0}
          />
        ))}
      </div>
      
      <div className="h-6">
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm font-medium"
          >
            {error}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('archvault_auth') === 'true');

  const handleSignOut = () => {
    localStorage.removeItem('archvault_auth');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />}>
          <Route index element={isAuthenticated ? <UploadPage /> : <PasscodeScreen onAuthenticated={() => setIsAuthenticated(true)} />} />
          <Route path="dashboard" element={isAuthenticated ? <DashboardPage /> : <PasscodeScreen onAuthenticated={() => setIsAuthenticated(true)} />} />
        </Route>
        <Route path="/p/:id" element={<ViewPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/landingpage2" element={<LandingPage2 />} />
        <Route path="/landingpage2/services/:id" element={<LandingPage2Service />} />
        <Route path="/landingpage2/projects/:id" element={<LandingPage2Project />} />
        <Route path="/landingpage2/book-call" element={<LandingPage2BookCall />} />
      </Routes>
    </BrowserRouter>
  );
}

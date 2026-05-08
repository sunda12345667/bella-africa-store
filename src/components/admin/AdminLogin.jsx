import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, KeyRound } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ADMIN_USER = 'admin';
const DEFAULT_PASS = 'bellaAfrica2024';
const PASS_KEY = 'bella_admin_custom_pass';

function getAdminPass() {
  return localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
}

export default function AdminLogin({ onSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'change'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === getAdminPass()) {
      sessionStorage.setItem('bella_admin_auth', '1');
      onSuccess();
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setError('');
    if (username !== ADMIN_USER || password !== getAdminPass()) {
      setError('Current credentials are incorrect.');
      return;
    }
    if (newPass.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (newPass !== confirmPass) {
      setError('New passwords do not match.');
      return;
    }
    localStorage.setItem(PASS_KEY, newPass);
    setSuccessMsg('Password updated! You can now log in with your new password.');
    setMode('login');
    setPassword('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-center text-gray-800 mb-1">
          {mode === 'login' ? 'Admin Login' : 'Change Password'}
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">Bella Africa Store</p>

        {successMsg && (
          <p className="text-xs text-green-700 bg-green-50 px-3 py-2 rounded mb-4">{successMsg}</p>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Username</label>
              <Input value={username} onChange={e => { setUsername(e.target.value); setError(''); }} placeholder="admin" autoFocus />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
              <div className="relative">
                <Input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded">{error}</p>}
            <Button type="submit" className="w-full font-bold">
              <Lock className="w-4 h-4 mr-2" /> Sign In
            </Button>
            <button type="button" onClick={() => { setMode('change'); setError(''); setSuccessMsg(''); }} className="w-full text-xs text-primary hover:underline text-center pt-1">
              Change Password
            </button>
          </form>
        ) : (
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Username</label>
              <Input value={username} onChange={e => { setUsername(e.target.value); setError(''); }} placeholder="admin" autoFocus />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Current Password</label>
              <Input type="password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }} placeholder="••••••••" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">New Password</label>
              <Input type="password" value={newPass} onChange={e => { setNewPass(e.target.value); setError(''); }} placeholder="Min 6 characters" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Confirm New Password</label>
              <Input type="password" value={confirmPass} onChange={e => { setConfirmPass(e.target.value); setError(''); }} placeholder="Repeat new password" />
            </div>
            {error && <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded">{error}</p>}
            <Button type="submit" className="w-full font-bold">
              <KeyRound className="w-4 h-4 mr-2" /> Update Password
            </Button>
            <button type="button" onClick={() => { setMode('login'); setError(''); }} className="w-full text-xs text-gray-500 hover:underline text-center pt-1">
              Back to Login
            </button>
          </form>
        )}

        <p className="text-xs text-gray-400 text-center mt-6">Protected area · Bella Africa Admin</p>
      </div>
    </div>
  );
}
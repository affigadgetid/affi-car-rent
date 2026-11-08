import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone, Shield, ArrowRight, Check } from 'lucide-react';
import { User } from '../types';
import { StorageService } from '../services/storage';
import { DEMO_USERS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleDemoLogin = (userRole: 'customer' | 'admin') => {
    const targetUser = DEMO_USERS.find(u => u.role === userRole) || DEMO_USERS[0];
    StorageService.setCurrentUser(targetUser);
    onLoginSuccess(targetUser);
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'login') {
      if (!email.trim() || !password.trim()) {
        setErrorMsg('Harap lengkapi email dan password.');
        return;
      }
      // Demo authentication simulation
      const isAdminEmail = email.toLowerCase().includes('admin');
      const loggedUser: User = {
        id: `user-${Date.now()}`,
        name: isAdminEmail ? 'Administrator Affi' : (email.split('@')[0] || 'Pelanggan Affi'),
        email: email.trim(),
        phone: phone || '081234567890',
        role: isAdminEmail ? 'admin' : 'customer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        joinedDate: 'November 2026'
      };

      StorageService.setCurrentUser(loggedUser);
      onLoginSuccess(loggedUser);
      onClose();
    } else {
      // Register
      if (!name.trim() || !email.trim() || !password.trim()) {
        setErrorMsg('Harap lengkapi semua field yang wajib diisi.');
        return;
      }
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || '081234567890',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        joinedDate: 'November 2026'
      };

      StorageService.setCurrentUser(newUser);
      onLoginSuccess(newUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Top Header */}
        <div className="p-6 bg-[#071B49] text-white flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black">
              {mode === 'login' ? 'Masuk ke Akun Anda' : 'Daftar Akun Baru'}
            </h3>
            <p className="text-xs text-blue-200 mt-0.5">
              Kelola booking, cek promo & nikmati layanan prioritas
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50">
          <button
            onClick={() => {
              setMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-xs font-bold text-center transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#075BEA] border-b-2 border-[#075BEA]'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Masuk (Login)
          </button>
          <button
            onClick={() => {
              setMode('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-xs font-bold text-center transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-[#075BEA] border-b-2 border-[#075BEA]'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Daftar Baru
          </button>
        </div>

        {/* Modal Form */}
        <div className="p-6 space-y-4">
          {/* Quick 1-Click Demo Login Bar */}
          <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100 space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#075BEA] tracking-wider block">
              Akses Cepat Mode Demo:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('customer')}
                className="py-2 px-3 rounded-xl bg-white border border-blue-200 text-slate-800 text-xs font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#075BEA]" />
                <span>Pelanggan Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="py-2 px-3 rounded-xl bg-[#071B49] text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                <span>Admin Fleet Demo</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-semibold uppercase">atau isi formulir</span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Lengkap</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Andi Pratama"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:outline-none focus:border-[#075BEA]"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Alamat Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="andi@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:outline-none focus:border-[#075BEA]"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nomor Telepon / WhatsApp</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="081234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:outline-none focus:border-[#075BEA]"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Kata Sandi</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setForgotSent(true)}
                    className="text-[11px] text-[#075BEA] font-semibold hover:underline"
                  >
                    Lupa Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:outline-none focus:border-[#075BEA]"
                />
              </div>
            </div>

            {forgotSent && (
              <p className="text-[11px] text-emerald-600 bg-emerald-50 p-2 rounded-lg font-medium">
                Tautan pemulihan kata sandi telah dikirimkan ke email Anda.
              </p>
            )}

            {errorMsg && (
              <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#075BEA] hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{mode === 'login' ? 'Masuk Sekarang' : 'Daftar Sekarang'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

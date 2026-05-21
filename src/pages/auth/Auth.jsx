import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Music, CheckCircle, AlertCircle } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import api from '../../api/axios';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { setUser } = usePlayer();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '' 
  });

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!isLogin && formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        setIsLoading(false);
        return;
    }

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password, 
            password_confirmation: formData.confirmPassword 
          };

      // 1. Hit the login/register endpoint
      const response = await api.post(endpoint, payload);
      const { access_token: token } = response.data;

      // 2. Save the token immediately so the API client can use it
      localStorage.setItem('auth_token', token);

      // 3. NEW: Fetch the FULL user profile to guarantee we have the exact role
      // (Change '/user' if your Laravel route for getting the auth user is different, e.g., '/me')
      const userRes = await api.get('/user'); 
      const fullUser = userRes.data;

      // 4. Update the Context with the complete data
      setUser({
        name: fullUser.name,
        email: fullUser.email,
        isLoggedIn: true,
        isPremium: fullUser.is_premium === 1,
        role: fullUser.role || fullUser.is_admin ? 'admin' : 'user' // Handles both common Laravel admin checks
      });

      // 5. Now navigate. The sidebar will have the admin role instantly!
      navigate('/home');

    } catch (err) {
      console.error("Auth Error:", err);
      if (err.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setError(firstError);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-4xl bg-[#121212] rounded-3xl shadow-2xl overflow-hidden flex border border-white/5 relative z-10 min-h-[550px]">
        
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Join the Community'}
            </h1>
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Enter your details to access your library.' : 'Start your worship journey with us today.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1 animate-in fade-in slide-in-from-left-4 duration-300">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                  <input 
                    type="text" placeholder="John Doe" value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-3 pl-12 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
               <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                <input 
                  type="email" placeholder="you@example.com" value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-3 pl-12 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
               <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                <input 
                  type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-3 pl-12 pr-12 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                  required
                />
                <button 
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
                <div className="space-y-1 animate-in fade-in slide-in-from-left-4 duration-300">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Confirm Password</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                    <input 
                    type="password" placeholder="••••••••" value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-3 pl-12 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                    required={!isLogin}
                    />
                </div>
                </div>
            )}

            <button 
              type="submit" disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>{isLogin ? 'Log In' : 'Create Account'} <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={toggleAuthMode}
                className="text-purple-400 font-bold hover:text-purple-300 hover:underline transition-colors ml-1"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>

        {/* Right Side: Image/Art */}
        <div className="hidden md:block w-1/2 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-black/30"></div>
          
          <div className="absolute bottom-12 left-12 right-12 text-white z-10">
             <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(234,179,8,0.5)]">
                <Music size={24} className="text-black" />
             </div>
             <h2 className="text-3xl font-bold mb-4">Let the music speak to your soul.</h2>
             <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                    <CheckCircle size={16} className="text-green-400" />
                    <span>Exclusive live worship sessions</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                    <CheckCircle size={16} className="text-green-400" />
                    <span>Ad-free listening experience</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
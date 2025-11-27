import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Music, CheckCircle } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Registration specific state
  const [selectedPlan, setSelectedPlan] = useState('free'); // 'free' or 'premium'

  const navigate = useNavigate();
  const { setUser } = usePlayer();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleAuth = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Call delay
    setTimeout(() => {
      if (isLogin) {
        // LOGIN LOGIC
        setUser({
          name: 'Returning Fan',
          email: formData.email,
          isLoggedIn: true,
          isPremium: false // Default to false for login demo
        });
      } else {
        // REGISTER LOGIC
        setUser({
          name: formData.name || 'New Fan',
          email: formData.email,
          isLoggedIn: true,
          isPremium: selectedPlan === 'premium'
        });
      }
      
      setIsLoading(false);
      navigate('/home');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/30 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-4xl bg-[#121212] rounded-3xl shadow-2xl overflow-hidden flex border border-white/5 relative z-10 min-h-[600px]">
        
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Join the Community'}
            </h1>
            <p className="text-gray-400 text-sm">
              {isLogin 
                ? 'Enter your details to access your library.' 
                : 'Start your worship journey with us today.'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            
            {/* Name Field (Register Only) */}
            {!isLogin && (
              <div className="space-y-1 animate-in fade-in slide-in-from-left-4 duration-300">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-3 pl-12 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
               <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-3 pl-12 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
               <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-3 pl-12 pr-12 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Plan Selection (Register Only) */}
            {!isLogin && (
               <div className="py-2 animate-in fade-in slide-in-from-left-4 duration-500">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-2 block">Select Plan</label>
                  <div className="grid grid-cols-2 gap-3">
                      <div 
                        onClick={() => setSelectedPlan('free')}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedPlan === 'free' ? 'bg-white text-black border-white' : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500'}`}
                      >
                          <div className="font-bold text-sm">Free</div>
                          <div className="text-[10px] opacity-70">Standard Access</div>
                      </div>
                      <div 
                        onClick={() => setSelectedPlan('premium')}
                        className={`p-3 rounded-xl border cursor-pointer transition-all relative overflow-hidden ${selectedPlan === 'premium' ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-transparent border-gray-700 text-gray-400 hover:border-yellow-500/50'}`}
                      >
                          <div className="font-bold text-sm flex items-center gap-1">Premium <Music size={12} /></div>
                          <div className="text-[10px] opacity-70">Unlock Exclusives</div>
                      </div>
                  </div>
               </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Log In' : 'Create Account'} <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Toggle Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-400 font-bold hover:text-purple-300 hover:underline transition-colors ml-1"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>

        {/* Right Side: Image/Art (Hidden on Mobile) */}
        <div className="hidden md:block w-1/2 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80')] bg-cover bg-center"></div>
          {/* Overlay Gradient */}
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
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                    <CheckCircle size={16} className="text-green-400" />
                    <span>Support the ministry directly</span>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;
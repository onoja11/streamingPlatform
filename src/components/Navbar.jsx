import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  Music, 
  User, 
  ChevronDown,
  Home,
  Info,
  Phone,
  Library,
  PlayCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    // { name: 'Home', to: '/', icon: Home },
    // { name: 'Songs', to: '/songs', icon: PlayCircle },
    // { name: 'Albums', to: '/albums', icon: Music },
    // { name: 'About', to: '/about', icon: Info },
    // { name: 'Contact', to: '/contact', icon: Phone },
  ];

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-purple-900/70 text-white backdrop-blur-md shadow-lg'
            : 'bg-purple-900 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
                PurpleWave
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="flex items-center space-x-2 hover:text-purple-200 transition-all duration-200 font-medium"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">

              {/* Search (Desktop) */}
              <div className="hidden lg:flex items-center bg-purple-950/50 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-purple-300 transition-all">
                <Search className="w-4 h-4 text-purple-200 mr-2" />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      navigate(`/search?query=${searchQuery}`);
                    }
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search music..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none text-sm text-white placeholder-purple-300 w-32 focus:w-48 transition-all duration-300"
                  />
                </form>
              </div>

              {/* User Icon + Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="p-2 rounded-lg hover:bg-purple-950/60 transition-all duration-200 flex items-center space-x-1"
                >
                  <User className="w-5 h-5 text-white" />
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-purple-900 rounded-xl shadow-lg py-2 z-50">
                    <Link
                      to="/login"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-purple-100 transition"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-purple-100 transition"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white rounded-lg hover:bg-purple-950/60 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-purple-950 text-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-purple-800">
            <span className="font-bold text-lg">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-purple-900 rounded-lg transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search (Mobile) */}
          <div className="p-4 border-b border-purple-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  navigate(`/search?query=${searchQuery}`);
                  setIsMobileMenuOpen(false);
                }
              }}
              className="flex items-center bg-purple-900/50 rounded-full px-4 py-3 focus-within:ring-2 focus-within:ring-purple-300 transition-all"
            >
              <Search className="w-5 h-5 text-purple-300 mr-3" />
              <input
                type="text"
                placeholder="Search music..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm text-white placeholder-purple-400 flex-1"
              />
            </form>
          </div>

          {/* Nav Links */}
          <div className="flex-1 overflow-y-auto py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-purple-900 transition"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}

            <Link
              to="/library"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-purple-900 transition"
            >
              <Library className="w-5 h-5" />
              <span>My Library</span>
            </Link>
          </div>

          {/* Auth Links for Mobile */}
          <div className="p-4 border-t border-purple-800">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-md bg-white text-purple-900 font-semibold text-center hover:bg-purple-100 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-2 px-4 py-2 rounded-md border border-white text-white font-semibold text-center hover:bg-white hover:text-purple-900 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

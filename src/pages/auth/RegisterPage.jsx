import React from 'react'
import { useState } from 'react'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'

const RegisterPage = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    console.log('Register:', formData)
  }

  return (
    <div >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Create Account</h2>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-11 pr-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-white/50"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="reg-email" className="text-sm font-medium text-gray-700 block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="email"
              id="reg-email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-11 pr-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-white/50"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="reg-password" className="text-sm font-medium text-gray-700 block">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="reg-password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-11 pr-12 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-white/50"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700 block">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full pl-11 pr-12 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-white/50"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <input type="checkbox" className="w-4 h-4 mt-1 rounded border-purple-300 text-purple-600 focus:ring-purple-500" />
          <label className="text-sm text-gray-600">
            I agree to the{' '}
            <button type="button" className="text-purple-600 hover:text-purple-700 font-medium">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" className="text-purple-600 hover:text-purple-700 font-medium">
              Privacy Policy
            </button>
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
        >
          Create Account
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to={'/login'}
            className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
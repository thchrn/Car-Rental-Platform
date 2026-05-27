import { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role')
      if (data.success) {
        setIsOwner(true)
        toast.success(data.message)
        navigate('/owner')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-borderColor relative z-50 ${location.pathname === '/' ? 'bg-light' : 'bg-white'}`}>

      {/* Logo */}
      <Link to='/'>
        <motion.img whileHover={{ scale: 1.04 }} src={assets.logo} alt="Caravio" className="h-8" />
      </Link>

      {/* Desktop nav links */}
      <div className='hidden sm:flex items-center gap-8'>
        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`text-sm font-medium transition-colors duration-200 hover:text-primary relative group ${
              location.pathname === link.path ? 'text-primary' : 'text-gray-500'
            }`}>
            {link.name}
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-200 ${
              location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
        ))}
      </div>

      {/* Desktop right section */}
      <div className='hidden sm:flex items-center gap-4'>

        <div className='flex items-center gap-2 border border-borderColor px-3 py-1.5 rounded-full text-sm text-gray-500 hover:border-primary/40 transition-colors'>
          <input
            type="text"
            className="w-32 lg:w-44 bg-transparent outline-none placeholder-gray-400 text-sm"
            placeholder="Search cars..."
          />
          <img src={assets.search_icon} alt="search" className='w-4 h-4 opacity-50' />
        </div>

        <button
          onClick={() => isOwner ? navigate('/owner') : changeRole()}
          className="text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer whitespace-nowrap">
          {isOwner ? 'Dashboard' : 'List Cars'}
        </button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => user ? logout() : setShowLogin(true)}
          className="bg-primary hover:bg-primary-dull transition-all px-5 py-2 text-sm font-medium text-white rounded-full">
          {user ? 'Logout' : 'Login'}
        </motion.button>

      </div>

      {/* Mobile hamburger */}
      <button
        className="sm:hidden cursor-pointer p-1"
        onClick={() => setOpen(!open)}
        aria-label="Menu">
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className="h-5" />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`sm:hidden absolute top-full left-0 right-0 border-t border-borderColor px-6 py-6 flex flex-col gap-5 z-50 shadow-md ${
              location.pathname === '/' ? 'bg-light' : 'bg-white'
            }`}>

            {menuLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'text-primary' : 'text-gray-600'
                }`}>
                {link.name}
              </Link>
            ))}

            <div className='flex items-center gap-2 border border-borderColor px-3 py-2 rounded-full'>
              <input type="text" className="w-full bg-transparent outline-none placeholder-gray-400 text-sm" placeholder="Search cars..." />
              <img src={assets.search_icon} alt="search" className='w-4 h-4 opacity-50' />
            </div>

            <button
              onClick={() => { isOwner ? navigate('/owner') : changeRole(); setOpen(false) }}
              className="text-sm font-medium text-gray-600 text-left hover:text-primary transition-colors cursor-pointer">
              {isOwner ? 'Dashboard' : 'List Cars'}
            </button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { user ? logout() : setShowLogin(true); setOpen(false) }}
              className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full cursor-pointer">
              {user ? 'Logout' : 'Login'}
            </motion.button>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  )
}

export default Navbar
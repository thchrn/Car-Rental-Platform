import { motion } from 'framer-motion'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const NavbarOwner = () => {
  const { user } = useAppContext()

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all'>

      <Link to='/'>
        <img src={assets.logo} alt="" className="h-7" />
      </Link>

      <p>Welcome, {user?.name || "Owner"}</p>

    </motion.div>
  )
}

export default NavbarOwner
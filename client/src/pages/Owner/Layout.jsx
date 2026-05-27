import { Outlet } from "react-router-dom"
import { motion } from "framer-motion"
import NavbarOwner from "../../components/owner/NavbarOwner"
import Sidebar from "../../components/owner/Sidebar"
import { useAppContext } from "../../context/AppContext"
import { useEffect } from "react"

const Layout = () => {
  const { isOwner, navigate } = useAppContext()

  useEffect(() => {
    if (!isOwner) navigate('/')
  }, [isOwner])

  return (
    <div className="flex flex-col">
      <NavbarOwner />
      <div className="flex">
        <Sidebar />
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}>
          <Outlet />
        </motion.div>
      </div>
    </div>
  )
}

export default Layout
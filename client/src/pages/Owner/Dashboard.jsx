import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { assets } from "../../assets/assets"
import Title from "../../components/owner/Title"
import { useAppContext } from "../../context/AppContext"
import toast from "react-hot-toast"

const Dashboard = () => {
  const { axios, isOwner, currency } = useAppContext()
  const [data, setData] = useState({
    totalCars: 0, totalBookings: 0, pendingBookings: 0,
    completedBookings: 0, recentBookings: [], monthlyRevenue: 0,
  })

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pendings", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored },
  ]

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/owner/dashboard')
      if (data.success) {
        setData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isOwner) fetchDashboardData()
  }, [isOwner])

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}>
        <Title title="Admin Dashboard" subTitle="Monitor overall platform performance including total cars, bookings, revenue and recent activities" />
      </motion.div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35, ease: 'easeOut' }}
            whileHover={{ y: -3, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}
            className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor cursor-default">
            <div>
              <h1 className="text-xs text-gray-500">{card.title}</h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <img src={card.icon} alt="" className="h-4 w-4" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom panels */}
      <div className="flex flex-wrap items-start gap-6 w-full">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4, ease: 'easeOut' }}
          className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
          <h1 className="text-lg font-medium">Recent Bookings</h1>
          <p className="text-gray-500">Latest Customer Bookings</p>
          {data.recentBookings.map((booking, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.07, duration: 0.35, ease: 'easeOut' }}
              className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <img src={assets.listIconColored} alt='' className="h-5 w-5" />
                </div>
                <div>
                  <p>{booking.car.brand} {booking.car.model}</p>
                  <p className="text-sm text-gray-500">{booking.createdAt.split('T')[0]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <p className="text-sm text-gray-500">{currency}{booking.price}</p>
                <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">{booking.status}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4, ease: 'easeOut' }}
          className="p-4 md:p-6 border border-borderColor rounded-md w-full md:max-w-xs">
          <h1 className="text-lg font-medium">Monthly Revenue</h1>
          <p className="text-gray-500">Revenue for Current Month</p>
          <p className="text-3xl mt-6 font-semibold text-primary">{currency}{data.monthlyRevenue}</p>
        </motion.div>

      </div>
    </div>
  )
}

export default Dashboard
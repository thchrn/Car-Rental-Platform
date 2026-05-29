import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Title from '../../components/owner/Title'
import { useAppContext } from "../../context/AppContext"
import toast from "react-hot-toast"

const ManageBookings = () => {
  const { currency, axios } = useAppContext()
  const [bookings, setBookings] = useState([])

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get('/api/booking/owner')
      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/booking/change-status', { bookingId, status })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerBookings()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}>
        <Title
          title="Manage your Bookings"
          subTitle="Track customer bookings, approve or cancel requests and manage booking statuses"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
        className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>Date Range</th>
              <th className='p-3 font-medium max-md:hidden'>Reason</th>
              <th className='p-3 font-medium'>Total</th>
              <th className='p-3 font-medium max-md:hidden'>Payment</th>
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.06, duration: 0.35, ease: 'easeOut' }}
                className='border-t border-borderColor'>
                <td className="p-3 flex items-center gap-3">
                  <img src={booking.car?.image} alt="" className="h-12 w-12 aspect-square rounded-md object-cover" />
                  <p className="font-medium max-md:hidden">{booking.car?.brand} {booking.car?.model}</p>
                </td>
                <td className="p-3 max-md:hidden">
                  {booking.pickupdate?.split('T')[0]} to {booking.returndate?.split('T')[0]}
                </td>
                <td className="p-3 max-md:hidden text-gray-500 italic">  {/* ✅ add this */}
                  {booking.reason || '—'}
                </td>
                <td className="p-3">{currency}{booking.price}</td>
                <td className="p-3 max-md:hidden">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">offline</span>
                </td>
                <td className="p-3">
                  {booking.status === 'pending' ? (
                    <select
                      onChange={e => changeBookingStatus(booking._id, e.target.value)}
                      value={booking.status}
                      className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none">
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
                    }`}>
                      {booking.status}
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

    </div>
  )
}

export default ManageBookings
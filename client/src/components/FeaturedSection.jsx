import { motion } from 'framer-motion'
import Title from './Title'
import CarCard from "./CarCard"
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

const FeaturedSection = () => {
  const navigate = useNavigate()
  const { cars } = useAppContext()

  return (
    <div className="flex flex-col items-center  bg-light py-24 px-6 md:px-16 lg:px-24 xl:px-32">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}>
        <Title title='Featured Vehicles' subTitle='Explore our Selection of premium vehicles available for your next adventure' />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
        {cars.slice(0, 6).map((car) => (
          <motion.div key={car._id} variants={itemVariants}>
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => { navigate('/cars'); scrollTo(0, 0) }}
        className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
        Explore all cars
        <img src={assets.arrow_icon} alt="arrow" />
      </motion.button>

    </div>
  )
}

export default FeaturedSection
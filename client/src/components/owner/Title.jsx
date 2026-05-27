import { motion } from 'framer-motion'

const Title = ({ title, subTitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}>
      <h1 className="font-medium text-3xl">{title}</h1>
      <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156">{subTitle}</p>
    </motion.div>
  )
}

export default Title
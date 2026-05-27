import { motion } from 'framer-motion'
import { assets } from '../assets/assets'

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' }
  })
}

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className='px-6 md:px-16 lg:px-24 xl:px-32 mt-20 text-sm text-gray-500 border-t border-gray-200'>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12'>

        {/* Brand column */}
        <motion.div custom={0} variants={columnVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <img src={assets.logo} alt="logo" className='h-8 md:h-9 mb-3' />
          <p className='max-w-60 leading-relaxed'>
            Premium car rental service with a wide selection of luxury
            and everyday vehicles for all your driving needs.
          </p>
          <div className='flex items-center gap-3 mt-6'>
            <a href="#" className='hover:opacity-70 transition-opacity'>
              <img src={assets.facebook_logo} className='w-5 h-5' alt="facebook" />
            </a>
            <a href="#" className='hover:opacity-70 transition-opacity'>
              <img src={assets.instagram_logo} className='w-5 h-5' alt="instagram" />
            </a>
            <a href="#" className='hover:opacity-70 transition-opacity'>
              <img src={assets.twitter_logo} className='w-5 h-5' alt="twitter" />
            </a>
            <a href="#" className='hover:opacity-70 transition-opacity'>
              <img src={assets.gmail_logo} className='w-5 h-5' alt="email" />
            </a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div custom={1} variants={columnVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className='font-semibold text-gray-800 tracking-wide uppercase mb-4'>Quick Links</h3>
          <ul className='space-y-2.5'>
            {['Home', 'Browse Cars', 'List Your Car', 'About Us'].map((link) => (
              <li key={link}>
                <a href="#" className='hover:text-gray-800 transition-colors duration-200'>{link}</a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Resources */}
        <motion.div custom={2} variants={columnVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className='font-semibold text-gray-800 tracking-wide uppercase mb-4'>Resources</h3>
          <ul className='space-y-2.5'>
            {['Help Center', 'Terms of Service', 'Privacy Policy', 'Insurance'].map((link) => (
              <li key={link}>
                <a href="#" className='hover:text-gray-800 transition-colors duration-200'>{link}</a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div custom={3} variants={columnVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className='font-semibold text-gray-800 tracking-wide uppercase mb-4'>Contact</h3>
          <ul className='space-y-2.5'>
            <li>1234 Luxury Drive</li>
            <li>San Francisco, CA 94107</li>
            <li>+1 234 567890</li>
            <li>
              <a href="mailto:info@example.com" className='hover:text-gray-800 transition-colors duration-200'>
                info@example.com
              </a>
            </li>
          </ul>
        </motion.div>

      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className='border-t border-gray-200 py-5 text-center text-gray-400 text-xs'>
        © {new Date().getFullYear()} CarRental. All rights reserved.
      </motion.div>

    </motion.div>
  )
}

export default Footer
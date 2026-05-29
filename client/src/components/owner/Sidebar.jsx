import { motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Sidebar = () => {
  const { user, axios, fetchUser, setUser } = useAppContext()
  const location = useLocation()
  const [image, setImage] = useState(null)
  const [phone, setPhone] = useState(user?.phone || '')
  const [businessName, setBusinessName] = useState(user?.businessName || '')
  const [editingProfile, setEditingProfile] = useState(false)

  const updateImage = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)
      const { data } = await axios.post('/api/owner/update-image', formData)
      if (data.success) {
        setUser(prev => ({ ...prev, image: data.image }))
        toast.success(data.message)
        setImage(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const updateProfile = async () => {
    try {
      const { data } = await axios.post('/api/owner/update-profile', { phone, businessName })
      if (data.success) {
        setUser(prev => ({ ...prev, phone, businessName }))
        toast.success(data.message)
        setEditingProfile(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>

      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.35, ease: 'easeOut' }}
        className='group relative'>
        <label htmlFor='image'>
          <img
            src={image ? URL.createObjectObject(image) : user?.image || assets.upload_icon}
            alt=""
            className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto object-cover'
          />
          <input type='file' id='image' accept='image/*' hidden onChange={e => setImage(e.target.files[0])} />
          <div className='absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer'>
            <img src={assets.edit_icon} alt="" />
          </div>
        </label>
      </motion.div>

      {image && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={updateImage}
          className='absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer'>
          Save <img src={assets.check_icon} width={13} alt="" />
        </motion.button>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className='mt-2 text-base max-md:hidden'>
        {user?.name}
      </motion.p>

      {/* Phone & Business Name — desktop only */}
      <div className='w-full px-4 mt-3 max-md:hidden space-y-2'>
        {editingProfile ? (
          <>
            <input
              type='text'
              placeholder='Phone number'
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className='w-full border border-borderColor px-2 py-1.5 rounded-lg text-xs outline-none'
            />
            <input
              type='text'
              placeholder='Business name'
              value={businessName}
              onChange={e => setBusinessName(e.target.value)}
              className='w-full border border-borderColor px-2 py-1.5 rounded-lg text-xs outline-none'
            />
            <div className='flex gap-2'>
              <button onClick={updateProfile} className='flex-1 bg-primary text-white text-xs py-1.5 rounded-lg'>Save</button>
              <button onClick={() => setEditingProfile(false)} className='flex-1 border border-borderColor text-xs py-1.5 rounded-lg'>Cancel</button>
            </div>
          </>
        ) : (
          <div className='text-xs text-gray-500 space-y-1'>
            {user?.businessName && <p className='font-medium text-gray-700'>{user.businessName}</p>}
            {user?.phone && <p>{user.phone}</p>}
            <button onClick={() => setEditingProfile(true)} className='text-primary text-xs mt-1'>Edit Profile</button>
          </div>
        )}
      </div>

      {/* Nav links */}
      <div className='w-full mt-2'>
        {ownerMenuLinks.map((link, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + index * 0.07, duration: 0.35, ease: 'easeOut' }}>
            <NavLink
              to={link.path}
              className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
                link.path === location.pathname ? 'bg-primary/10 text-primary' : 'text-gray-600'
              }`}>
              <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="menu icon" />
              <span className='max-md:hidden'>{link.name}</span>
              <div className={`${link.path === location.pathname ? 'bg-primary' : ''} w-1.5 h-8 rounded-l right-0 absolute`} />
            </NavLink>
          </motion.div>
        ))}
      </div>

    </motion.div>
  )
}

export default Sidebar
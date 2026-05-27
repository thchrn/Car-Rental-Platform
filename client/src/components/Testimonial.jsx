import { motion } from "framer-motion"
import { assets } from "../assets/assets";
import Title from "./Title"

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.45, ease: "easeOut" }
  })
}

const Testimonial = () => {
  const testimonials = [
    { id: 1, name: "Emma Rodriguez", address: "Barcelona, Spain", image: assets.testimonial_image_1, review: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!" },
    { id: 2, name: "Liam Johnson", address: "New York, USA", image: assets.testimonial_image_2, review: "I'm truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" },
    { id: 3, name: "Sophia Lee", address: "Seoul, South Korea", image: assets.testimonial_image_1, review: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results." }
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title 
        title="What our Customers say" 
        subTitle="Discover why travellers use stayventure for their luxury adventures"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -6, boxShadow: "0 16px 32px rgba(0,0,0,0.10)" }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg cursor-default transition-shadow duration-300">
            
            <div className="flex items-center gap-3">
              <motion.img 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 + 0.2, duration: 0.35 }}
                className="w-12 h-12 rounded-full object-cover" 
                src={testimonial.image} 
                alt={testimonial.name} 
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.address}</p>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 + 0.3, duration: 0.4 }}
              className="flex items-center gap-1 mt-4">
              {Array(5).fill(0).map((_, i) => (
                <img key={i} src={assets.star_icon} alt="star-icon" />
              ))}
            </motion.div>

            <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.review}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Testimonial
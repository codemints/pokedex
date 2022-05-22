import { AnimatePresence, motion } from 'framer-motion'

const Toast = ({ message, toast }) => {
  const variants = {
    visible: { opacity: 1, top: '7vh' },
    hidden: { opacity: 0, top: 0 }
  }
  
  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          className="toast__wrapper"
          variants={variants}
          initial='hidden'
          animate='visible'
          transition={{
            opacity: {
              ease: 'easeInOut',
              duration: 0.05,
            },
            top: {
              type: 'spring',
              stiffness: 600,
              duration: 0.1,
            },
          }}>
          <h2>{ message }</h2>
      </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Home(){

const navigate = useNavigate()

return(
<div className='min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden'>

<div className='absolute w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px]' />
<div className='absolute w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]' />

<motion.h1
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
className='text-7xl font-extrabold z-10'
>
AI Document Search Engine
</motion.h1>

<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.5}}
className='mt-8 text-xl max-w-4xl text-gray-300 leading-10 z-10'
>
An intelligent AI-powered platform designed to retrieve, analyze, and deliver accurate knowledge from documents in real time.
</motion.p>

<motion.button
whileHover={{scale:1.05}}
onClick={()=>navigate('/upload')}
className='mt-12 px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-xl font-semibold'
>
Get Started
</motion.button>

</div>
)}

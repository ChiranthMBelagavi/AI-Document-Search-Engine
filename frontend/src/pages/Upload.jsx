
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { UploadCloud } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Upload(){

const [uploaded,setUploaded]=useState(false)
const [loading,setLoading]=useState(false)

const navigate=useNavigate()

const onDrop = async(files)=>{

setLoading(true)

try{
const formData = new FormData()
formData.append('file', files[0])

await axios.post('http://127.0.0.1:5000/upload', formData)

setUploaded(true)

}catch(error){
console.log(error)
alert('Upload failed')
}
finally{
setLoading(false)
}
}

const {getRootProps,getInputProps}=useDropzone({onDrop})

return(
<div className='min-h-screen flex justify-center items-center px-6 relative overflow-hidden'>

<div className='absolute w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px]' />
<div className='absolute w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]' />

<motion.div
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
className='glass p-12 rounded-[40px] w-full max-w-3xl text-center z-10'
>

<h1 className='text-5xl font-bold'>AI Document Search Engine</h1>

<p className='mt-6 text-gray-300 text-lg'>
Upload your PDF and start AI-powered document interaction.
</p>

<div {...getRootProps()} className='mt-10 border-2 border-dashed border-purple-500 rounded-3xl p-20 cursor-pointer hover:scale-[1.02] transition-all duration-300'>

<input {...getInputProps()} />

<UploadCloud size={80} className='mx-auto text-purple-400' />

<h2 className='mt-6 text-3xl font-semibold'>
Drag & Drop PDF
</h2>

<p className='mt-4 text-gray-400'>
Upload documents for semantic AI retrieval
</p>

</div>

{loading && (
<div className='mt-8 text-purple-300 text-lg'>
Processing PDF and generating embeddings...
</div>
)}

{uploaded && (
<button
onClick={()=>navigate('/chat')}
className='mt-10 px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-xl font-semibold'
>
Start Chatting
</button>
)}

</motion.div>

</div>
)}


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Chat from './pages/Chat'

export default function App(){
return(
<BrowserRouter>
<Routes>
<Route path='/' element={<Home />} />
<Route path='/upload' element={<Upload />} />
<Route path='/chat' element={<Chat />} />
</Routes>
</BrowserRouter>
)}

import { BrowserRouter, Route, Routes } from "react-router-dom"
import InitialPage from "../pages/InitialPage"
import SecondPage from "../pages/SecondPage"
import Home from '../pages/Home'

const Routing = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/init' element={<InitialPage/>}/>
        <Route path='/sec' element={<SecondPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Routing
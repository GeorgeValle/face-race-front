//import { useState } from 'react'
import { /*Navigate, */BrowserRouter, Route, Routes } from 'react-router-dom'
import MainNavBar from './components/mainNavBar/MainNavBar.jsx'
import Logout from './views/auth/Logout.jsx'
import Login from './views/auth/Login.jsx'
import Register from './views/auth/Register.jsx'
import Verify from './views/auth/Verify.jsx'
import Lost_Password from './views/auth/Lost_Password.jsx'
import Panel from './views/panel/Panel.jsx'
import Budget from './views/row1/Budget.jsx'
import Client from './views/row1/Client.jsx'
import Supplier from './views/row2/Supplier.jsx'
import Warehouse from './views/row2/Warehouse.jsx'
import RegisterCash from './views/row1/RegisterCash.jsx'
import Appointment from './views/row2/Appointment.jsx'
import Payment from './views/row1/Payment.jsx'
//import BodyPlane from './components/common/BodyPlane.jsx'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


const App = () => {
  //const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
          <MainNavBar></MainNavBar>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/lost_password" element={<Lost_Password />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify/:token" element={<Verify />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/client" element={<Client />} />
            <Route path="/supplier" element={<Supplier />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/register_cash" element={<RegisterCash />} />
            <Route path="/payment" element={<Payment/>} />
            <Route path="/appointment" element={<Appointment />} />
            
            {/* <Route path="/" element={<HomeView/>}/>
            <Route path="/wiki_ideas_front/" element={<Navigate to="/"/>}/>
            <Route path="/articles" element={<ArticlesView/>}/> */}
            {/* <Route path="/articles/:id" element={<ArticleView/>}/>
            <Route path="/edit/:id" element={<Edit/>}/> */}
            {/* <Route path="*" element={<HomeView/>}/> */}

          </Routes>
        </BrowserRouter>
      {/* <h1>Vite + React</h1> */}
    </>
  )
}

export default App

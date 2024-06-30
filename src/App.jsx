//import { useState } from 'react'
import {Navigate, BrowserRouter, Route, Routes} from 'react-router-dom'
import MainNavBar from './components/mainNavBar/MainNavBar.jsx'
import Login from './views/auth/Login.jsx'

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

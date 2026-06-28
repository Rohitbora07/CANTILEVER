import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginPage from './components/Login'
import Home from './components/Home'
import SignUp from './components/SignUp'
import CreateBlog from './pages/writer/CreateBlog'
import { Routes, Route, useLocation } from "react-router-dom"
function App() {
  const location = useLocation()
  const hideLayout = ["/sign-in", "/sign-up","/create-blog"].includes(location.pathname);
  return (
    <div>
    {!hideLayout && <Navbar />}
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/sign-in" element={<LoginPage/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/create-blog" element={<CreateBlog/>} />
    </Routes>
    {!hideLayout && <Footer />}

    </div>
  )
}

export default App
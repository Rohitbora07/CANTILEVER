import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginPage from './components/Login'
import Home from './components/Home'
import SignUp from './components/SignUp'
import CreateBlog from './pages/writer/CreateBlog'
import { Routes, Route, useLocation } from "react-router-dom"
import WriterDashboard from './pages/writer/DashBoard'
import MyBlogs from './pages/writer/MyBlog'
import UserProfile from './pages/UserProfile'
import UpdateProfile from './pages/UpdateProfile'
import DangerZone from './components/settings/DangerZone'
function App() {
  const location = useLocation()
  const hideLayout = ["/sign-in", "/sign-up","my-blogs"].includes(location.pathname);
  return (
    <div>
    {!hideLayout && <Navbar />}
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/sign-in" element={<LoginPage/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/create-blog" element={<CreateBlog/>} />
      <Route path="/dashboard" element={<WriterDashboard />} />
      <Route path="/my-blogs" element={<MyBlogs/>} />
      <Route path='/profile' element={<UserProfile />} />
      <Route path='/update' element={<UpdateProfile />} />
      <Route path='/profile/update' element={<UpdateProfile />} />
      <Route path='/profile/security' element={<DangerZone />} />
    </Routes>
    {!hideLayout && <Footer />}

    </div>
  )
}

export default App
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import getCurrentUser from "./features/getCurrentUser";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
// import Login from "./pages/Login";

function App() {

  const dispatch = useDispatch()
  const [authChecked, setAuthChecked] = useState(false)


  useEffect(() => {
    const getUser = async () => {
        try {
            const data = await getCurrentUser()
            dispatch(setUserData(data))
        } catch (error) {
            console.log("Not logged in")
        } finally {
            setAuthChecked(true)   // chahe success ho ya fail, auth check complete mark karo
        }
    }
    getUser()
}, [])


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  )

  
}

export default App;
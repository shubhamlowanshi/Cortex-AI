import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import getCurrentUser from "./features/getCurrentUser";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
// import Login from "./pages/Login";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUser()
      dispatch(setUserData(data))
    }
    getUser()

  }, [])


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}

export default App;
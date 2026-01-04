import {Route, Routes} from "react-router-dom"
import SignUP from "./components/SignUP"
import Login from "./components/Login"

const App = ()=>{
  return(
    <div>
      <Routes>
        <Route path="/signup" element={<SignUP/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
         
    </div>
  )
}

export default App
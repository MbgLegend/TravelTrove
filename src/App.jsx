import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import TripGeneration from "./pages/TripGeneration"
import { ToastContainer } from 'react-toastify'
import Trip from "./pages/Trip"
import Trips from "./pages/Trips"
import { useDataContext } from "./config/GlobalContext"

import 'react-toastify/dist/ReactToastify.css'

const App = () => {
    const { currentUser } = useDataContext()

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trip_generation" element={<TripGeneration />} />
                <Route path="/trip/:id" element={<Trip />} />
                <Route 
                    path="/mytrips" 
                    element={
                        currentUser ? 
                            <Trips />
                            :
                        <Navigate to="/" />
                    } 
                />
            </Routes>

            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
                transition: Bounce
            />
        </>
    )
}

export default App
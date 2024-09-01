import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { useDataContext } from "../config/GlobalContext"
import { db } from "../config/firebase"
import TripsPreview from "../components/TripsPreview"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"

const Trips = () => {
    const { currentUser } = useDataContext()

    const [trips, setTrips] = useState({
        loading: true,
        error: null,
        data: []
    })
    const [allTrips, setAllTrips] = useState({
        loading: true,
        error: null,
        data: []
    })

    useEffect(() => {
        if (currentUser) {
            const fetchData = async () => {
                try {
                    const response = await getDoc(doc(db, 'users', currentUser.uid))
                    const querySnapshot = await getDocs(collection(db, 'trips'))
                    const collectionData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    setAllTrips({
                        loading: false,
                        error: false,
                        data: collectionData
                    })
                
                    if (response.exists()) {
                        const data = response.data()
                        
                        setTrips({
                            loading: false,
                            error: null,
                            data
                        })
                    } else {
                        setTrips({
                            loading: false,
                            error: null,
                            data: []
                        })
                    }
                } catch (error) {
                    setTrips({
                        loading: false,
                        error: error.message,
                        data: []
                    })

                    setAllTrips({
                        loading: false,
                        error: false,
                        data: []
                    })
                }
            }
    
            fetchData()
        }
    }, [currentUser])

    return (
        <>
            <Navbar />

            <section className="mt-[2.25rem] lg:mt-[5rem]">
                {trips.loading || allTrips.loading ? (
                   <div className="min-h-[70vh] flex items-center justify-center">
                        <div className="w-[75px] h-[75px] rounded-[50%] border-[8px] border-neutral-300 border-t-[#f45b47] animate-spin">
                        </div>
                    </div>
                ) : (
                    trips.error || allTrips.error ? (
                        <div className="min-h-[70vh] flex items-center justify-center">
                            <div className="text-center flex items-center justify-center flex-col gap-[1rem]">
                                <h1 className="font-[500] text-[1.15rem]">An error occurred</h1>
                                <p className="text-[0.9rem] text-red-500">An error occured: {trips.error}</p>
                                <Link to="/" className="w-fit mx-auto">
                                    <button className="text-[0.975rem] bg-neutral-200 px-[1.25rem] py-[0.75rem] rounded-[0.5rem]">Return to home page</button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                       trips.data.trips.length === 0 || allTrips.data.length === 0? (
                            <div className="min-h-[70vh] flex items-center justify-center">
                                <div className="text-center flex items-center justify-center flex-col gap-[1rem]">
                                    <h1 className="font-[500] text-[1.5rem]">No data available</h1>
                                    <p className="text-[1.025rem] text-neutral-600">You have no trips generated yet</p>
                                    <Link to="/trip_generation" className="w-fit mx-auto">
                                        <button className="text-[0.975rem] bg-neutral-200 px-[1.25rem] py-[0.75rem] rounded-[0.5rem]">Generate trip</button>
                                    </Link>
                                </div>
                            </div>
                       ) : (
                            <main className="flex flex-col gap-[2rem]">
                                <h1 className="text-[1.5rem] font-[600]">My Trips ({trips.data.trips.length})</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5rem]">
                                    {trips.data.trips.map((trip) => {
                                        const data = allTrips.data.find(query => query.id === trip.trip_id)
                                        
                                        if (data) {
                                            return (
                                                <TripsPreview
                                                    data={data}
                                                    key={trip.trip_id}
                                                />
                                            )
                                        }
                                    })}
                                </div>
                            </main>
                       )
                    )
                )}
            </section>

            <Footer />
        </>
    )
}

export default Trips
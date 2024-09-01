import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { db } from "../config/firebase"
import Navbar from "../components/Navbar"
import { CiShare2 } from "react-icons/ci"
import { getPlaceData } from "../config/GoogleAPI"
import HotelPreview from "../components/HotelPreview"
import ActivitesPreview from "../components/ActivitesPreview"
import { toast } from "react-toastify"
import Footer from "../components/Footer"

const Trip = () => {
    const { id } = useParams()
    const [trip, setTrip] = useState({
        loading: true,
        error: null,
        data: null
    })
    const [bannerPhoto, setBannerPhoto] = useState(null)
    const [bannerLoaded, setBannerLoaded] = useState(false)

    const handleShare = async () => {
        try {
            const url = window.location.href
            await navigator.clipboard.writeText(url)
            toast.success("URL copied to clipboard")
        } catch (error) {
            console.log(error)
            toast.error("Could not copy to clipboard")
        }
    }

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response =  await getDoc(doc(db, "trips", id))
                if (response.exists()) {
                    const data = response.data().data
                    setTrip({
                        loading: false,
                        error: null,
                        data
                    })
                }
            } catch (error) {
                console.log(error)
                setTrip({
                    loading: false,
                    error: error.message,
                    data: null
                })
            }
        }
        fetchTrip()
    }, [id])

    useEffect(() => {
        const fetchBannerImage = async () => {
            if (!trip.error && trip.data) {
                try {
                    const response = await getPlaceData(trip.data.trip_details.destination)
                    if (response) {
                        const imageURL = `https://places.googleapis.com/v1/${response.places[0].photos[0].name}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
                        setBannerPhoto(imageURL)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchBannerImage()
    }, [trip])

    return (
        <>
            <Navbar />

            <section className="mt-[2.25rem] lg:mt-[3rem]">
                {trip.loading ? (
                    <div className="min-h-[77vh] flex items-center justify-center">
                        <div className="w-[75px] h-[75px] rounded-[50%] border-[8px] border-neutral-300 border-t-[#f45b47] animate-spin">
                        </div>
                    </div>
                ) : trip.error ? (
                    <div className="min-h-[77vh] flex items-center justify-center">
                        <div className="text-center flex items-center justify-center flex-col gap-[1rem]">
                            <h1 className="font-[500] text-[1.15rem]">An error occurred</h1>
                            <p className="text-[0.9rem] text-red-500">{trip.error}</p>
                            <Link to="/" className="w-fit mx-auto">
                                <button className="text-[0.975rem] bg-neutral-400 px-[1.25rem] py-[0.75rem] rounded-[0.5rem]">Return to home page</button>
                            </Link>
                        </div>
                    </div>
                ) : trip.data ? (
                    <section className="w-full flex flex-col gap-[1.5rem]">
                        {!bannerLoaded && (
                            <div className="aspect-[1/0.35] rounded-[0.5rem] object-cover bg-neutral-300">
                            </div>
                        )}
                        <img 
                            src={bannerPhoto}
                            alt="Destination Banner" 
                            className="aspect-[1/0.75] md:aspect-[1/0.35] rounded-[0.5rem] object-cover"
                            onLoad={() => setBannerLoaded(true)}
                            style={bannerLoaded ? { display: 'block' } : { display: 'none' }}
                        />
                        <div className="flex items-center justify-between gap-[1.5rem]">
                            <div className="flex flex-col gap-[1rem] w-full">
                                <h1 className="font-[500] text-[1.185rem]">{trip.data.trip_details.destination}</h1>
                                <div className="flex items-center gap-[0.65rem] flex-col md:flex-row w-full">
                                    <div className="bg-neutral-200 px-[1.25rem] py-[0.7rem] rounded-[1.75rem] text-[0.925rem] font-[500] w-full">
                                        ☀️ {trip.data.trip_details.duration}
                                    </div>
                                    <div className="bg-neutral-200 px-[1.25rem] py-[0.7rem] rounded-[1.75rem] text-[0.925rem] font-[500] w-full">
                                        💵 {trip.data.trip_details.budget}
                                    </div>
                                    <div className="bg-neutral-200 px-[1.25rem] py-[0.7rem] rounded-[1.75rem] text-[0.925rem] font-[500] w-full">
                                        👤 {trip.data.trip_details.travelers}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button 
                                    className="rounded-[50%] p-[0.65rem] cursor-pointer text-[1.35rem] md:text-[1.95rem] text-white bg-[#f45b47]"
                                    onClick={handleShare}
                                >
                                    <CiShare2 /> 
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[1.5rem] mt-[1.25rem]">
                            <h1 className="text-[1.185rem] font-[500]">Hotel Recommendations</h1>
                            <hr />
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1.35rem] lg:items-stretch">
                                {trip.data.hotels.map((hotel) => (
                                    <HotelPreview 
                                        data={hotel}
                                        key={hotel.name}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[1.5rem] mt-[1.25rem]">
                            <h1 className="text-[1.185rem] font-[500]">Must-See Attractions</h1>
                            <hr />
                            {Object.keys(trip.data.itinerary).map((dayKey, index) => (
                                <div 
                                    className="flex flex-col gap-[1.5rem]"
                                    key={`Day-${index+1}`}
                                >
                                    <h2 className="text-[1.085rem] font-[500] border-[1px] border-dashed rounded-[0.5rem] w-fit px-[1.25rem] py-[0.5rem] border-[#f45b47]">Day {index + 1}</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.35rem] lg:gap-[2.25rem] items-stretch">
                                        {trip.data.itinerary[dayKey].activities.map((activity, activityIndex) => (
                                            <ActivitesPreview 
                                                key={`activity-day${dayKey}-${activityIndex}`}
                                                data={activity}
                                            /> 
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : (
                    <div className="min-h-[77vh] flex items-center justify-center">
                        <div className="text-center flex items-center justify-center flex-col gap-[1rem]">
                            <h1 className="font-[500] text-[1.5rem]">No data available</h1>
                            <Link to="/" className="w-fit mx-auto">
                                <button className="text-[0.975rem] bg-neutral-200 px-[1.25rem] py-[0.75rem] rounded-[0.5rem]">Return to home page</button>
                            </Link>
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </>
    )
}

export default Trip
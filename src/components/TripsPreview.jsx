import { Link } from "react-router-dom"
import { getPlaceData } from "../config/GoogleAPI"
import { useEffect, useState } from "react"

const TripsPreview = ({ data }) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [bannerPhoto, setBannerPhoto] = useState(null)

    useEffect(() => {
        const fetchBannerImage = async () => {
            if (data) {
                try {
                    const response = await getPlaceData(data.data.trip_details.destination)
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
    }, [data])
    
    return (
        <Link to={`/trip/${data.id}`} className="flex flex-col gap-[1.25rem]">
            <img 
                src={bannerPhoto}
                alt="banner photo" 
                className="aspect-[1/0.85] rounded-[0.5rem] object-fit"
                onLoad={() => setImageLoaded(true)}
                style={imageLoaded ? { display: 'inline-block' } : { display: 'none' }}
            />
            {!imageLoaded && (
                <div
                    className="aspect-[1/0.85] rounded-[0.5rem] object-fit bg-neutral-200"
                ></div>
            )}
            <div className="flex flex-col gap-[0.75rem]">
                <h3 className="text-[1.165rem] font-[600]">{data.data.trip_details.destination}</h3>
                <div className="flex items-center gap-[0.85rem] flex-wrap">
                    <div className="bg-neutral-200 px-[1rem] py-[0.65rem] rounded-[1.5rem] text-center font-[500] text-[0.925rem]">
                        💵 {data.data.trip_details.budget}
                    </div>
                    <div className="bg-neutral-200 px-[1rem] py-[0.65rem] rounded-[1.5rem] text-center font-[500] text-[0.925rem]">
                        ⏲️ {data.data.trip_details.duration}
                    </div>
                    <div className="bg-neutral-200 px-[1rem] py-[0.65rem] rounded-[1.5rem] text-center font-[500] text-[0.925rem]">
                        👤 {data.data.trip_details.travelers}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default TripsPreview
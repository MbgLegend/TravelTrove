import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPlaceData } from "../config/GoogleAPI"

const HotelPreview = ({ data }) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [bannerPhoto, setBannerPhoto] = useState(null)
    const [mapLink, setMapLink] = useState("")

    useEffect(() => {
        const fetchBannerImage = async () => {
            if (data) {
                try {
                    const response = await getPlaceData(data.hotelName)
                    if (response) {
                        const imageURL = `https://places.googleapis.com/v1/${response.places[0].photos[0].name}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
                        setBannerPhoto(imageURL)
                        const mapsURL = `https://www.google.com/maps/place/?q=place_id:${response.places[0].id}`
                        setMapLink(mapsURL)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchBannerImage()
    }, [data])

    return (
        <Link 
            className="flex flex-col gap-[1rem] w-full h-full"
            to={mapLink}
            target="_blank"
        >
            {!imageLoaded && (
                <div className="aspect-[1.275/1] rounded-[0.5rem] object-cover bg-neutral-300 w-full">
                </div>
            )}
            <img 
                src={bannerPhoto}
                alt='Hotel Photo'
                className="aspect-[1.275/1] rounded-[0.5rem] object-cover"
                onLoad={() => setImageLoaded(true)}
                style={imageLoaded ? { display: 'block' } : { display: 'none' }}
            />
            <div className="flex flex-col gap-[0.75rem] h-full">
                <div className="flex flex-col gap-[0.75rem] h-full">
                    <div className="flex items-center justify-between gap-[0.85rem]">
                        <h2 className="text-[1.05rem] font-[500]">{data.hotelName}</h2>
                        <span className="text-[1.05rem] font-[500]">⭐ {data.rating}</span>
                    </div>
                    <span className="text-[0.95rem] text-neutral-500">📌 {data.hotelAddress}</span>
                </div>
                <p className="text-[1.05rem] font-[500]">{data.price}</p>
            </div>
        </Link>
    )
}

export default HotelPreview
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPlaceData } from "../config/GoogleAPI"

const ActivitesPreview = ({ data }) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [bannerPhoto, setBannerPhoto] = useState(null)
    const [mapLink, setMapLink] = useState("")

    useEffect(() => {
        const fetchBannerImage = async () => {
            if (data) {
                try {
                    const response = await getPlaceData(data.placeName)
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
            className="flex flex-col lg:flex-row lg:items-center gap-[1.25rem]"
            to={mapLink}
            target="_blank"
        >
            <div className="flex flex-col gap-[1.25rem] w-full">
                <h2 className="font-[500] text-[0.9rem] border-b-[1px] pb-[1.25rem] border-dashed">🕛 {data.timeToTravel}</h2>
                <div className="flex flex-col lg:flex-row lg:items-center gap-[1.25rem]">
                    {!imageLoaded && (
                        <div className="aspect-[1.275/1] rounded-[0.5rem] object-cover bg-neutral-300 w-full max-w-[250px]">
                        </div>
                     )}
                    <img 
                        src={bannerPhoto}
                        alt='Hotel Photo'
                        className="aspect-[1.275/1] rounded-[0.5rem] object-cover lg:max-w-[200px] xl:max-w-[250px]"
                        onLoad={() => setImageLoaded(true)}
                        style={imageLoaded ? { display: 'block' } : { display: 'none' }}
                    />
                    <div className="flex flex-col gap-[0.65rem]">
                        <h1 className="text-[1.05rem] font-[500]">
                            {data.placeName}
                        </h1>
                        <p className="text-[0.95rem] text-neutral-600 leading-[1.75]">{data.placeDetails}</p>
                        <span className="text-[0.95rem]">💵 {data.ticketPricing}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ActivitesPreview
const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

export const getPlaceData = async (destination) => {
    const data = {
        textQuery: destination, 
    }

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_API_KEY,
            'X-Goog-FieldMask': 'places.photos,places.displayName,places.id',
        },
        body: JSON.stringify(data),
    }

    try {
        const response = await fetch(BASE_URL, config)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        return result
    } catch (error) {
        console.error("Error fetching place data:", error)
        throw error
    }
}
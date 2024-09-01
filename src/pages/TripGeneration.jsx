import Navbar from "../components/Navbar"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useDataContext } from "../config/GlobalContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { chatSession } from "../config/AIModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer";

const TripGeneration = () => {
    const { form, setForm, currentUser, setIsLoginModalActive } = useDataContext()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const budget = [
        {
            icon: '💸',
            name: 'Economy',
            description: 'Affordable travel with essential comforts.'
        },
        {
            icon: '💰',
            name: 'Standard',
            description: 'Balanced options for quality and value.'
        },
        {
            icon: '💎',
            name: 'Luxury',
            description: 'Premium experiences with top-tier amenities.'
        }
    ]
    const groupTypes = [
        {
            icon: '🙋‍♂️',
            name: 'Solo',
            description: 'Perfect for solo explorers seeking adventure.'
        },
        {
            icon: '👨‍👩‍👧‍👦',
            name: 'Family',
            description: 'Ideal for family trips with everyone in tow.'
        },
        {
            icon: '👫',
            name: 'Couple',
            description: 'Great for romantic getaways for two.'
        },
        {
            icon: '🎉',
            name: 'Friends',
            description: 'Fun-filled journeys with your best pals.'
        }
    ]

    const handleTripGeneration = async () => {
        if (loading) {
            return
        }
        if (!currentUser) {
            setIsLoginModalActive(true)
            return
        }
        if (
            form.destination === '' ||
            form.destination === null ||
            form.days === '' ||
            form.days === null || 
            form.budget === null ||
            form.partner === null
        ) {
            toast.error("All fields must be field")
            return
        }
        if (
            Number(form.days) < 0
        ) {
            toast.error("Enter a valid amount of days")
            return
        }
        const AI_PROMPT=`Generate Travel Plan for Location: ${form.destination.label}, for ${form.days} Days for ${form.partner} with a ${form.budget} budget Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for ${form.days} days with each day plan with best time to visit in JSON format.`
        setLoading(true)
        try {
            const response = await chatSession.sendMessage(AI_PROMPT)
            const result = response?.response?.text()
            if (result) {
                // Save it to global generated trips document
                const id = `${currentUser.uid}-${new Date().getTime()}`
                await setDoc(doc(db, 'trips', id), {
                    created_by: {
                        username: currentUser.displayName,
                        email: currentUser.email,
                        uid: currentUser.uid,
                        date: new Date().getTime()
                    },
                    data: JSON.parse(result)
                })
                // Update the user's document with the new trip ID
                const userDocRef = doc(db, "users", currentUser.uid)
                const userDoc = await getDoc(userDocRef)
                const userData = userDoc.data() || { trips: [] }

                await updateDoc(userDocRef, {
                    trips: [
                        ...userData.trips,
                        {
                            trip_id: id,
                            date: new Date().getTime()
                        }
                    ]
                })

                // Navigate to trip details
                navigate(`/trip/${id}`)
            }
        } catch (error) {
            console.log(error)
            toast.error("Could not generate trip")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Navbar />

            <section className="flex flex-col gap-[3.5rem] mt-[2.25rem] lg:mt-[3rem">
                <div className="flex flex-col">
                    <h6 className="text-[1.125rem] text-[#f45b47] font-[700]">Unleash Your Wanderlust</h6>
                    <h1 className="text-[2rem] font-[700]">Share with us some of your preferences ✈️</h1>
                    <p className="text-[0.975rem] text-neutral-400 mt-[0.25rem]">Tell us your travel preferences, and we'll create a personalized itinerary just for you.</p>
                </div>
                <div className="flex flex-col gap-[1rem]">
                    <label 
                        className="font-[500] text-[1.25rem]"
                    >
                        What's your preferred destination?
                    </label>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
                        selectProps={{
                            value: form.destination,
                            onChange: (value) => { 
                                if (!loading) {
                                    setForm({ ...form, destination: value })
                                } 
                            },
                            disabled: loading,
                            styles: {
                                control: (provided, state) => ({
                                    ...provided,
                                    padding: '0.25rem',
                                    borderWidth: '2px',
                                    borderColor: state.isFocused ? '#f45b47' : provided.borderColor,
                                    boxShadow: state.isFocused ? '0 0 0 1px #f45b47' : provided.boxShadow,
                                    borderRadius: '4px',
                                    '&:hover': {
                                        borderColor: state.isFocused ? '#f45b47' : provided.borderColor,
                                    },
                                }),
                            },
                        }}
                    />
                </div>
                <div className="flex flex-col gap-[1rem]">
                    <label 
                        className="font-[500] text-[1.25rem]"
                    >
                        How long will your trip last?
                    </label>   
                    <input 
                        type="number"
                        min={1}
                        value={form.days}
                        onChange={(e) => {
                            if (!loading) {
                                setForm({ ...form, days: e.target.value })
                            }
                        }} 
                        placeholder="Number of days..."
                        className="p-[0.64rem] border-[2px] border-neutral-300 rounded-[4px] focus:border-[#f45b47] focus:ring-1 focus:ring-[#f45b47] outline-none"
                        disabled={loading}
                    />
                </div>
                <div className="flex flex-col gap-[1rem]">
                    <label
                        className="font-[500] text-[1.25rem]"
                    >
                        What's Your Spending Plan?
                    </label>
                    <div className="grid grid-cols-1 gap-[1.25rem] lg:grid-cols-3">
                        {budget.map((plan) => (
                            <div
                                key={plan.name}
                                className="border-[2px] rounded-[0.5rem] p-[0.75rem] flex flex-col gap-[0.35rem] cursor-pointer hover:border-[#f45b47]"
                                style={form.budget === plan.name ? {borderColor: '#f45b47'} : {}}
                                onClick={() => {
                                    if (!loading) {
                                        if (form.budget === plan.name) {
                                            setForm({
                                                ...form,
                                                budget: null
                                            })
                                        } else {
                                            setForm({
                                                ...form,
                                                budget: plan.name
                                            })
                                        }
                                    }
                                }}
                            >
                                <div>
                                    <span className="text-[1.315rem]">{plan.icon}</span>
                                    <h2 className="text-[1.185rem] font-[500]">{plan.name}</h2>
                                </div>
                                <p className="text-[0.95rem] text-neutral-500">{plan.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-[1rem]">
                    <label
                        className="font-[500] text-[1.25rem]"
                    >
                        Who will be your travel companions on this adventure?
                    </label>
                    <div className="grid grid-cols-1 gap-[1.25rem] md:grid-cols-2">
                        {groupTypes.map((group) => (
                            <div 
                                key={group.name}
                                className="border-[2px] rounded-[0.5rem] p-[0.75rem] flex flex-col gap-[0.35rem] cursor-pointer hover:border-[#f45b47]"
                                style={form.partner === group.name ? {borderColor: '#f45b47'} : {}}
                                onClick={() => {
                                    if (!loading) {
                                        if (form.partner === group.name) {
                                            setForm({
                                                ...form,
                                                partner: null
                                            })
                                        } else {
                                            setForm({
                                                ...form,
                                                partner: group.name
                                            })
                                        }
                                    }
                                }}
                            >
                                <div>
                                    <span className="text-[1.315rem]">{group.icon}</span>
                                    <h2 className="text-[1.185rem] font-[500]">{group.name}</h2>
                                </div>
                                <p className="text-[0.95rem] text-neutral-500">{group.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button 
                    className="bg-black text-neutral-200 px-[1.125rem] p-[0.65rem] rounded-[0.5rem] font-[500] w-fit ml-auto"
                    onClick={handleTripGeneration}
                    disabled={loading}
                >
                    {loading ? (
                        <AiOutlineLoading3Quarters
                            className="animate-spin text-[1.45rem] font-[600]"
                        />
                    ) : (
                        'Generate Trip'
                    )}
                </button>
            </section>

            <Footer />
        </>
    )
}

export default TripGeneration
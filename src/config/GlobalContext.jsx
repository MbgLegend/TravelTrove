import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { auth, db } from "./firebase"
import { useLocation } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

const DataContext = createContext()

export const useDataContext = () => {
    return useContext(DataContext)
}

export const DataProvider = ({ children }) => {
    const [form, setForm] = useState({
        destination: '',
        days: 1,
        budget: null,
        partner: null
    })
    const [isNavbarActive, setIsNavbarActive] = useState(false)
    const [isLoginModalActive, setIsLoginModalActive] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    useEffect(() => {
        setIsNavbarActive(false)
        setIsLoginModalActive(false)
        setDropdown(false)
        setForm({
            destination: '',
            days: 1,
            budget: null,
            partner: null
        })
        window.scrollTo(0, 0)
    }, [location])
    
    useEffect(() => {
        setIsNavbarActive(false)
        setIsLoginModalActive(false)
        setDropdown(false)
    }, [auth?.currentUser])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                setCurrentUser(user)
                setLoading(false)
                if (user) {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userDocRef)
                    if (!userDoc.exists()) {
                        await setDoc(userDocRef, {
                            metadata: {
                                name: user.displayName,
                                email: user.email,
                                verified: user.emailVerified,
                                photoURL: user.photoURL
                            },
                            trips: []
                        })
                    }
                }
            } catch (error) {
                console.error("Error fetching or creating user document:", error)
            }
        })
    
        return unsubscribe
    }, [])
    
    const contextValue = useMemo(() => ({
        form,
        setForm,
        isNavbarActive,
        setIsNavbarActive,
        isLoginModalActive,
        setIsLoginModalActive,
        currentUser,
        dropdown,
        setDropdown
    }), [form, isNavbarActive, isLoginModalActive, currentUser, dropdown])

    if (loading) {
        return (
            <section className="w-full h-[90vh] flex items-center justify-center">
                <div className="w-[80px] h-[80px] border-[10px] border-neutral-300 border-t-[#f45b47] rounded-[50%] animate-spin"></div>
            </section>
        )
    }

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    )
}
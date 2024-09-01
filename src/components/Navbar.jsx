import { Link } from "react-router-dom"
import { useDataContext } from "../config/GlobalContext"
import { useEffect, useState, useRef } from "react"
import { IoClose } from "react-icons/io5"
import { auth, googleProvider } from "../config/firebase"
import { signInWithPopup } from "firebase/auth"

const Navbar = () => {
    const {isNavbarActive, setIsNavbarActive, isLoginModalActive, setIsLoginModalActive, currentUser, dropdown, setDropdown} = useDataContext()
    const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 800)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false)
            }
        }

        if (dropdown) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropdown])

    useEffect(() => {
        const windowResize = () => { 
            setIsSmallDevice(window.innerWidth < 800) 
            setIsNavbarActive(false)
            setIsLoginModalActive(false)
            setDropdown(false)
        }
        const windowScroll = () => {
            if (window.scrollY > 80) {
                setDropdown(false)
            }
        }

        window.addEventListener("resize", windowResize)
        window.addEventListener("scroll", windowScroll)

        return () => {
            window.removeEventListener("resize", windowResize)
            window.removeEventListener("scroll", windowScroll)
        }
    }, [])

    useEffect(() => {
        if (isSmallDevice && isNavbarActive) {
            window.scrollTo(0, 0)
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "auto"
        }
    }, [isSmallDevice, isNavbarActive])

    useEffect(() => {
        if (isLoginModalActive) {
            window.scrollTo(0, 0)
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "auto"
        }
    }, [isLoginModalActive])

    return (
        <>
            <nav className="w-full flex items-center justify-between">
                <Link 
                    to="/"
                    className="text-[1.3rem] font-[800] select-none"
                >
                    🌍 TravelTrove
                </Link>
                {!currentUser ? (
                    <button 
                        className="bg-black text-neutral-200 px-[1.125rem] p-[0.65rem] rounded-[0.5rem] font-[500] text-[0.9rem]"
                        onClick={() => setIsLoginModalActive(!isLoginModalActive)}
                    >
                        Sign In
                    </button>
                ) : (
                    <div className="flex items-center gap-[1.75rem] relative flex-1 justify-end">
                        {!isSmallDevice && (
                            <>
                                <Link className="font-[500]" to="/trip_generation">Generate Trip</Link>
                                <Link className="font-[500]" to="/mytrips">My Trips</Link>  
                            </>
                        )}
                        <img 
                            src={currentUser.photoURL}
                            alt={currentUser.displayName}
                            className="rounded-[50%] w-[40px] h-[40px] cursor-pointer"
                            onClick={() => setDropdown(!dropdown)}
                        />
                        {currentUser && dropdown && (
                            <>
                                <div 
                                    className="absolute right-0 w-full top-[120%] z-[2] flex flex-col gap-[1.125rem] p-[0.75rem] border-[1px] text-start font-[500] rounded-[0.5rem] shadow-md bg-white max-w-[250px]"  
                                    ref={dropdownRef}
                                >
                                    {isSmallDevice && (
                                        <>
                                            <Link to="/trip_generation" className="flex justify-start">
                                                ➕ Generate Trip
                                            </Link>
                                            <Link
                                                to="/mytrips"
                                                className="flex justify-start"
                                            >
                                                ✈️ My Trips
                                            </Link>
                                            <hr />
                                        </>
                                    )}
                                    <button 
                                        onClick={async () => await auth.signOut()}
                                        className="flex justify-start"
                                    >
                                        ⚙️ Logout
                                    </button>
                                </div>
                            </>  
                        )}
                    </div>
                )}
                
            </nav>
            {/* Login modal */}
            {!currentUser && isLoginModalActive && (
                <aside className="fixed inset-0 z-[1]">
                    <div className="lg:max-w-[475px] w-full bg-white lg:rounded-[0.5rem] z-[2] absolute inset-0 lg:inset-auto lg:translate-x-[-50%] lg:translate-y-[-50%] lg:top-[50%] lg:left-[50%]">
                        <div className="flex items-center justify-between p-[1.25rem] border-b-[1px]">
                            <span 
                                className="text-[1.2rem] font-[800] select-none"
                            >
                                🌍 TravelTrove
                            </span>
                            <IoClose className="text-[1.35rem] cursor-pointer" onClick={() => setIsLoginModalActive(false)} />
                        </div>
                        <div className="p-[1.25rem] flex flex-col gap-[1.25rem]">
                            <div className="flex flex-col gap-[0.15rem]">
                                <h2 className="text-[1.05rem] font-[500]">Continue with Google</h2>
                                <p className="text-[0.9rem] text-neutral-500">Securely Sign in with Google to Access the App</p>
                            </div>
                            <button 
                                className="bg-black text-neutral-200 px-[1.125rem] p-[0.65rem] rounded-[0.5rem] font-[500] flex items-center justify-center gap-[0.85rem] select-none"
                                onClick={async () => {
                                    try {
                                        await signInWithPopup(auth, googleProvider)
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }}
                            >
                                <img src="/assets/google.png" alt="google icon" className="w-[23px] h-[23px]" />
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-[1] bg-[#00000094]" onClick={() => setIsLoginModalActive(false)}></div>
                </aside>
            )}
        </>
    )
}

export default Navbar
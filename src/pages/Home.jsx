import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { FaStar } from "react-icons/fa"
import Footer from "../components/Footer"

const Home = () => {
    return (
        <>
            <Navbar />

            <section className="mt-[2.25rem] lg:mt-[3rem] flex flex-col gap-[5rem] max-w-[1150px] mx-auto">
                <main className="flex flex-col gap-[1.75rem] text-center min-h-[84vh] justify-center">
                    <div className="flex flex-col">
                        <h6 className="text-[1.125rem] text-[#f45b47] font-[700]">Unleash Your Wanderlust</h6>
                        <h1 className="text-[1.75rem] md:text-[1.95rem] lg:text-[2.55rem] font-[800] leading-[1.85]">
                            Embark on Your Perfect Journey with<br className="hidden md:block"/>Our <span className="bg-[#f45b47] text-white p-[0.5rem] rounded-[0.5rem]">AI-Powered Travel Planner</span>
                        </h1>
                    </div>
                    <img 
                        src="assets/hero.png" 
                        alt="Hero image" 
                    />
                    <Link to="/trip_generation" className="w-fit mx-auto">   
                        <button className="bg-black text-neutral-200 px-[1.125rem] p-[0.65rem] rounded-[0.5rem] font-[500] w-fit mx-auto">Get started for free</button>
                    </Link>
                </main>
                
                <article className="flex flex-col gap-[1.75rem]">
                    <div className="flex flex-col justify-center items-center gap-[1rem] text-center">
                        <h1 className="text-[1.75rem] md:text-[1.95rem] lg:text-[2.55rem] font-[800]">How to use our tool?</h1>
                        <p className="text-[1.1rem] leading-[1.75] text-neutral-500">Learn how to effortlessly plan your perfect trip with our easy-to-use Trip Planner AI.<br className="hidden md:block"/> Experience personalized recommendations tailored just for you.</p>
                    </div>
                    <div className="flex flex-col gap-[2.5rem] lg:gap-[1.5rem] justify-center mx-auto mt-[1rem] lg:mt-[0]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.5rem] text-center lg:text-start lg:justify-center items-center">
                            <img src="assets/sign-in.png" alt="sign in" className="max-w-[300px] mx-auto lg:hidden" />
                            <div className="flex flex-col gap-[0.75rem]">
                                <h2 className="text-[1.5rem] font-[700]">Sign in using Google</h2>
                                <p className="text-neutral-600 leading-[2] text-[0.975rem]">Sign in effortlessly with your Google account for quick and secure access.<br className="hidden md:block lg:hidden"/>No extra passwords—just one click, and you're in!</p>
                            </div>
                            <img src="assets/sign-in.png" alt="sign in" className="max-w-[300px] mx-auto hidden lg:inline-block" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.85rem] text-center lg:text-start lg:justify-center items-center">
                            <img src="assets/input.png" alt="input" className="max-w-[300px] mx-auto" />
                            <div className="flex flex-col gap-[0.75rem]">
                                <h2 className="text-[1.5rem] font-[700]">Enter Your Details</h2>
                                <p className="text-neutral-600 leading-[2] text-[0.975rem]">Simply input your travel preferences to get personalized recommendations. Our AI processes your<br className="hidden md:block lg:hidden"/>details in seconds, tailoring the perfect trip just for you!</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.85rem] text-center lg:text-start lg:justify-center items-center">
                            <img src="assets/business-trip.png" alt="input" className="max-w-[300px] mx-auto lg:hidden" />
                            <div className="flex flex-col gap-[0.75rem]">
                                <h2 className="text-[1.5rem] font-[700]">Enjoy your trip!</h2>
                                <p className="text-neutral-600 leading-[2] text-[0.975rem]">With everything planned and personalized to your needs, all that's left is to embark on your journey.<br className="hidden md:block lg:hidden"/>Relax and enjoy your trip, knowing every detail has been tailored just for you!</p>
                                <Link to="/trip_generation" className="w-fit mx-auto lg:mx-0">   
                                    <button className="bg-black text-neutral-200 px-[1.125rem] p-[0.65rem] rounded-[0.5rem] font-[500] w-fit mx-auto">Generate trip</button>
                                </Link>
                            </div>
                            <img src="assets/business-trip.png" alt="input" className="max-w-[300px] mx-auto hidden lg:inline-block" />
                        </div>
                    </div>
                </article>

                <article className="flex flex-col gap-[1.75rem] mt-[1.5rem]">
                    <div className="flex flex-col justify-center items-center gap-[1rem] text-center">
                        <h1 className="text-[1.75rem] md:text-[1.95rem] lg:text-[2.55rem] font-[800]">Hear from Our Happy Travelers</h1>
                        <p className="text-[1.1rem] leading-[1.75] text-neutral-500">See how our users are transforming their travel experiences with the<br className="hidden md:block"/>powerful and innovative Trip Planner AI.</p>
                    </div>
                    <div className="lg:py-[1rem] grid grid-cols-1 lg:grid-cols-3 gap-[1.85rem] items-center">
                        <div className="p-[1.125rem] flex flex-col gap-[1.25rem] bg-[#f9f5ff] border-[2px] border-[#e0bde9] rounded-[0.5rem]">
                            <div className="flex items-center gap-[0.75rem]">
                                <img 
                                    src="/assets/user-1.avif" 
                                    alt="user-1" 
                                    className="rounded-[50%] w-[55px] h-[55px]"
                                />
                                <div className="flex flex-col gap-[0.25rem]">
                                    <h3 className="text-[1.075rem] font-[500]">John Mitchell</h3>
                                    <div className="flex items-center gap-[0.2rem]">
                                        {[0, 1, 2, 3, 4].map((star) => (
                                            <FaStar
                                                key={`star-${star}`}
                                                className="text-[0.935rem] text-yellow-500"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-[1.0125rem] leading-[1.85]">"TravelTrove made trip planning effortless! A few clicks, and I had the perfect itinerary. Highly recommend!"</p>
                        </div>
                        <div className="p-[1.125rem] flex flex-col gap-[1.25rem] bg-[#fcf0f2] border-[2px] border-[#f9c8d8] rounded-[0.5rem] lg:mt-[3.25rem]">
                            <div className="flex items-center gap-[0.75rem]">
                                <img 
                                    src="/assets/user-2.avif" 
                                    alt="user-2" 
                                    className="rounded-[50%] w-[55px] h-[55px]"
                                />
                                <div className="flex flex-col gap-[0.25rem]">
                                    <h3 className="text-[1.075rem] font-[500]">Samantha Lee</h3>
                                    <div className="flex items-center gap-[0.2rem]">
                                        {[0, 1, 2, 3, 4].map((star) => (
                                            <FaStar
                                                key={`star-${star}`}
                                                className="text-[0.935rem] text-yellow-500"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-[1.0125rem] leading-[1.85]">"TravelTrove was so easy to use. The AI nailed my preferences and suggested amazing places. My vacation was a breeze!"</p>
                        </div>
                        <div className="p-[1.125rem] flex flex-col gap-[1.25rem] bg-[#fbfff5] border-[2px] border-[#def0dc] rounded-[0.5rem] lg:mt-[6.5rem]">
                            <div className="flex items-center gap-[0.75rem]">
                                <img 
                                    src="/assets/user-3.avif" 
                                    alt="user-3" 
                                    className="rounded-[50%] w-[55px] h-[55px]"
                                />
                                <div className="flex flex-col gap-[0.25rem]">
                                    <h3 className="text-[1.075rem] font-[500]">David Rodriguez</h3>
                                    <div className="flex items-center gap-[0.2rem]">
                                        {[0, 1, 2, 3, 4].map((star) => (
                                            <FaStar
                                                key={`star-${star}`}
                                                className="text-[0.935rem] text-yellow-500"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-[1.0125rem] leading-[1.85]">"TravelTrove is a game-changer! It took the stress out of planning and gave me the perfect trip. I'll use it for all my travels!"</p>
                        </div>
                        <div className="p-[1.125rem] flex flex-col gap-[1.25rem] bg-[#c9e1f7a4] border-[2px] border-[#A2CFF9] rounded-[0.5rem]">
                            <div className="flex items-center gap-[0.75rem]">
                                <img 
                                    src="/assets/user-4.avif" 
                                    alt="user-5" 
                                    className="rounded-[50%] w-[55px] h-[55px]"
                                />
                                <div className="flex flex-col gap-[0.25rem]">
                                    <h3 className="text-[1.075rem] font-[500]">Jessica Brown</h3>
                                    <div className="flex items-center gap-[0.2rem]">
                                        {[0, 1, 2, 3, 4].map((star) => (
                                            <FaStar
                                                key={`star-${star}`}
                                                className="text-[0.935rem] text-yellow-500"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-[1.0125rem] leading-[1.85]">"TravelTrove simplified everything! The AI quickly put together a great itinerary that matched my style perfectly."</p>
                        </div>
                        <div className="p-[1.125rem] flex flex-col gap-[1.25rem] bg-[#9cf0d41e] border-[2px] border-[#74ceb083] rounded-[0.5rem] lg:mt-[3.25rem]">
                            <div className="flex items-center gap-[0.75rem]">
                                <img 
                                    src="/assets/user-5.avif" 
                                    alt="user-5" 
                                    className="rounded-[50%] w-[55px] h-[55px] object-fit"
                                />
                                <div className="flex flex-col gap-[0.25rem]">
                                    <h3 className="text-[1.075rem] font-[500]">Michael Adams</h3>
                                    <div className="flex items-center gap-[0.2rem]">
                                        {[0, 1, 2, 3, 4].map((star) => (
                                            <FaStar
                                                key={`star-${star}`}
                                                className="text-[0.935rem] text-yellow-500"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-[1.0125rem] leading-[1.85]">"TravelTrove made planning so easy. The recommendations were spot on, and I had an amazing trip without the hassle."</p>
                        </div>
                        <div className="p-[1.125rem] flex flex-col gap-[1.25rem] bg-[#f1c68663] border-[2px] border-[#f1c686b2] rounded-[0.5rem] lg:mt-[6.25rem]">
                            <div className="flex items-center gap-[0.75rem]">
                                <img 
                                    src="/assets/user-6.avif" 
                                    alt="user-3" 
                                    className="rounded-[50%] w-[55px] h-[55px]"
                                />
                                <div className="flex flex-col gap-[0.25rem]">
                                    <h3 className="text-[1.075rem] font-[500]">Daniel Evans</h3>
                                    <div className="flex items-center gap-[0.2rem]">
                                        {[0, 1, 2, 3, 4].map((star) => (
                                            <FaStar
                                                key={`star-${star}`}
                                                className="text-[0.935rem] text-yellow-500"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-[1.0125rem] leading-[1.85]">"Using TravelTrove was a breeze. It took care of all the details, and I ended up with the best vacation I've ever had!"</p>
                        </div>
                    </div>
                </article>
            </section>

            <Footer />
        </>
    )
}

export default Home
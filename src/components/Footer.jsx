const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="border-t-[1px] pt-[1.75rem] mt-[2.75rem] flex flex-col md:flex-row gap-[1.5rem] md:justify-between justify-center items-center">
            ©️ TravelTrove {year}
            <div className="flex gap-[1.5rem] items-center">
                <button className="text-[0.915rem]">
                    Terms of service
                </button>
                ·
                <button className="text-[0.915rem]">
                    Privacy policy
                </button>
            </div>
        </footer>
    )
}

export default Footer
const Footer = () => {
    return (
        <footer className="mt-10 border-t border-white/10 bg-[#0b0f19] py-16 text-white *:select-none">
            <div className="container mx-auto flex flex-wrap justify-between gap-8 px-4">
                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6 sm:mb-0">
                    <img src={"/assets/logo.svg"} alt="logo" className="w-14" />
                    <h4 className="mb-4 mt-3 text-2xl font-bold text-white">
                        Food Hub
                    </h4>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6 sm:mb-0">
                    <h4 className="mb-4 text-base font-bold sm:text-xl">Company</h4>
                    <ul className="space-y-2 text-slate-400 *:text-sm sm:text-base">
                        <li className="hover:opacity-80">
                            <a href="#">About</a>
                        </li>
                        <li className="hover:opacity-80">
                            <a href="#">Careers</a>
                        </li>
                        <li className="hover:opacity-80">
                            <a href="#">Team</a>
                        </li>
                        <li className="hover:opacity-80">
                            <a href="#">Food Hub One</a>
                        </li>
                        <li className="hover:opacity-80">
                            <a href="#">Food Hub Instamart</a>
                        </li>
                        <li className="hover:opacity-80">
                            <a href="#">Food Hub Genie</a>
                        </li>
                    </ul>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6 sm:mb-0">
                    <h4 className="mb-4 text-base font-bold sm:text-xl">Contact us</h4>
                    <ul className="space-y-2 text-slate-400 *:text-sm sm:text-base">
                        <li className="hover:opacity-80">
                            <a href="#">Help & Support</a>
                        </li>
                        <li className="hover:opacity-80">
                            <a href="#">Partner with us</a>
                        </li>
                        <li className="hover:opacity-80">
                            <a href="#">Ride with us</a>
                        </li>
                    </ul>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6 sm:mb-0">
                    <h4 className="mb-4 text-base font-bold sm:text-xl">Legal</h4>
                    <ul className="space-y-2 text-slate-400 *:text-sm sm:text-base">
                        <li className="hover:opacity-80">
                            <a href="#">Terms & Conditions</a>
                        </li>
                        <li className="hover:opacity-80">
                            <a href="#">Cookie Policy</a>
                        </li>
                        <li className="hover:opacity-80">
                            <a href="#">Privacy Policy</a>
                        </li>
                    </ul>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6 sm:mb-0">
                    <h4 className="mb-4 text-base font-bold sm:text-xl">We deliver to:</h4>
                    <div className="relative">
                        <select className="block w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-white/[0.06] p-3 text-sm text-white outline-none focus:border-orange-400">
                            <option disabled defaultValue={"Lucknow"}>
                                Select a city
                            </option>
                            <option value="Bangalore">Lucknow</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Gurgaon">Gurgaon</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Pune">Pune</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                            <svg
                                className="fill-current h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

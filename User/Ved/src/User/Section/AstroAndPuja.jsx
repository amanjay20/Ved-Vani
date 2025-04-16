import React from 'react'
import { Link } from 'react-router-dom'

const AstroAndPuja = () => {
    return (
        <div className="w-full bg-white flex flex-col items-center justify-center ">
            <div className="max-w-7xl flex flex-col justify-center p-4 lg:p-0 ">
                <div className="flex flex-col items-center lg:flex-row justify-between">
                    <section class="">
                        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                            <div class="flex flex-col justify-centerbg-[url('assets/images/footer.png')]">
                                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl ">Astro <span className='text-orange-400'>Consult</span></h1>
                                <p class="mb-8 text-sm font-normal text-gray-500 lg:text-md dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                                <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0">
                                    <a href="#" class="inline-flex justify-center items-center py-3 px-5   rounded-lg bg-blue-700 hover:bg-orange-400  text-white">
                                        Book Now
                                        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </a>
                                   
                                </div>
                            </div>
                            <div>
                                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl ">Dosh <span className='text-orange-400'>Puja</span></h1>
                                <p class="mb-8 text-sm font-normal text-gray-500 lg:text-md dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                                <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0">
                                    <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center  rounded-lg bg-blue-700 hover:bg-orange-400 text-white">
                                        Book Now
                                        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </a>
                                    
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>

        </div>
    )
}

export default AstroAndPuja

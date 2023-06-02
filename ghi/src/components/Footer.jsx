import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoIcon from './logo.png'
import buildingsky from './buildingsky.jpg'

function Footer() {

    return (
        <div>
        <footer className="flex bg-white dark:bg-gray-900"
        // style={{ backgroundImage: `url(${buildingsky})` }}
        >
        <div className="container px-6 py-12 mx-auto">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">We'll be your aid to get you paid!</h2>

                <p className="max-w-md mx-auto mt-2 text-gray-500 dark:text-gray-400">Join us to get started.</p>

                <div className="flex flex-col mt-6 sm:flex-row sm:items-center sm:justify-center">
                    <Link to='/signup'>
                    <button
                    className="
                    w-full px-5 py-2 text-sm
                    font-medium tracking-wide text-white
                    capitalize transition-colors
                    duration-300 transform bg-wageblue
                    rounded-md sm:mx-2 sm:order-2 sm:w-auto
                    hover:bg-blue-500 focus:outline-none
                    focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                    >Get started</button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Product</h3>

                    <div className="flex flex-col items-start mt-4 space-y-4">
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Overview</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Features</a>
                        {/* <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Solutions</a> */}
                        {/* <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Tutorials</a> */}
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Pricing</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Releases</a>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</h3>

                    <div className="flex flex-col items-start mt-4 space-y-4">
                        <Link to="about">
                        <button className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">About us</button>
                        </Link>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Careers</a>
                        {/* <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Press</a> */}
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">News</a>
                        {/* <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Media kit</a> */}
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Contact</a>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Resources</h3>

                    <div className="flex flex-col items-start mt-4 space-y-4">
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Blog</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Newsletter</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Events</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Help center</a>
                        {/* <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Tutorials</a>
                        <a href="#" class="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Supports</a> */}
                    </div>
                </div>

                {/* <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Use cases</h3>

                    <div className="flex flex-col items-start mt-4 space-y-4">
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Startups</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Enterprise</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Government</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Saas</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Marketplaces</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Ecommerce</a>
                    </div>
                </div> */}

                <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Social</h3>

                    <div className="flex flex-col items-start mt-4 space-y-4">
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Twitter</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">LinkedIn</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Github</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Facebook</a>
                        {/* <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">AngelList</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Dribble</a> */}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Legal</h3>

                    <div className="flex flex-col items-start mt-4 space-y-4">
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Terms</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Privacy</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Cookies</a>
                        <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Licenses</a>
                        {/* <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Settings</a> */}
                        {/* <a href="#" className="text-gray-700 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600">Contact</a> */}
                    </div>
                </div>
            </div>

            <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700"/>

            <div className="flex flex-col items-center justify-between sm:flex-row">
                {/* <a href="#">
                    <img className="w-auto h-7" src="./img/icon.png" alt=""/>
                </a> */}

                <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">© Copyright 2023. All Rights Reserved.</p>
                <img src={logoIcon} alt="logo" className="h-8 w-8"/>
            </div>
        </div>
        </footer>
        </div>
    );
}

export default Footer;

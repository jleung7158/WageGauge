import React from "react";
import icon from './icon.png'
import logo from './logo.png'


export default function Reviews() {
    return (
        <>
        <div className="grid grid-row-2 overflow-x-hidden w-full my-[50px]">
        <div className="
                grid shadow-sm md:m-12 md:grid-cols-3
                overflow-hidden rounded-large
                bg-gradient-to-r from-wageblue from-60% to-white
                dark:bg-gradient-to-r dark:from-moredark dark:via-moredark dark:to-moredark
        ">
        <figure className="flex flex-col-2 items-center justify-center lg:h-[300px] p-8 text-center">
            <img
            className="flex justify-center object-none"
            src="https://images.pexels.com/photos/6801867/pexels-photo-6801867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </figure>
            <div className="flex items-center justify-start">
                <h1 className="text-start text-white dark:text-darktext text-2xl font-bold p-[75px] transition ease-in delay-100 hover:translate-x-5">
                    WageGauge has been serving its users for almost 2 days, providing our contributors with real-time data that keeps them informed as they navigate their professional lives.
                </h1>
            </div>
            <div className="flex items-center justify-center">
            <img className="h-[100px] w-[120px]" src={logo} alt="" />
            </div>
        </div>

        <div className="
                    grid shadow-sm md:m-12 md:grid-cols-3
                    overflow-hidden rounded-large
                    bg-gradient-to-r from-white via-wageblue via-50% to-wageblue
                    dark:bg-gradient-to-r dark:from-moredark dark:via-moredark dark:to-moredark
        ">
        <div className="flex items-center justify-center">
            <img className="h-[100px] w-[100px]" src={icon} alt="" />
            </div>
        <div className="flex items-center justify-start">
                <h1 className="text-start text-white text-2xl font-bold p-[75px] transition ease-in delay-100 hover:-translate-x-5 dark:text-darktext">
                    With our technology guiding your endeavors, always know that your worth is bring properly compensated.
                </h1>
            </div>
        <figure className="flex flex-col-2 items-center justify-center lg:h-[300px] p-8 text-center">
            <img
            className=" flex justify-center object-none"
            src="https://images.pexels.com/photos/6801683/pexels-photo-6801683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </figure>
        </div>
        </div>
        </>
    )
}

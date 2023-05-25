import React from "react"
import DashboardIcon from './humans.png';

export default function WorthBanner() {

    return(
                <div
					className="
                    flex
                    flex-row
                    py-10 mb-40
                    bg-gradient-to-r
                    from-wageblue via-weedgreen to-white

                    dark:bg-gradient-to-r
                    dark:from-moredark
                    dark:to-darkgreen
                "
				>
					<div
						className="
                        flex
                        flex-col

                        "
					>
						<div>
							<p
								className="
                            flex
                            text-5xl
                            font-bold
                            font-warownia
                            text-gray-50
                            py-10
                            ml-20

                            dark:text-darktext
                            "
							>
								EMBRACE YOUR WORTH
							</p>
						</div>
						<div>
							<p
								className="
                            flex
                            text-2xl
                            font-bold
                            font-warownia
                            text-gray-50
                            py-2
                            ml-20
                            mr-10

                            dark:text-darktext
                            "
							>
								WageGauge helps empower your pay with dynamic{' '}
							</p>
						</div>
						<div>
							<p
								className="
                            flex
                            text-2xl
                            font-bold
                            font-warownia
                            text-gray-50
                            py-2
                            ml-20

                            dark:text-darktext
                            "
							>
								data visualization, giving you the edge
							</p>
						</div>
						<div>
							<p
								className="
                            flex
                            text-2xl
                            font-bold
                            font-warownia
                            text-gray-50
                            ml-20

                            dark:text-darktext
                            "
							>
								in any negotiation.
							</p>
						</div>
					</div>
					<div>
						<p
							className="
                        flex
                        text-2xl
                        font-bold
                        font-warownia
                        text-gray-50
                        py-10
                        ml-40
                        mr-40

                        dark:text-darktext
                        "
						>
							Learn more
						</p>
					</div>
					<div className="">
						<img
							src={DashboardIcon}
							alt="Homepage"
							className="
                flex
                px-20 py-8
                w-25 h-25
                "
						/>
					</div>
				</div>
    )
}

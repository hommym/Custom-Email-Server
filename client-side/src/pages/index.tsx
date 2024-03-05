import Image from "next/image";
import Link from "next/link";

import Benefits from "@/components/atoms/pages/homepage/Benefits";
import Staticpage from "@/components/layouts/Staticpage";
import PrimaryButton from "@/components/atoms/PrimaryButton";

import ProductMarketingImage from "@/assets/product-marketing.webp";
import EmailMarketingLogo from "@/assets/email-marketing-logo.svg";
import SupportImage from "@/assets/support.webp";
import HeroImage from "@/assets/main-graphic-woman.webp";

import { LuSend } from "react-icons/lu";
import { RiUserReceived2Line } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { IoIosArrowRoundForward, IoMdCheckmark } from "react-icons/io";

export default function Home() {
	return (
		<Staticpage>
			<main className="w-full h-auto min-h-screen bg-[#F7F7FC]  mx-auto">
				<div className="w-full">
					{/* Hero section */}
					<section className="w-full h-auto py-24  bg-slate-200">
						<div className="w-full max-w-6xl mx-auto ">
							<h1 className="text-6xl text-center text-deep-text font-black mb-12 leading-[70px]">
								Achieve goals with the most <br /> <span className="text-[#5457FF]">affordable</span> email delivery service
							</h1>
						</div>
					</section>

					<Benefits />

					{/* Scale your business */}
					<section className="py-24 bg-white ">
						<div className="max-w-4xl  mx-auto flex items-center justify-center flex-col">
							<h3 className="font-black text-5xl leading-[60px] text-center w-full mb-6 text-deep-text">Scale your business to new heights with products tailored to your needs</h3>
							<p className="w-4/5 text-center opacity-80 text-lg">
								Quickly create, edit, and send marketing emails regardless of your budget or expertise, or simplify the third-party integration process with our intuitive email API.
							</p>
							<article className="mt-24 flex items-stretch gap-8 justify-between">
								<div className="w-1/2 ">
									<div className="flex gap-4 items-center justify-start mb-5">
										<button className="w-10 h-10">
											<EmailMarketingLogo className="w-full h-full" />
										</button>
										<h3 className="text-2xl font-black text-deep-text">Email Marketing</h3>
									</div>
									<p className="text-lg opacity-80">
										Fully understand your audience, send personalized newsletters, automate your email communication, and track and analyze the success of your efforts thanks to
										our marketing product designed for faster growth
									</p>

									<div className="mt-14">
										<div className="flex items-center justify-start gap-3 mb-6">
											<button className="w-8 h-8  flex items-center justify-center">
												<MdOutlineCreateNewFolder className="text-[#4FD1C5] text-2xl" />
											</button>
											<p className="text-deep-text font-bold">Email Designer</p>
										</div>
										<div className="flex items-center justify-start gap-3 mb-6">
											<button className="w-8 h-8  flex items-center justify-center">
												<LuSend className="text-[#4FD1C5] text-2xl" />
											</button>
											<p className="text-deep-text font-bold">Campaign Creator</p>
										</div>
										<div className="flex items-center justify-start gap-3 mb-6">
											<button className="w-8 h-8  flex items-center justify-center">
												<RiUserReceived2Line className="text-[#4FD1C5] text-2xl" />
											</button>
											<p className="text-deep-text font-bold">Contact Management</p>
										</div>
									</div>
								</div>
								<div className="w-2/5 h-auto relative">
									<Image src={ProductMarketingImage} alt="Product marketing" fill />
								</div>
							</article>
						</div>
					</section>

					{/* Plan */}
					<section className="w-full pt-12 relative">
						<div className="w-full max-w-4xl mx-auto">
							<h3 className="text-deep-text font-black text-2xl mb-4">Find the right plan for you</h3>
							<p className="w-1/2 opacity-90 leading-[30px]">
								Unlock the power of our product with $0 and upgrade at any time. Regardless of your budget, we are here to help your business grow.
							</p>

							<div className="bg-white relative -bottom-14 shadow-md h-auto w-full rounded-[25px] flex flex-col items-center justify-center mt-2 p-12 ">
								<div className="w-full flex gap-6 mb-12">
									{[
										{ name: "Free", price: 0 },
										{ name: "Premium", price: 200 },
									].map((plan, index, arr) => (
										<div className={`w-1/2 ${index !== arr?.length - 1 ? "border-r-[1px]" : ""}`}>
											<h3 className="text-xl font-light mb-6">{plan?.name}</h3>
											<p className="text-[12px] opacity-80">Starting from</p>
											<p className="text-xl">
												<span className="text-deep-text text-2xl font-black">$</span>
												<span className="text-deep-text text-5xl font-black">{plan?.price}</span>/ month
											</p>
										</div>
									))}
								</div>

								<Link href="/pricings" className="mx-auto text-sec hover:underline inline-flex items-center  gap-2 justify-center w-auto">
									Check out the pricings
									<IoIosArrowRoundForward />
								</Link>
							</div>
						</div>
					</section>

					<section className="w-full h-auto bg-gradient2 py-24">
						<div className="w-full h-full flex items-stretch justify-between gap-8 max-w-4xl mx-auto">
							<div className="w-1/3 relative">
								<Image src={SupportImage} alt="" fill />
							</div>
							<div className="w-1/2">
								<h3 className="text-2xl font-black text-white mb-5">We've got your back</h3>
								<p className="text-[15px] mb-8 opacity-80 text-white">
									We want you to grow your business effortlessly while sending emails with Company Name - but if you have questions or want to say Hi!, email us or access us via
									chat. We're available 24/7!
								</p>

								<div>
									<p className="mb-4 flex items-center justify-start gap-3 text-white">
										<span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
											<IoMdCheckmark className="text-[#4fd1c5]" />
										</span>
										High availability with 24/7 services
									</p>
									<p className="mb-4 flex items-center justify-start gap-3 text-white">
										<span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
											<IoMdCheckmark className="text-[#4fd1c5]" />
										</span>
										Lightning quick response times
									</p>
									<p className="mb-4 flex items-center justify-start gap-3 text-white">
										<span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
											<IoMdCheckmark className="text-[#4fd1c5]" />
										</span>
										Excellent customer satisfaction rate
									</p>
								</div>
							</div>
						</div>
					</section>

					<section className="w-full py-24 relative">
						<div className="w-full max-w-5xl bg-gradient flex items-center justify-center flex-col  p-12 py-20 rounded-[20px] mx-auto">
							<h3 className="text-white font-black text-2xl mb-10"> Starting with Company Name is easy, fast and free</h3>
							<PrimaryButton text="Start now" sx="!w-[120px] !rounded-[3px] !font-bold" />

							<p className="text-[12px] mt-4 text-white">Free plan available. No credit card required. </p>
						</div>
					</section>
				</div>
			</main>
		</Staticpage>
	);
}

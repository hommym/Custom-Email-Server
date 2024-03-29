import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { useUserSlice } from "@/slices/user.slice";

import PrimaryButton from "../atoms/PrimaryButton";
import Logo from "../atoms/Logo";

const Header = () => {
	const { pathname } = useRouter();
	const user = useSelector(useUserSlice);
	return (
		<header className="sticky top-0 bg-white z-[3] shadow-md left-0 py-6">
			<div className="w-full max-w-6xl flex items-center justify-between  mx-auto">
				<Logo sx="w-auto" textSx="!text-xl" />

				<nav className="flex items-center gap-10 justify-between">
					<a className={`${pathname === "/" ? "text-sec" : "text-deep-text hover:text-sec"} font-bold text-[16px]`} href="/">
						Home
					</a>
					<a className={`${pathname === "/pricings" ? "text-sec" : "text-deep-text hover:text-sec"} font-bold text-[16px]`} href="/pricings">
						Pricings
					</a>
					<a className={`${pathname === "/contact-us" ? "text-sec" : "text-deep-text hover:text-sec"} font-bold text-[16px]`} href="/contact-us">
						Contact Us
					</a>
					<a className={`${pathname === "/about-us" ? "text-sec" : "text-deep-text hover:text-sec"} font-bold text-[16px]`} href="/about-us">
						About Us
					</a>
				</nav>
				{!user?._id && (
					<div className="w-1/5 h-full flex items-center justify-between gap-4">
						<PrimaryButton href="/login" text="Log in" sx="border-[1px] !bg-transparent !text-sec border-sec" />
						<PrimaryButton href="/create-account" text="Try For Free" sx="border-[1px] border-sec" />
					</div>
				)}
				{user?._id && (
					<div className="w-[10%] h-full flex items-center justify-between gap-4">
						<PrimaryButton href="/dashboard" text="Dashboard" sx="border-[1px] !bg-transparent !text-sec border-sec" />
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;

import React from "react";
import Link from "next/link";

import Mainpage from "@/components/atoms/layouts/Mainpage";
import PrimaryInput from "@/components/atoms/PrimaryInput";
import PrimaryButton from "@/components/atoms/PrimaryButton";

import { IoIosArrowBack } from "react-icons/io";

const NewContact = () => {
	return (
		<Mainpage>
			<main>
				<Link href="/dashboard/audience" className="flex items-center gap-4 mt-8 text-lg text-sec">
					<button>
						<IoIosArrowBack className="!text-sec" />
					</button>
					<p className="text-sec">Team</p>
				</Link>

				<form action="" className="w-1/3 flex flex-col items-center justify-center min-h-[50vh] rounded-[20px] mt-12 ">
					<PrimaryInput name="email" label="Email" id="email" />

					<PrimaryInput name="firstname" label="First name" id="firstname" />
					<div className="w-full flex items-center justify-between gap-4">
						<PrimaryInput name="lastname" label="Last name" id="lastname" />
					</div>

					<PrimaryButton text="Sign Up" />
				</form>
			</main>
		</Mainpage>
	);
};

export default NewContact;

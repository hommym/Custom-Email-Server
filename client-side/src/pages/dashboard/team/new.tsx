import React from "react";
import Link from "next/link";

import Mainpage from "@/components/layouts/Mainpage";
import PrimaryInput from "@/components/atoms/PrimaryInput";
import PrimaryButton from "@/components/atoms/PrimaryButton";

import { IoIosArrowBack } from "react-icons/io";
import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { registerTeamMemberSchema } from "@/libs/hookform";

const NewContact = () => {
	const { register, handleSubmit } = useSelectedPropertiesFromHookForm(registerTeamMemberSchema);

	const registerNewMember = (data: any) => {
		const { firstname, lastname, role, email } = data;
		console.log({ firstname, lastname, role, email });
	};
	return (
		<Mainpage>
			<main className="min-h-[86vh]">
				<Link href="/dashboard/audience" className="flex items-center gap-4 mt-8 text-lg text-sec">
					<button>
						<IoIosArrowBack className="!text-sec" />
					</button>
					<p className="text-sec">Team</p>
				</Link>

				<h3 className="text-3xl font-bold mt-5 mb-4">Create A New Team Member</h3>

				<form action="" className="w-1/2 flex flex-col items-center justify-center min-h-[50vh] rounded-[20px] mt-2" onSubmit={handleSubmit(registerNewMember)}>
					<div className="w-full flex items-center justify-between gap-4">
						<PrimaryInput name="firstname" label="First name" register={register} />
						<PrimaryInput name="lastname" label="Last name" register={register} />
					</div>
					<PrimaryInput name="email" label="Email Address" register={register} />
					<div className="w-full mb-6">
						<label htmlFor="role">Select account role</label>
						<select id="role" {...register("role")} className="w-full h-12 rounded-[5px] px-3">
							<option value="">Employee</option>
							<option value="">Admin</option>
						</select>
					</div>

					<PrimaryButton text="Create Team Member" type="submit" />
				</form>
			</main>
		</Mainpage>
	);
};

export default NewContact;

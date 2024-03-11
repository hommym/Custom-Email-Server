import React, { useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { registerTeamMemberSchema } from "@/libs/hookform";
import { useCreateNewTeamMemberMutation } from "@/apis/employeesApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";

import Mainpage from "@/components/layouts/Mainpage";
import PrimaryInput from "@/components/atoms/PrimaryInput";
import PrimaryButton from "@/components/atoms/PrimaryButton";

import { IoIosArrowBack } from "react-icons/io";

const NewContact = () => {
	const { register, handleSubmit, reset } = useSelectedPropertiesFromHookForm(registerTeamMemberSchema);
	const [registerTeamMember, { data, error, isLoading }] = useCreateNewTeamMemberMutation();

	const registerNewMember = (data: any) => {
		const { firstname, lastname, role, email } = data;
		registerTeamMember({ firstname, lastname, role, email });
	};

	useEffect(() => {
		if (!data) return;
		toast.success("Team member successfully registered", { autoClose: 1500 });
		reset();
	}, [data]);

	useCreateErrorFromApiRequest(error);

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
							<option value="employee">Employee</option>
							<option value="admin">Admin</option>
						</select>
					</div>

					<PrimaryButton text="Create Team Member" type="submit" />
				</form>
			</main>
		</Mainpage>
	);
};

export default NewContact;

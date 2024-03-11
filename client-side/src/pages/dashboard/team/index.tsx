import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { useLazyFetchAllEmployeesQuery } from "@/apis/employeesApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";
import { useUserSlice } from "@/slices/user.slice";

import Mainpage from "@/components/layouts/Mainpage";
import NoData from "@/components/atoms/NoData";
import Loading from "@/components/atoms/Loading";

const index = () => {
	const { orgId } = useSelector(useUserSlice);
	const [fetchAllEmployees, { data, error, isFetching }] = useLazyFetchAllEmployeesQuery();

	useEffect(() => {
		if (!orgId) return;
		fetchAllEmployees({ orgId });
	}, [orgId]);

	console.log({ data, error, isFetching });
	useCreateErrorFromApiRequest(error);
	return (
		<Mainpage>
			<main className="py-6 min-h-[92vh]">
				<div className="flex items-center justify-between">
					<h3 className="text-3xl font-bold">Your Team Members</h3>
					<Link href="/dashboard/team/new" className="w-auto px-4 py-2 border-[1px] rounded-[5px] hover:bg-slate-200">
						Add New Member
					</Link>
				</div>

				<div className="mt-12 flex items-center border-y-[1px] justify-between">
					<div className="w-[10%] text-sm font-bold h-12 flex items-center justify-center border-l-[1px]">Status</div>
					<div className="w-[40%] text-sm font-bold  h-12 flex items-center justify-center border-l-[1px]">Email</div>
					<div className="w-[35%] text-sm font-bold h-12 flex items-center justify-center border-l-[1px]">Fullname</div>
					<div className="w-[25%] text-sm font-bold h-12 flex items-center justify-center border-x-[1px]">Change Status</div>
				</div>

				{!isFetching && (
					<>
						{data?.employees?.length > 0 && (
							<>
								{data?.employees?.map((_it: any, index: number) => (
									<div className={`flex items-center border-y-[1px] justify-between`} key={index}>
										<div className="w-[10%] text-sm h-12 flex items-center justify-center border-l-[1px]">Status</div>
										<div className="w-[40%] text-sm h-12 flex items-center justify-center border-l-[1px]">Email</div>
										<div className="w-[35%] text-sm h-12 flex items-center justify-center border-l-[1px]">Fullname</div>
										<button className="text-sec hover:underline w-[25%] text-sm h-12 flex items-center justify-center border-x-[1px]">{true ? "Disable" : "Enable"}</button>
									</div>
								))}
							</>
						)}

						{data?.employees?.length == 0 && (
							<>
								<NoData />
							</>
						)}
					</>
				)}

				{isFetching && (
					<div className="w-full flex items-center justify-center min-h-[50vh]">
						<Loading />
					</div>
				)}
			</main>
		</Mainpage>
	);
};

export default index;

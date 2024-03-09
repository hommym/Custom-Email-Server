"use client";

import React, { ReactNode, useEffect } from "react";
import makeStore from "@/store";
import { Provider, useDispatch, useSelector } from "react-redux";

import { setData, useUserSlice } from "@/slices/user.slice";
import { useFetchLoggedInUserRequestQuery } from "@/apis/usersApi";
import Loading from "../atoms/Loading";
const store: any = makeStore();

// This is where the fetch is made
const Component = ({ children }: { children: ReactNode }) => {
	// Get user data here
	const { data, isLoading, error } = useFetchLoggedInUserRequestQuery();
	const dispatch = useDispatch();
	const user = useSelector(useUserSlice);

	useEffect(() => {
		if (!data?.accountInfo) return;

		const { firstname, lastname, email, role, _id, orgId } = data.accountInfo;
		// Store user data
		dispatch(setData({ firstname, lastname, email, role, _id, orgId }));
	}, [data]);

	return (
		<>
			{/* If it is not loading , or user is set or there is an error display the child but show loading if it is loading */}
			{isLoading && !user?._id && !error && (
				<div className="w-full h-screen flex items-center justify-center">
					<Loading />
				</div>
			)}
			{!isLoading && (user?._id || error) && <>{children}</>}
		</>
	);
};

// This calls the Component as well as wraps the Provider in the whole app
const InitialDispatch = ({ children }: { children: ReactNode }) => {
	return (
		<Provider store={store}>
			<Component>{children}</Component>
		</Provider>
	);
};

export default InitialDispatch;

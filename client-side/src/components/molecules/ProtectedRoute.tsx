"use client";

import { useEffect, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { useUserSlice } from "@/slices/user.slice";

// import Loading from "./atom/Loading";

interface ProtectedRouteProps {
	children: ReactNode;
	loginRequired?: Boolean;
	isAdmin?: boolean;
	auth?: boolean;
	orgPage?: boolean;
}

const ProtectedRoute = ({ children, loginRequired = false, isAdmin = false, auth = false, orgPage = false }: ProtectedRouteProps) => {
	const router = useRouter();
	const user = useSelector(useUserSlice);

	useEffect(() => {
		if (!loginRequired && user?._id && auth) {
			router.replace("/");
		}
		if (loginRequired && !user?._id) {
			router.replace("/");
		}

		if (loginRequired && user?._id && !user?.orgId && !orgPage) {
			router.replace("/organization");
		}

		if (loginRequired && user?._id && user?.orgId && orgPage) {
			router.replace("/dashboard");
		}
		// Protected page for admin
		if (isAdmin && (!user?._id || !user?.isAdmin)) {
			router.replace("/");
		}
	}, [user?._id, auth, loginRequired, isAdmin]);

	return (
		<>
			{user?._id && (
				<>
					{!orgPage && user?.orgId && <>{children}</>}
					{orgPage && !user?.orgId && <>{children}</>}
				</>
			)}
			{!loginRequired && <>{children}</>}
		</>
	);
};

export default ProtectedRoute;

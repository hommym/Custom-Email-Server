import { useEffect, ReactNode, Fragment } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAuthSlice } from "@/slices/user.slice";

import Loading from "@/components/atoms/Loading";

interface ProtectedRouteProps {
	children: ReactNode;
	registerRequired?: Boolean;
}

const ProtectedRoute = ({ children, registerRequired = false }: ProtectedRouteProps) => {
	const router = useRouter();
	const { isLoading, user, error } = useSelector(useAuthSlice);

	useEffect(() => {
		if (!isLoading && !registerRequired && !error && user._id) {
			router.replace("/app");
		}
		if (!isLoading && registerRequired && (!user._id || error)) {
			router.replace("/auth/login");
		}
	}, [router, isLoading, error, user._id]);
	return (
		<>
			{isLoading && <Loading />}
			{!isLoading && registerRequired && !error && user._id && <>{children}</>}

			{!isLoading && !registerRequired && !user._id && <>{children}</>}
		</>
	);
};

export default ProtectedRoute;

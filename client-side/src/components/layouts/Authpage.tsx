import React, { ReactNode } from "react";
import ProtectedRoute from "../molecules/ProtectedRoute";

const Component = ({ children }: { children: ReactNode }) => {
	return <>{children}</>;
};

const AuthPage = ({ children }: { children: ReactNode; isAdmin?: boolean }) => {
	return (
		<ProtectedRoute loginRequired={false} auth={true}>
			<Component>{children}</Component>
		</ProtectedRoute>
	);
};

export default AuthPage;

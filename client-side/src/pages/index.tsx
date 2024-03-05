import PrimaryButton from "@/components/atoms/PrimaryButton";
import { useState } from "react";

export default function Home() {
	const [tcsAccepted, setTcsAccepted] = useState(false);
	return (
		<main className="w-full h-auto min-h-screen flex items-center justify-center bg-bg">
			<div className="w-[250px]">
				<PrimaryButton text="Test" isLoading={true} />
			</div>
		</main>
	);
}

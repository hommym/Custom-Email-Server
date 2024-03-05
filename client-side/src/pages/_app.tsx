import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import makeStore from "@/store";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

import InitialDispatch from "@/components/molecules/InitialDispatch";

const store = makeStore();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<InitialDispatch>
				<Component {...pageProps} />
				<ToastContainer />
			</InitialDispatch>
		</Provider>
	);
}

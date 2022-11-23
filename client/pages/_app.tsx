import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Transition from "../components/Transition";
import { useEffect } from "react";
import { useAppDispatch } from "../redux";
import { refreshUser } from "../redux/user.reducer";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Transition>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Transition>
  );
}

export default MyApp;

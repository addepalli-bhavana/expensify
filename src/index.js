import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import App from "./App";
import NoInternet from "./components/NoInternet";
import "./index.css";
import { store } from "./store.js";

const Index = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(window.navigator.onLine);
    };
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);
    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  return isOnline ? (
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-right"
        pauseOnFocusLoss={false}
        closeOnClick
        theme="colored"
      />
    </Provider>
  ) : (
    <NoInternet />
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);

serviceWorkerRegistration.register();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { ProductProvider } from "./UserContext";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ProductProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ProductProvider>
	</React.StrictMode>
);
reportWebVitals();

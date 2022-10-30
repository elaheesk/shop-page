import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import Favourites from "./pages/Favourites";
import CheckOut from "./pages/CheckOut";
import Products from "./pages/Products";
import Product from "./pages/Product";
import SearchField from "./pages/SearchField";
import { Grid } from "@mui/material";

const App = () => {
	return (
		<Grid container direction="column" padding={2} spacing={3}>
			<Grid container direction="row" item>
				<NavigationBar />
			</Grid>
			<Grid item>
				<Routes>
					<Route path="products/:id" element={<Product />} />
					<Route path="products" element={<Products />} />
					<Route path="favourites" element={<Favourites />} />
					<Route path="checkout" element={<CheckOut />} />
					<Route path="searchfield" element={<SearchField />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</Grid>
		</Grid>
	);
};
export default App;

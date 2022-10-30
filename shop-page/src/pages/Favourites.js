import React from "react";
import { ContextFunction } from "../UserContext";
import ProductCard from "../components/ProductCard";
import { Grid, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const Favourites = () => {
	const { favouriteProducts } = ContextFunction();

	return (
		<Grid>
			<Typography fontWeight={"light"} variant="h4">
				Favourites
			</Typography>

			<Grid container direction="row">
				{favouriteProducts.length ? (
					favouriteProducts.map((favouriteProd, index) => (
						<Grid key={index} item marginRight={3} marginY={3}>
							<ProductCard key={index} product={favouriteProd} />
						</Grid>
					))
				) : (
					<Typography fontWeight={"light"} variant="h4">
						{" "}
						No likes{" "}
						<SentimentVeryDissatisfiedIcon fontSize="large">
							{" "}
						</SentimentVeryDissatisfiedIcon>
					</Typography>
				)}
			</Grid>
		</Grid>
	);
};
export default Favourites;

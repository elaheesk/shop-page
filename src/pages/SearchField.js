import React from "react";
import { ContextFunction } from "../UserContext";
import ProductCard from "../components/ProductCard";
import { Grid, TextField, Autocomplete, Box, Typography } from "@mui/material";

const SearchField = () => {
	const { products } = ContextFunction();
	const [searchTextValue, setSearchTextValue] = React.useState(null);

	React.useEffect(() => {
		if (searchTextValue) {
			const foundBla = products.find(
				(item) => item?.id === searchTextValue?.id
			);
			setSearchTextValue(foundBla);
		}
	}, [products]);
	return (
		<Grid container direction="column" spacing={5}>
			<Grid item>
				<Grid container>
					<Typography
						component="h1"
						variant="h4"
						fontWeight="light"
						gutterBottom>
						Start seraching for items
					</Typography>
					<Grid item>
						<Autocomplete
							getOptionLabel={(option) => option.title}
							options={products}
							sx={{ width: 400 }}
							id="controlled-demo"
							value={searchTextValue}
							onChange={(event, newSearchedValue) => {
								setSearchTextValue(newSearchedValue);
							}}
							renderOption={(props, option) => (
								<Box
									component="li"
									sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
									{...props}>
									<img loading="lazy" width="20" src={option.image} alt="" />
									{option.title} ({option.price})
								</Box>
							)}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Search for item"
									inputProps={{
										...params.inputProps,
										autoComplete: "new-password",
									}}
								/>
							)}
						/>
					</Grid>
				</Grid>
			</Grid>
			{searchTextValue && (
				<Grid item>
					<ProductCard product={searchTextValue} />
				</Grid>
			)}
		</Grid>
	);
};
export default SearchField;

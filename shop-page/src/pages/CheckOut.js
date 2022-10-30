import React from "react";
import { ContextFunction } from "../UserContext";
import { Link } from "react-router-dom";
import {
	ExpandMore as ExpandMoreIcon,
	Add as AddIcon,
	Favorite as FavoriteIcon,
	Remove as RemoveIcon,
	Delete as DeleteIcon,
	SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
} from "@mui/icons-material";

import {
	Box,
	Modal,
	ImageListItem,
	CardHeader,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Typography,
	TextField,
	IconButton,
	CardActions,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Rating,
	Skeleton,
} from "@mui/material";

const CheckOut = () => {
	const {
		products,
		setProducts,
		checkOutProducts,
		increaseProductAmount,
		decreaseProductAmount,
		likeProduct,
		countTotalAmountProducts,
	} = ContextFunction();

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};
	const deleteProduct = (prodToRemove) => {
		const zeroAmount = products.map((product) => {
			if (prodToRemove.id === product.id) {
				return { ...product, amount: 0 };
			} else {
				return product;
			}
		});
		setProducts(zeroAmount);
	};
	return (
		<Grid container direction="column" spacing={5}>
			<Grid item>
				<Grid container justifyContent="space-between">
					<Grid item>
						{countTotalAmountProducts ? (
							<Typography
								component="h1"
								variant="h5"
								fontWeight="light"
								gutterBottom>
								Shopping Cart({countTotalAmountProducts} products)
							</Typography>
						) : (
							<React.Fragment>
								<Typography
									component="h1"
									variant="h6"
									fontWeight="light"
									gutterBottom>
									You have no products in your bag...
								</Typography>
								<SentimentVeryDissatisfiedIcon fontSize="large" />
							</React.Fragment>
						)}
					</Grid>
					<Grid item>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header">
								<Typography fontWeight={"light"}>
									Lägg till en rabattkod (Valfritt)
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<TextField fullWidth></TextField>
							</AccordionDetails>
						</Accordion>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Grid container direction="column">
					{checkOutProducts.map((checkedOut, index) => (
						<Card
							key={checkedOut.id}
							sx={{
								width: 330,
								height: 420,
								boxShadow: "0 4px 5px 4px rgba(125, 149, 216, 0.7)",
							}}>
							<CardHeader
								action={
									<IconButton onClick={() => likeProduct(checkedOut)}>
										{checkedOut.liked ? (
											<FavoriteIcon style={{ fill: "red" }} />
										) : (
											<FavoriteIcon style={{ fill: "gray" }} />
										)}
									</IconButton>
								}
								title={
									<Typography
										sx={{ fontSize: "0.8rem" }}
										color="text.secondary"
										gutterBottom>
										{checkedOut.title}
									</Typography>
								}
							/>

							<CardContent>
								<Grid justifyContent="space-between" container>
									<Grid item>
										<Typography sx={{ fontSize: "0.9rem" }}>
											{checkedOut["rating"]["rate"]} Stars
										</Typography>
										<Rating
											name="read-only"
											//readOnly
											defaultValue={checkedOut["rating"]["rate"]}
											precision={0.5}
											size="small"
										/>
									</Grid>
									<Grid item>
										<Typography fontWeight={"light"} variant="caption">
											<Link to={`/products/${checkedOut.id}`}>Read more</Link>
										</Typography>
									</Grid>
								</Grid>
							</CardContent>
							<Modal
								open={open}
								onClose={handleClose}
								aria-labelledby="modal-modal-title"
								aria-describedby="modal-modal-description">
								<Box sx={style}>
									<Typography
										id="modal-modal-title"
										variant="h6"
										component="h2">
										Description
									</Typography>
									<Typography id="modal-modal-description" sx={{ mt: 2 }}>
										{checkedOut.description}
									</Typography>
								</Box>
							</Modal>

							<Grid container direction="row" justifyContent="space-evenly">
								<ImageListItem>
									<CardMedia
										onClick={handleOpen}
										component="img"
										height="180"
										image={checkedOut.image}
										alt={checkedOut.title}
									/>
								</ImageListItem>
							</Grid>
							<Grid container justifyContent="space-between" paddingRight={2}>
								<Grid item>
									<CardActions disableSpacing>
										<IconButton
											onClick={() => increaseProductAmount(checkedOut)}
											aria-label="add"
											size="sm">
											<AddIcon fontSize="small" />
										</IconButton>

										<Skeleton
											elevation={3}
											width="100%"
											height={20}
											variant="rectangular">
											{checkedOut.amount}
										</Skeleton>

										<IconButton
											onClick={() => decreaseProductAmount(checkedOut)}
											aria-label="remove"
											size="sm">
											<RemoveIcon fontSize="small" />
										</IconButton>
										<IconButton
											onClick={() => deleteProduct(checkedOut)}
											aria-label="delete">
											<DeleteIcon />
										</IconButton>
									</CardActions>
								</Grid>
								<Grid item>
									<Typography variant="caption">
										${checkedOut.price}
										<br />
										Total: ${(checkedOut.price * checkedOut.amount).toFixed(2)}
									</Typography>
								</Grid>
							</Grid>
						</Card>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};
export default CheckOut;

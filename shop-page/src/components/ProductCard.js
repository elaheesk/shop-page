import React from "react";
import { ContextFunction } from "../UserContext";
import { Link } from "react-router-dom";
import {
	Favorite as FavoriteIcon,
	Remove as RemoveIcon,
	Add as AddIcon,
} from "@mui/icons-material";

import {
	Grid,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Typography,
	IconButton,
	CardActions,
	Rating,
	Skeleton,
	ImageListItem,
	Box,
	Modal,
} from "@mui/material";

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

const ProductCard = ({ product }) => {
	const { increaseProductAmount, decreaseProductAmount, likeProduct } =
		ContextFunction();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Card
			sx={{
				width: 330,
				height: 420,
				boxShadow: "0 4px 5px 4px rgba(125, 149, 216, 0.7)",
			}}>
			<CardHeader
				action={
					<IconButton onClick={() => likeProduct(product)}>
						{product.liked ? (
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
						{product.title}
					</Typography>
				}
			/>

			<CardContent>
				<Grid justifyContent="space-between" container>
					<Grid item>
						<Typography sx={{ fontSize: "0.9rem" }}>
							{product["rating"]["rate"]} Stars
						</Typography>
						<Rating
							name="read-only"
							//readOnly
							defaultValue={product["rating"]["rate"]}
							precision={0.5}
							size="small"
						/>
					</Grid>
					<Grid item>
						<Typography fontWeight={"light"} variant="caption">
							<Link to={`/products/${product.id}`}>Read more</Link>
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
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Description
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{product.description}
					</Typography>
				</Box>
			</Modal>

			<Grid container direction="row" justifyContent="space-evenly">
				<ImageListItem>
					<CardMedia
						onClick={handleOpen}
						component="img"
						height="180"
						image={product.image}
						alt={product.title}
					/>
				</ImageListItem>
			</Grid>
			<Grid container justifyContent="space-between" paddingRight={2}>
				<Grid item>
					<CardActions disableSpacing>
						<IconButton
							onClick={() => increaseProductAmount(product)}
							aria-label="add"
							size="sm">
							<AddIcon fontSize="small" />
						</IconButton>

						{product.amount > 0 ? (
							<Skeleton
								elevation={3}
								width="100%"
								height={20}
								variant="rectangular">
								{product.amount}
							</Skeleton>
						) : null}
						<IconButton
							disabled={product.amount ? false : true}
							onClick={() => decreaseProductAmount(product)}
							aria-label="remove"
							size="sm">
							<RemoveIcon fontSize="small" />
						</IconButton>
					</CardActions>
				</Grid>
				<Grid item>
					<Typography variant="caption">
						${product.price}
						<br />
						Total: ${(product.price * product.amount).toFixed(2)}
					</Typography>
				</Grid>
			</Grid>
		</Card>
	);
};
export default ProductCard;

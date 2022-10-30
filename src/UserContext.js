import React, { useState, useEffect, createContext, useContext } from "react";
const UserContext = createContext();

export const ProductProvider = (props) => {
	const [products, setProducts] = useState([]);
	const [favouriteProducts, setFavouriteProducts] = useState([]);
	const [checkOutProducts, setCheckOutProducts] = React.useState([]);
	const [countTotalAmountProducts, setCountTotalAmountProducts] = useState(0);
	const [totalPriceAllProducts, setTotalPriceAllProducts] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const resp = await fetch("https://fakestoreapi.com/products");
			const data = await resp.json();
			const addNewProperty = data.map((product) => {
				return { ...product, liked: false, amount: 0 };
			});
			setProducts(addNewProperty);

			console.log(addNewProperty);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const myFavouriteProducts = products.filter((product) => {
			if (product.liked === true) {
				return product;
			}
		});
		const mycheckoutProducts = products.filter((product) => {
			if (product.amount > 0) {
				return product;
			}
		});
		setFavouriteProducts(myFavouriteProducts);
		setCheckOutProducts(mycheckoutProducts);
	}, [products]);

	useEffect(() => {
		calculateTotal();

		calculatePriceAllProducts();
	});

	const likeProduct = (likedProd) => {
		const changePropertyValue = products.map((product) => {
			if (likedProd.id === product.id) {
				return { ...product, liked: !product.liked }; //här ändrar vi värdet till motsatsen av defaultvärdet av liked. om liked är true ändras det till motsatsen false, om liked är false ändras det till motstsen true. liked: !product.liked
			} else {
				return product;
			}
		});
		setProducts(changePropertyValue);
	};

	const calculateTotal = () => {
		const countTotalAmountProducts = products.reduce((total, product) => {
			return total + product.amount;
		}, 0);
		setCountTotalAmountProducts(countTotalAmountProducts);
	};

	const calculatePriceAllProducts = () => {
		const totalPriceAllProducts = products.reduce((total, prod) => {
			return (total += prod.price * prod.amount);
		}, 0);

		setTotalPriceAllProducts(totalPriceAllProducts);
	};
	const subTotalSingleProduct = () => {
		const newPrice = products.map((prod) => {
			return prod.price * prod.amount;
		});
		calculatePriceAllProducts();
	};

	const increaseProductAmount = (increasedProd) => {
		const increasedAmountProducts = products.map((product) => {
			if (increasedProd.id === product.id) {
				return { ...product, amount: product.amount + 1 };
			} else {
				return product;
			}
		});
		setProducts(increasedAmountProducts);
		subTotalSingleProduct();

		calculateTotal();
		calculatePriceAllProducts();
	};

	const decreaseProductAmount = (decreasedProd) => {
		const decreasedAmountProducts = products.map((product) => {
			if (decreasedProd.id === product.id) {
				return { ...product, amount: product.amount - 1 };
			} else {
				return product;
			}
		});
		setProducts(decreasedAmountProducts);
		calculateTotal();
		calculatePriceAllProducts();
	};

	return (
		<UserContext.Provider
			value={{
				products,
				setProducts,
				increaseProductAmount,
				decreaseProductAmount,
				countTotalAmountProducts,
				totalPriceAllProducts,
				likeProduct,
				favouriteProducts,
				checkOutProducts,
			}}>
			{props.children}
		</UserContext.Provider>
	);
};
export const ContextFunction = () => {
	return useContext(UserContext);
};
export default UserContext;

import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import CheckOut from "./pages/CheckOut";
import Products from "./pages/Products";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}));
test("renders the home page", () => {
	() => {
		render(<Home />);
		const title = screen.getByText(/Elahe Eskandari/i);
		expect(title).toBeInTheDocument();
	};
});

test("renders the Checkout page", () => {
	() => {
		render(<CheckOut />);
		const title = screen.getByText(/Description/i);
		expect(title).toBeInTheDocument();
	};
});

test("Should navigate to Products page when button is clicked", () => {
	() => {
		const navigateBtn = screen.getByText("Products");
		fireEvent.click(navigateBtn);
		mockedUsedNavigate("/products");
		render(<Products recommendedDrugs={drug} />);
		const subtitle = screen.getByText(/Products/i);
		expect(subtitle).toBeInTheDocument();
	};
});

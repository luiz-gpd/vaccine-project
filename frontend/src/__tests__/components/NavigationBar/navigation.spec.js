import NavigationBar from "../../../components/NavigationBar"
import AppContext, { initialState } from "../../../AppContext"
import { render, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

const NavigationBarWrapper = ({ state = initialState, dispatch }) => (
    <AppContext.Provider value={[state, dispatch]}>
        <BrowserRouter>
            <NavigationBar />
        </BrowserRouter>
    </AppContext.Provider>
);

describe("NavigationBar component", () => {
    it("renders", () => {
        const { asFragment } = render(<NavigationBarWrapper />);

        expect(asFragment()).toMatchSnapshot();
    });

    it("renders with context data", async () => {
        const { container, getByTestId } = render(<NavigationBarWrapper />);

        expect(container.querySelectorAll(".dynamic-route")).toHaveLength(2);

        const navLink = await waitFor(() => getByTestId('Agendamento'))
        fireEvent.click(navLink);
    });
});
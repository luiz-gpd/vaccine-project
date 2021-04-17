import NavigationBar from "../../../components/NavigationBar";

import AppContext, { initialState } from "../../../AppContext";

import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const NavigationBarWrapper = ({ state = initialState, dispatch }) => (
    <AppContext.Provider value={[state, dispatch]}>
        <BrowserRouter>
            <NavigationBar />
        </BrowserRouter>
    </AppContext.Provider>
);

describe("NavigationBar", () => {
    it("renders", () => {
        const { asFragment } = render(<NavigationBarWrapper />);

        expect(asFragment()).toMatchSnapshot();
    });

    it("renders with context data", () => {
        const { container } = render(<NavigationBarWrapper />);

        expect(container.querySelectorAll(".dynamic-route")).toHaveLength(2);
        
        // const navLink = container.querySelectorAll(".nav-link");

        // fireEvent.click(navLink);
    });
});
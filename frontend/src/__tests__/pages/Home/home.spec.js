import Home from "../../../pages/Home";
import useHistory from 'react-router'
import { render, fireEvent, waitFor } from "@testing-library/react";

describe("Home Page", () => {
    const history=useHistory;
    it("renders", () => {
        const { asFragment } = render(<Home
            history={history}
        />);

        expect(asFragment()).toMatchSnapshot();
    });
    it("Should submit when clicking on the button", async () => {
        const history=useHistory;
        const { queryByTestId } = render(<Home
            history={history}
        />);
    
        const homeButton = await waitFor(() => queryByTestId('homeButton'))
        fireEvent.click(homeButton);
    });
});
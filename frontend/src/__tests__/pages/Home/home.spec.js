import Home from "../../../pages/Home"
import { createMemoryHistory } from 'history'
import { render, fireEvent, waitFor } from "@testing-library/react"

describe("Home Page", () => {
    const history = createMemoryHistory;

    it("renders", () => {
        const { asFragment } = render(<Home
            history={history}
        />);

        expect(asFragment()).toMatchSnapshot();
    });
    it("Should submit when clicking on the button", async () => {
        const history = createMemoryHistory;
        
        const { getByTestId } = render(<Home
            history={history}
        />);
    
        // const homeButton = await waitFor(() => getByTestId('homeButton'))
        // fireEvent.click(homeButton)
    });
});
import Agendamento from "../../../pages/Agendamento"
import AppContext, { initialState } from "../../../AppContext"
import { render, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

const AgendamentoWrapper = ({ state = initialState, dispatch }) => (
    <AppContext.Provider value={[state, dispatch]}>
        <BrowserRouter>
            <Agendamento/>
        </BrowserRouter>
    </AppContext.Provider>
);

describe("Agendamento page", () => {
    it("renders", () => {
        const { asFragment } = render(<AgendamentoWrapper />);

        expect(asFragment()).toMatchSnapshot();
    });
    
    it("Button should submit when clicked", async () => {
        const { container } = render(<AgendamentoWrapper />);

        const formButton = container.querySelector(
            'button[type="submit"]'
          );
        
        await waitFor(() => {
          fireEvent.click(formButton);
        })
    });
});
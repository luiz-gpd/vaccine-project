import Table from "../../../components/Table";

import AppContext, { initialState } from "../../../AppContext"

import { fireEvent, render } from "@testing-library/react"

const TableWrapper = ({ state = initialState, dispatch }) => (
    <AppContext.Provider value={[state, dispatch]}>
            <Table />
    </AppContext.Provider>
);

describe("Table Component", () => {
    it("renders", () => {
        const { asFragment } = render(<TableWrapper />);

        expect(asFragment()).toMatchSnapshot();
    });
    it("renders with context data", () => {
        const dispatch = jest.fn();
    
        const { container, queryByText, queryByTestId } = render(
          <TableWrapper
            state={{
              ...initialState,
              search: false
            }}
            usersPerPage="10"
            pageNumber="1"
            dispatch={dispatch}
          />
        );

        expect(queryByText("Nome")).toBeTruthy();
        expect(queryByText("Idade")).toBeTruthy();
        expect(queryByText("Horário da Vacina")).toBeTruthy();
        expect(queryByText("Atendimento")).toBeTruthy();

        // const infoButton = queryByTestId('table-button');
        // fireEvent.click(infoButton);
    
        // const infoButton = queryByTestId('table-toggle');
        // fireEvent.click(infoButton);
    
        // expect(dispatch).toHaveBeenCalledTimes(1);
        // expect(dispatch).toHaveBeenLastCalledWith({
        //   type: "SET_MODAL",
        //   payload: null,
        // });
    });
});
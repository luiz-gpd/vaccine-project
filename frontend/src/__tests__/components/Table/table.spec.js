import Table from "../../../components/Table";

import AppContext, { initialState } from "../../../AppContext";

import { render } from "@testing-library/react";

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
    
        const { queryByText } = render(
          <TableWrapper
            state={{
              ...initialState,
              search: false
            }}
            dispatch={dispatch}
          />
        );

        expect(queryByText("Nome")).toBeTruthy();
        expect(queryByText("Idade")).toBeTruthy();
        expect(queryByText("Horário da Vacina")).toBeTruthy();
        expect(queryByText("Atendimento")).toBeTruthy();
    
        // const infoButton = getByTitle('table-button');
    
        // fireEvent.click(infoButton);
    
        // expect(dispatch).toHaveBeenCalledTimes(1);
        // expect(dispatch).toHaveBeenLastCalledWith({
        //   type: "SET_MODAL",
        //   payload: null,
        // });
    });
});
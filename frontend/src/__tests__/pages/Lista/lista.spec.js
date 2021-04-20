import Lista from "../../../pages/Lista"

import AppContext, { initialState } from "../../../AppContext"

import { render, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";

const ListaWrapper = ({ state = initialState, dispatch }) => (
    <AppContext.Provider value={[state, dispatch]}>
        <BrowserRouter>
            <Lista />
        </BrowserRouter>
    </AppContext.Provider>
);

describe("Lista page", () => {
    it("renders", () => {
        const { asFragment } = render(<ListaWrapper />);

        expect(asFragment()).toMatchSnapshot();
    });

    it("Button should submit when clicked", async () => {
        const dispatch = jest.fn();

        const { debug } = render(
            <ListaWrapper
                state={{
                    ...initialState,
                    search: "search",
                    modalInfo: {
                        userId: "6073716197bf474d08d1098f",
                        info: "Tudo bem",
                        visible: false
                    },
                }}
                users={ {
                    name:"Luiz",
                    age:"19"
                } }
                dispatch={dispatch}
            />
        );
        // const fieldNode = await waitFor(
        //     () => queryByTestId('search-input')
        // )
        // fireEvent.change(
        //     fieldNode,
        //     { target: { value: 'test' } }
        // )

        // expect(fieldNode.value).toEqual(test)

        debug(undefined, 300000);

    });
});
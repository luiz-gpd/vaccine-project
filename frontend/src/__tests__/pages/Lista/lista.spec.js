import Lista from "../../../pages/Lista"
import React from 'react'
import AppContext, { initialState } from "../../../AppContext"
import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import { renderHook } from '@testing-library/react-hooks'

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

    it("On changing Input should call dispatch for changig search value", async () => {
        const dispatch = jest.fn();
        const myInitialState = 
             [ {
                name: "Luiz",
                age: "19"
            }]
        
        React.useState = jest.fn().mockReturnValue([myInitialState, {}])

        render(
            <ListaWrapper
                state={{
                    ...initialState,
                    search: "search",
                    modalInfo: {
                        userId: "6073716197bf474d08d1098f",
                        info: "Tudo bem",
                        visible: true
                    },
                }}
                dispatch={dispatch}
            />
        );

        const fieldNode = await waitFor(
            () => screen.queryByTestId('search-input')
        )
        fireEvent.change(
            fieldNode,
            { target: { value: "test" } }
        )

        expect(fieldNode.value).toEqual('search')

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenLastCalledWith({
          type: "USE_SEARCH",
          payload: "test",
        });

    });
    // it("UseEffect should set users with data from the backend", () => {
    //     const myInitialState = 
    //          [ {
    //             name: "Luiz",
    //             age: "19"
    //         }]

    //     const { result } = renderHook(() => Lista(myInitialState))
    //     expect(result.current).toBeUndefined();

    // });
});
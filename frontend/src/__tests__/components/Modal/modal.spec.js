import Modal from '../../../components/Modal/index'

import AppContext, { initialState } from '../../../AppContext'

import { render, waitFor, fireEvent, screen } from "@testing-library/react";

const ModalWrapper = ({ state = initialState, dispatch }) => (
    <AppContext.Provider value={[state, dispatch]}>
            <Modal />
    </AppContext.Provider>
);

describe("Modal component", () => {
    it("renders", () => {
        const { asFragment } = render(<ModalWrapper/>)

        expect(asFragment()).toMatchSnapshot();
    });

    it("Should change when writing on the input", async () => {
        
        const { queryByTestId } = render(<ModalWrapper 
        visible={true}
        />)

        // const fieldNode = await waitFor(
        //     () => queryByTestId('formField')
        // ) 
        // fireEvent.change(
        //     fieldNode,
        //     { target: { value: 'test'}}
        // )

        // expect(fieldNode.value).toEqual(test)

        const btnNode = await waitFor(() => queryByTestId('formButtonSave'))
        fireEvent.click(btnNode);

    });
});
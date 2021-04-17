import Modal from '../../../components/Modal'

import { render, fireEvent } from "@testing-library/react";

describe("Modal component", () => {
    it("renders", () => {
        const { asFragment } = render(<Modal />)

        expect(asFragment()).toMatchSnapshot();
    });

    it("renders with context data", () => {
        const { queryByText } = render(
            <Modal visible={false}
            // onClose=
            // observer=
            title="modal1"
            id="modal1"
            >Tudo bem</Modal>
        );

        // const savingButton = queryByText("Salvar");

        // fireEvent.click(savingButton)

    })
});
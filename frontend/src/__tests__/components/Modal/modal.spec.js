import Modal from '../../../components/Modal/index'

import AppContext, { initialState } from '../../../AppContext'

import { render, screen, fireEvent } from "@testing-library/react"

const ModalWrapper = ({ state = initialState, dispatch }) => (
    <AppContext.Provider value={[state, dispatch]}>
        <Modal />
    </AppContext.Provider>
);

function renderModalWrapper() {
    render(<ModalWrapper/>);
  
    return {
      form: {
        get change() {
          return screen.getByTestId('formField');
        },
        get buttonClose() {
          return screen.queryByText('Fechar');
        }
      }
    };
  }

describe("Modal component", () => {
    it("renders", () => {
        const { asFragment } = render(<ModalWrapper />)

        expect(asFragment()).toMatchSnapshot();
    });

    it("Should change when writing on the input", () => {
        const onClose = jest.fn();
        const observer = jest.fn();
        render(<ModalWrapper
            visible={true}
            showChange={true}
            onClose={onClose}
            observer={observer}
            title="Título"
            id="6073716197bf474d08d1098f"
        >
            <span>Tudo bem!</span>
        </ModalWrapper>)

        // const {change} = renderModalWrapper;

        // expect(change).not.toBeNull();

        // fireEvent.click(buttonClose);

        // fireEvent.change(change, { target: { value: "test" } })
        // expect(change.value).toBe("test")

        // const btnNode = await waitFor(() => queryByTestId('formButtonSave'))
        // fireEvent.click(btnNode);

        // const btnNode = queryByTestId("formButtonSave");

    });
});
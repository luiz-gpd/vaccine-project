import Toast from "../../../components/Toast"
import { render } from "@testing-library/react"

describe("Toast component", () => {
    it("renders", () => {
        const { asFragment } = render(
            <Toast
            toast={[1000]}
          >
          </Toast>);

        expect(asFragment()).toMatchSnapshot();
    });
    it("renders with props", () => {
    
        const { queryByText } = render(
          <Toast
            title="Título"
            type="success"
            toast={[1000]}
          >
              <div className="information">
                    <span>Uno</span>
                    <span>Due</span>
                    <span>Tre</span>
                </div>
          </Toast>
        );
        expect(queryByText("Título")).toBeTruthy();
        expect(queryByText("Uno")).toBeTruthy();
        expect(queryByText("Due")).toBeTruthy();
        expect(queryByText("Tre")).toBeTruthy();
    });
});
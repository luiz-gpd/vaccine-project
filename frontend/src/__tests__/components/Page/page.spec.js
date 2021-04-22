import Page from "../../../components/Page"

import { render } from "@testing-library/react";

describe("Page Component", () => {
    it("renders", () => {
        const { asFragment } = render(<Page />);

        expect(asFragment()).toMatchSnapshot();
    });

    it("render with props", () => {
        const { queryByText } = render(
            <Page title="Título">
                <div className="information">
                    <span>Uno</span>
                    <span>Due</span>
                    <span>Tre</span>
                </div>
            </Page>
        );

        expect(queryByText("Título")).toBeTruthy();
        expect(queryByText("Uno")).toBeTruthy();
        expect(queryByText("Due")).toBeTruthy();
        expect(queryByText("Tre")).toBeTruthy();
    });
});

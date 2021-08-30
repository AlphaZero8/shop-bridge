import { render, screen } from "../../../test/testUtils";

import ShopBridgeSummary from "./ShopBridgeSummary";

describe('<ShopBridgeSummary />', () => {
    beforeEach(() => {
        render(<ShopBridgeSummary />);
    });

    it('displays summary heading', () => {
        const heading = screen.getByText(/welcome*/i);

        expect(heading).toBeInTheDocument();
    });

    it('displays summary sub-heading', () => {
        const subHeading = screen.getByText(/a tool*/i);

        expect(subHeading).toBeInTheDocument();
    });

    it('displays summary', () => {
        const summary = screen.getByText(/the platform currently offers*/i);

        expect(summary).toBeInTheDocument();
    });
});
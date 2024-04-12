import { render, screen } from "@testing-library/react";

import { BoxHeader } from "./box-header";

describe("Component: BoxHeader", () => {
  it("should render a BoxHeader component", () => {
    const title = "Title";
    const description = "Description";

    render(<BoxHeader title={title} description={description} />);

    expect(screen.getByTestId("box-header-div")).toBeInTheDocument();

    const titleDiv = screen.getByTestId("box-header-title");
    expect(titleDiv).toBeInTheDocument();
    expect(titleDiv).toHaveTextContent(title);

    const descriptionDiv = screen.getByTestId("box-header-description");
    expect(descriptionDiv).toBeInTheDocument();
    expect(descriptionDiv).toHaveTextContent(description);
  });
});

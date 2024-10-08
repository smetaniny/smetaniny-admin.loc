import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("renders App component", () => {
  render(<App />);
  const adminElement = screen.getByText(/Admin/i);
  expect(adminElement).toBeInTheDocument();
});

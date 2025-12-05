import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../Counter";



test("renders with initial count of 0", () => {
  render(<Counter />);
  
  // Use getByRole to ensure the element is actually a button (good for a11y)
  // Use a regex to be flexible with whitespace or casing if needed
  const button = screen.getByRole("button", { name: /count is 0/i });
  
  expect(button).toBeInTheDocument();
});

test("increments count when button is clicked", async () => {
  // 1. Setup the user session (Best practice in modern RTL)
  const user = userEvent.setup();

  render(<Counter />);

  // 2. Find the element
  // We check for the initial state text to ensure we have the right button
  const button = screen.getByRole("button", { name: /count is 0/i });

  // 3. Interact
  // userEvent interactions are asynchronous
  await user.click(button);

  // 4. Assert
  // Check that the text within the button has updated
  expect(button).toHaveTextContent("count is 1");
  
  // Optional: Click again to verify sequence
  await user.click(button);
  expect(button).toHaveTextContent("count is 2");
});
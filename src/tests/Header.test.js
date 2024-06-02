import { screen } from "@testing-library/react";
import Header from "../components/Header";
import { renderWithProviders } from "../utils/test-utils";

describe('HeaderBanner Component', () => {
  test('renders without crashing', () => {
  renderWithProviders(<Header />);
  expect(screen.getByText(/Welcome to Modern Photos/i)).toBeInTheDocument();
});

test('contains the heading', () => {
  renderWithProviders(<Header />);
  const headingElement = screen.getByRole('heading', { level: 1 });
  expect(headingElement).toHaveTextContent('Welcome to Modern Photos, experience seamless loading and filtering of photos.');
});

test('has the correct background image', () => {
  renderWithProviders(<Header />);
  const headerElement = screen.getByRole('banner');
  expect(headerElement).toHaveStyle(`background-image: url('/banner.jpg')`);
});
})
import { render } from "@testing-library/react";
import GalleryCard from "../GalleryCard";

describe("GalleryCard", () => {
  const image = {
    url: "https://example.com/image.jpg",
    title: "Test Title",
    date: "2020-01-01",
    explanation: "A test explanation",
    media_type: "image" as const, // Fix type to literal
  };

  it("renders image and text content (positive)", () => {
    const { getByAltText, getByText } = render(<GalleryCard image={image} />);
    expect(getByAltText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("2020-01-01")).toBeInTheDocument();
    expect(getByText("A test explanation")).toBeInTheDocument();
  });

  it("does not render content for missing image prop (negative)", () => {
    // @ts-expect-error purposely omitting prop
    expect(() => render(<GalleryCard />)).toThrow();
  });
});

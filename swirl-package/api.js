export async function getImageData() {
    const response = await fetch("https://example.com/images");
    const data = await response.json();
    return data;
  }
import React, { useState, useEffect } from "react";
import { getImageData } from "./api";

function ImageDetector({ apiUrl }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setImages(data.images);
      })
      .catch((error) => console.error(error));
  }, [apiUrl]);

  useEffect(() => {
    async function fetchData() {
        const data = await getImageData();
        setImages(data.images);
      }
      fetchData();
      
    const handleResize = () => {
      setAvailableSpace({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [availableSpace, setAvailableSpace] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const randomPosition = (max) => {
    return Math.floor(Math.random() * max) + 1;
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={image.alt}
          style={{
            position: "absolute",
            top: `${randomPosition(availableSpace.height - 100)}px`,
            left: `${randomPosition(availableSpace.width - 100)}px`,
          }}
        />
      ))}
    </div>
  );
}

export default ImageDetector;

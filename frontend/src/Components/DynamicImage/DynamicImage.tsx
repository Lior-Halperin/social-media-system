import { useEffect, useState } from "react";
import { StyledImageWrapper } from "./DynamicImage.styled";
import type { ImageTypes } from "../../assets/images"; // Import the ImageTypes type

interface DynamicImageProps {
  imageName: keyof ImageTypes; // Use keyof ImageTypes to restrict imageName
  alt: string;
  className?: string;
}

function DynamicImage({ imageName, alt, className }: DynamicImageProps): JSX.Element {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    import(`../../assets/images`)
      .then(images => {
        const imageComponents = images as unknown as ImageTypes; // Type assertion
        const imageSrc = imageComponents[imageName];
        if (imageSrc) {
          setImageSrc(imageSrc);
        } else {
          console.error(`Image "${imageName as string }" not found`);
        }
      })
      .catch(err => console.error('Error loading image:', err));
  }, [imageName]);

  return (
    <StyledImageWrapper className={className}>
      {imageSrc ? <img src={imageSrc} alt={alt} /> : null}
    </StyledImageWrapper>
  );
}

export default DynamicImage;

import Image, { ImageProps } from "next/image";
import React from "react";
import { SITE_SETTINGS } from "src/utils/site.setting";

export interface IImageComponentProps extends ImageProps {}

const ImageComponent: React.FC<IImageComponentProps> = ({ src, ...props }) => {
  return (
    <Image
      src={src}
      loading="lazy"
      placeholder="blur"
      objectFit="contain"
      blurDataURL={SITE_SETTINGS.BLUR_PLACEHOLDER_URL}
      {...props}
    />
  );
};
export default ImageComponent;

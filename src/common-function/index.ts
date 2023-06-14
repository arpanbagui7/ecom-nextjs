import { ImgLoader } from "@/Interface";

export const imageLoader = ({ src, width, quality }: ImgLoader) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
import NextImage from "next/image";

interface MDXImageProps {
  src: string;
  alt: string;
  label?: string;
  width?: number;
  height?: number;
}

export default function MDXImage({
  src,
  alt,
  label,
  width = 1120,
  height = 450,
}: MDXImageProps) {
  return (
    <figure className="flex flex-col items-center justify-center w-full my-10 not-prose">
      <div className="relative overflow-visible">
        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover transition-transform duration-500 hover:scale-[1.02] mb-0"
        />
      </div>

      {label && (
        <figcaption className="mt-4 text-sm italic font-medium text-center text-gray-500 dark:text-gray-400">
          {label}
        </figcaption>
      )}
    </figure>
  );
}

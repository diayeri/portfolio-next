"use client";

import {
  ProjectSection,
  TextSection,
  ListSection,
  ImageSection,
  ImageTextSection,
  GallerySection,
} from "@/data/projectSections";
import { Image } from "lucide-react";

interface ProjectsDetailSectionProps {
  sections?: ProjectSection[];
}

export default function ProjectsDetailSection({
  sections,
}: ProjectsDetailSectionProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="flex flex-col gap-8">
      {sections.map((section, idx) => {
        switch (section.type) {
          case "text":
            const textSec = section as TextSection;
            return (
              <p key={idx} className="text-base leading-relaxed text-gray-800">
                {textSec.content}
              </p>
            );

          case "list":
            const listSec = section as ListSection;
            return (
              <div key={idx}>
                {listSec.heading && (
                  <h3 className="mb-2 text-lg font-semibold">
                    {listSec.heading}
                  </h3>
                )}
                <ul className="space-y-1 list-disc list-inside">
                  {listSec.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            );

          case "image":
            const imgSec = section as ImageSection;
            return (
              <figure
                key={idx}
                className={`w-full ${imgSec.layout === "small" ? "max-w-sm mx-auto" : ""}`}
              >
                {/* <Image
                  src={imgSec.src}
                  alt={imgSec.caption || 'Project image'}
                  width={800}
                  height={400}
                  className='object-cover w-full h-auto rounded'
                /> */}
                {imgSec.caption && (
                  <figcaption className="mt-2 text-sm text-center text-gray-500">
                    {imgSec.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "image-text":
            const itSec = section as ImageTextSection;
            return (
              <div
                key={idx}
                className={`flex flex-col ${itSec.layout === "side" ? "md:flex-row md:gap-6" : "gap-4"}`}
              >
                <div
                  className={`${itSec.layout === "side" ? "md:w-1/2" : "w-full"}`}
                >
                  {/* <Image
                    src={itSec.image}
                    alt='Project image'
                    width={600}
                    height={400}
                    className='object-cover w-full h-auto rounded'
                  /> */}
                </div>
                <div
                  className={`${itSec.layout === "side" ? "md:w-1/2" : ""} text-gray-800`}
                >
                  <p>{itSec.content}</p>
                </div>
              </div>
            );

          case "gallery":
            const galSec = section as GallerySection;
            return (
              <div
                key={idx}
                className={
                  galSec.layout === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 gap-4"
                    : "overflow-x-auto flex gap-4"
                }
              >
                {galSec.images.map((img, i) => (
                  <div key={i} className="flex-shrink-0 w-full md:w-auto">
                    {/* <Image
                      src={img}
                      alt={`Gallery image ${i + 1}`}
                      width={400}
                      height={300}
                      className='object-cover w-full h-auto rounded'
                    /> */}
                  </div>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

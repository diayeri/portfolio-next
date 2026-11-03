"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./TechMarquee.module.css";

type TechSkillGroup = {
  id: string;
  category: string;
  shortLabel: string;
  skills: string[];
  desc: string;
};

type TechMarqueeProps = {
  groups: TechSkillGroup[];
  additionalSkills?: string[];
};

const TIN_CASE_IMAGE =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/560B9D76-7C0A-42FA-8A07-0A6F4969B6F2.PNG-s08QVRgObgR7SHp8HF1vuehVaHudYC.png";
const DETAIL_ID = "tech-marquee-detail";

const logos = [
  { src: "/logos/html.svg", alt: "HTML" },
  { src: "/logos/css.svg", alt: "CSS" },
  { src: "/logos/js.svg", alt: "JavaScript" },
  { src: "/logos/ts.svg", alt: "TypeScript" },
  { src: "/logos/react.svg", alt: "React" },
  { src: "/logos/jquery.svg", alt: "jQuery" },
  { src: "/logos/tailwind.svg", alt: "Tailwind CSS" },
  { src: "/logos/mui.svg", alt: "MUI" },
  { src: "/logos/bootstrap.svg", alt: "Bootstrap" },
  { src: "/logos/figma.svg", alt: "Figma" },
  { src: "/logos/photoshop.svg", alt: "Photoshop" },
  { src: "/logos/illustrator.svg", alt: "Illustrator" },
];

export function TechMarquee({
  groups,
  additionalSkills = [],
}: TechMarqueeProps) {
  const [hoveredGroupId, setHoveredGroupId] = useState<string | null>(null);
  const [focusedGroupId, setFocusedGroupId] = useState<string | null>(null);
  const [mobileGroupId, setMobileGroupId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const activeGroup = groups.find(
    (group) => group.id === (hoveredGroupId ?? focusedGroupId),
  );
  const activeGroupIndex = activeGroup
    ? groups.findIndex((group) => group.id === activeGroup.id) + 1
    : 0;
  const mobileGroup = groups.find((group) => group.id === mobileGroupId);
  const mobileGroupIndex = mobileGroup
    ? groups.findIndex((group) => group.id === mobileGroup.id) + 1
    : 0;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (mobileGroupId && !dialog.open) {
      dialog.showModal();
    } else if (!mobileGroupId && dialog.open) {
      dialog.close();
    }
  }, [mobileGroupId]);

  const openMobileDetails = (groupId: string) => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      setHoveredGroupId(null);
      setFocusedGroupId(null);
      setMobileGroupId(groupId);
    }
  };

  return (
    <section className={styles.container} aria-labelledby="tech-marquee-title">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>The little things</p>
          <h3 className={styles.title} id="tech-marquee-title">
            Technical Expertise
          </h3>
        </div>
        <p className={styles.hint}>Hover, focus or tap to explore</p>
      </div>

      <div
        className={styles.artwork}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setHoveredGroupId(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setHoveredGroupId(null);
            setFocusedGroupId(null);
          }
        }}
      >
        <div
          aria-hidden="true"
          className={styles.photo}
          style={{ backgroundImage: `url("${TIN_CASE_IMAGE}")` }}
        />
        <div className={styles.maskedNote} aria-hidden="true">
          IDEAS · UI · NOTES
        </div>

        {groups.map((group, index) => {
          const isActive = activeGroup?.id === group.id;
          const isMobileSelected = mobileGroup?.id === group.id;

          return (
            <div
              className={styles.hotspot}
              data-position={index}
              key={group.id}
            >
              <button
                aria-label={`${group.category}: ${group.skills.join(", ")}`}
                aria-expanded={isActive || isMobileSelected}
                aria-describedby={isActive ? DETAIL_ID : undefined}
                aria-controls={
                  isMobileSelected
                    ? `tech-dialog-${group.id}-dialog`
                    : isActive
                      ? DETAIL_ID
                      : undefined
                }
                className={styles.hotspotButton}
                onBlur={() => setFocusedGroupId(null)}
                onClick={() => openMobileDetails(group.id)}
                onFocus={() => {
                  if (!window.matchMedia("(pointer: coarse)").matches) {
                    setFocusedGroupId(group.id);
                  }
                }}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") {
                    setHoveredGroupId(group.id);
                  }
                }}
                type="button"
              >
                <span className={styles.hotspotNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.hotspotLabel}>{group.shortLabel}</span>
              </button>
            </div>
          );
        })}

        <div
          aria-hidden={!activeGroup}
          className={`${styles.detailCard} ${activeGroup ? styles.detailCardVisible : ""}`}
          id={DETAIL_ID}
          role="tooltip"
        >
          {activeGroup && (
            <>
              <p className={styles.detailEyebrow}>
                TECH {String(activeGroupIndex).padStart(2, "0")}
              </p>
              <h4 className={styles.detailTitle}>{activeGroup.category}</h4>
              <p className={styles.detailDescription}>{activeGroup.desc}</p>
              <ul className={styles.skillList}>
                {activeGroup.skills.map((skill) => (
                  <li className={styles.skillTag} key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <div className={styles.toolTray}>
        <span className={styles.trayTitle}>Tools in the box</span>
        <ul
          aria-label="Technology logos and supplementary tools"
          className={styles.logoList}
        >
          {logos.map((logo) => (
            <li className={styles.logoItem} key={logo.alt} title={logo.alt}>
              <Image
                alt={logo.alt}
                decoding="async"
                height={16}
                loading="lazy"
                src={logo.src}
                width={16}
              />
            </li>
          ))}
          {additionalSkills.map((skill) => (
            <li className={styles.textTool} key={skill}>
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <dialog
        aria-labelledby={
          mobileGroup ? `tech-dialog-${mobileGroup.id}` : undefined
        }
        className={styles.mobileDialog}
        id={mobileGroup ? `tech-dialog-${mobileGroup.id}-dialog` : undefined}
        onCancel={(event) => {
          event.preventDefault();
          setHoveredGroupId(null);
          setFocusedGroupId(null);
          setMobileGroupId(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setHoveredGroupId(null);
            setFocusedGroupId(null);
            setMobileGroupId(null);
          }
        }}
        onClose={() => {
          setHoveredGroupId(null);
          setFocusedGroupId(null);
          setMobileGroupId(null);
        }}
        ref={dialogRef}
      >
        {mobileGroup && (
          <div className={styles.dialogContent}>
            <div className={styles.dialogTopline}>
              <p className={styles.detailEyebrow}>
                TECH {String(mobileGroupIndex).padStart(2, "0")}
              </p>
              <button
                aria-label={`Close ${mobileGroup.category} details`}
                className={styles.dialogClose}
                onClick={() => {
                  setHoveredGroupId(null);
                  setFocusedGroupId(null);
                  setMobileGroupId(null);
                }}
                type="button"
              >
                Close
              </button>
            </div>
            <h3 className={styles.dialogTitle} id={`tech-dialog-${mobileGroup.id}`}>
              {mobileGroup.category}
            </h3>
            <p className={styles.dialogDescription}>{mobileGroup.desc}</p>
            <ul className={styles.skillList}>
              {mobileGroup.skills.map((skill) => (
                <li className={styles.skillTag} key={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </dialog>
    </section>
  );
}

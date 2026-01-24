"use client";

import { TechMarquee } from "./TechMarquee";

export default function Intro() {
  return (
    <section className="flex flex-col items-center w-full px-10 py-20">
      <div className="mb-12 space-y-2 text-lg text-center">
        <p>
          <strong className="text-primary-dark">
            UI 디자인, 프론트엔드 개발을 주도
          </strong>
          하여 프로젝트를 원활하게 이끌고 진행합니다.
        </p>
        <p>
          <strong className="text-primary-dark">
            꼼꼼한 일정 관리와 반복 점검
          </strong>
          을 통해 오류를 최소화하고 프로젝트의 흐름을 책임집니다.
        </p>
        <p>
          원활한 소통으로 팀 분위기를 긍정적으로 이끌며,{" "}
          <strong className="text-primary-dark">서로 성장하는 협업</strong>을
          추구합니다.
        </p>
        <p>
          자발적으로 의견을 제시하고, 주어진 범위를 넘어{" "}
          <strong className="text-primary-dark">
            다방면의 업무에 적극 참여
          </strong>
          합니다.
        </p>
      </div>
      <TechMarquee />
    </section>
  );
}

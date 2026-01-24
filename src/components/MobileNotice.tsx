"use client";

export default function MobileNotice() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 d md:hidden">
      <p className="px-4 text-lg font-semibold text-center text-white">
        Mobile 뷰는 아직 개발 중입니다. <br />
        PC 뷰에서 확인해주세요.
      </p>
    </div>
  );
}

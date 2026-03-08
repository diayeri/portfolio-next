"use client";

export default function MobileNotice() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 d lg:hidden">
      <p className="px-4 text-lg font-semibold text-center text-white">
        반응형 개발 중입니다. <br />
        PC 뷰에서 확인해주세요.
      </p>
    </div>
  );
}

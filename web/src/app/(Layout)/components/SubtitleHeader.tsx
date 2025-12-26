import Image from "next/image";

type SubtitleHeaderProps = {
  title: string;
};

export default function SubtitleHeader({ title }: SubtitleHeaderProps) {
  return (
    <section className="relative w-full h-[200px] lg:h-[280px] overflow-hidden rounded-b-xl mb-20">
      {/* 배경 이미지 */}
      <Image
        src="/images/globalcampus1.png"
        alt="영진전문대학교 글로벌 캠퍼스 전경, 부제목 배경"
        fill
        className="object-cover"
        priority
      />

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 제목 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-2xl lg:text-4xl font-bold tracking-wide">
          {title}
        </h2>
      </div>
    </section>
  );
}
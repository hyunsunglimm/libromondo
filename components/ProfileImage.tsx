type ProfileImageProps = {
  image: string;
  name: string;
  size: "sm" | "lg";
};

export default function ProfileImage({ image, name, size }: ProfileImageProps) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={`${name}님의 프로필 이미지`}
        className={`border border-black rounded-full object-cover ${size === "sm" ? "w-14 h-14 md:w-8 md:h-8" : size === "lg" ? "w-32 h-32" : ""}`}
      />
    </>
  );
}

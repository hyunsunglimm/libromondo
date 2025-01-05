type SpacingProps = {
  size: number;
  direction?: "vertical" | "horizontal";
  backgroundColor?: string;
};

export default function Spacing({
  size,
  direction = "vertical",
  backgroundColor,
}: SpacingProps) {
  return (
    <div
      style={
        direction === "vertical"
          ? { height: size, backgroundColor, width: "100%" }
          : { width: size, backgroundColor }
      }
    />
  );
}

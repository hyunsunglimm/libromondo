export default function BlockSkeleton({ size }: { size: string }) {
  return <div className={`animate-pulse bg-slate-300 rounded-md ${size}`} />;
}

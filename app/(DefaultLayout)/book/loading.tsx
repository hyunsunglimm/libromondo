import DetailBookSkeleton from "@/components/skeleton/DetailBookSkeleton";

export default function DetailPageLoading() {
  return (
    <div className="mx-auto max-w-[832px] w-full px-4">
      <DetailBookSkeleton />
    </div>
  );
}

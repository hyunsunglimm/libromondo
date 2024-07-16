import BlockSkeleton from "@/components/skeleton/BlockSkeleton";

export default function SavedBooksSkeleton() {
  return (
    <section className="border-t-2 border-black mt-4 pt-4 w-full">
      <div className="flex justify-center">
        <BlockSkeleton size="w-32 h-8" />
      </div>
      <div className="grid grid-cols-4 mt-4 gap-4">
        <BlockSkeleton size="w-full h-72" />
        <BlockSkeleton size="w-full h-72" />
        <BlockSkeleton size="w-full h-72" />
        <BlockSkeleton size="w-full h-72" />
      </div>
    </section>
  );
}

import BlockSkeleton from "@/components/skeleton/BlockSkeleton";
import CircularSkeleton from "@/components/skeleton/CircularSkeleton";

export default function UserProfileSkeleton() {
  return (
    <section className="flex flex-col gap-4 items-center w-full">
      <CircularSkeleton size="lg" />
      <BlockSkeleton size="w-32 h-8" />
      <BlockSkeleton size="w-24 h-10" />
      <BlockSkeleton size="w-full h-[2.375rem]" />
    </section>
  );
}

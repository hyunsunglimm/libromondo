import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationSectionProps = {
  setPrevPage: () => void;
  setNextPage: () => void;
  pageArray: number[];
  setPage: (arg: number) => void;
  currentPage: number;
  isLastPage: boolean;
};

export default function PaginationSection({
  setPrevPage,
  setNextPage,
  pageArray,
  setPage,
  currentPage,
  isLastPage,
}: PaginationSectionProps) {
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage === 1}
            href="#"
            onClick={setPrevPage}
            className="text-3xl md:text-base"
          />
        </PaginationItem>
        {pageArray.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              onClick={() => setPage(p)}
              isActive={p === currentPage}
              className="text-3xl md:text-base"
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            disabled={isLastPage}
            href="#"
            onClick={setNextPage}
            className="text-3xl md:text-base"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

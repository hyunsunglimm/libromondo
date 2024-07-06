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
          />
        </PaginationItem>
        {pageArray.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              onClick={() => setPage(p)}
              isActive={p === currentPage}
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
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

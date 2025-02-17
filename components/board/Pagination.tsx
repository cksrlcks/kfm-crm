import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  size: number;
  totalCount: number;
  pathname: string;
  keyword: string;
}

export default function Pagination({ page, size, totalCount, pathname, keyword }: PaginationProps) {
  const totalPage = Math.ceil(totalCount / size);

  return (
    <PaginationWrapper>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`${pathname}?page=${page - 1}&search=${keyword}`} />
          </PaginationItem>
        )}

        {[...Array(totalPage)].map((_, index) => (
          <PaginationLink
            key={index}
            isActive={index + 1 === page}
            href={`${pathname}?page=${index + 1}&search=${keyword}`}
          >
            {index + 1}
          </PaginationLink>
        ))}

        {page < totalPage && (
          <>
            <PaginationItem>
              <PaginationNext href={`${pathname}?page=${page + 1}&search=${keyword}`} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </PaginationWrapper>
  );
}

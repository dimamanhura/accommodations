'use client';

import { useRouter } from 'next/navigation'
import { Pagination as NextUiPagination } from '@nextui-org/react';

interface PaginationProps {
  totalItems: number;
  pageSize: number;
  page: number;
};

const Pagination = ({
  totalItems,
  pageSize,
  page,
}: PaginationProps) => {
  const router = useRouter();

  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1)  {
    return null;
  }

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <NextUiPagination
        showControls
        initialPage={page} 
        isCompact
        total={totalPages}
        onChange={(page) => {
          router.push(`/properties?page=${page}`);
        }}
      />      
    </section>
  );
};

export default Pagination;

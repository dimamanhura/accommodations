'use client';

import { useRouter } from 'next/navigation'
import { Pagination as NextUiPagination } from '@nextui-org/react';
import paths from '@/utils/paths';

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
          router.push(paths.properties(page));
        }}
      />      
    </section>
  );
};

export default Pagination;

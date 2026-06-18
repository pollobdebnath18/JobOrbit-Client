"use client";

import { Pagination } from "@heroui/react";
import { useState } from "react";

const JobsPagination = ({jobs,pages=1}) => {
    // pagination 
      const [page, setPage] = useState(jobs.page || 1);
      const totalPages = jobs.length;
      const itemsPerPage = 12;
      const totalItems = Math.ceil(totalPages / itemsPerPage);
    
      const getPageNumbers = () => {
        const pages = [1, 2, 3, 4, 5, 6, 7, 8];
        return pages;
      };
    
      const startItem = 1;
      const endItem = totalPages;
  return (
    <div>
      <div className="flex justify-end mt-6">
        <Pagination>
          <Pagination.Summary>
            Showing {startItem}-{endItem} of {totalItems} results
          </Pagination.Summary>

          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage((p) => p - 1)}
              >
                <Pagination.PreviousIcon />

                <span>Previous</span>
              </Pagination.Previous>
            </Pagination.Item>

            {getPageNumbers().map((p, i) =>
              p === "ellipsis" ? (
                <Pagination.Item key={`ellipsis-${i}`}>
                  <Pagination.Ellipsis />
                </Pagination.Item>
              ) : (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === page}
                    onPress={() => setPage(p)}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ),
            )}

            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
                onPress={() => setPage((p) => p + 1)}
              >
                <span>Next</span>

                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </div>
    </div>
  );
};

export default JobsPagination;

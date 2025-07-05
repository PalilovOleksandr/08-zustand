import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onChange: (selected: number) => void;
};

export default function Pagination({ totalPages, onChange, currentPage }: PaginationProps) {
    return (
        <>
            <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => onChange(selected + 1)}
                forcePage={currentPage - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
            />
            {totalPages <= 0 && <ErrorMessage text="Notes list is empty" />}
        </>
    );
};
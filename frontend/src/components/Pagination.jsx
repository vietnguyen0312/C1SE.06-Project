import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const CustomPagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const totalPageNumbers = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (event, value) => {
        paginate(value);
    };

    return (
        <MuiPagination
            count={totalPageNumbers}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            size="large"
            showFirstButton
            showLastButton
            sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
        />
    );
};

export default CustomPagination;
import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CustomPagination = ({ currentPage, totalPages, paginate, serviceTypeId }) => {
    const navigate = useNavigate();

    const handlePageChange = (event, value) => {
        paginate(value);
        if (serviceTypeId) {
            navigate(`/services?serviceTypeId=${serviceTypeId}&page=${value}`);
        } else {
            navigate(`/services?page=${value}`);
        }
    };

    return (
        <MuiPagination
            count={totalPages}
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
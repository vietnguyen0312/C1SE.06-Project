import React from 'react';
import '../assets/Css/Pagination.css'

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="row mt-5">
            <div className="col text-center">
                <div className='block-27'>
                    <ul className='pagination'>
                        {pageNumbers.map(number => (
                            <li key={number} className={`${currentPage === number ? 'active' : ''}`}>
                                <a onClick={() => paginate(number)} href='#!' className='page-link'>
                                    {number}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
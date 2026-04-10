import React from 'react';

const Pagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    maxVisibilityPages = 7
}) => {

    const totalPages = currentPage * itemsPerPage

    //Générer les numéros de pages à afficher
    const getPageNumbers = () => {
        const pageNumbers = [];

        //si le nombres total de pages est inférieur ou égal au maximum visible
        if (totalPages <= maxVisibilityPages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);                
            }
            return pageNumbers;
        }

        //calculer le début et la fin des pages visibles
        let startPage = Math.max(currentPage - Math.floor(maxVisibilityPages / 2), 1)
        let endPage = startPage + maxVisibilityPages - 1;

        //Ajuster si on dépasse le nombre total de pages
        if (endPage > totalPages) {
           endPage = totalPages;
           startPage = Math.max(endPage - maxVisibilityPages + 1, 1) 
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);            
        }

        //Ajouter les points de suspension si nécessaire
        if(startPage > 1) {
            pageNumbers.unshift('...');
            pageNumbers.unshift(1);
        }

        if (endPage < totalPages) {
            pageNumbers.push('...')
            pageNumbers.push(totalPages)
        }
        return pageNumbers;
    }

    const handlePageChange = page => {
        if(page < 1 || page > totalPages || page === currentPage || page === '...') {
            return
        }
        onPageChange(page)
    }

   const pageNumbers = getPageNumbers();

    if (totalPages <= 1) {
        return null;
    }
    return (
      <div>
        {/* <span className="loading loading-spinner loading-md"></span> */}

        <div className="grid place-content-center mx-auto max-w-2xs max-sm:grid py-4">
          <div className="text-center">
            {`Page ${currentPage} à ${totalPages} sur ${totalItems} Lignes`}
          </div>
          <div className="flex">
            <div className="ml-2">
              <button className={`join-item btn btn-md ${currentPage === 1 ? 'disabled:btn':''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label='Page précédente'
              >
                Prec
              </button>
            </div>

            {pageNumbers.map((pageNum, index) => (
              <div key={index} className="join btn-md">
                {pageNum === "..." ? (
                  <button className="join-item btn btn-md">...</button>
                ) : (
                  <button
                    className={`join-item btn btn-md ${
                      currentPage === pageNum ? "btn-active" : ""
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                    aria-label={`Page ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                )}
              </div>
            ))}

            {/* Button Suivant */}
            <div className="">
            <button className={`join-item btn btn-md ${currentPage === totalPages ? ' disabled:btn':''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label='Page suivente'
            >
               Suiv
            </button>
          </div>
          </div>
          
        </div>
      </div>
    );
};

export default Pagination;
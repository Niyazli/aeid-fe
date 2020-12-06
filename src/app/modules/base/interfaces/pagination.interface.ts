interface PaginationDTO<TYPE> {
  pageNumber: number;
  pageSize: number;
}


interface PaginationResponse<TYPE> {
  total: number;
  data: TYPE[];
}


export { PaginationDTO, PaginationResponse };

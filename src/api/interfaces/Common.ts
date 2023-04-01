export interface Page {
    page: number;
    pageSize: number;
}

export interface Paginator extends Page {
    totalCount: number;
    data: any[];
}

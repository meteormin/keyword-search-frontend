export interface PaginationParameter {
  page?: number;
  limit?: number;
}

export interface AssignState {
  id: number;
  assignType: string;
  expiresAt: string;
  assignCount: number;
  status: boolean | null;
}

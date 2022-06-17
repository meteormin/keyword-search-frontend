import { ReviewStatus } from './reviews';
import { Concept } from './tasks';

export interface StatsTask {
  count: number;
  task: Task[];
}

export interface Task {
  id: number;
  refId: number | string;
  domain: string;
  concepts: string[];
  taskLength: number;
  status: ReviewStatus;
  createdAt: string | null;
  creatorId: string | null;
  sentence1Length: number;
  sentence2Length: number;
  reviewer1Id: string | null;
  reviewer1At: string | null;
  reviewer2Id: string | null;
  reviewer2At: string | null;
  rejectReasons: number[] | null;
  createAssignId: string | null;
  review1AssignId: string | null;
  review2AssignID: string | null;
}

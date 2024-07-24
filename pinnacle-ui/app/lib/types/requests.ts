import { IssuePriority } from "./enums";

/**
 * Represents a partial update for an Issue object.
 * This type is used when sending partial updates to the backend.
 */
export type PartialIssueUpdate = Partial<{
  project_id: string;
  title: string;
  workflow_id: string;
  state_id: string;
  description: string;
  effort: number;
  priority: IssuePriority;
  ready_for_development: boolean;
}>;

export interface IssueLabelRemovalRequest {
  label_id: string;
}

import { IssuePriority } from "./enums";

export type ProjectCreateRequest = {
  name: string;
  has_backlog: boolean;
  description?: string;
};

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

import { IssuePriority, SecurityLevel } from "./enums";

export type ProjectCreateRequest = {
  name: string;
  has_backlog: boolean;
  description?: string;
  enable_default_workflow_and_states: boolean;
};

export type ProjectPartialUpdateRequest = Partial<{
  name: string;
  description: string;
  has_backlog: boolean;
  security_level: SecurityLevel;
}>;

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

export type IssueLabelRemovalRequest = {
  label_id: string;
};

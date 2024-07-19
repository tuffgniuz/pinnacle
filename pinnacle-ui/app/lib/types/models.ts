import { IssuePriority, ProjectMethodology, SecurityLevel } from "./enums";

export type User = {
  id: string;
  fullname?: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
};

export type Project = {
  id: string;
  name: string;
  name_key: string;
  description?: string;
  has_backlog: boolean;
  methodology: ProjectMethodology;
  security_level: SecurityLevel;
  workflows: Workflow[];
};

export type Workflow = {
  id: string;
  name: string;
  goal?: string;
  start_date?: Date;
  end_date?: Date;
  is_active: boolean;
  completed: boolean;
  project_id: string;
  states: State[];
};

export type State = {
  id: string;
  name: string;
  is_final_state: boolean;
  issues: Issue[];
};

export type Issue = {
  id: string;
  order: number;
  issue_key: string;
  title: string;
  description?: string;
  effort?: number;
  priority?: IssuePriority;
  project_id: string;
  workflow_id?: string;
  state_id?: string;
  labels: Label[];
};

export type Label = {
  id: string;
  name: string;
};

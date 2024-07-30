import { IssuePriority, ProjectMethodology, SecurityLevel } from "./enums";

export type User = {
  id: any;
  fullname?: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  boards: Board[];
};

export type SecurityTopic = {
  id: string;
  topic_id: string;
  name: string;
  summary: string;
  sections: SecuritySection[];
};

export type SecuritySection = {
  id: string;
  section_id: string;
  name: string;
  summary: string;
  controls: SecurityControl[];
};

export type SecurityControl = {
  id: string;
  control_id: string;
  description: string;
  issues?: Issue[];
};

export type Project = {
  id: string;
  name: string;
  name_key: string;
  description?: string;
  has_backlog: boolean;
  methodology: ProjectMethodology;
  security_level: SecurityLevel;
  boards: Board[];
  default_board: Board;
  workflows: Workflow[];
  issues: Issue[];
  users: User[];
  security_topics: SecurityTopic[];
  security_sections: SecuritySection[];
};

export type Board = {
  id: string;
  name: string;
  description?: string;
  is_default: boolean;
  project_id: string;
  workflow: Workflow;
  users: User[];
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
  issues: Issue[];
  board_id: string;
  board: Board;
};

export type State = {
  id: string;
  name: string;
  limit?: number;
  color: string;
  description?: string;
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
  state?: State;
  project_id: string;
  workflow_id?: string;
  state_id?: string;
  labels?: Label[];
  assignees?: User[];
  security_controls?: SecurityControl[];
};

export type Label = {
  id: string;
  name: string;
  description?: string;
  color?: string;
};

export type Color = {
  id: string;
  name: string;
};

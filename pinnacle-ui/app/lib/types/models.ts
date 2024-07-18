import { ProjectMethodology, SecurityLevel } from "./enums";

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
};

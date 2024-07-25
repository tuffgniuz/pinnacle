import { FC, ReactNode } from "react";
import Navbar from "../../navigation/navbar";
import ProjectSettingsSideNav from "../../navigation/project-settings-sidenav";
import Footer from "../footer";
import Container from "../container";
import { Project } from "@/app/lib/types/models";

const ProjectSettingsContainer: FC<{
  project: Project | undefined;
  pathname: string | undefined;
  children: ReactNode | undefined;
}> = ({ project, pathname, children }) => {
  return (
    <>
      <Navbar project={project} showProjectLinks title={project?.name} />
      <Container className="flex gap-10 w-3/5">
        {/* Sidebar navigation */}
        <div className="w-1/4">
          <ProjectSettingsSideNav currentPage={pathname} project={project} />
        </div>
        {/* content */}
        <div className="w-full">{children}</div>
      </Container>

      <Footer className="mt-10" />
    </>
  );
};

export default ProjectSettingsContainer;

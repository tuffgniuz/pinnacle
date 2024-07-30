"use client";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import withAuth from "@/app/lib/hocs/withAuth";
import useProjectWithBoard from "@/app/lib/hooks/projects/useProjectWithBoard";
import Navbar from "@/app/lib/components/navigation/navbar";
import Container from "@/app/lib/components/layout/container";
import StateLanes from "@/app/lib/components/data-display/state-lanes";
import StateQuickCreateForm from "@/app/lib/components/forms/issue-assignee-form/state-quick-create-form";
import BoardPickerDropDown from "@/app/lib/components/actions/board-picker-dropdown";

const ProjectBoard: NextPage = () => {
  const params = useParams<{ key: string }>();
  const { data: project, isLoading } = useProjectWithBoard(
    params.key as string,
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar title={project?.name} project={project} showProjectLinks />
      <Container className="h-full px-5">
        {project?.default_board !== undefined ? (
          <>
            <div className="flex items-center gap-5 mb-10">
              <BoardPickerDropDown project={project} />
              <StateQuickCreateForm
                workflowId={project?.default_board.workflow.id}
              />
            </div>
            <StateLanes
              project={project}
              states={project?.default_board.workflow.states}
            />
          </>
        ) : (
          <p>You don't have board yet</p>
        )}
      </Container>
    </>
  );
};

export default withAuth(ProjectBoard);

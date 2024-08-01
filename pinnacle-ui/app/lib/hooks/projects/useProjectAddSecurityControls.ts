import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectAddSecurityControlsRequest } from "../../types/requests";
import { RootState } from "../../stores/store";
import { addProjectSecurityControls } from "../../services/project";
import { SecuritySection, SecurityTopic } from "../../types/models";

const useProjectAddSecurityControls = (projectId: string | undefined) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);
  const [topics, setTopics] = useState<SecurityTopic[]>([]);
  const [sections, setSections] = useState<SecuritySection[] | undefined>(
    undefined,
  );

  const mutation = useMutation({
    mutationFn: async (requestBody: ProjectAddSecurityControlsRequest) => {
      return await addProjectSecurityControls(token, projectId, requestBody);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
    },
  });

  const handleMutation = () => {
    mutation.mutate({ security_topics: topics, security_sections: sections });
  };

  return { topics, setTopics, sections, setSections, handleMutation };
};

export default useProjectAddSecurityControls;

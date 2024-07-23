from typing import Sequence

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from pinnacle.core.auth.users import get_current_user
from pinnacle.core.dependencies.db import get_async_session
from pinnacle.core.models import State, User
from pinnacle.core.repositories.state import StateRepository
from pinnacle.core.services.abstract_generic_service import AbstractGenericService
from pinnacle.core.services.workflow_service import WorkflowService


class StateService(AbstractGenericService):

    def __init__(
        self,
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session),
    ):
        self.current_user = current_user
        self.session = session
        self.state_repository = StateRepository(self.session)
        self.workflow_service = WorkflowService(self.current_user, self.session)

    async def create(self, create_schema: dict) -> State:
        workflow_id = create_schema["workflow_id"]

        await self.workflow_service.get_by_id_or_none(workflow_id)

        state = State(
            name=create_schema["name"],
            workflow_id=create_schema["workflow_id"],
        )

        new_state = self.state_repository.generics.save(state)
        await self.session.flush()
        await self.session.refresh(new_state)
        await self.session.commit()

        return new_state

    async def get_states_for_workflow(self, workflow_id: str) -> Sequence[State]:
        await self.workflow_service.get_by_id_or_none(workflow_id)

        return await self.state_repository.generics.find_all_by(workflow_id=workflow_id)

    async def get_state_by_id_or_none(self, id: str | None = None) -> State | None:
        state = await self.state_repository.generics.find_by_id(id)

        if not state:
            self._raise_not_found_exception()

        return state

    async def update(self, id: str, update_data: dict) -> State | None:
        state = await self.get_state_by_id_or_none(id)
        updated_state = await self.state_repository.generics.update(state, update_data)

        await self.session.commit()
        await self.session.refresh(updated_state)

        return updated_state

    async def delete(self, id: str) -> None:
        state = await self.get_state_by_id_or_none(id)
        await self.state_repository.generics.delete(state)
        await self.session.commit()


def get_state_service(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_async_session),
):
    return StateService(current_user, session)

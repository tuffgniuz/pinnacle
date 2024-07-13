import uuid
from datetime import date

from fastapi_users_db_sqlalchemy import (
    SQLAlchemyBaseOAuthAccountTableUUID,
    SQLAlchemyBaseUserTableUUID,
)
from sqlalchemy import (
    UUID,
    Boolean,
    Column,
    Date,
    Enum,
    ForeignKey,
    Integer,
    String,
    Table,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.enums import IssuePriority, ProjectMethodology

Base = declarative_base()

issue_label_association = Table(
    "issue_label_association",
    Base.metadata,
    Column("issue_id", UUID(as_uuid=True), ForeignKey("issue.id"), primary_key=True),
    Column("label_id", UUID(as_uuid=True), ForeignKey("label.id"), primary_key=True),
)

user_project_association = Table(
    "user_project_association",
    Base.metadata,
    Column("user_id", UUID(as_uuid=True), ForeignKey("user.id"), primary_key=True),
    Column(
        "project_id", UUID(as_uuid=True), ForeignKey("project.id", primary_key=True)
    ),
)

user_issue_association = Table(
    "user_issue_association",
    Base.metadata,
    Column("user_id", UUID(as_uuid=True), ForeignKey("user.id"), primary_key=True),
    Column("issue_id", UUID(as_uuid=True), ForeignKey("issue.id"), primary_key=True),
)


class OAuthAccount(SQLAlchemyBaseOAuthAccountTableUUID, Base):
    pass


class User(SQLAlchemyBaseUserTableUUID, Base):
    fullname: Mapped[str] = mapped_column(String(1000), unique=True, nullable=False)

    projects: Mapped[list["Project"]] = relationship(
        "Project", secondary=user_project_association, back_populates="users"
    )
    issues: Mapped[list["Issue"]] = relationship(
        "Issue", secondary=user_issue_association, back_populates="assignees"
    )
    oath_accounts: Mapped[list["OAuthAccount"]] = relationship(
        "OAuthAccount", lazy="joined"
    )


class Project(Base):
    __tablename__ = "project"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    name_key: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=True)
    has_backlog: Mapped[bool] = mapped_column(Boolean, default=False)
    methodology: Mapped[ProjectMethodology] = mapped_column(
        Enum(ProjectMethodology), default=ProjectMethodology.KANBAN
    )

    users: Mapped[list["User"]] = relationship(
        "User", secondary=user_project_association, back_populates="projects"
    )
    workflows: Mapped[list["Workflow"]] = relationship(
        "Workflow", back_populates="project", cascade="all, delete-orphan"
    )
    issues: Mapped[list["Issue"]] = relationship(
        "Issue", back_populates="project", cascade="all, delete-orphan"
    )


class Workflow(Base):
    __tablename__ = "workflow"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    goal: Mapped[str] = mapped_column(String(1000), nullable=True)
    start_date: Mapped[date] = mapped_column(Date, nullable=True)
    end_date: Mapped[date] = mapped_column(Date, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=False)
    completed: Mapped[bool] = mapped_column(Boolean, default=False)

    project_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("project.id")
    )
    project: Mapped["Project"] = relationship("Project", back_populates="workflows")

    states: Mapped[list["State"]] = relationship(
        "State", back_populates="workflow", cascade="all, delete-orphan"
    )
    issues: Mapped[list["Issue"]] = relationship(
        "Issue", back_populates="workflow", cascade="all, delete-orphan"
    )


class State(Base):
    __tablename__ = "state"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    is_final_state: Mapped[bool] = mapped_column(Boolean, default=False)

    issues: Mapped[list["Issue"]] = relationship("Issue", back_populates="state")
    workflow_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("workflow.id")
    )
    workflow: Mapped["Workflow"] = relationship("Workflow", back_populates="states")


class Issue(Base):
    __tablename__ = "issue"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    order: Mapped[int] = mapped_column(Integer, nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=True)
    effort: Mapped[int] = mapped_column(Integer, nullable=True)
    priority: Mapped[IssuePriority] = mapped_column(Enum(IssuePriority), nullable=True)

    state_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("state.id"))
    state: Mapped["State"] = relationship("State", back_populates="issues")

    workflow_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("workflow.id")
    )
    workflow: Mapped["Workflow"] = relationship("Workflow", back_populates="issues")
    project_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("project.id")
    )
    project: Mapped["Project"] = relationship("Project", back_populates="issues")
    assignees: Mapped[list["User"]] = relationship(
        "User", secondary=user_issue_association, back_populates="issues"
    )
    labels: Mapped[list["Label"]] = relationship(
        "Label", secondary=issue_label_association, back_populates="issues"
    )


class Label(Base):
    __tablename__ = "label"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(55), nullable=False)
    issues: Mapped[list["Issue"]] = relationship(
        "Issue", secondary=issue_label_association, back_populates="labels"
    )

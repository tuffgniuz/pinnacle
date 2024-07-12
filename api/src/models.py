import uuid

from fastapi_users_db_sqlalchemy import (
    SQLAlchemyBaseOAuthAccountTableUUID,
    SQLAlchemyBaseUserTableUUID,
)
from sqlalchemy import UUID, Column, Enum, ForeignKey, Integer, String, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.enums import IssuePriority

Base = declarative_base()

issue_label_association = Table(
    "issue_label_association",
    Base.metadata,
    Column("issue_id", UUID(as_uuid=True), ForeignKey("issue.id"), primary_key=True),
    Column("label_id", UUID(as_uuid=True), ForeignKey("label.id"), primary_key=True),
)


class OAuthAccount(SQLAlchemyBaseOAuthAccountTableUUID, Base):
    pass


class User(SQLAlchemyBaseUserTableUUID, Base):
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
    description: Mapped[str] = mapped_column(String(280), nullable=True)

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

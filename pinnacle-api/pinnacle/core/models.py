import uuid
from datetime import date

from fastapi_users_db_sqlalchemy import (SQLAlchemyBaseOAuthAccountTableUUID,
                                         SQLAlchemyBaseUserTableUUID)
from sqlalchemy import (UUID, Boolean, Column, Date, Enum, Float, ForeignKey,
                        Integer, Numeric, String, Table)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Mapped, mapped_column, relationship

from pinnacle.core.enums import IssuePriority, ProjectSecurityLevel

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
    Column("project_id", UUID(as_uuid=True), ForeignKey("project.id"), primary_key=True)
)


user_issue_association = Table(
    "user_issue_association",
    Base.metadata,
    Column("user_id", UUID(as_uuid=True), ForeignKey("user.id"), primary_key=True),
    Column("issue_id", UUID(as_uuid=True), ForeignKey("issue.id"), primary_key=True),
)

project_security_topic_association = Table(
    "project_security_topic_association",
    Base.metadata,
    Column("project_id", UUID(as_uuid=True), ForeignKey("project.id"), primary_key=True),
    Column("security_topic_id", UUID(as_uuid=True), ForeignKey("security_topic.id"), primary_key=True),
)

project_security_section_association = Table(
    "project_security_section_association",
    Base.metadata,
    Column("project_id", UUID(as_uuid=True), ForeignKey("project.id"), primary_key=True),
    Column("security_section_id", UUID(as_uuid=True), ForeignKey("security_section.id"), primary_key=True),
)

issue_security_control_association = Table(
    "issue_security_control_association",
    Base.metadata,
    Column("issue_id", UUID(as_uuid=True), ForeignKey("issue.id"), primary_key=True),
    Column("security_control_id", UUID(as_uuid=True), ForeignKey("security_control.id"), primary_key=True),
)

class OAuthAccount(SQLAlchemyBaseOAuthAccountTableUUID, Base):
    pass


class User(SQLAlchemyBaseUserTableUUID, Base):
    fullname: Mapped[str] = mapped_column(String(1000), unique=True, nullable=True)

    projects: Mapped[list["Project"]] = relationship(
        "Project", secondary=user_project_association, back_populates="users"
    )
    issues: Mapped[list["Issue"]] = relationship(
        "Issue", secondary=user_issue_association, back_populates="assignees"
    )
    oauth_accounts: Mapped[list["OAuthAccount"]] = relationship(
        "OAuthAccount", lazy="joined"
    )


class SecurityTopic(Base):
    """
    Represents an ASVS category
    """

    __tablename__ = "security_topic"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    topic_id: Mapped[str] = mapped_column(String(10), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    summary: Mapped[str] = mapped_column(String(500), nullable=True)

    sections: Mapped[list["SecuritySection"]] = relationship(
        "SecuritySection", back_populates="topic", cascade="all, delete-orphan"
    )
    projects: Mapped[list["Project"]] = relationship(
        "Project", secondary=project_security_topic_association, back_populates="security_topics"
    )


class SecuritySection(Base):
    """
    Represents an ASVS sub category
    """

    __tablename__ = "security_section"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    section_id: Mapped[str] = mapped_column(String(10), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    summary: Mapped[str] = mapped_column(String(500), nullable=True)

    topic_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("security_topic.id"), nullable=False
    )
    topic: Mapped["SecurityTopic"] = relationship(
        "SecurityTopic", back_populates="sections"
    )

    controls: Mapped[list["SecurityControl"]] = relationship(
        "SecurityControl", back_populates="section", cascade="all, delete-orphan"
    )
    projects: Mapped[list["Project"]] = relationship(
        "Project", secondary=project_security_section_association, back_populates="security_sections"
    )


class SecurityControl(Base):
    """
    Represent an ASVS security control / requirement
    """

    __tablename__ = "security_control"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    control_id: Mapped[str] = mapped_column(String(10), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)

    section_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("security_section.id"), nullable=False
    )
    section: Mapped["SecuritySection"] = relationship(
        "SecuritySection", back_populates="controls"
    )
    issues: Mapped[list["Issue"]] = relationship(
        "Issue", secondary=issue_security_control_association, back_populates="security_controls"
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
    security_level: Mapped[ProjectSecurityLevel] = mapped_column(Enum(ProjectSecurityLevel), default=ProjectSecurityLevel.LEVEL1)

    users: Mapped[list["User"]] = relationship(
        "User", secondary=user_project_association, back_populates="projects"
    )
    workflows: Mapped[list["Workflow"]] = relationship(
        "Workflow", back_populates="project", cascade="all, delete-orphan"
    )
    issues: Mapped[list["Issue"]] = relationship(
        "Issue", back_populates="project", cascade="all, delete-orphan"
    )
    security_topics: Mapped[list["SecurityTopic"]] = relationship(
        "SecurityTopic", secondary=project_security_topic_association, back_populates="projects"
    )
    security_sections: Mapped[list["SecuritySection"]] = relationship(
        "SecuritySection", secondary=project_security_section_association, back_populates="projects"
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
    limit: Mapped[int] = mapped_column(Numeric, nullable=True)
    description: Mapped[str] = mapped_column(String(280), nullable=True)
    is_final_state: Mapped[bool] = mapped_column(Boolean, default=False)

    issues: Mapped[list["Issue"]] = relationship("Issue", back_populates="state")
    color_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("color.id"), nullable=True)
    color: Mapped["Color"] = relationship("Color", back_populates="states")
    workflow_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("workflow.id")
    )
    workflow: Mapped["Workflow"] = relationship("Workflow", back_populates="states")

class Color(Base):
    __tablename__ = "color"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(10), nullable=False)
    states: Mapped[list["State"]] = relationship("State", back_populates="color", cascade="all, delete-orphan")
    

class Issue(Base):
    __tablename__ = "issue"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    order: Mapped[float] = mapped_column(Float, nullable=False)
    issue_key: Mapped[str] = mapped_column(String, nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=True)
    effort: Mapped[int] = mapped_column(Integer, nullable=True)
    priority: Mapped[IssuePriority] = mapped_column(Enum(IssuePriority), nullable=True)
    ready_for_development: Mapped[bool] = mapped_column(Boolean, default=False)

    state_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("state.id"), nullable=True)
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
    security_controls: Mapped[list["SecurityControl"]] = relationship(
        "SecurityControl", secondary=issue_security_control_association, back_populates="issues"
    )


class Label(Base):
    __tablename__ = "label"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(55), nullable=False)
    description: Mapped[str] = mapped_column(String(280), nullable=True)
    color: Mapped[str] = mapped_column(String(7), nullable=True)
    issues: Mapped[list["Issue"]] = relationship(
        "Issue", secondary=issue_label_association, back_populates="labels"
    )

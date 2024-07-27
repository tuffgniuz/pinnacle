import uuid
from datetime import date

from fastapi_users_db_sqlalchemy import (SQLAlchemyBaseOAuthAccountTableUUID,
                                         SQLAlchemyBaseUserTableUUID)
from sqlalchemy import (UUID, Boolean, Column, Date, Enum, Float, ForeignKey,
                        Index, Integer, Numeric, String, Table)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Mapped, mapped_column, relationship

from pinnacle.core.enums import IssuePriority, ProjectSecurityLevel

Base = declarative_base()

issue_label_association = Table(
    "issue_label_association",
    Base.metadata,
    Column("issue_id", UUID(as_uuid=True), ForeignKey("issue.id", ondelete="CASCADE"), primary_key=True),
    Column("label_id", UUID(as_uuid=True), ForeignKey("label.id", ondelete="CASCADE"), primary_key=True),
    Index("idx_issue_label_association_issue_id", "issue_id"),
    Index("idx_issue_label_association_label_id", "label_id")
)

user_project_association = Table(
    "user_project_association",
    Base.metadata,
    Column("user_id", UUID(as_uuid=True), ForeignKey("user.id", ondelete="CASCADE"), primary_key=True),
    Column("project_id", UUID(as_uuid=True), ForeignKey("project.id", ondelete="CASCADE"), primary_key=True),
    Index("idx_user_project_association_user_id", "user_id"),
    Index("idx_user_project_association_project_id", "project_id")
)

user_issue_association = Table(
    "user_issue_association",
    Base.metadata,
    Column("user_id", UUID(as_uuid=True), ForeignKey("user.id", ondelete="CASCADE"), primary_key=True),
    Column("issue_id", UUID(as_uuid=True), ForeignKey("issue.id", ondelete="CASCADE"), primary_key=True),
    Index("idx_user_issue_association_user_id", "user_id"),
    Index("idx_user_issue_association_issue_id", "issue_id")
)

project_security_topic_association = Table(
    "project_security_topic_association",
    Base.metadata,
    Column("project_id", UUID(as_uuid=True), ForeignKey("project.id", ondelete="CASCADE"), primary_key=True),
    Column("security_topic_id", UUID(as_uuid=True), ForeignKey("security_topic.id", ondelete="CASCADE"), primary_key=True),
    Index("idx_project_security_topic_association_project_id", "project_id"),
    Index("idx_project_security_topic_association_security_topic_id", "security_topic_id")
)

project_security_section_association = Table(
    "project_security_section_association",
    Base.metadata,
    Column("project_id", UUID(as_uuid=True), ForeignKey("project.id", ondelete="CASCADE"), primary_key=True),
    Column("security_section_id", UUID(as_uuid=True), ForeignKey("security_section.id", ondelete="CASCADE"), primary_key=True),
    Index("idx_project_security_section_association_project_id", "project_id"),
    Index("idx_project_security_section_association_security_section_id", "security_section_id")
)

issue_security_control_association = Table(
    "issue_security_control_association",
    Base.metadata,
    Column("issue_id", UUID(as_uuid=True), ForeignKey("issue.id", ondelete="CASCADE"), primary_key=True),
    Column("security_control_id", UUID(as_uuid=True), ForeignKey("security_control.id", ondelete="CASCADE"), primary_key=True),
    Index("idx_issue_security_control_association_issue_id", "issue_id"),
    Index("idx_issue_security_control_association_security_control_id", "security_control_id")
)


user_board_association = Table(
    "user_board_association",
    Base.metadata,
    Column("user_id", UUID(as_uuid=True), ForeignKey("user.id", ondelete="CASCADE"), primary_key=True),
    Column("board_id", UUID(as_uuid=True), ForeignKey("board.id", ondelete="CASCADE"), primary_key=True),
    Index("idx_user_board_association_user_id", "user_id"),
    Index("idx_user_board_association_board_id", "board_id")
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
    boards: Mapped[list["Board"]] = relationship(
        "Board", back_populates="project", cascade="all, delete-orphan"
    )

class Board(Base):
    __tablename__ = "board"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=True)
    is_default: Mapped[bool] = mapped_column(Boolean, default=False)

    project_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("project.id", ondelete="CASCADE"), nullable=False
    )
    project: Mapped["Project"] = relationship("Project", back_populates="boards")

    users: Mapped[list["User"]] = relationship(
        "User", secondary=user_board_association, back_populates="boards"
    )
    workflows: Mapped[list["Workflow"]] = relationship(
        "Workflow", back_populates="board", cascade="all, delete-orphan"
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

    board_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("board.id", ondelete="CASCADE"), nullable=True
    )
    board: Mapped["Board"] = relationship("Board", back_populates="workflows")


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
    color: Mapped[str] = mapped_column(String(7), nullable=True)
    order: Mapped[float] = mapped_column(Float, nullable=False)
    issues: Mapped[list["Issue"]] = relationship("Issue", back_populates="state")

    workflow_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("workflow.id")
    )
    workflow: Mapped["Workflow"] = relationship("Workflow", back_populates="states")

class Color(Base):
    __tablename__ = "color"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    hex_code: Mapped[str] = mapped_column(String(7), nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=True)
    

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

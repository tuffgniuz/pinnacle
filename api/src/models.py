import uuid

from sqlalchemy import UUID, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Mapped, mapped_column, relationship

Base = declarative_base()


class Issue(Base):
    __tablename__ = "issue"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    order: Mapped[int] = mapped_column(Integer, nullable=False)
    # title: Mapped[str] = mapped_column(String, nullable=False)
    # key: Mapped[str] = mapped_column()
    description: Mapped[str] = mapped_column(String, nullable=True)

    state_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("state.id"))
    state: Mapped["State"] = relationship("State", back_populates="issues")


class State(Base):
    __tablename__ = "state"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String, nullable=False)

    issues: Mapped[list["Issue"]] = relationship("Issue", back_populates="state")

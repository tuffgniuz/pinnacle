from abc import ABC
from typing import Generic, Type, TypeVar

from fastapi import status
from fastapi.exceptions import HTTPException

T = TypeVar("T")


class AbstractGenericService(ABC, Generic[T]):

    def __init__(self, model: Type[T]):
        self.model = model

    def _raise_is_forbidden_exception(self, detail: str = "Access not allowed"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=detail)

    def _raise_not_found_exception(self, detail: str = "Resource not found"):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=detail)

from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from authenticator import authenticator
from queries.positions import (
    Error,
    PositionIn,
    PositionOut,
    PositionRepository,
)


router = APIRouter()


@router.post("/positions", response_model=Union[PositionOut, Error])
def create_position(
    position: PositionIn,
    repo: PositionRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(position)


@router.get("/positions", response_model=List[PositionOut])
def get_all_positions(
    repo: PositionRepository = Depends(),
):
    return repo.get_all()


@router.put(
    "/positions/{position_id}", response_model=Union[PositionOut, Error]
)
def update_position(
    position_id: int,
    position: PositionIn,
    repo: PositionRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[PositionOut, Error]:
    return repo.update(position_id, position)


@router.delete("/positions/{position_id}", response_model=bool)
def delete_position(
    position_id: int,
    repo: PositionRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(position_id)


@router.get("/positions/{position_id}", response_model=Optional[PositionOut])
def get_one_position(
    position_id: int,
    response: Response,
    repo: PositionRepository = Depends(),
) -> PositionOut:
    position = repo.get_one(position_id)
    if position is None:
        response.status_code = 404
    return position

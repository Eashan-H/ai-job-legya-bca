from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, schemas, auth, database, models

router = APIRouter()

@router.post("/users/me/events/", response_model=schemas.EventRegistration)
def create_event_registration_for_user(
    event_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_active_user)
):
    return crud.create_event_registration(db=db, event_id=event_id, user_id=current_user.id)

@router.get("/users/me/events/", response_model=list[schemas.EventRegistration])
def read_user_event_registrations(
    db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_active_user)
):
    return current_user.registrations

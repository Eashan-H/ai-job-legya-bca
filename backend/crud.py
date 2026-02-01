from sqlalchemy.orm import Session

from . import models, schemas, auth

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_event_registrations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.EventRegistration).offset(skip).limit(limit).all()

def create_event_registration(db: Session, event_id: int, user_id: int):
    db_event_registration = models.EventRegistration(event_id=event_id, owner_id=user_id)
    db.add(db_event_registration)
    db.commit()
    db.refresh(db_event_registration)
    return db_event_registration

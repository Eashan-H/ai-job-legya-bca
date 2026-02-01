from pydantic import BaseModel, EmailStr
from typing import List, Optional

class EventRegistrationBase(BaseModel):
    event_id: int

class EventRegistrationCreate(EventRegistrationBase):
    pass

class EventRegistration(EventRegistrationBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    registrations: List[EventRegistration] = []

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role_id: int


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    role_id: int

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class RoleCreate(BaseModel):
    role_name: str


class RoleUpdate(BaseModel):
    role_name: str


class RoleResponse(BaseModel):
    id: int
    role_name: str

    class Config:
        from_attributes = True
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

class RoleCreate(BaseModel): # when creating a new role

    role_name: str

class RoleUpdate(BaseModel): # when updating an existing role

    role_name: str

class RoleResponse(BaseModel): # for responses sent back to the client

    id: int
    role_name: str

    class Config:
        from_attributes = True    # Pydantic v2

class RoleCreate(BaseModel): # when creating a new role
    name: str

class RoleUpdate(BaseModel): # when updating an existing role
    name: str

class RoleResponse(BaseModel): # for responses sent back to the client
    id: int
    name: str

    class Config:
        from_attributes = True    # Pydantic v2
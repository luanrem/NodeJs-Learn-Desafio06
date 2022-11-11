import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "./../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserDTO } from "./ICreateUserDTO";

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a user", async () => {
    const newUser: ICreateUserDTO = {
      name: "Test",
      email: "user@test.com",
      password: "1234",
    };

    const user = await createUserUseCase.execute(newUser);

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("name");
  });

  it("Should not be able to create a user with the same email", async () => {
    expect(async () => {
      const User1: ICreateUserDTO = {
        name: "Test",
        email: "user@test.com",
        password: "1234",
      };

      const User2: ICreateUserDTO = {
        name: "Test2",
        email: "user@test.com",
        password: "12345",
      };

      await createUserUseCase.execute(User1);
      await createUserUseCase.execute(User2);
    }).rejects.toBeInstanceOf(AppError);
  });
});

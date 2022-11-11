import { AppError } from "./../../../../shared/errors/AppError";
import "reflect-metadata";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it("Should be able to authenticate user", async () => {
    const newUser: ICreateUserDTO = {
      name: "Test",
      email: "user@test.com",
      password: "1234",
    };

    await createUserUseCase.execute(newUser);

    const result = await authenticateUserUseCase.execute({
      email: newUser.email,
      password: newUser.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate inexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "inexistentUser@test.com",
        password: "inexistentPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate user with wrong password", async () => {
    expect(async () => {
      const newUser: ICreateUserDTO = {
        name: "Test",
        email: "user@test.com",
        password: "1234",
      };

      await createUserUseCase.execute(newUser);

      await authenticateUserUseCase.execute({
        email: newUser.email,
        password: "wrong password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

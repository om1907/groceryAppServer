import { badRequest } from "./response.js";

const globalUserObjectValidation = (event) => {
  checkObjectKeyIsString(event, "name");
  checkObjectKeyIsString(event, "email");
  checkObjectKeyIsString(event, "password");
};

const globalUserObjectValidationForLogin = (event) => {
  checkObjectKeyIsString(event, "email");
  checkObjectKeyIsString(event, "password");
};

const checkObjectKeyIsString = (event, key) => {
  if (!event[key] || typeof event[key] !== "string") {
    throw badRequest(`${key} is required and it's type must be string`);
  }
};

export { globalUserObjectValidation, globalUserObjectValidationForLogin };

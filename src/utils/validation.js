import { badRequest } from "./response.js";

const globalUserObjectValidation = (event) => {
  checkObjectKeyIsString(event, "name");
  checkObjectKeyIsString(event, "email");
  checkObjectKeyIsString(event, "password");
};

const globalProductValidation = ( event ) => {
  checkObjectKeyIsString(event, "name");
  checkObjectKeyIsString(event, "description");
  checkObjectKeyIsString(event, "category");

  if (!event.price || isNaN(Number(event.price))) {
    throw badRequest("price is required and must be a number");
  }
}

const globalUserObjectValidationForLogin = (event) => {
  checkObjectKeyIsString(event, "email");
  checkObjectKeyIsString(event, "password");
};

const checkObjectKeyIsString = (event, key) => {
  if (!event[key] || typeof event[key] !== "string") {
    throw badRequest(`${key} is required and it's type must be string`);
  }
};

const checkObjectKeyIsArray = (event, key) => {
  if (!event[key] || !Array.isArray(event[key])) {
    throw badRequest(`${key} is required and it's type must be array`);
  }
};

export { globalUserObjectValidation, globalUserObjectValidationForLogin, globalProductValidation };

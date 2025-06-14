export const successResponse = (message, data) => {
  let response = { message, data, statusCode: "[200]" };
  return {
    errorMessage: JSON.stringify(response),
  };
};

export const internalServer = (message, data) => {
  let response = { message, data, statusCode: "[500]" };
  return JSON.stringify(response);
};

export const unAuthorized = (message, data) => {
  let response = { message, data, statusCode: "[401]" };
  return {
    errorMessage: JSON.stringify(response),
  };
};

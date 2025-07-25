export const successResponse = (res, message, data) => {
  let response = { message, data, statusCode: "[200]" };
  return res.status(200).json(response);
};

export const internalServerResponse = (res, message, data) => {
  let response = { message, data, statusCode: "[500]" };
  return res.status(200).json((response));
};

export const errorResponse = (res, data) => {
  return res.status(200).json((data));
};

export const unAuthorized = (res, message, data) => {
  let response = { message, data, statusCode: "[401]" };
  return res.status(200).json(response);
};

export const internalServer = (message, data) => {
  let response = { message, data, statusCode: "[500]" };
  return response;
}

export const badRequest = (message, data) => {
  let response = { message, data, statusCode: "[400]" };
  return response;
};

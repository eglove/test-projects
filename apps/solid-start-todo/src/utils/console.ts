import isError from "lodash/isError";

export const logError = (error: unknown) => {
  if (isError(error)) {
    console.error(error);
  }
};

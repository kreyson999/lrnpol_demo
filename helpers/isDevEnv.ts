export const isDevEnv = () => {
  return process.env.NODE_ENV === 'development' ? true : false;
};

export const extractDate = (wrapper: any) => {
  const [seconds, nanoseconds] = wrapper.array;
  return new Date(seconds * 1000 + nanoseconds / 1000000);
};

export const extractId = (wrapper: any) => {
  const [_, arr] = wrapper.array;
  const [__, id] = arr;

  return id;
};

function timestampToDateTime(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

export default {
  timestampToDateTime,
};

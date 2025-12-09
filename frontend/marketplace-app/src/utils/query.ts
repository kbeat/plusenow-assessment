export function buildQuery(params: Record<string, any>) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== "" &&
      value !== null &&
      value !== "all" &&
      value !== undefined
    ) {
      query.append(key, String(value));
    }
  });

  return query.toString();
}

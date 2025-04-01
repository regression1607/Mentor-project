export function getSearchParams(searchParams: {
  [key: string]: string | undefined;
}) {
  return {
    date: searchParams.date ? new Date(searchParams.date) : undefined,
    slot: searchParams.slot,
    type: searchParams.type || "video",
    timezone:
      searchParams.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

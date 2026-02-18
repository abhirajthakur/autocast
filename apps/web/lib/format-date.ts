import { formatDistanceToNow } from "date-fns";

export function formatRelativeDate(date: string | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

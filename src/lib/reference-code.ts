import {
  randomUUID,
} from "node:crypto";

export function createReferenceCode(
  prefix: string,
) {
  const timestamp =
    Date.now()
      .toString(36)
      .toUpperCase();

  const random =
    randomUUID()
      .replaceAll("-", "")
      .slice(0, 6)
      .toUpperCase();

  return `TM-${prefix}-${timestamp}-${random}`;
}
export type ParseResult<T> = { ok: true; value: T } | { ok: false; error: string };

export function tryParseJson<T>(text: string): ParseResult<T> {
  try {
    return { ok: true, value: JSON.parse(text) as T };
  } catch (e) {
    return { ok: false, error: (e as Error).message || "Invalid JSON" };
  }
}

export function safeStringify(value: unknown, space = 0): string {
  const seen = new WeakSet<object>();
  return JSON.stringify(
    value,
    (_k, v) => {
      if (typeof v === "bigint") return v.toString();
      if (v && typeof v === "object") {
        if (seen.has(v)) return "[Circular]";
        seen.add(v);
      }
      return v;
    },
    space
  );
}

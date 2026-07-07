/** Deterministic PRNG — same seed yields the same sequence (SSR-safe). */
export function hashString(value: string): number {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function createSeededRandom(seed: number) {
  let state = seed >>> 0;

  return {
    next(): number {
      state += 0x6d2b79f5;
      let value = Math.imul(state ^ (state >>> 15), 1 | state);
      value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    },
    range(min: number, max: number): number {
      return min + (max - min) * this.next();
    },
    int(max: number): number {
      return Math.floor(this.next() * max);
    },
  };
}

export function seededShuffle<T>(items: T[], seed: number): T[] {
  const copy = [...items];
  const rng = createSeededRandom(seed);

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = rng.int(index + 1);
    [copy[index], copy[swapIndex]] = [copy[swapIndex]!, copy[index]!];
  }

  return copy;
}

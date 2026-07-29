export type RepertoireItem = {
  id: string;
  title: string;
  type: "musica" | "podcast" | "playlist" | "artista";
  genre?: string;
  playCount: number;
  lastPlayedAt: number; // timestamp em ms (Date.now())
};

const THIRTY_DAYS_MS = 1000 * 60 * 60 * 24 * 30;

/**
 * Curadoria local, sem IA de verdade:
 * 1. Prioriza itens tocados nos últimos 30 dias
 * 2. Dentro disso, ordena por quantidade de plays (mais tocado primeiro)
 * 3. Em empate, o tocado mais recentemente vem primeiro
 */
export function curateRepertoire(items: RepertoireItem[]): RepertoireItem[] {
  const now = Date.now();

  return [...items].sort((a, b) => {
    const aRecent = now - a.lastPlayedAt <= THIRTY_DAYS_MS;
    const bRecent = now - b.lastPlayedAt <= THIRTY_DAYS_MS;
    if (aRecent !== bRecent) return aRecent ? -1 : 1;

    if (b.playCount !== a.playCount) return b.playCount - a.playCount;

    return b.lastPlayedAt - a.lastPlayedAt;
  });
}

/** Agrupa o repertório curado por gênero, pra exibir em seções */
export function groupByGenre(items: RepertoireItem[]): { genre: string; items: RepertoireItem[] }[] {
  const groups = new Map<string, RepertoireItem[]>();
  items.forEach((item) => {
    const key = item.genre ?? "Outros";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  });
  return Array.from(groups.entries()).map(([genre, groupItems]) => ({ genre, items: groupItems }));
}
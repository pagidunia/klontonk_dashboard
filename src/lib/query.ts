// Penyiapan masukan untuk filter PostgREST dan parameter URL.

/** Karakter yang bisa merusak sintaks filter PostgREST dibuang dari kata kunci pencarian. */
export const bersihkanKataKunci = (teks: string | null | undefined): string =>
  String(teks ?? '').replace(/[(),*%\\]/g, ' ').trim()

/** Offset paginasi dari parameter URL: tidak pernah negatif atau NaN. */
export function parseOffset(value: string | null): number {
  const n = Number(value ?? 0)
  return Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : 0
}

/** Buang parameter kosong sebelum dipasang ke URL. */
export function compactParams(params: Record<string, string | number | null | undefined>): Record<string, string> {
  const hasil: Record<string, string> = {}
  for (const [kunci, nilai] of Object.entries(params)) {
    if (nilai === null || nilai === undefined || nilai === '' || nilai === 0) continue
    hasil[kunci] = String(nilai)
  }
  return hasil
}

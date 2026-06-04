import type { ConfigV1 } from "@opencode-ai/core/v1/config/config"

export function driver(cfg: ConfigV1.Info, id: string) {
  const seen = new Set<string>()
  let current = id

  while (true) {
    if (seen.has(current)) return current
    seen.add(current)

    const next = cfg.provider?.[current]?.auth_provider
    if (!next || next === current) return current
    current = next
  }
}

export function aliases(cfg: ConfigV1.Info, id: string) {
  return Object.keys(cfg.provider ?? {}).filter((item) => item !== id && driver(cfg, item) === id)
}
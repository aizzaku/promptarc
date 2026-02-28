/**
 * Copies root skills/ into setup/npx-cli/skills/ before a build or npm pack.
 * Keeps a single source of truth at the repo root while ensuring the npm
 * package bundles current skill files.
 *
 * Run manually:  node scripts/sync-skills.mjs
 * Auto-runs via: npm run prepack
 */

import { cpSync, existsSync, mkdirSync } from 'fs'
import { resolve, dirname, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const src  = resolve(__dirname, '../../../skills')   // repo root skills/
const dest = resolve(__dirname, '../skills')          // bundled copy

if (!existsSync(src)) {
  console.error(`Source not found: ${src}`)
  console.error('Run this script from within the arc repo.')
  process.exit(1)
}

mkdirSync(dest, { recursive: true })
cpSync(src, dest, { recursive: true, force: true })

const rel = relative(process.cwd(), src)
console.log(`✓ Skills synced  ${rel}  →  skills/`)

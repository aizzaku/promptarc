import os from 'os'
import path from 'path'
import fs from 'fs-extra'
import { input, confirm } from '@inquirer/prompts'
import pc from 'picocolors'

export async function detectClaudeDir(): Promise<string> {
  const defaultPath = path.join(os.homedir(), '.claude')

  if (await fs.pathExists(defaultPath)) {
    console.log(`  ${pc.green('✓')} Claude Code found at ${pc.dim(defaultPath)}`)
    return defaultPath
  }

  // Not found — warn and offer a custom path
  console.log(`  ${pc.yellow('⚠')}  ${pc.bold('~/.claude')} not found.`)
  console.log(pc.dim('     Install Claude Code first: https://claude.ai/download\n'))

  const proceed = await confirm({
    message: 'Proceed with a custom Claude config path?',
    default: false,
  })

  if (!proceed) {
    console.log(pc.dim('\n  Install Claude Code, then re-run: npx arc-setup\n'))
    process.exit(0)
  }

  const customPath = await input({
    message: 'Claude config directory:',
    default: defaultPath,
    validate: async (val) => {
      const exists = await fs.pathExists(val)
      if (!exists) return `Directory not found: ${val}`
      return true
    },
  })

  return customPath
}

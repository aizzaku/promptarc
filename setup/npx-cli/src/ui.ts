import { createRequire } from 'module'
import pc from 'picocolors'

const require = createRequire(import.meta.url)
const { version } = require('../package.json') as { version: string }

export function printBanner(): void {
  console.log()
  console.log(pc.bold('  ARC') + pc.dim(' — Anthropic Runtime Configuration Framework'))
  console.log(pc.dim(`  v${version}`))
  console.log()
  console.log(pc.dim('  ' + '─'.repeat(50)))
  console.log()
}

export function printSuccess(claudeDir: string): void {
  console.log()
  console.log(pc.dim('  ' + '─'.repeat(50)))
  console.log()
  console.log(`  ${pc.green('✓')} ${pc.bold('ARC installed successfully!')}`)
  console.log(pc.dim(`    Skills written to ${claudeDir}/skills/`))
  console.log()
  console.log('  Next steps:')
  console.log(`    1. Open ${pc.bold('Claude Code')} on any project`)
  console.log(`    2. Run ${pc.bold(pc.cyan('/arc-init'))} ${pc.dim('— 6 questions, generates CLAUDE.md + tasks/ (2 min)')}`)
  console.log(`    3. Run ${pc.bold(pc.cyan('/arc-kickoff'))} ${pc.dim('— optional deeper interview (15–30 min)')}`)
  console.log()
  console.log('  All 4 skills installed:')
  console.log(`    ${pc.cyan('/arc-init')}       ${pc.dim('project setup')}`)
  console.log(`    ${pc.cyan('/arc-kickoff')}    ${pc.dim('full project interview')}`)
  console.log(`    ${pc.cyan('/arc-check')}      ${pc.dim('output quality checker')}`)
  console.log(`    ${pc.cyan('/arc-rekickoff')}  ${pc.dim('mid-project re-orientation')}`)
  console.log()
}

export function printAlreadyInstalled(skills: string[]): void {
  console.log(pc.yellow(`  ⚠  Found existing ARC skills: ${skills.join(', ')}`))
  console.log()
}

export function printCancelled(): void {
  console.log(pc.dim('\n  No changes made.\n'))
}

export function printError(message: string): void {
  console.error(pc.red('\n  Error: ') + message + '\n')
}

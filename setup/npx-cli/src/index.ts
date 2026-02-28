import { select } from '@inquirer/prompts'
import { detectClaudeDir } from './detect.js'
import { checkExistingInstall, installSkills } from './install.js'
import {
  printBanner,
  printSuccess,
  printAlreadyInstalled,
  printCancelled,
  printError,
} from './ui.js'

async function main(): Promise<void> {
  printBanner()

  // Detect Claude Code install location
  const claudeDir = await detectClaudeDir()
  console.log()

  // Check for an existing ARC install
  const existing = await checkExistingInstall(claudeDir)

  if (existing.length > 0) {
    printAlreadyInstalled(existing)

    const action = await select({
      message: 'ARC is already installed. What would you like to do?',
      choices: [
        { name: 'Update  — overwrite with the version in this package', value: 'update' },
        { name: 'Cancel  — leave existing install untouched',           value: 'cancel' },
      ],
    })

    if (action === 'cancel') {
      printCancelled()
      process.exit(0)
    }

    console.log()
  }

  // Install
  console.log('  Installing skills...\n')
  await installSkills(claudeDir)

  printSuccess(claudeDir)
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err)
  printError(message)
  process.exit(1)
})

import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import pc from 'picocolors'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Points to the skills/ dir bundled alongside dist/ in the published package
const BUNDLED_SKILLS_DIR = path.join(__dirname, '../skills')

const SKILLS = [
  { id: 'arc-init',      description: '2-minute project setup' },
  { id: 'arc-kickoff',   description: 'full project interview' },
  { id: 'arc-check',     description: 'output quality checker' },
  { id: 'arc-rekickoff', description: 'mid-project re-orientation' },
] as const

export async function checkExistingInstall(claudeDir: string): Promise<string[]> {
  const skillsDir = path.join(claudeDir, 'skills')
  const found: string[] = []

  for (const skill of SKILLS) {
    const skillFile = path.join(skillsDir, skill.id, 'skill.md')
    if (await fs.pathExists(skillFile)) {
      found.push(skill.id)
    }
  }

  return found
}

export async function installSkills(claudeDir: string): Promise<void> {
  const targetDir = path.join(claudeDir, 'skills')
  await fs.ensureDir(targetDir)

  for (const skill of SKILLS) {
    const src  = path.join(BUNDLED_SKILLS_DIR, skill.id)
    const dest = path.join(targetDir, skill.id)

    if (!(await fs.pathExists(src))) {
      throw new Error(`Bundled skill not found: ${src}\nTry re-installing: npm install -g arc-setup`)
    }

    await fs.copy(src, dest, { overwrite: true })
    console.log(`  ${pc.green('✓')} ${pc.bold(skill.id)} ${pc.dim(`(${skill.description})`)}`)
  }
}

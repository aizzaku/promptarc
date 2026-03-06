#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const REPO_URL = 'https://github.com/aizzaku/promptarc.git';

const INDIGO = '\x1b[38;5;99m';
const GREEN  = '\x1b[32m';
const YELLOW = '\x1b[33m';
const DIM    = '\x1b[2m';
const BOLD   = '\x1b[1m';
const RESET  = '\x1b[0m';

function print(msg) { process.stdout.write(msg + '\n'); }

function banner() {
  print('');
  print(`${BOLD}${INDIGO}  ▄▄▄  ██████   ██████${RESET}`);
  print(`${BOLD}${INDIGO} ██  ██ ██   ██ ██     ${RESET}`);
  print(`${BOLD}${INDIGO} ███████ ██████  ██████ ${RESET}`);
  print(`${BOLD}${INDIGO} ██  ██ ██   ██      ██${RESET}`);
  print(`${BOLD}${INDIGO} ██  ██ ██   ██ ██████ ${RESET}`);
  print('');
  print(`  ${BOLD}A Runtime Configuration Framework${RESET}`);
  print(`  ${DIM}for Claude Code${RESET}`);
  print('');
}

function getSkillsDir() {
  const home = process.env.USERPROFILE || process.env.HOME || os.homedir();
  return path.join(home, '.claude', 'skills');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath  = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function countFiles(dir) {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dir, entry.name));
    } else {
      count++;
    }
  }
  return count;
}

function cleanup(dir) {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
  } catch (_) {}
}

async function main() {
  banner();

  const skillsDir = getSkillsDir();
  print(`  ${DIM}Installing to: ${skillsDir}${RESET}`);
  print('');

  // Check git is available
  try {
    execSync('git --version', { stdio: 'ignore' });
  } catch (_) {
    print(`  ${YELLOW}⚠  git not found.${RESET}`);
    print('');
    print('  Manual install:');
    print(`  ${DIM}1. Download https://github.com/aizzaku/promptarc/archive/refs/heads/main.zip${RESET}`);
    print(`  ${DIM}2. Extract and copy the skills/ folder to ~/.claude/skills/${RESET}`);
    print('');
    process.exit(1);
  }

  const tmpDir = path.join(os.tmpdir(), `arc-setup-${Date.now()}`);

  try {
    print(`  ${DIM}Cloning repository...${RESET}`);
    execSync(`git clone --depth 1 ${REPO_URL} "${tmpDir}"`, { stdio: 'pipe' });

    const srcSkills = path.join(tmpDir, 'skills');
    if (!fs.existsSync(srcSkills)) {
      throw new Error('skills/ directory not found in repository');
    }

    print(`  ${DIM}Copying skills to ${skillsDir}...${RESET}`);
    ensureDir(skillsDir);
    copyDir(srcSkills, skillsDir);

    const fileCount = countFiles(skillsDir);
    cleanup(tmpDir);

    print('');
    print(`  ${GREEN}${BOLD}✓ ARC installed${RESET}  ${DIM}(${fileCount} files → ${skillsDir})${RESET}`);
    print('');
    print(`  ${BOLD}Next steps:${RESET}`);
    print(`  ${DIM}1.${RESET}  Open Claude Code in your project`);
    print(`  ${DIM}2.${RESET}  Run ${INDIGO}/arc-init${RESET} to set up this project ${DIM}(~2 min)${RESET}`);
    print(`  ${DIM}3.${RESET}  Run ${INDIGO}/arc-kickoff${RESET} for a full context interview ${DIM}(optional, ~15 min)${RESET}`);
    print(`  ${DIM}4.${RESET}  Run ${INDIGO}/arc-resume${RESET} at the start of every session`);
    print('');
  } catch (err) {
    cleanup(tmpDir);
    print('');
    print(`  ${YELLOW}⚠  Installation failed:${RESET} ${err.message}`);
    print('');
    print('  Manual install:');
    print(`  ${DIM}git clone https://github.com/aizzaku/promptarc.git${RESET}`);
    print(`  ${DIM}cp -r promptarc/skills ~/.claude/skills${RESET}`);
    print('');
    process.exit(1);
  }
}

main();

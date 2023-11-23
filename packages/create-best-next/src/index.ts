#!/usr/bin/env node
import fs from 'node:fs'
import fse from 'fs-extra'
import path from 'node:path'
import prompts, { type PromptObject } from 'prompts'
import { fileURLToPath } from 'node:url'
import { red, green, bold } from 'kolorist'
import * as process from 'process'

// Implement the terminal cli bin
async function init() {
  let targetDir = ''
  const defaultProjectName = 'best-next'

  const templateRoot = fileURLToPath(new URL('../template', import.meta.url))
  const CHOICES = fs.readdirSync(templateRoot) // ['next-app', 'next-page']

  const questions: PromptObject<string>[] = [
    {
      name: 'projectName',
      type: 'text',
      message: 'Project Name',
      initial: defaultProjectName,
      onState: (state: any) => { // callback function call when state change
        targetDir = String(state.value).trim() || defaultProjectName
      }
    },
    {
      name: 'shouldOverwrite', // when the target dir is existed, this question will be asked.
      type: () => (canSafelyOverwrite(targetDir) ? null : 'confirm'),
      message: `${targetDir} is not empty. Remove existing files and continue?`
    },
    {
      name: 'overwriteChecker',
      type: (values: any) => {
        console.log(values)
        if (values === false) {
          throw new Error(red('✖') + ' Operation cancelled')
        }
        return null
      }
    },
    {
      name : 'packageName',
      type: () => (isValidPackageName(targetDir) ? null : "text"),
      message: "Package name",
      initial: () => toValidPackageName(targetDir),  // initial value to transform the targetDir to valid package name
      validate: (dir: string) => { // receive the input value and return the validation result (boolean value)
        return isValidPackageName(dir) || "Invalid package.json name"
      }
    },
    {
      name: 'chooseProject',
      type: 'select',
      message: 'Choose a starter project template',
      choices: [
        {title: 'next-app-router', value: CHOICES[0]},
        {title: 'next-page-router', value: CHOICES[1]}
      ]
    },
  ]

  let result: prompts.Answers<string>

  try {
    result = await prompts(questions, {onCancel: () => {
      throw new Error(red('✖') + ' Operation cancelled')
    }})
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
    }
    process.exit(1)
  }

  const { packageName, shouldOverwrite, chooseProject } = result

  const root = path.resolve(targetDir) // build an absolute path from the targetDir

  if (shouldOverwrite) {
    fse.emptyDirSync(root) // Delete dir content if the dir is existed. If not, create the dir.
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, {recursive: true})
  }

  // ---------- Now we have the target dir, we can copy the template to the target dir. ----------

  const pkg = {
    name: packageName ?? toValidPackageName(targetDir),
    version: '0.0.0'
  }

  console.log('Setting up project...')

  const templateDir = path.join(templateRoot, chooseProject)

  // read existing package.json from the root directory
  const packageJsonPath = path.join(root, 'package.json')
  const newPackageJsonPath = path.join(templateDir, 'package.json')
  const newPackageJson = JSON.parse(
    fs.readFileSync(newPackageJsonPath, 'utf-8')
  )

  fse.copySync(templateDir, root)

  fse.writeFileSync(
    packageJsonPath,
    JSON.stringify({
      ...newPackageJson,
      ...pkg
    }, null, 2)
  )

  // Determine package manager
  const manager = process.env.npm_config_user_agent ?? ''
  const packageManager = /pnpm/.test(manager) ? 'pnpm' : /yarn/.test(manager) ? 'yarn' : 'npm'

  console.log(packageManager, 'packageManager')

  const commandsMap = {
    install: {
      pnpm: "pnpm install",
      yarn: "yarn",
      npm: "npm install",
    },
    dev: {
      pnpm: "pnpm dev",
      yarn: "yarn dev",
      npm: "npm run dev",
    }
  }

  console.log(`\nDone. Now run:\n`)
  console.log(`${bold(green(`cd ${targetDir}`))}`)
  console.log(`${bold(green(commandsMap.install[packageManager]))}`)
  console.log(`${bold(green(commandsMap.dev[packageManager]))}`)
  console.log()
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName,
  )
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z0-9-~]+/g, "-")
}

// If the dir is empty or not exist
function canSafelyOverwrite(dir: string) {
  return !fs.existsSync(dir) || fs.readdirSync(dir).length === 0
}

init().catch((err) => {
  console.error(err)
})

#!/usr/bin/env node

/**
 * Script to create a new documentation version
 * Usage: node create-version.js <version>
 * Example: node create-version.js 1.0.0
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const docsDir = path.join(__dirname, '..', 'docs')

// Get version from arguments
const version = process.argv[2]

if (!version) {
  console.error('Error: Version number is required')
  console.log('Usage: node create-version.js <version>')
  console.log('Example: node create-version.js 1.0.0')
  process.exit(1)
}

// Create version directory
const versionDir = path.join(docsDir, `v${version}`)

if (fs.existsSync(versionDir)) {
  console.error(`Error: Version v${version} already exists`)
  process.exit(1)
}

// Copy current docs to the version directory (excluding .vitepress and other versions)
console.log(`Creating version v${version}...`)

// Create version directory
fs.mkdirSync(versionDir, { recursive: true })

// Function to copy files recursively
function copyFiles(source, target) {
  // Skip .vitepress directory and existing version directories
  if (source.includes('/.vitepress') || source.match(/\/v\d+\.\d+\.\d+/)) {
    return
  }
  
  if (fs.statSync(source).isDirectory()) {
    fs.mkdirSync(target, { recursive: true })
    const files = fs.readdirSync(source)
    
    for (const file of files) {
      const sourcePath = path.join(source, file)
      const targetPath = path.join(target, file)
      copyFiles(sourcePath, targetPath)
    }
  } else {
    fs.copyFileSync(source, target)
  }
}

// Copy files from docs to version directory
copyFiles(docsDir, versionDir)

console.log(`Version v${version} created successfully!`)
console.log(`Don't forget to update the version dropdown in .vitepress/config.js`) 
import type { DefineConfig, ProjectType } from '../typing'

import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { defineApplicationConfig } from './application'
import { defineLibraryConfig } from './library'

function defineConfig(
  userConfigPromise?: DefineConfig,
  type: ProjectType = 'auto',
) {
  let projectType = type

  if (projectType === 'auto') {
    const htmlPath = join(process.cwd(), 'index.html')
    projectType = existsSync(htmlPath) ? 'application' : 'library'
  }

  switch (projectType) {
    case 'application': {
      return defineApplicationConfig(userConfigPromise)
    }
    case 'library': {
      return defineLibraryConfig(userConfigPromise)
    }
    default: {
      return defineApplicationConfig(userConfigPromise)
    }
  }
}

export { defineConfig }

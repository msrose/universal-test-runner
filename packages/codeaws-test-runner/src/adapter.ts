// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import log from './log'
import path from 'path'

import { Adapter } from '@sentinel-internal/codeaws-test-runner-types'

type Process = Pick<typeof process, 'cwd'>

export async function loadAdapter(adapterModule: string, processObject: Process): Promise<Adapter> {
  try {
    const adapterImportPath = adapterModule.startsWith('.')
      ? path.join(processObject.cwd(), adapterModule)
      : adapterModule
    const adapter = await import(adapterImportPath)
    log.stderr('Loaded adapter from', adapterModule)
    return adapter
  } catch (e) {
    log.stderr('Failed to load adapter from', adapterModule)
    throw e
  }
}

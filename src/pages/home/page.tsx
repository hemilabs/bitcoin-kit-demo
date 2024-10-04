import React, { useState } from 'react'
import { Contract, getBytes } from 'ethers'
import { useBitcoinkitContext } from 'context/bitcoinkitContext'
import ABI from '../../contracts/ContractABI'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/theme-github'

import defaultCode from './defaultCode/main'
import { Output } from './_components/output'
import { ContractMethods } from './_components/contractMethods'
import { LatestContract } from './_components/latestContract'

const enum ThemeEditorEnum {
  default = 'github',
  dark = 'twilight',
}

export const HomePage = () => {
  const { state } = useBitcoinkitContext()
  const [selectedMethod, setSelectedMethod] =
    useState<keyof typeof defaultCode>('btcBalAddr')
  const [ThemeEditor, setThemeEditor] = useState<ThemeEditorEnum>(
    ThemeEditorEnum.default,
  )
  const [code, setCode] = useState<string>(defaultCode['btcBalAddr'])
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleMethodChange = (method: keyof typeof defaultCode) => {
    setSelectedMethod(method)
    setCode(defaultCode[method] || '')
    setOutput(null)
    setError(null)
    setLogs([])
  }

  const handleExecute = async () => {
    setOutput(null)
    setError(null)
    setLoading(true)
    setLogs([])

    const originalConsoleLog = console.log
    console.log = function (...args) {
      setLogs(prevLogs => [...prevLogs, ...args.map(arg => arg.toString())])
      originalConsoleLog.apply(console, args)
    }

    const safeJsonStringify = (obj: any) => {
      return JSON.stringify(
        obj,
        (_, value) => (typeof value === 'bigint' ? value.toString() : value),
        2,
      )
    }

    try {
      const asyncFunc = new Function(
        'state',
        'Contract',
        'ABI',
        'getBytes',
        `
        return (async () => {
          ${code}
        })();
      `,
      )

      const result = await asyncFunc(state, Contract, ABI, getBytes)
      setOutput(result ? safeJsonStringify(result) : 'No output')
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
      console.log = originalConsoleLog
    }
  }

  return (
    <div className="w-screen rounded-lg bg-gray-100 p-4">
      <div className="mb-6 flex w-full items-center">
        <LatestContract
          contractAddress={state.contractAddress}
          blockExplorerUrl={import.meta.env.VITE_CHAIN_BLOCK_EXPLORER_URL}
          network={import.meta.env.VITE_CHAIN_NETWORK}
        />
      </div>
      <div className="flex">
        <div className="w-1/4 rounded-lg bg-white p-4 shadow-md">
          <ContractMethods
            defaultCode={defaultCode}
            selectedMethod={selectedMethod}
            loading={loading}
            handleMethodChange={handleMethodChange}
          />
        </div>
        <div className="mx-4 flex w-3/4 flex-col">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-lg font-normal text-neutral-950">
                Code Editor
              </h2>
              <h3 className="ml-1 text-sm font-normal text-neutral-500">
                (JavaScript)
              </h3>
            </div>
            <div className="flex items-center justify-center">
              <label
                htmlFor="themeSelector"
                className="mr-2 text-sm text-neutral-500"
              >
                Theme Editor
              </label>
              <select
                value={ThemeEditor}
                onChange={e =>
                  setThemeEditor(e.target.value as ThemeEditorEnum)
                }
                className="rounded-lg border border-neutral-300 p-1 text-sm text-neutral-950"
              >
                <option value={ThemeEditorEnum.default}>Light</option>
                <option value={ThemeEditorEnum.dark}>Dark</option>
              </select>
            </div>
          </div>
          <AceEditor
            mode="javascript"
            theme={ThemeEditor}
            value={code}
            onChange={newCode => setCode(newCode)}
            name="editor"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              useWorker: false,
              tabSize: 2,
            }}
            width="100%"
            height="50dvh"
            readOnly={loading}
          />
          <button
            onClick={handleExecute}
            className={`mt-4 rounded-lg border bg-orange-950 px-4 py-2 text-lg text-white transition-colors
            ${
              loading || !state.walletConnected
                ? 'cursor-default border-neutral-300 bg-opacity-40'
                : 'cursor-pointer bg-opacity-90 hover:bg-opacity-100'
            }`}
            disabled={loading || !state.walletConnected}
          >
            {loading ? 'Executing...' : 'Execute'}
          </button>
          <div className="mt-4 flex flex-row gap-x-4">
            <div className="flex-1">
              <Output output={output} error={error} logs={logs} />
            </div>
            {logs.length > 0 && (
              <div className="flex-1 overflow-y-auto overflow-x-hidden rounded bg-gray-100 text-gray-800">
                <h2 className="text-lg font-normal text-neutral-950 ">Logs</h2>
                <div className="max-w-[35vw] overflow-x-auto break-all rounded bg-yellow-100 p-4 text-yellow-800">
                  <pre>{logs.join('\n')}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

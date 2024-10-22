import React, { useState } from 'react'
import ABI from '../../contracts/ContractABI'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/theme-github'

import defaultCode from './defaultCode/main'
import { Output } from './_components/output'
import { getContract } from 'viem'
import { useAccount, useWalletClient } from 'wagmi'
import { Tab, TabPage } from 'components/tabPage'
import { DefaultCode } from 'types/defaultCode'
import btcBalAddr from './defaultCode/btcBalAddr'
import defaultCodeList from './defaultCode/main'

const enum ThemeEditorEnum {
  default = 'github',
  dark = 'twilight',
}

const contractAddress = import.meta.env.VITE_HEMI_BITCOIN_KIT_CONTRACT_ADDRESS

export const CodeEditorPage = () => {
  const { data: walletClient } = useWalletClient()
  const { status, chain } = useAccount()
  const [selectedMethod, setSelectedMethod] = useState<DefaultCode>(btcBalAddr)
  const [ThemeEditor, setThemeEditor] = useState<ThemeEditorEnum>(
    ThemeEditorEnum.default,
  )
  const [code, setCode] = useState<string>(
    defaultCode.find(c => c.name === 'btcBalAddr')?.code || '',
  )
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const walletConnected = status === 'connected' && chain

  const handleMethodChange = (tab: Tab) => {
    const method = defaultCode.find(c => c.name === tab.name)
    if (!method) {
      return
    }

    setSelectedMethod(method)
    setCode(method.code)
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
        'contractAddress',
        'getContract',
        'walletClient',
        'ABI',
        `
        return (async () => {
          ${code}
        })();
      `,
      )

      const result = await asyncFunc(
        contractAddress,
        getContract,
        walletClient,
        ABI,
      )
      setOutput(result ? safeJsonStringify(result) : 'No output')
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
      console.log = originalConsoleLog
    }
  }

  return (
    <div className="w-screen overflow-x-hidden">
      <TabPage
        tabs={defaultCodeList}
        selectedTab={selectedMethod}
        onChange={handleMethodChange}
      />
      <div className="lg:px-22 overflow-auto p-4 px-8 md:px-16 2xl:px-48">
        <div className="flex flex-col">
          <h2 className="mt-6 text-2xl font-normal text-neutral-950">
            {selectedMethod.label}
          </h2>
          <span className="mt-1 text-sm font-normal text-neutral-500">
            {selectedMethod.description}
          </span>
          <div className="mb-1 mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-lg font-normal text-neutral-950">
                Code Editor
              </h3>
              <h4 className="ml-1 text-sm font-normal text-neutral-500">
                (JavaScript)
              </h4>
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
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col lg:w-3/4">
            <AceEditor
              mode="javascript"
              theme={ThemeEditor}
              value={code}
              onChange={newCode => setCode(newCode)}
              name="editor"
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                useWorker: false,
                fontSize: 14,
                fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
                showGutter: true,
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
                loading || !walletConnected
                  ? 'cursor-default border-neutral-300 bg-opacity-40'
                  : 'cursor-pointer bg-opacity-90 hover:bg-opacity-100'
              }`}
              disabled={loading || !walletConnected}
            >
              {loading ? 'Executing...' : 'Execute'}
            </button>
          </div>
          <div className="mt-4 w-auto rounded-lg bg-white p-4 shadow-md lg:ml-6 lg:mt-0 lg:w-1/4">
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

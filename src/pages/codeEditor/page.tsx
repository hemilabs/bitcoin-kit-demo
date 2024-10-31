import React, { useState } from 'react'
import ABI from '../../contracts/ContractABI'

import defaultCode from './defaultCode/main'
import { Output } from './_components/output'
import { getContract } from 'viem'
import { useAccount, useWalletClient } from 'wagmi'
import { Tab, TabPage } from 'components/tabPage'
import { DefaultCode, DefaultCodeName } from 'types/defaultCode'
import btcBalAddr from './defaultCode/btcBalAddr'
import defaultCodeList from './defaultCode/main'
import { CodeEditor, ThemeEditorEnum } from './_components/codeEditor'

const contractAddress = import.meta.env.VITE_HEMI_BITCOIN_KIT_CONTRACT_ADDRESS

export const CodeEditorPage = () => {
  const { data: walletClient } = useWalletClient()
  const { status, chain } = useAccount()
  const [selectedMethod, setSelectedMethod] = useState<DefaultCode>(btcBalAddr)
  const [ThemeEditor, setThemeEditor] = useState<ThemeEditorEnum>(
    ThemeEditorEnum.default,
  )
  const [code, setCode] = useState<string>(
    defaultCode.find(c => c.name === DefaultCodeName.btcBalAddr)?.code || '',
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

  const toggleTheme = () =>
    setThemeEditor(prev =>
      prev === ThemeEditorEnum.dark
        ? ThemeEditorEnum.default
        : ThemeEditorEnum.dark,
    )

  return (
    <div className="w-screen overflow-x-hidden">
      <TabPage
        tabs={defaultCodeList}
        selectedTab={selectedMethod}
        onChange={handleMethodChange}
      />
      <div className="lg:px-22 overflow-auto p-4 px-8 md:px-16 2xl:px-48">
        <div className="flex flex-col">
          <h2 className="mt-3 text-2xl font-normal text-neutral-950">
            {selectedMethod.label}
          </h2>
          <span className="mt-1 text-sm font-normal text-neutral-500">
            {selectedMethod.description}
          </span>
        </div>
        <div className="mt-4 flex h-full flex-col sm:h-[62dvh] lg:flex-row">
          <div className="flex min-h-[40vh] flex-grow flex-col lg:w-3/4">
            <CodeEditor
              code={code}
              themeEditor={ThemeEditor}
              loading={loading}
              onHandleExecute={handleExecute}
              onChange={setCode}
              onToggleTheme={toggleTheme}
              selectedMethod={selectedMethod}
              walletConnected={walletConnected}
            />
          </div>
          <div className="h-full w-auto pb-10 pt-2 lg:ml-6 lg:w-1/4">
            <div className="mb-1 flex items-end justify-between">
              <h4 className="text-base font-normal text-neutral-950">Output</h4>
            </div>
            <div className="h-0.5 w-full bg-neutral-200" />
            <div className="mt-2 h-full">
              <Output
                output={output}
                error={error}
                loading={loading}
                logs={logs}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { LoadingSpinner } from 'components/loadingSpinner'
import { CodeIcon } from 'icons/code'

interface OutputContentProps {
  output: string | null
  error: string | null
  loading: boolean
}

interface LogsContentProps {
  logs: string[]
}

interface OutputProps extends OutputContentProps, LogsContentProps {}

const colorizeSpecialChars = (text: string) => {
  const parts = text.split(/([{}\[\],])/)
  return parts.map((part, index) =>
    /[{}\[\],]/.test(part) ? (
      <span key={index} className="text-neutral-500">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    ),
  )
}

const OutputContent = ({ output, error, loading }: OutputContentProps) => {
  if (output) {
    return (
      <div className="flex-grow overflow-hidden">
        <div className="h-full overflow-y-auto p-2 font-ibm text-orange-600 font-ss03-ss04">
          <pre className="max-w-full whitespace-pre-wrap break-all">
            {colorizeSpecialChars(output)}
          </pre>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-grow overflow-hidden">
        <div className="h-full overflow-y-auto p-2 font-ibm text-red-800 font-ss03-ss04">
          <pre className="max-w-full whitespace-pre-wrap break-all">
            {colorizeSpecialChars(error)}
          </pre>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex flex-grow items-center justify-center overflow-hidden">
        <div className="flex items-center justify-center p-2">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-grow items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-orange-50 p-2 text-orange-500">
          <CodeIcon />
        </div>
        <p className="flex flex-col items-center text-lg font-normal text-neutral-950">
          Execute a contract
          <span className="text-sm text-neutral-500">
            Execute a contract to see its output.
          </span>
        </p>
      </div>
    </div>
  )
}

const LogsContent = ({ logs }: LogsContentProps) => {
  if (logs.length === 0) return null

  return (
    <div className="h-40 overflow-y-auto break-words p-4 font-ibm text-neutral-500 font-ss03-ss04">
      <pre className="whitespace-pre-wrap">
        {colorizeSpecialChars(logs.join('\n'))}
      </pre>
    </div>
  )
}

export const Output = ({ output, error, loading, logs }: OutputProps) => (
  <div className="flex h-full w-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-1 text-sm font-normal shadow-md">
    <OutputContent output={output} error={error} loading={loading} />
    <LogsContent logs={logs} />
  </div>
)

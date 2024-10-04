interface Props {
  output: string | null
  error: string | null
  logs: string[]
}

export const Output = ({ output, error, logs }: Props) => (
  <>
    <h3 className="text-lg font-normal text-neutral-950">Output</h3>
    {output ? (
      <div
        className={`overflow-x-auto break-all rounded bg-green-100 p-4 text-green-800 ${
          logs.length > 0 ? 'max-w-[35vw]' : 'max-w-[70vw]'
        }`}
      >
        <pre>{output}</pre>
      </div>
    ) : error ? (
      <div
        className={`overflow-x-auto break-all rounded bg-red-100 p-4 text-red-800 ${
          logs.length > 0 ? 'max-w-[35vw]' : 'max-w-[70vw]'
        }`}
      >
        <pre>{error}</pre>
      </div>
    ) : (
      <div className="p-4 text-neutral-500">No output to display.</div>
    )}
  </>
)

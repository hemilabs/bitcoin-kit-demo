import defaultCode from '../defaultCode/main'

interface Props {
  defaultCode: typeof defaultCode
  selectedMethod: string
  loading: boolean
  handleMethodChange: (method: keyof typeof defaultCode) => void
}

export const ContractMethods = ({
  defaultCode,
  selectedMethod,
  loading,
  handleMethodChange,
}: Props) => (
  <>
    <h2 className="mb-4 text-lg font-normal text-neutral-950">
      Contract Methods
    </h2>
    <div
      className={`pointer-events-none flex flex-col gap-y-2 ${
        loading ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      {Object.keys(defaultCode).map(method => (
        <button
          key={method}
          onClick={() => handleMethodChange(method as keyof typeof defaultCode)}
          disabled={loading}
          className={`rounded-lg px-4 py-2 text-left ${
            selectedMethod === method
              ? 'border border-orange-500 text-orange-500'
              : 'border border-slate-300 text-slate-300'
          } transition-colors hover:border-orange-400 hover:text-orange-400`}
        >
          {method}
        </button>
      ))}
    </div>
  </>
)

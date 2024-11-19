import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/theme-github'

import { DefaultCode } from 'types/defaultCode'
import ThemeSwitcher from './themeSwitcher'
import { EditorJs } from 'icons/editorJs'
import { Chain } from 'viem'

export const enum ThemeEditorEnum {
  default = 'github',
  dark = 'twilight',
}

interface Props {
  code: string
  themeEditor: ThemeEditorEnum
  loading: boolean
  onChange: (code: string) => void
  onHandleExecute: () => void
  onToggleTheme: () => void
  selectedMethod: DefaultCode
}

export const CodeEditor = ({
  code,
  themeEditor,
  loading,
  onHandleExecute,
  onChange,
  onToggleTheme,
  selectedMethod,
}: Props) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="mb-1 flex items-end justify-between">
          <h3 className="text-base font-normal text-neutral-950">
            Code Editor
          </h3>
          <ThemeSwitcher
            isDark={themeEditor === ThemeEditorEnum.dark}
            onToggle={onToggleTheme}
          />
        </div>
        <div className="h-0.5 w-full bg-neutral-200" />
        <div className="mt-3 flex h-12 w-full items-center justify-between rounded-t-2xl border border-neutral-200 bg-neutral-100 px-4 shadow-md">
          <div className="flex flex-row items-center gap-x-2 text-base font-normal text-neutral-600">
            <EditorJs />
            {selectedMethod.name}.js
          </div>
          <button
            onClick={onHandleExecute}
            className={`w-28 rounded-xl border py-1.5 text-base font-normal text-white transition-all duration-300
            ${
              loading
                ? 'cursor-default border-neutral-300 bg-execute-button-disabled'
                : 'cursor-pointer bg-execute-button hover:brightness-90'
            }`}
            disabled={loading}
          >
            {loading ? 'Executing...' : 'Execute'}
          </button>
        </div>
      </div>
      <div className="h-full rounded-b-2xl border-x border-b border-neutral-200 shadow-md">
        <AceEditor
          mode="javascript"
          theme={themeEditor}
          value={code}
          onChange={onChange}
          name="editor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            useWorker: false,
            fontSize: 14,
            fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
            showGutter: false,
            tabSize: 2,
          }}
          width="100%"
          height="100%"
          style={{ borderRadius: '0 0 1rem 1rem' }}
          readOnly={loading}
        />
      </div>
    </>
  )
}

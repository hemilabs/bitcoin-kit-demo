export const Footer = () => (
  <footer className="flex w-full items-center justify-between pt-6 text-sm font-medium text-zinc-500">
    <span>© {new Date().getFullYear()} Hemi Labs, Inc.</span>
    <div className="mr-4 text-right">
      <span>Hemi Bitcoin Kit Demo v{APP_VERSION}</span>
    </div>
  </footer>
)

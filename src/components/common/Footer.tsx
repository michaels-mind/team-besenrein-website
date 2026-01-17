export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-center text-sm text-slate-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Team Besenrein. Alle Rechte vorbehalten.</p>
        <div className="mt-4 space-x-4">
          <span className="cursor-pointer hover:text-slate-900 transition-colors">Impressum</span>
          <span className="cursor-pointer hover:text-slate-900 transition-colors">Datenschutz</span>
        </div>
      </div>
    </footer>
  );
}

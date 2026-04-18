export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-64 -start-32 w-[600px] h-[600px] rounded-full bg-brand-turquoise/5 blur-3xl" />
        <div className="absolute -bottom-48 -end-32 w-[500px] h-[500px] rounded-full bg-brand-navy/4 blur-3xl" />
      </div>

      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-turquoise via-[#2fa9a3] to-brand-navy flex items-center justify-center shadow-[0_2px_8px_0_rgb(58_175_169/0.3)]">
          <span className="text-white font-black text-sm leading-none">מ</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900">
          משכנתא חכמה
        </span>
      </div>

      {/* Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_0_rgb(0_0_0/0.04),0_6px_16px_-2px_rgb(0_0_0/0.05)] border border-gray-100/80 p-8">
          {children}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-gray-400 font-medium relative z-10">
        &copy; {new Date().getFullYear()} משכנתא חכמה. כל הזכויות שמורות.
      </p>
    </div>
  )
}

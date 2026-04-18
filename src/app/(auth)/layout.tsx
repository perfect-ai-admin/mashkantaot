export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1B2A4A 0%, #2D4A7A 50%, #1B3A5A 100%)",
      }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-64 -start-32 w-[600px] h-[600px] rounded-full bg-brand-turquoise/10 blur-3xl" />
        <div className="absolute -bottom-48 -end-32 w-[500px] h-[500px] rounded-full bg-brand-turquoise/8 blur-3xl" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/3 blur-3xl" />
      </div>

      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 relative z-10">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-turquoise via-[#2fa9a3] to-[#1d8a85] flex items-center justify-center shadow-[0_4px_20px_0_rgb(58_175_169/0.5)]">
          <span className="text-white font-black text-base leading-none">מ</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-white">
          משכנתא חכמה
        </span>
      </div>

      {/* Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_0_rgb(0_0_0/0.18),0_2px_8px_0_rgb(0_0_0/0.08)] border border-white/10 p-8">
          {children}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-white/30 font-medium relative z-10">
        &copy; {new Date().getFullYear()} משכנתא חכמה. כל הזכויות שמורות.
      </p>
    </div>
  )
}

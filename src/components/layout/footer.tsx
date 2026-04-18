import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

const products = [
  { label: "משכנתא חדשה", href: "/mortgage" },
  { label: "מחזור משכנתא", href: "/refinance" },
  { label: "איחוד הלוואות", href: "/consolidation" },
  { label: "מחשבוני משכנתא", href: "/calculator" },
  { label: "בדיקת זכאות", href: "/questionnaire" },
]

const services = [
  { label: "ייעוץ אישי", href: "/contact" },
  { label: "ליווי מלא", href: "/contact" },
  { label: "בדיקת תנאים", href: "/contact" },
  { label: "השוואת בנקים", href: "/calculator" },
  { label: "אודות", href: "/about" },
  { label: "צור קשר", href: "/contact" },
]

const WA_HREF =
  "https://wa.me/972501234567?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%20%D7%91%D7%99%D7%99%D7%A2%D7%95%D7%A5%20%D7%9E%D7%A9%D7%9B%D7%A0%D7%AA%D7%90"

export function Footer() {
  return (
    <footer dir="rtl" className="bg-brand-navy text-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#2D4A7A40,transparent)] pointer-events-none" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-turquoise via-brand-turquoise to-[#2f9d97] flex items-center justify-center shadow-[0_2px_8px_0_rgb(58_175_169/0.4)]">
                <span className="text-white font-black text-sm leading-none">מ</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                משכנתא חכמה
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/55 max-w-[220px]">
              כל תהליך המשכנתא וההלוואות שלך, מסודר במקום אחד
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { label: "פייסבוק", abbr: "f" },
                { label: "לינקדאין", abbr: "in" },
                { label: "אינסטגרם", abbr: "ig" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/16 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                >
                  <span className="text-[10px] font-bold text-white/60 leading-none">
                    {social.abbr}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-5">
              מוצרים
            </h3>
            <ul className="flex flex-col gap-3">
              {products.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-5">
              שירותים
            </h3>
            <ul className="flex flex-col gap-3">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-5">
              צור קשר
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="tel:031234567"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-200">
                    <Phone className="w-4 h-4 text-brand-turquoise" strokeWidth={1.75} />
                  </div>
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-200 tabular-nums" dir="ltr">
                    03-1234567
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@mashkanta.co.il"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-200">
                    <Mail className="w-4 h-4 text-brand-turquoise" strokeWidth={1.75} />
                  </div>
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-200" dir="ltr">
                    info@mashkanta.co.il
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-brand-turquoise" strokeWidth={1.75} />
                  </div>
                  <span className="text-sm font-medium text-white/70">
                    תל אביב, ישראל
                  </span>
                </div>
              </li>
              <li>
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/35 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#25D366"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.857L.057 23.882a.5.5 0 0 0 .612.612l6.025-1.475A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.094-1.4l-.364-.216-3.777.924.944-3.777-.237-.376A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-200">
                    WhatsApp
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35 font-medium">
            &copy; {new Date().getFullYear()} משכנתא חכמה. כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs text-white/35 hover:text-white/65 font-medium transition-colors duration-200">
              מדיניות פרטיות
            </Link>
            <Link href="/terms" className="text-xs text-white/35 hover:text-white/65 font-medium transition-colors duration-200">
              תנאי שימוש
            </Link>
            <Link href="/accessibility" className="text-xs text-white/35 hover:text-white/65 font-medium transition-colors duration-200">
              נגישות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

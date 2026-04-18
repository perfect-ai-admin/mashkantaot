"use client"

import { usePathname } from "next/navigation"

const WA_HREF =
  "https://wa.me/972501234567?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%20%D7%91%D7%99%D7%99%D7%A2%D7%95%D7%A5%20%D7%9E%D7%A9%D7%9B%D7%A0%D7%AA%D7%90"

export function WhatsAppButton() {
  const pathname = usePathname()

  if (pathname?.startsWith("/crm")) return null

  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="פתח שיחת WhatsApp"
      dir="rtl"
      className="group fixed bottom-6 start-6 z-50 flex items-center gap-3"
    >
      {/* Label — slides in from the right on hover (RTL: from left) */}
      <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap rounded-xl bg-white px-0 py-2.5 text-sm font-semibold text-gray-800 shadow-[0_4px_16px_-2px_rgb(0_0_0/0.12),0_2px_8px_-2px_rgb(0_0_0/0.06)] opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:px-4 group-hover:opacity-100">
        צריכים עזרה? דברו איתנו
      </span>

      {/* Circle button */}
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_14px_0_rgb(37_211_102/0.45)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_20px_0_rgb(37_211_102/0.55)] active:scale-[0.96]">
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.857L.057 23.882a.5.5 0 0 0 .612.612l6.025-1.475A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.094-1.4l-.364-.216-3.777.924.944-3.777-.237-.376A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </div>
    </a>
  )
}

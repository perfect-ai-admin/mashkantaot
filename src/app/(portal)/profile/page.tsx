"use client"

import { useState } from "react"
import { User, Phone, Mail, CreditCard, Lock, Pencil, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const MOCK_PROFILE = {
  full_name: "ישראל ישראלי",
  initials: "יי",
  phone: "054-123-4567",
  email: "israel@example.com",
  id_number: "****1234",
}

export default function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const [phone, setPhone] = useState(MOCK_PROFILE.phone)
  const [email, setEmail] = useState(MOCK_PROFILE.email)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function handleCancel() {
    setPhone(MOCK_PROFILE.phone)
    setEmail(MOCK_PROFILE.email)
    setEditing(false)
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">הפרופיל שלי</h1>
        <p className="text-sm text-gray-500 mt-0.5">נהל את פרטי החשבון שלך</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-bl from-brand-turquoise to-cyan-400 text-white text-xl font-bold shadow-sm">
              {MOCK_PROFILE.initials}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{MOCK_PROFILE.full_name}</h2>
              <p className="text-sm text-gray-400">לקוח מאושר</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { Icon: Phone, label: "טלפון", value: MOCK_PROFILE.phone },
              { Icon: Mail, label: "אימייל", value: MOCK_PROFILE.email },
              { Icon: CreditCard, label: "מספר זהות", value: MOCK_PROFILE.id_number },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                <Icon className="size-4 shrink-0 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-gray-900 tabular-nums">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      <Card>
        <CardHeader className="border-b pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-gray-700">עריכת פרטים</CardTitle>
            {!editing && (
              <Button variant="ghost" size="sm" className="gap-1.5 text-brand-turquoise" onClick={() => setEditing(true)}>
                <Pencil className="size-3.5" />
                ערוך
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-5 space-y-4">
          {saved && (
            <div className="rounded-lg bg-green-50 border border-green-100 px-3 py-2 text-sm text-green-700 font-medium">
              הפרטים נשמרו בהצלחה.
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-gray-600">טלפון</Label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!editing}
              className="h-9 text-sm"
              dir="ltr"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-gray-600">אימייל</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!editing}
              className="h-9 text-sm"
              dir="ltr"
            />
          </div>

          {editing && (
            <div className="flex gap-2 pt-1">
              <Button
                className="bg-brand-turquoise hover:bg-brand-turquoise/90 text-white gap-1.5"
                size="sm"
                onClick={handleSave}
              >
                <Save className="size-3.5" />
                שמור שינויים
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5" onClick={handleCancel}>
                <X className="size-3.5" />
                ביטול
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card>
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-sm font-semibold text-gray-700">אבטחה</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Lock className="size-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">סיסמה</p>
                <p className="text-xs text-gray-400">שנה את הסיסמה לחשבון שלך</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              שנה סיסמה
            </Button>
          </div>

          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">מחק חשבון</p>
                <p className="text-xs text-gray-400">פעולה זו אינה הפיכה</p>
              </div>
              <button className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium underline underline-offset-2">
                מחק חשבון
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

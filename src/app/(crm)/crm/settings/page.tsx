"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  User,
  Bell,
  Users,
  Settings2,
  Camera,
  UserPlus,
  CheckCircle2,
} from "lucide-react"

// ---- Profile ----
const PROFILE_INIT = {
  fullName: "יעל כהן",
  email: "yael@mortgagepro.co.il",
  phone: "054-321-0987",
}

// ---- Notifications ----
type NotifKey = "new_lead" | "doc_uploaded" | "new_task" | "stuck_case"
interface NotifState {
  email: boolean
  push: boolean
}
const NOTIF_LABELS: Record<NotifKey, string> = {
  new_lead: "ליד חדש",
  doc_uploaded: "מסמך הועלה",
  new_task: "משימה חדשה",
  stuck_case: "תיק תקוע",
}
const NOTIF_INIT: Record<NotifKey, NotifState> = {
  new_lead: { email: true, push: true },
  doc_uploaded: { email: true, push: false },
  new_task: { email: false, push: true },
  stuck_case: { email: true, push: true },
}

// ---- Team ----
const TEAM = [
  { id: "1", name: "יעל כהן", role: "יועץ בכיר", email: "yael@mortgagepro.co.il", initials: "יכ", active: true },
  { id: "2", name: "אורי לוי", role: "יועץ משכנתאות", email: "uri@mortgagepro.co.il", initials: "אל", active: true },
  { id: "3", name: "רן אביב", role: "יועץ משכנתאות", email: "ran@mortgagepro.co.il", initials: "רא", active: true },
  { id: "4", name: "נועה כץ", role: "ניהול לקוחות", email: "noa@mortgagepro.co.il", initials: "נכ", active: false },
]

// ---- System ----
const SYSTEM_INIT = {
  assignmentMode: "auto" as "auto" | "manual",
  stuckDays: 5,
  language: "he",
}

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl bg-brand-navy/8 flex items-center justify-center shrink-0">
        <Icon className="h-4.5 w-4.5 text-brand-navy" strokeWidth={1.75} />
      </div>
      <div>
        <h2 className="text-base font-bold text-brand-navy">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}

function SavedBadge({ show }: { show: boolean }) {
  return (
    <span className={cn(
      "flex items-center gap-1 text-xs font-semibold text-brand-green transition-opacity duration-300",
      show ? "opacity-100" : "opacity-0"
    )}>
      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
      נשמר
    </span>
  )
}

export default function SettingsPage() {
  // Profile
  const [profile, setProfile] = useState(PROFILE_INIT)
  const [profileSaved, setProfileSaved] = useState(false)

  // Notifications
  const [notifs, setNotifs] = useState(NOTIF_INIT)
  const [notifSaved, setNotifSaved] = useState(false)

  // System
  const [system, setSystem] = useState(SYSTEM_INIT)
  const [systemSaved, setSystemSaved] = useState(false)

  function saveWithFeedback(setter: React.Dispatch<React.SetStateAction<boolean>>) {
    setter(true)
    setTimeout(() => setter(false), 2500)
  }

  function toggleNotif(key: NotifKey, channel: "email" | "push") {
    setNotifs((prev) => ({
      ...prev,
      [key]: { ...prev[key], [channel]: !prev[key][channel] },
    }))
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-gray-900">הגדרות</h1>
        <p className="text-sm text-gray-500 mt-1">נהל את חשבונך והגדרות המערכת</p>
      </div>

      <Tabs defaultValue="profile" dir="rtl">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="gap-1.5">
            <User className="h-3.5 w-3.5" />
            פרופיל
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5">
            <Bell className="h-3.5 w-3.5" />
            התראות
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-1.5">
            <Users className="h-3.5 w-3.5" />
            צוות
          </TabsTrigger>
          <TabsTrigger value="system" className="gap-1.5">
            <Settings2 className="h-3.5 w-3.5" />
            מערכת
          </TabsTrigger>
        </TabsList>

        {/* ---- PROFILE ---- */}
        <TabsContent value="profile">
          <Card className="p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)]">
            <SectionHeader icon={User} title="פרופיל" subtitle="פרטים אישיים וחשבון" />

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-blue flex items-center justify-center text-white text-xl font-bold select-none">
                  יכ
                </div>
                <button className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-white border border-gray-200/60 shadow-[0_1px_2px_0_rgb(0_0_0/0.04)] flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Camera className="h-3 w-3 text-gray-500" strokeWidth={2} />
                </button>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{profile.fullName}</p>
                <p className="text-xs text-gray-500 mt-0.5">יועץ בכיר</p>
                <button className="text-xs text-brand-turquoise hover:underline mt-1 font-medium">
                  העלה תמונה
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">שם מלא</Label>
                <Input
                  value={profile.fullName}
                  onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">אימייל</Label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">טלפון</Label>
                <Input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                  dir="ltr"
                  className="text-right"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">תפקיד</Label>
                <Input value="יועץ בכיר" disabled className="bg-gray-50 text-gray-500" />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <SavedBadge show={profileSaved} />
              <Button
                onClick={() => saveWithFeedback(setProfileSaved)}
                className="bg-brand-navy hover:bg-brand-blue text-white shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]"
              >
                שמור שינויים
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ---- NOTIFICATIONS ---- */}
        <TabsContent value="notifications">
          <Card className="p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)]">
            <SectionHeader icon={Bell} title="התראות" subtitle="בחר אילו התראות לקבל ובאיזה ערוץ" />

            <div className="rounded-xl border border-gray-100 overflow-hidden">
              {/* Column Headers */}
              <div className="grid grid-cols-[1fr_80px_80px] gap-0 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-500">אירוע</span>
                <span className="text-xs font-semibold text-gray-500 text-center">אימייל</span>
                <span className="text-xs font-semibold text-gray-500 text-center">פוש</span>
              </div>
              {(Object.keys(notifs) as NotifKey[]).map((key, i) => (
                <div
                  key={key}
                  className={cn(
                    "grid grid-cols-[1fr_80px_80px] gap-0 px-4 py-3.5 items-center",
                    i < Object.keys(notifs).length - 1 && "border-b border-gray-100"
                  )}
                >
                  <span className="text-sm font-medium text-gray-800">{NOTIF_LABELS[key]}</span>
                  <div className="flex justify-center">
                    <Checkbox
                      checked={notifs[key].email}
                      onCheckedChange={() => toggleNotif(key, "email")}
                    />
                  </div>
                  <div className="flex justify-center">
                    <Checkbox
                      checked={notifs[key].push}
                      onCheckedChange={() => toggleNotif(key, "push")}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <SavedBadge show={notifSaved} />
              <Button
                onClick={() => saveWithFeedback(setNotifSaved)}
                className="bg-brand-navy hover:bg-brand-blue text-white shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]"
              >
                שמור הגדרות
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ---- TEAM ---- */}
        <TabsContent value="team">
          <Card className="p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)]">
            <div className="flex items-start justify-between mb-5">
              <SectionHeader icon={Users} title="צוות" subtitle={`${TEAM.filter(m => m.active).length} חברים פעילים`} />
              <Button
                disabled
                variant="outline"
                className="gap-1.5 text-xs shrink-0 mt-0.5"
              >
                <UserPlus className="h-3.5 w-3.5" />
                הזמן חבר
              </Button>
            </div>

            <div className="space-y-2">
              {TEAM.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-colors"
                >
                  {/* Avatar */}
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0",
                    member.active
                      ? "bg-gradient-to-br from-brand-navy/10 to-brand-blue/10 text-brand-navy"
                      : "bg-gray-100 text-gray-400"
                  )}>
                    {member.initials}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900 truncate">{member.name}</p>
                      <span className={cn(
                        "inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold border shrink-0",
                        member.active
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-gray-50 text-gray-500 border-gray-200"
                      )}>
                        {member.active ? "פעיל" : "לא פעיל"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {member.role} &middot; {member.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              הזמנת חברי צוות תהיה זמינה בקרוב
            </p>
          </Card>
        </TabsContent>

        {/* ---- SYSTEM ---- */}
        <TabsContent value="system">
          <Card className="p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_2px_8px_0_rgb(0_0_0/0.06)]">
            <SectionHeader icon={Settings2} title="מערכת" subtitle="הגדרות כלליות" />

            <div className="space-y-5">
              {/* Assignment Mode */}
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <p className="text-sm font-semibold text-gray-800">שיוך לידים ליועץ</p>
                  <p className="text-xs text-gray-500 mt-0.5">כיצד ליד חדש משויך ליועץ</p>
                </div>
                <div className="flex items-center gap-1 rounded-lg border border-gray-200/60 p-0.5">
                  {(["auto", "manual"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setSystem((s) => ({ ...s, assignmentMode: mode }))}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-semibold transition-all",
                        system.assignmentMode === mode
                          ? "bg-brand-navy text-white shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]"
                          : "text-gray-500 hover:text-gray-800"
                      )}
                    >
                      {mode === "auto" ? "אוטומטי" : "ידני"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stuck Threshold */}
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <p className="text-sm font-semibold text-gray-800">סף תיק תקוע</p>
                  <p className="text-xs text-gray-500 mt-0.5">ימים ללא עדכון לפני שהתיק מסומן כתקוע</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={system.stuckDays}
                    onChange={(e) => setSystem((s) => ({ ...s, stuckDays: Number(e.target.value) }))}
                    className="w-16 h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm text-center tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring transition-colors"
                  />
                  <span className="text-sm text-gray-500">ימים</span>
                </div>
              </div>

              {/* Language */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">שפת מערכת</p>
                  <p className="text-xs text-gray-500 mt-0.5">שפת הממשק וההתראות</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200/60">
                  <span className="text-lg leading-none">🇮🇱</span>
                  <span className="text-sm font-semibold text-gray-700">עברית</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <SavedBadge show={systemSaved} />
              <Button
                onClick={() => saveWithFeedback(setSystemSaved)}
                className="bg-brand-navy hover:bg-brand-blue text-white shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]"
              >
                שמור הגדרות
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

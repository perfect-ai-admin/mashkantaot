"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Trash2, AlertTriangle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn, formatCurrency } from "@/lib/utils"

// ────────────────────────────────────────────────────────────
// Tab 1 — Mortgage Calculator
// ────────────────────────────────────────────────────────────
function MortgageCalculator() {
  const [amount, setAmount] = useState(1000000)
  const [years, setYears] = useState(20)
  const [rate, setRate] = useState(4)

  const monthlyRate = rate / 100 / 12
  const n = years * 12
  const monthly =
    monthlyRate === 0
      ? amount / n
      : (amount * monthlyRate * Math.pow(1 + monthlyRate, n)) /
        (Math.pow(1 + monthlyRate, n) - 1)
  const totalPaid = monthly * n
  const totalInterest = totalPaid - amount

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100">
        <h3 className="text-base font-bold text-brand-navy mb-6">נתוני ההלוואה</h3>
        <div className="space-y-7">
          <SliderField
            label="סכום הלוואה"
            displayValue={formatCurrency(amount)}
            min={100000} max={5000000} step={50000} value={amount}
            onChange={setAmount}
            minLabel="₪100,000" maxLabel="₪5,000,000"
          />
          <SliderField
            label="תקופה"
            displayValue={`${years} שנים`}
            min={5} max={30} step={1} value={years}
            onChange={setYears}
            minLabel="5 שנים" maxLabel="30 שנים"
          />
          <SliderField
            label="ריבית שנתית"
            displayValue={`${rate}%`}
            min={1} max={8} step={0.1} value={rate}
            onChange={setRate}
            minLabel="1%" maxLabel="8%"
          />
        </div>
      </div>

      <div className="space-y-3">
        <ResultCard label="החזר חודשי" value={formatCurrency(monthly)} highlight />
        <ResultCard label="סך כל ההחזר" value={formatCurrency(totalPaid)} />
        <ResultCard label="סך הריבית ששולמה" value={formatCurrency(totalInterest)} muted />
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// Tab 2 — Affordability Calculator
// ────────────────────────────────────────────────────────────
function AffordabilityCalculator() {
  const [income, setIncome] = useState(15000)
  const [spouseIncome, setSpouseIncome] = useState(0)
  const [obligations, setObligations] = useState(0)
  const [equity, setEquity] = useState(400000)

  const totalIncome = income + spouseIncome
  const recommended = totalIncome * 0.33 - obligations
  const max = totalIncome * 0.4 - obligations
  const ratio = obligations / totalIncome
  const isWarning = ratio > 0.4 || recommended < 0

  const estimateMortgage = (pmt: number) => {
    const r = 4.5 / 100 / 12
    const n = 20 * 12
    if (pmt <= 0) return 0
    return (pmt * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n))
  }

  const mortgageEstimate = estimateMortgage(Math.max(0, recommended)) + equity * 0.75

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100">
        <h3 className="text-base font-bold text-brand-navy mb-6">פרטי הכנסה</h3>
        <div className="space-y-5">
          <NumberField label="הכנסה חודשית נטו (שלך)" value={income} onChange={setIncome} />
          <NumberField label="הכנסת בן/בת זוג (נטו)" value={spouseIncome} onChange={setSpouseIncome} />
          <NumberField label="התחייבויות חודשיות קיימות" value={obligations} onChange={setObligations} />
          <NumberField label="הון עצמי זמין" value={equity} onChange={setEquity} />
        </div>
      </div>

      <div className="space-y-3">
        {isWarning && (
          <div className="flex gap-3 p-4 rounded-xl border border-brand-orange/25 bg-brand-orange/8">
            <AlertTriangle className="h-4 w-4 text-brand-orange flex-shrink-0 mt-0.5" strokeWidth={1.75} />
            <p className="text-sm text-brand-orange leading-relaxed">
              יחס ההחזר להכנסה גבוה מ-40%. מומלץ להפחית התחייבויות קיימות לפני נטילת משכנתא.
            </p>
          </div>
        )}
        <ResultCard
          label="החזר חודשי מומלץ (33% מהכנסה)"
          value={recommended > 0 ? formatCurrency(recommended) : "לא ריאלי"}
          highlight={!isWarning}
        />
        <ResultCard
          label="החזר מקסימלי (40% מהכנסה)"
          value={max > 0 ? formatCurrency(max) : "לא ריאלי"}
        />
        <ResultCard
          label="הערכת מסגרת משכנתא"
          value={mortgageEstimate > 0 ? formatCurrency(mortgageEstimate) : "—"}
          muted
        />
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// Tab 3 — Refinancing Calculator
// ────────────────────────────────────────────────────────────
function RefinanceCalculator() {
  const [balance, setBalance] = useState(800000)
  const [currentPayment, setCurrentPayment] = useState(5200)
  const [currentRate, setCurrentRate] = useState(5.5)
  const [yearsLeft, setYearsLeft] = useState(18)
  const [newRate, setNewRate] = useState(3.8)

  const r = newRate / 100 / 12
  const n = yearsLeft * 12
  const newPayment =
    r === 0
      ? balance / n
      : (balance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

  const monthlySaving = currentPayment - newPayment
  const totalSaving = monthlySaving * n

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100">
        <h3 className="text-base font-bold text-brand-navy mb-6">פרטי המשכנתא הקיימת</h3>
        <div className="space-y-5">
          <NumberField label="יתרת משכנתא" value={balance} onChange={setBalance} />
          <NumberField label="החזר חודשי נוכחי" value={currentPayment} onChange={setCurrentPayment} />
          <SliderField
            label="ריבית נוכחית"
            displayValue={`${currentRate}%`}
            min={1} max={10} step={0.1} value={currentRate}
            onChange={setCurrentRate}
            minLabel="1%" maxLabel="10%"
          />
          <SliderField
            label="שנים שנותרו"
            displayValue={`${yearsLeft} שנים`}
            min={1} max={30} step={1} value={yearsLeft}
            onChange={setYearsLeft}
            minLabel="שנה" maxLabel="30 שנים"
          />
          <SliderField
            label="ריבית חדשה משוערת"
            displayValue={`${newRate}%`}
            min={1} max={10} step={0.1} value={newRate}
            onChange={setNewRate}
            minLabel="1%" maxLabel="10%"
          />
        </div>
      </div>

      <div className="space-y-3">
        <ResultCard label="החזר חדש אחרי מחזור" value={formatCurrency(newPayment)} highlight={monthlySaving > 0} />
        <ResultCard label="חיסכון חודשי" value={monthlySaving > 0 ? formatCurrency(monthlySaving) : "אין חיסכון"} />
        <ResultCard label="חיסכון כולל לאורך התקופה" value={totalSaving > 0 ? formatCurrency(totalSaving) : "—"} muted />
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// Tab 4 — Consolidation Calculator
// ────────────────────────────────────────────────────────────
type Loan = { id: number; amount: number; payment: number }

function ConsolidationCalculator() {
  const [loans, setLoans] = useState<Loan[]>([
    { id: 1, amount: 80000, payment: 1400 },
    { id: 2, amount: 50000, payment: 900 },
  ])
  const [consolidationYears, setConsolidationYears] = useState(7)
  const [consolidationRate, setConsolidationRate] = useState(6)

  const totalBalance = loans.reduce((s, l) => s + l.amount, 0)
  const totalCurrentPayment = loans.reduce((s, l) => s + l.payment, 0)

  const r = consolidationRate / 100 / 12
  const n = consolidationYears * 12
  const newPayment =
    r === 0
      ? totalBalance / n
      : (totalBalance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

  const monthlySaving = totalCurrentPayment - newPayment

  const addLoan = () =>
    setLoans((prev) => [...prev, { id: Date.now(), amount: 30000, payment: 600 }])

  const removeLoan = (id: number) =>
    setLoans((prev) => prev.filter((l) => l.id !== id))

  const updateLoan = (id: number, field: keyof Omit<Loan, "id">, value: number) =>
    setLoans((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100">
        <h3 className="text-base font-bold text-brand-navy mb-4">הלוואות קיימות</h3>
        <div className="space-y-3 mb-4">
          {loans.map((loan, i) => (
            <div
              key={loan.id}
              className="bg-white rounded-xl p-4 border border-gray-100 space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-brand-navy">הלוואה {i + 1}</span>
                {loans.length > 1 && (
                  <button
                    onClick={() => removeLoan(loan.id)}
                    aria-label="הסר הלוואה"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-brand-red hover:bg-brand-red/8 transition-all duration-200"
                  >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">יתרה (₪)</Label>
                  <Input
                    type="number"
                    value={loan.amount}
                    onChange={(e) => updateLoan(loan.id, "amount", Number(e.target.value))}
                    className="h-9 text-sm bg-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">החזר/חודש (₪)</Label>
                  <Input
                    type="number"
                    value={loan.payment}
                    onChange={(e) => updateLoan(loan.id, "payment", Number(e.target.value))}
                    className="h-9 text-sm bg-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addLoan}
          className="w-full h-9 rounded-xl border border-dashed border-gray-200 text-sm font-semibold text-gray-500 hover:border-brand-turquoise hover:text-brand-turquoise hover:bg-brand-turquoise/5 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          הוסף הלוואה
        </button>

        <div className="mt-6 space-y-5">
          <SliderField
            label="תקופת האיחוד"
            displayValue={`${consolidationYears} שנים`}
            min={1} max={15} step={1} value={consolidationYears}
            onChange={setConsolidationYears}
            minLabel="שנה" maxLabel="15 שנים"
          />
          <SliderField
            label="ריבית משוערת"
            displayValue={`${consolidationRate}%`}
            min={3} max={12} step={0.1} value={consolidationRate}
            onChange={setConsolidationRate}
            minLabel="3%" maxLabel="12%"
          />
        </div>
      </div>

      <div className="space-y-3">
        <ResultCard label="סך יתרה לאיחוד" value={formatCurrency(totalBalance)} />
        <ResultCard label="סך החזר חודשי נוכחי" value={formatCurrency(totalCurrentPayment)} />
        <ResultCard label="החזר חודשי אחרי איחוד" value={formatCurrency(newPayment)} highlight={monthlySaving > 0} />
        <ResultCard
          label="חיסכון חודשי"
          value={monthlySaving > 0 ? formatCurrency(monthlySaving) : "אין חיסכון"}
          muted={monthlySaving <= 0}
        />
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// Shared helpers
// ────────────────────────────────────────────────────────────
function ResultCard({
  label,
  value,
  highlight,
  muted,
}: {
  label: string
  value: string
  highlight?: boolean
  muted?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_1px_4px_0_rgb(0_0_0/0.06)]",
        highlight
          ? "bg-brand-turquoise shadow-[0_4px_14px_0_rgb(58_175_169/0.3)]"
          : muted
          ? "bg-[#FAFAFA] border border-gray-100"
          : "bg-white border border-gray-100"
      )}
    >
      <p className={cn("text-xs font-medium mb-2", highlight ? "text-white/75" : "text-muted-foreground")}>
        {label}
      </p>
      <p className={cn(
        "text-2xl font-bold tracking-tight tabular-nums",
        highlight ? "text-white" : "text-brand-navy"
      )}>
        {value}
      </p>
    </div>
  )
}

function SliderField({
  label,
  displayValue,
  min,
  max,
  step,
  value,
  onChange,
  minLabel,
  maxLabel,
}: {
  label: string
  displayValue: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  minLabel: string
  maxLabel: string
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <Label className="text-sm font-medium text-brand-navy">{label}</Label>
        <span className="text-sm font-bold text-brand-turquoise tabular-nums">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-brand-turquoise bg-gray-200"
      />
      <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5 font-medium">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <Label className="text-sm font-medium text-brand-navy mb-1.5 block">{label}</Label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="bg-white h-10"
      />
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────
export default function CalculatorPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_-20%,#2D4A7A60,transparent)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-turquoise/15 border border-brand-turquoise/25 text-brand-turquoise text-xs font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise" />
            כלים חינמיים
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            מחשבוני משכנתא
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-lg mx-auto leading-relaxed">
            חשב החזר חודשי, בדוק יכולת החזר, השווה מחזור ואיחוד — הכל בלחיצה אחת
          </p>
        </div>
      </section>

      {/* ── Tabs ─────────────────────────────────────────────── */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Tabs defaultValue="mortgage" dir="rtl">
            <div className="mb-8 overflow-x-auto">
              <TabsList className="inline-flex h-auto p-1 bg-[#FAFAFA] border border-gray-100 rounded-2xl gap-1 min-w-max">
                {[
                  { value: "mortgage", label: "מחשבון משכנתא" },
                  { value: "affordability", label: "יכולת החזר" },
                  { value: "refinance", label: "מחשבון מחזור" },
                  { value: "consolidation", label: "מחשבון איחוד" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="px-4 py-2.5 text-sm font-semibold rounded-xl text-gray-500 data-[state=active]:bg-white data-[state=active]:text-brand-navy data-[state=active]:shadow-[0_1px_4px_0_rgb(0_0_0/0.08)] transition-all duration-200 whitespace-nowrap"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="mortgage">
              <MortgageCalculator />
            </TabsContent>
            <TabsContent value="affordability">
              <AffordabilityCalculator />
            </TabsContent>
            <TabsContent value="refinance">
              <RefinanceCalculator />
            </TabsContent>
            <TabsContent value="consolidation">
              <ConsolidationCalculator />
            </TabsContent>
          </Tabs>

          {/* CTA below calculators */}
          <div className="mt-12 pt-10 border-t border-gray-100 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              רוצה תוצאה מדויקת? דבר עם יועץ — חינם ללא התחייבות
            </p>
            <Button
              render={<Link href="/questionnaire" />}
              className="bg-brand-turquoise hover:bg-[#2f9d97] text-white font-semibold text-sm px-6 h-11 rounded-xl shadow-[0_4px_14px_0_rgb(58_175_169/0.3)] transition-all duration-200 active:scale-[0.98] flex items-center gap-2 mx-auto"
            >
              בדוק זכאות עכשיו
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

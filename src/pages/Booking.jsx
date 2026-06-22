import { useState } from 'react'
import { Calendar, Clock, User, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Separator } from '@/components/ui/separator.jsx'

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00']

const bookings = [
  { time: '09:00', patient: 'Hassan Al-Riyami', mtrf: 'MTRF-2024-0090', tests: 4, status: 'confirmed' },
  { time: '09:30', patient: null },
  { time: '10:00', patient: 'Fatima Al-Rashidi', mtrf: 'MTRF-2024-0089', tests: 5, status: 'confirmed' },
  { time: '10:30', patient: null },
  { time: '11:00', patient: null },
  { time: '11:30', patient: 'Mohammed Al-Habsi', mtrf: 'MTRF-2024-0088', tests: 6, status: 'confirmed' },
  { time: '12:00', patient: null },
  { time: '14:00', patient: 'Sara Al-Amri', mtrf: 'MTRF-2024-0091', tests: 5, status: 'pending' },
  { time: '14:30', patient: null },
  { time: '15:00', patient: null },
  { time: '15:30', patient: 'Rashid Al-Maskari', mtrf: 'MTRF-2024-0092', tests: 7, status: 'confirmed' },
  { time: '16:00', patient: null },
]

const upcomingDays = [
  { day: 'Mon', date: '23', count: 4, active: false },
  { day: 'Tue', date: '24', count: 6, active: false },
  { day: 'Wed', date: '25', count: 3, active: false },
  { day: 'Thu', date: '26', count: 5, active: false },
  { day: 'Fri', date: '27', count: 0, active: false },
]

export default function Booking() {
  const [selectedDate] = useState('22 Jun 2026')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Medical Booking</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">Schedule and manage patient appointments</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Calendar strip */}
        <div className="col-span-2 space-y-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-primary" />
                  <span className="text-[14px] font-medium">Today — {selectedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  {upcomingDays.map(d => (
                    <button
                      key={d.date}
                      className="flex flex-col items-center px-3 py-1.5 rounded-md text-[11px] hover:bg-muted transition-colors"
                    >
                      <span className="text-muted-foreground">{d.day}</span>
                      <span className="font-medium mt-0.5">{d.date}</span>
                      {d.count > 0 && <span className="text-[9px] text-primary mt-0.5">{d.count}</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                {bookings.map(slot => (
                  <div
                    key={slot.time}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                      slot.patient ? 'bg-muted/50' : 'hover:bg-muted/30'
                    }`}
                  >
                    <span className="text-[13px] font-mono text-muted-foreground w-12 shrink-0">{slot.time}</span>
                    <div className="w-px h-6 bg-border" />
                    {slot.patient ? (
                      <div className="flex-1 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <User size={11} className="text-primary" />
                          </div>
                          <div>
                            <div className="text-[13px] font-medium">{slot.patient}</div>
                            <div className="text-[11px] text-muted-foreground">{slot.mtrf} · {slot.tests} tests</div>
                          </div>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                          slot.status === 'confirmed'
                            ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
                            : 'text-yellow-600 bg-yellow-50 border-yellow-200'
                        }`}>
                          {slot.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[12px] text-muted-foreground/50">Available</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary sidebar */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <h3 className="text-[13px] font-medium mb-3">Today's Summary</h3>
              <div className="space-y-2.5">
                {[
                  ['Total Appointments', '5'],
                  ['Confirmed', '4'],
                  ['Pending', '1'],
                  ['Available Slots', '7'],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-[13px]">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium tabular-nums">{val}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <h3 className="text-[13px] font-medium mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="secondary" size="sm" className="w-full h-8 text-[12px] justify-start gap-2">
                  <Clock size={13} /> Block Time Slot
                </Button>
                <Button variant="secondary" size="sm" className="w-full h-8 text-[12px] justify-start gap-2">
                  <Calendar size={13} /> View Week
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <h3 className="text-[13px] font-medium mb-3">Operating Hours</h3>
              <div className="space-y-1.5 text-[12px] text-muted-foreground">
                <div className="flex justify-between">
                  <span>Sun – Thu</span>
                  <span className="font-medium text-foreground">09:00 – 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Fri – Sat</span>
                  <span className="font-medium text-foreground">Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

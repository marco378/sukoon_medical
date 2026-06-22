import { Link } from 'react-router-dom'
import { ClipboardList, Clock, CheckCircle, AlertCircle, ArrowUpRight, Stethoscope } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'

const stats = [
  { label: 'Pending MTRFs', value: '8', change: '3 new today', icon: ClipboardList },
  { label: 'Scheduled', value: '5', change: '2 tomorrow', icon: Clock },
  { label: 'Completed', value: '42', change: 'This month', icon: CheckCircle },
  { label: 'Overdue', value: '2', change: 'Action needed', icon: AlertCircle },
]

const statusColor = {
  'Pending': 'text-yellow-600 bg-yellow-50 border-yellow-200',
  'Scheduled': 'text-blue-600 bg-blue-50 border-blue-200',
  'In Progress': 'text-purple-600 bg-purple-50 border-purple-200',
  'Completed': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  'Sent to Insurer': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  'Not Attended': 'text-red-600 bg-red-50 border-red-200',
  'Rescheduled': 'text-orange-600 bg-orange-50 border-orange-200',
}

const mtrfs = [
  { id: 'MTRF-2024-0089', patient: 'Fatima Al-Rashidi', age: 38, tests: 5, date: '22 Jun 2026', time: '10:00 AM', status: 'Pending', proposal: 'PRP-2024-0156' },
  { id: 'MTRF-2024-0088', patient: 'Mohammed Al-Habsi', age: 45, tests: 6, date: '22 Jun 2026', time: '11:30 AM', status: 'Scheduled', proposal: 'PRP-2024-0155' },
  { id: 'MTRF-2024-0087', patient: 'Aisha Al-Balushi', age: 32, tests: 4, date: '21 Jun 2026', time: '09:00 AM', status: 'In Progress', proposal: 'PRP-2024-0154' },
  { id: 'MTRF-2024-0086', patient: 'Khalid Al-Siyabi', age: 51, tests: 7, date: '21 Jun 2026', time: '02:00 PM', status: 'Completed', proposal: 'PRP-2024-0153' },
  { id: 'MTRF-2024-0085', patient: 'Noor Al-Lawati', age: 29, tests: 4, date: '20 Jun 2026', time: '10:30 AM', status: 'Sent to Insurer', proposal: 'PRP-2024-0152' },
  { id: 'MTRF-2024-0084', patient: 'Yusuf Al-Farsi', age: 55, tests: 8, date: '20 Jun 2026', time: '01:00 PM', status: 'Not Attended', proposal: 'PRP-2024-0151' },
  { id: 'MTRF-2024-0083', patient: 'Layla Al-Kindi', age: 41, tests: 5, date: '19 Jun 2026', time: '03:30 PM', status: 'Rescheduled', proposal: 'PRP-2024-0150' },
  { id: 'MTRF-2024-0082', patient: 'Hassan Al-Riyami', age: 36, tests: 5, date: '19 Jun 2026', time: '09:30 AM', status: 'Completed', proposal: 'PRP-2024-0149' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Medical Test Requisition Forms</p>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground bg-muted px-3 py-1.5 rounded-md">
          <Stethoscope size={13} />
          Al-Shifa Medical Centre
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <Card key={label} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
                <Icon size={14} className="text-muted-foreground" />
              </div>
              <div className="text-2xl font-semibold tracking-tight">{value}</div>
              <p className="text-[12px] text-muted-foreground mt-1">{change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[14px] font-medium">Incoming MTRFs</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-[11px] h-8">MTRF ID</TableHead>
                <TableHead className="text-[11px] h-8">Patient</TableHead>
                <TableHead className="text-[11px] h-8">Age</TableHead>
                <TableHead className="text-[11px] h-8">Tests</TableHead>
                <TableHead className="text-[11px] h-8">Date</TableHead>
                <TableHead className="text-[11px] h-8">Time</TableHead>
                <TableHead className="text-[11px] h-8 text-right">Status</TableHead>
                <TableHead className="text-[11px] h-8 w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mtrfs.map(m => (
                <TableRow key={m.id} className="border-border group">
                  <TableCell className="text-[13px] font-mono text-primary py-2.5">
                    <Link to={`/mtrf/${m.id}`} className="hover:underline">{m.id}</Link>
                  </TableCell>
                  <TableCell className="text-[13px] py-2.5">{m.patient}</TableCell>
                  <TableCell className="text-[13px] text-muted-foreground py-2.5">{m.age}</TableCell>
                  <TableCell className="text-[13px] text-muted-foreground py-2.5">{m.tests}</TableCell>
                  <TableCell className="text-[13px] text-muted-foreground py-2.5">{m.date}</TableCell>
                  <TableCell className="text-[13px] text-muted-foreground py-2.5">{m.time}</TableCell>
                  <TableCell className="text-right py-2.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColor[m.status]}`}>
                      {m.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <Link to={`/mtrf/${m.id}`} className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={13} className="text-muted-foreground" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

import { useState } from 'react'
import { Download, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { Input } from '@/components/ui/input.jsx'

const reportData = [
  { month: 'Jun 2026', total: 42, completed: 35, pending: 5, notAttended: 2, revenue: '2,100.000' },
  { month: 'May 2026', total: 58, completed: 52, pending: 0, notAttended: 6, revenue: '2,900.000' },
  { month: 'Apr 2026', total: 45, completed: 41, pending: 0, notAttended: 4, revenue: '2,250.000' },
  { month: 'Mar 2026', total: 51, completed: 48, pending: 0, notAttended: 3, revenue: '2,550.000' },
  { month: 'Feb 2026', total: 39, completed: 36, pending: 0, notAttended: 3, revenue: '1,950.000' },
  { month: 'Jan 2026', total: 47, completed: 44, pending: 0, notAttended: 3, revenue: '2,350.000' },
]

const summaryStats = [
  { label: 'Total MTRFs (YTD)', value: '282' },
  { label: 'Completion Rate', value: '92.5%' },
  { label: 'Avg. Turnaround', value: '1.8 days' },
  { label: 'Revenue (YTD)', value: '14,100.000 OMR' },
]

export default function Reports() {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Reports</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Medical centre performance and activity</p>
        </div>
        <Button variant="secondary" size="sm" className="h-8 text-[12px] gap-1.5">
          <Download size={13} /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {summaryStats.map(({ label, value }) => (
          <Card key={label} className="border-border">
            <CardContent className="p-4">
              <span className="text-[12px] text-muted-foreground">{label}</span>
              <div className="text-xl font-semibold tracking-tight mt-1">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[14px] font-medium">Monthly Summary</CardTitle>
            <div className="flex items-center gap-2">
              <Filter size={13} className="text-muted-foreground" />
              <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="h-8 w-36 text-[12px]" />
              <span className="text-[12px] text-muted-foreground">to</span>
              <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="h-8 w-36 text-[12px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-[11px] h-8">Month</TableHead>
                <TableHead className="text-[11px] h-8 text-right">Total MTRFs</TableHead>
                <TableHead className="text-[11px] h-8 text-right">Completed</TableHead>
                <TableHead className="text-[11px] h-8 text-right">Pending</TableHead>
                <TableHead className="text-[11px] h-8 text-right">Not Attended</TableHead>
                <TableHead className="text-[11px] h-8 text-right">Revenue (OMR)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map(r => (
                <TableRow key={r.month} className="border-border">
                  <TableCell className="text-[13px] font-medium py-2.5">{r.month}</TableCell>
                  <TableCell className="text-[13px] text-right tabular-nums py-2.5">{r.total}</TableCell>
                  <TableCell className="text-[13px] text-right tabular-nums text-emerald-600 py-2.5">{r.completed}</TableCell>
                  <TableCell className="text-[13px] text-right tabular-nums text-yellow-600 py-2.5">{r.pending}</TableCell>
                  <TableCell className="text-[13px] text-right tabular-nums text-red-600 py-2.5">{r.notAttended}</TableCell>
                  <TableCell className="text-[13px] text-right tabular-nums font-medium py-2.5">{r.revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

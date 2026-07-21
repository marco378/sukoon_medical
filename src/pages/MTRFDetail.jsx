import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Upload, Check, Clock, Loader2, FileText, Download, X, Calendar, User, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'

const tests = [
  { name: 'Complete Blood Count', required: true, code: 'CBC' },
  { name: 'Fasting Blood Sugar', required: true, code: 'FBS' },
  { name: 'Lipid Profile', required: true, code: 'LPD' },
  { name: 'ECG', required: true, code: 'ECG' },
  { name: 'Urine Analysis', required: true, code: 'UA' },
  { name: 'Chest X-Ray', required: false, code: 'CXR' },
  { name: 'HbA1c', required: false, code: 'HBA' },
  { name: 'TMT (Treadmill Test)', required: false, code: 'TMT' },
]

const statusOptions = [
  { value: 'in-progress', label: 'In Progress', color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { value: 'completed', label: 'Completed', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { value: 'sent', label: 'Sent to Insurer', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { value: 'rescheduled', label: 'Rescheduled', color: 'text-orange-600 bg-orange-50 border-orange-200' },
  { value: 'postponed', label: 'Postponed', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  { value: 'not-attended', label: 'Not Attended', color: 'text-red-600 bg-red-50 border-red-200' },
]

export default function MTRFDetail() {
  const { id } = useParams()
  const [tab, setTab] = useState('tests')
  const [testResults, setTestResults] = useState({})
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [status, setStatus] = useState('in-progress')
  const [sending, setSending] = useState(false)
  const [notes, setNotes] = useState('')

  const tabs = ['tests', 'upload', 'patient']

  const toggleTest = (code) => {
    setTestResults(prev => ({ ...prev, [code]: !prev[code] }))
  }

  const simulateUpload = () => {
    const names = ['CBC_Report.pdf', 'FBS_Report.pdf', 'Lipid_Profile.pdf', 'ECG_Scan.pdf', 'Urine_Analysis.pdf']
    const remaining = names.filter(n => !uploadedFiles.includes(n))
    if (remaining.length) {
      setUploadedFiles(prev => [...prev, remaining[0]])
    }
  }

  const handleSend = () => {
    setSending(true)
    setTimeout(() => {
      setStatus('sent')
      setSending(false)
    }, 1500)
  }

  const currentStatus = statusOptions.find(s => s.value === status)

  return (
    <div className="space-y-5">
      <Link to="/" className="inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={13} /> Dashboard
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight font-mono">{id}</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Medical Test Requisition Form</p>
        </div>
        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${currentStatus?.color}`}>
          {currentStatus?.label}
        </span>
      </div>

      {/* Patient summary bar */}
      <Card className="border-border">
        <CardContent className="py-3 px-5">
          <div className="flex items-center gap-8 text-[13px]">
            <div className="flex items-center gap-2">
              <User size={13} className="text-muted-foreground" />
              <span className="font-medium">Fatima Al-Rashidi</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>Civil ID: 12345678</span>
              <span>Age: 38</span>
              <span>Female</span>
            </div>
            <div className="ml-auto flex items-center gap-2 text-muted-foreground">
              <Calendar size={13} />
              <span>22 Jun 2026, 10:00 AM</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-0.5 bg-muted rounded-lg p-0.5 w-fit">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-md text-[12px] font-medium capitalize transition-colors ${
              tab === t ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t === 'upload' ? 'Upload Reports' : t === 'patient' ? 'Patient Info' : 'Required Tests'}
          </button>
        ))}
      </div>

      <Card className="border-border">
        <CardContent className="p-5">
          {tab === 'tests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[14px] font-medium">Required Medical Tests</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Mark tests as completed once done</p>
                </div>
                <div className="text-[12px] text-muted-foreground">
                  {Object.values(testResults).filter(Boolean).length} / {tests.filter(t => t.required).length} required completed
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-[11px] h-8 w-8"></TableHead>
                    <TableHead className="text-[11px] h-8">Test</TableHead>
                    <TableHead className="text-[11px] h-8">Code</TableHead>
                    <TableHead className="text-[11px] h-8">Required</TableHead>
                    <TableHead className="text-[11px] h-8">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tests.map(t => (
                    <TableRow key={t.code} className="border-border">
                      <TableCell className="py-2">
                        <button
                          onClick={() => toggleTest(t.code)}
                          className={`size-4 rounded border flex items-center justify-center transition-colors ${
                            testResults[t.code]
                              ? 'bg-primary border-primary text-primary-foreground'
                              : 'border-input'
                          }`}
                        >
                          {testResults[t.code] && <Check size={10} />}
                        </button>
                      </TableCell>
                      <TableCell className="text-[13px] py-2">{t.name}</TableCell>
                      <TableCell className="text-[12px] font-mono text-muted-foreground py-2">{t.code}</TableCell>
                      <TableCell className="py-2">
                        <span className={`text-[11px] ${t.required ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {t.required ? 'Yes' : 'Conditional'}
                        </span>
                      </TableCell>
                      <TableCell className="py-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          testResults[t.code]
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-muted-foreground bg-muted'
                        }`}>
                          {testResults[t.code] ? 'Done' : 'Pending'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Separator />

              <div className="space-y-2">
                <label className="text-[12px] text-muted-foreground">Medical Notes</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Add any relevant observations or notes..."
                  className="w-full h-20 rounded-md border border-input bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>
            </div>
          )}

          {tab === 'upload' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-[14px] font-medium">Upload Medical Reports</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Upload test results and medical documents</p>
              </div>

              <div
                onClick={simulateUpload}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <Upload size={24} className="mx-auto mb-2 text-muted-foreground/40" />
                <p className="text-[13px] text-muted-foreground">Click to upload or drag & drop</p>
                <p className="text-[11px] text-muted-foreground/60 mt-1">PDF, JPG, PNG, DICOM — Max 25MB per file</p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">Uploaded Files</div>
                  {uploadedFiles.map(file => (
                    <div key={file} className="flex items-center justify-between p-3 rounded-md border border-border">
                      <div className="flex items-center gap-2.5">
                        <FileText size={15} className="text-muted-foreground" />
                        <div>
                          <div className="text-[13px]">{file}</div>
                          <div className="text-[11px] text-muted-foreground">{(Math.random() * 2 + 0.5).toFixed(1)} MB</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-1.5 py-0.5 rounded text-emerald-600 bg-emerald-50">Uploaded</span>
                        <button
                          onClick={() => setUploadedFiles(prev => prev.filter(f => f !== file))}
                          className="text-muted-foreground hover:text-red-600"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'patient' && (
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider mb-3">Personal Details</h3>
                <div className="space-y-2.5">
                  {[['Full Name', 'Fatima Al-Rashidi'], ['Civil ID', '12345678'], ['Date of Birth', '15 Mar 1988'], ['Age', '38 years'], ['Gender', 'Female'], ['Mobile', '+968 9123 4567']].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-[13px] py-1 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider mb-3">Insurance Details</h3>
                <div className="space-y-2.5">
                  {[['Proposal', 'PRP-2024-0156'], ['Quote Ref', 'QT-2024-0298'], ['Loan Amount', '50,000.000 OMR'], ['Insurer', 'ABC Bank'], ['Agent', 'Ahmed Al-Busaidi'], ['Referred On', '22 Jun 2026']].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-[13px] py-1 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium tabular-nums">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status update + Send */}
      <Card className="border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="space-y-1">
                <label className="text-[12px] text-muted-foreground">Update Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 text-[13px] text-foreground"
                >
                  {statusOptions.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {status === 'sent' ? (
                <div className="flex items-center gap-1.5 text-[13px] text-emerald-600">
                  <Check size={14} /> Reports sent to ABC Bank
                </div>
              ) : (
                <Button
                  onClick={handleSend}
                  disabled={sending || uploadedFiles.length === 0}
                  className="h-9 text-[13px] gap-1.5 bg-emerald-600 hover:bg-emerald-700"
                >
                  {sending ? <Loader2 size={14} className="animate-spin" /> : <Stethoscope size={14} />}
                  {sending ? 'Sending...' : 'Send to Insurer'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

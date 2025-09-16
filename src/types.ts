export type SignalType = 'role_change' | 'company_change' | 'website_view'

export interface Signal {
  id: string
  type: SignalType
  title: string
  subtitle: string
  date: string
  unread: boolean
}

export type SignalAction = 'complete' | 'delete'

export const SIGNAL_COLORS: Record<SignalType, string> = {
  role_change: 'bg-sky-500',
  company_change: 'bg-indigo-500',
  website_view: 'bg-emerald-500'
}


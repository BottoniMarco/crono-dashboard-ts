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

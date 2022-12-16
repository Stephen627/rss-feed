import language from './en-GB'

export function __(key: string): string {
  return language[key] ?? key
}


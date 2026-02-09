import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function getCostCalculatorBaseUrl() {
  if (process.env.NEXT_PUBLIC_ENV === 'local') {
    return ''
  }
  return '/bifrost'
}

export function getModelLibraryBaseUrl() {
  if (process.env.NEXT_PUBLIC_ENV === 'local') {
    return ''
  }
  return '/bifrost'
}

export function getBuiltWithBifrostBaseUrl() {
  if (process.env.NEXT_PUBLIC_ENV === 'local') {
    return ''
  }
  return '/bifrost'
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

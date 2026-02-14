import axios from 'axios'
import { apiClient } from '@/lib/api-client'

export type UserRole = 'organizer' | 'vendor'

type LoginPayload = {
  email: string
  password: string
  full_name?: string
  fullName?: string
  business_name?: string
  businessName?: string
}

type RegisterPayload = {
  role: UserRole
  full_name?: string
  fullName?: string
  name?: string
  email: string
  password: string
  business_name?: string
  businessName?: string
  company_name?: string
  companyName?: string
}

function normalizePayload(payload: Record<string, any>) {
  const normalized: Record<string, any> = { ...payload }

  const fullNameValue = normalized.full_name ?? normalized.fullName
  if (fullNameValue !== undefined) normalized.full_name = fullNameValue

  const businessNameValue =
    normalized.business_name ??
    normalized.businessName ??
    normalized.company_name ??
    normalized.companyName
  if (businessNameValue !== undefined) normalized.business_name = businessNameValue

  delete normalized.fullName
  delete normalized.businessName
  delete normalized.companyName
  delete normalized.company_name

  return normalized
}

async function postJson<TPayload extends Record<string, any>, TResponse = any>(
  path: string,
  payload: TPayload
): Promise<TResponse> {
  try {
    const requestPayload = normalizePayload(payload)
    const response = await apiClient.post<TResponse>(path, requestPayload)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ||
        error.message ||
        'Request failed'
      throw new Error(message)
    }

    throw new Error('Request failed')
  }
}

export function loginUser(payload: LoginPayload) {
  return postJson('/auth/login', payload)
}

export function registerUser(payload: RegisterPayload) {
  return postJson('/auth/register', payload)
}

export function getAuthUser(responseData: any) {
  return responseData?.user ?? responseData?.data?.user ?? null
}

export function getAuthToken(responseData: any) {
  return responseData?.token ?? responseData?.accessToken ?? responseData?.data?.token ?? responseData?.data?.accessToken ?? null
}

export function getAuthRole(responseData: any): UserRole | undefined {
  const role = responseData?.role ?? responseData?.user?.role ?? responseData?.data?.role ?? responseData?.data?.user?.role
  return role === 'organizer' || role === 'vendor' ? role : undefined
}

export function getDashboardPath(role?: UserRole) {
  if (role === 'vendor') return '/vendor/dashboard'
  return '/organizer/dashboard'
}

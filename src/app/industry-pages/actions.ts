'use server'

const CLAY_WEBHOOK_URL =
  'https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-9ad3c1fd-a46b-4f00-b71b-ab3a09025208'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitEnterpriseTrialRequest(formData: FormData) {
  try {
    const honeypot = (formData.get('website') as string | null)?.trim() ?? ''
    if (honeypot) {
      return { success: true, message: 'Request received. Our team will reach out shortly.' }
    }

    const data = {
      name: (formData.get('name') as string | null)?.trim() ?? '',
      email: (formData.get('email') as string | null)?.trim() ?? '',
      companySize: (formData.get('companySize') as string | null)?.trim() ?? '',
      companyHQ: (formData.get('companyHQ') as string | null)?.trim() ?? '',
      usingGateway: (formData.get('usingGateway') as string | null)?.trim() ?? '',
      existingGatewaySolution:
        (formData.get('existingGatewaySolution') as string | null)?.trim() ?? '',
    }

    if (!data.name || !data.email || !data.companySize || !data.companyHQ || !data.usingGateway) {
      return { success: false, message: 'Please complete all required fields.' }
    }

    if (!emailRegex.test(data.email)) {
      return { success: false, message: 'Please enter a valid work email address.' }
    }

    if (data.usingGateway === 'Yes' && !data.existingGatewaySolution) {
      return {
        success: false,
        message: 'Please share your current LLM gateway solution.',
      }
    }

    const payload = {
      'Enter your name': data.name,
      Email: data.email,
      'Company size': data.companySize,
      'Company HQ': data.companyHQ,
      'Are you using an LLM Gateway today?': data.usingGateway,
      'Name of existing LLM Gateway solution':
        data.usingGateway === 'Yes' ? data.existingGatewaySolution : '',
      sourcePage: '/industry-pages',
      submittedAt: new Date().toISOString(),
    }

    const response = await fetch(CLAY_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      return {
        success: false,
        message: `Submission failed: ${response.status} ${errorText}`,
      }
    }

    return {
      success: true,
      message: 'Request received. Our team will reach out about your trial shortly.',
    }
  } catch (error: unknown) {
    console.error('Enterprise trial request error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, message: `Failed to submit request: ${errorMessage}` }
  }
}

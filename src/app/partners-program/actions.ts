'use server'

import { savePartnerApplication } from '@/lib/partners/storage'

const WEBHOOK_URL = 'https://n8n-maxim.fly.dev/webhook/maxim-partner-program-application'
const AUTH_HEADER_NAME = 'maxim-partner-program-api-key'

export async function submitPartnerApplication(formData: FormData) {
  try {
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      workEmail: formData.get('workEmail') as string,
      companyName: formData.get('companyName') as string,
      companySize: formData.get('companySize') as string,
      companyHQ: formData.get('companyHQ') as string,
      partnerType: formData.get('partnerType') as string,
      message: formData.get('message') as string,
    }

    // Validate required fields
    if (
      !data.firstName ||
      !data.lastName ||
      !data.workEmail ||
      !data.companyName ||
      !data.companySize ||
      !data.companyHQ ||
      !data.partnerType ||
      !data.message
    ) {
      return { success: false, message: 'All fields are required.' }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.workEmail)) {
      return { success: false, message: 'Please enter a valid work email address.' }
    }

    const authToken = process.env.PARTNERS_PROGRAM_API_AUTH
    if (!authToken) {
      return { success: false, message: 'Missing PARTNERS_PROGRAM_API_AUTH environment variable.' }
    }

    // Save to Tigris (S3-compatible)
    const { application, key, bucket } = await savePartnerApplication(data)

    // Notify n8n for Slack delivery
    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [AUTH_HEADER_NAME]: authToken,
      },
      body: JSON.stringify({
        ...application,
        storage: {
          bucket,
          key,
        },
      }),
    })

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text().catch(() => 'Unknown error')
      return {
        success: false,
        message: `Application saved, but failed to notify Slack: ${webhookResponse.status} ${errorText}`,
      }
    }

    return {
      success: true,
      message:
        'Application submitted successfully! Our partnerships team will be in touch within 2 business days.',
    }
  } catch (error: unknown) {
    console.error('Partner application error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, message: `Failed to submit application: ${errorMessage}` }
  }
}

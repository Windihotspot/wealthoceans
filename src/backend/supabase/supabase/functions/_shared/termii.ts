// supabase/functions/_shared/termii.ts

export interface TermiiEmailVariables {
  [key: string]: string | number | boolean | null | undefined
}

export interface SendTermiiEmailParams {
  email: string
  subject: string
  templateId: string
  emailConfigurationId: string
  variables: TermiiEmailVariables
}

export interface TermiiEmailResult {
  success: boolean
  status: number
  data: unknown
}

export async function sendTermiiEmail(
  params: SendTermiiEmailParams
): Promise<TermiiEmailResult> {
  const apiKey = Deno.env.get('TERMII_API_KEY')

  if (!apiKey) {
    throw new Error('Missing TERMII_API_KEY environment variable')
  }

  if (!params.email) {
    throw new Error('Recipient email is required')
  }

  if (!params.templateId) {
    throw new Error('Termii template ID is required')
  }

  if (!params.emailConfigurationId) {
    throw new Error('Termii email configuration ID is required')
  }

  const payload = {
    api_key: apiKey,
    email: params.email,
    subject: params.subject,
    email_configuration_id: params.emailConfigurationId,
    template_id: params.templateId,
    variables: params.variables,
  }

  const response = await fetch(
    'https://api.ng.termii.com/api/templates/send-email',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  )

  const responseText = await response.text()

  let data: unknown

  try {
    data = JSON.parse(responseText)
  } catch {
    data = responseText
  }

  if (!response.ok) {
    throw new Error(
      `Termii email failed (${response.status}): ${JSON.stringify(data)}`
    )
  }

  return {
    success: true,
    status: response.status,
    data,
  }
}
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Markdown,
  Preview,
  Section,
  Text
} from '@react-email/components'

interface EnterpriseUpdateEmailProps {
  subject?: string
  message?: string
  updateTitle?: string
  updateDetails?: string
  ctaText?: string
  ctaUrl?: string
}

export default function EnterpriseUpdateEmail ({  
  subject,
  updateTitle,
  updateDetails,
  ctaText = 'Need help?',
  ctaUrl = 'mailto:akshay@getmaxim.ai'
}: EnterpriseUpdateEmailProps) {
  return (
    <Html>
      <Head>
       
      </Head>
      <Preview>{subject ?? ''}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src="https://bifrost.getmaxim.ai/release-alert.png"
              width="170"
              height="40"
              alt="Bifrost"
              style={logo}
            />
          </Section>
          
          <Section style={content}>
            <Text style={text}>{subject}</Text>
            
            <Heading style={updateHeading}>{updateTitle}</Heading>
            <Section style={updateSection}>              
              <Markdown markdownContainerStyles={markdownContainer} markdownCustomStyles={markdownStyles}>
                {updateDetails ?? ''}
              </Markdown>
            </Section>
            
            {ctaUrl && ctaText && (
              <Section style={buttonContainer}>
                <Link href={ctaUrl} style={button}>
                  {ctaText}
                </Link>
              </Section>
            )}
          </Section>
          
          <Section style={footer}>
            <Text style={footerText}>
              © 2025 H3 Labs Inc. All rights reserved.
            </Text>
            <Text style={footerText}>
              You&apos;re receiving this email because you&apos;re subscribed to enterprise updates.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif'
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px'
}

const header = {
  padding: '24px 48px',
  borderBottom: '1px solid #e6e6e6'
}

const logo = {
  margin: '0 auto'
}

const content = {
  padding: '24px 48px'
}

const updateHeading = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: '500',
  marginTop: '32px',
  padding: '0'
}

const text = {
  color: '#4a4a4a',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0'
}

const updateSection = {
  margin: '32px 0',
  padding: '10px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #e6e6e6'
}

const markdownContainer = {
  color: '#4a4a4a',
  fontSize: '15px',
  lineHeight: '1.2'
}

const markdownStyles = {
  p: {
    margin: '12px 0'
  },
  h1: {
    color: '#1a1a1a',
    fontSize: '24px',
    fontWeight: '700',
    margin: '20px 0 12px'
  },
  h2: {
    color: '#1a1a1a',
    fontSize: '20px',
    fontWeight: '600',
    margin: '18px 0 10px'
  },
  h3: {
    color: '#1a1a1a',
    fontSize: '18px',
    fontWeight: '600',
    margin: '16px 0 8px'
  },
  ul: {
    margin: '12px 0',
    paddingLeft: '24px'
  },
  ol: {
    margin: '12px 0',
    paddingLeft: '24px'
  },
  li: {
    margin: '6px 0'
  },
  a: {
    color: '#5469d4',
    textDecoration: 'underline'
  },
  strong: {
    fontWeight: '600'
  },
  em: {
    fontStyle: 'italic'
  },
  code: {
    backgroundColor: '#e6e6e6',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'monospace'
  },
  blockquote: {
    borderLeft: '4px solid #e6e6e6',
    paddingLeft: '16px',
    margin: '16px 0',
    color: '#6a6a6a',
    fontStyle: 'italic'
  }
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0'
}

const button = {
  backgroundColor: '#000',
  borderRadius: '2px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px'
}

const footer = {
  padding: '24px 48px',
  borderTop: '1px solid #e6e6e6'
}

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '8px 0'
}

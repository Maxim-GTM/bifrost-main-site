'use client'

import { useCallback, useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function ProviderTabs() {
  const [activeTab, setActiveTab] = useState('openai')
  const [typedCode, setTypedCode] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasTyped, setHasTyped] = useState(false)
  const [integrationHistory, setIntegrationHistory] = useState<string[]>([])
  const [showButton, setShowButton] = useState(true)
  const [copySuccess, setCopySuccess] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isTypingRef = useRef(false)

  const providers = [
    {
      id: 'openai',
      name: 'OpenAI',
      icon: <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>OpenAI icon</title><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>,
      baseCode: `import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "Hello world"}
    ]
)`,
      bifrostLine: '    base_url="https://<your_bifrost_deployment_base_url>/openai",'
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      icon: <div className=""><svg width="22" viewBox="0 0 46 32" fill="none"><path d="M32.73 0H25.7846L38.4499 32H45.3953L32.73 0Z" fill="currentColor"></path><path d="M12.6653 0L0 32H7.08167L9.67193 25.28H22.9219L25.5122 32H32.5939L19.9286 0H12.6653ZM11.9626 19.3371L16.2969 8.09143L20.6313 19.3371H11.9626Z" fill="currentColor"></path></svg></div>,
      baseCode: `import os
from anthropic import Anthropic

anthropic = Anthropic(
    api_key=os.environ.get("ANTHROPIC_API_KEY"),
)

message = anthropic.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude"}
    ]
)`,
      bifrostLine: '    base_url="https://<your_bifrost_deployment_base_url>/anthropic",'
    },    
    {
      id: 'litellm',
      name: 'LiteLLM',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Transport" transform="translate(-432.000000, -48.000000)">
              <g id="train_fill" transform="translate(432.000000, 48.000000)">
                  <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fillRule="nonzero">
  
  </path>
                  <path d="M21,18 C21.5523,18 22,18.4477 22,19 C22,19.5523 21.5523,20 21,20 L2,20 C1.44772,20 1,19.5523 1,19 C1,18.4477 1.44772,18 2,18 L21,18 Z M12,5 C15.2244,5 17.9419,6.07548 19.8678,7.58868 C21.7592,9.07478 23,11.0853 23,13 C23,13.8416 22.7418,14.5605 22.2869,15.1406 C21.8436,15.7058 21.2528,16.0903 20.6508,16.3537 C19.4652,16.8724 18.0539,17 17,17 L2.99376,17 C1.88106,17 1,16.0964 1,15 L1,7 C1,5.89867 1.88971,5 2.99752,5 L12,5 Z M7,7 L3,7 L3,10 L7,10 L7,7 Z M12,7 L9,7 L9,10 L13,10 L13,7.04071 C12.7829333,7.02287 12.5623556,7.01072333 12.3384148,7.00460778 L12,7 Z M15,7.38297 L15,10 L19.5514,10 C19.2835,9.7142 18.9774,9.43256 18.6322,9.16132 C17.6698,8.40519 16.4427,7.76577 15,7.38297 Z" id="形状" fill="currentColor">
  
  </path>
              </g>
          </g>
      </g>
  </svg>,      
      baseCode: `import os
from litellm import completion

# Set environment variable
os.environ["OPENAI_API_KEY"] = os.environ.get("OPENAI_API_KEY")

response = completion(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Hello world"}]
)`,
      bifrostLine: 'api_base="https://<your_bifrost_deployment_base_url>/litellm",'
    },    
    {
      id: 'genai',
      name: 'genai',
      icon: <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill='currentColor'><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>,
      baseCode: `from google import genai

from google.genai.types import HttpOptions

client = genai.Client(
    api_key="dummy-api-key", # Handled by Bifrost    
)

response = client.models.generate_content(
    model="gemini-2.5-pro", # or "provider/model" for other providers (openai/gpt-4o-mini)
    contents="Hello!"
)`,
      bifrostLine: '    http_options=HttpOptions(base_url="https://<your_bifrost_deployment_base_url>/genai")'
    },      
  ]

  const currentProvider = providers.find(p => p.id === activeTab) || providers[0]

  // Sync ref with state
  useEffect(() => {
    isTypingRef.current = isTyping
  }, [isTyping])

  // Memoize startTyping to prevent unnecessary re-renders
  const startTyping = useCallback(() => {
    if (isTypingRef.current) return
    
    // Clear any existing intervals/timeouts
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
      typingIntervalRef.current = null
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
    
    setIsTyping(true)
    setShowButton(false) // Hide button when typing starts
    
    // For bedrock, just show the replacement after a delay
    if (currentProvider.id === 'bedrock') {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
        setHasTyped(true)
        typingTimeoutRef.current = null
      }, 1500) // Show replacement after 1.5 seconds
      return
    }
    
    // For other providers, type the line character by character
    const targetLine = currentProvider.bifrostLine
    let currentIndex = 0
    
    typingIntervalRef.current = setInterval(() => {
      if (currentIndex <= targetLine.length) {
        setTypedCode(targetLine.slice(0, currentIndex))
        currentIndex++
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current)
          typingIntervalRef.current = null
        }
        setIsTyping(false)
        setHasTyped(true)
        setIntegrationHistory([...integrationHistory, currentProvider.id])
      }
    }, 60) // Typing speed
  }, [currentProvider.id, currentProvider.bifrostLine, integrationHistory])

  // Reset typing when tab changes
  useEffect(() => {
    // Clear any existing intervals/timeouts when tab changes
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
      typingIntervalRef.current = null
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
    if(integrationHistory.includes(activeTab)) {
      setShowButton(false)
      setIsTyping(false)
      setHasTyped(true)      
    } else {
      setTypedCode('')
      setIsTyping(false)
      setHasTyped(false)
      setShowButton(true) // Show button again when tab changes
    }
    
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
        typingIntervalRef.current = null
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = null
      }
    }
  }, [activeTab, startTyping, integrationHistory])

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  // Using react-syntax-highlighter for lightweight syntax highlighting with VSCode-like experience.
  // This provides excellent highlighting while keeping bundle size much smaller than Monaco Editor.

  // Copy to clipboard functionality
  const copyToClipboard = async () => {
    try {
      const codeText = getDisplayCode().replace(/\|CURSOR\|/g, '')
      await navigator.clipboard.writeText(codeText)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = getDisplayCode().replace(/\|CURSOR\|/g, '')
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  // Build the code with typing animation - always includes space for typed line to prevent height changes
  const getDisplayCode = () => {
    const baseCode = currentProvider.baseCode
    
    // Handle different provider types
    if (currentProvider.id === 'bedrock') {
      // For Bedrock, show complete replacement after animation starts
      if (isTyping) {
        return baseCode + '\n\n' + currentProvider.bifrostLine + '|CURSOR|'
      } else if (hasTyped) {
        return baseCode + '\n\n' + currentProvider.bifrostLine
      } else {
        return baseCode
      }
    } else {
      // For other providers, always pre-allocate space for the typed line
      const lines = baseCode.split('\n')
      let insertIndex = -1
      
      // For Python examples, insert after the api_key line if present
      insertIndex = lines.findIndex(line => line.toLowerCase().includes('api_key')) + 1
      
      // Always insert a line to maintain consistent height
      if (insertIndex > 0) {
        if (isTyping) {
          // Show the typed content with cursor during animation
          const lineWithCursor = (typedCode || '') + '|CURSOR|'
          lines.splice(insertIndex, 0, lineWithCursor)
        } else if (hasTyped) {
          // Show complete line after animation
          lines.splice(insertIndex, 0, currentProvider.bifrostLine)
        } else {
          // Show placeholder line before animation starts (invisible but takes space)
          lines.splice(insertIndex, 0, '')
        }
      }
      
      return lines.join('\n')
    }
  }

  return (
    <div
      ref={containerRef}
      className="animate-fade-in-up delay-300 max-w-4xl mx-auto rounded-md overflow-hidden shadow-lg border border-[#3c3c3c] relative"
    >
      {/* VSCode-like Tab Bar */}
      <div className="flex items-center justify-between bg-[#2d2d2d] border-b border-[#3c3c3c] text-xs overflow-x-auto">
        <div className="flex overflow-x-auto">
          {providers.map(provider => (
            <button
              key={provider.id}
              onClick={() => setActiveTab(provider.id)}
              className={`px-6 py-2 flex items-center gap-2 whitespace-nowrap transition-colors duration-200 border-r border-[#3c3c3c] ${
                activeTab === provider.id
                  ? 'bg-[#1e1e1e] text-white'
                  : 'bg-[#2d2d2d] text-gray-400 hover:text-white hover:bg-[#262626]'
              }`}
              style={{height:'38px'}}
            >
              {provider.icon}
              {provider.name}.py
            </button>
          ))}
        </div>
        
        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className="px-3 py-1 mx-2 text-xs cursor-pointer text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1 bg-[#3c3c3c] hover:bg-[#4c4c4c] rounded border border-[#4c4c4c]"
          title="Copy code to clipboard"
        >
          {copySuccess ? (
            <>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Syntax Highlighter */}
      <div
        className="overflow-hidden transition-colors duration-500 relative"
        style={{ backgroundColor: '#1e1e1e', height: '500px' }}
      >
        <SyntaxHighlighter
          language="python"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            height: '100%',
            fontSize: '14px',
            backgroundColor: '#1e1e1e',
            overflow: 'auto',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
          }}
          showLineNumbers={true}
          lineNumberStyle={{ 
            color: '#858585', 
            fontSize: '12px',
            paddingRight: '1rem',
            textAlign: 'right',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}
          codeTagProps={{
            style: {
              userSelect: 'text',
              WebkitUserSelect: 'text',
              MozUserSelect: 'text',
              msUserSelect: 'text'
            }
          }}
          wrapLines={true}
          wrapLongLines={true}
          className="select-text"
        >
          {getDisplayCode().replace(/\|CURSOR\|/g, '')}
        </SyntaxHighlighter>
        
        {/* Centered Integrate Bifrost Button */}
        {showButton && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              onClick={() => {
                startTyping()
                setTimeout(() => {
                  containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }, 100)
              }}
              className="pointer-events-auto group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-sm text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl cursor-pointer overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 0 40px rgba(16, 185, 129, 0.4), 0 0 80px rgba(16, 185, 129, 0.2), 0 10px 30px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Animated border shine effect */}
              <div 
                className="absolute inset-0 rounded-sm"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, transparent 45%, rgba(255,255,255,0.8) 50%, transparent 55%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'borderShine 5s infinite linear',
                  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  WebkitMaskComposite: 'xor',
                  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  maskComposite: 'exclude',
                  padding: '2px'
                }}
              ></div>
              
              <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative flex items-center gap-3">
                <span>Click to integrate Bifrost</span>
              </div>
              
                <style jsx>{`
                 @keyframes borderShine {
                   0% {
                     background-position: -100% 0;
                   }
                   100% {
                     background-position: 100% 0;
                   }
                 }
                 
                 /* Improve text selection for code */
                 .select-text ::selection {
                   background-color: rgba(59, 130, 246, 0.4);
                 }
                 
                 .select-text ::-moz-selection {
                   background-color: rgba(59, 130, 246, 0.4);
                 }
                 
                 /* Hide line numbers from text selection */
                 .select-text .linenumber {
                   user-select: none !important;
                   -webkit-user-select: none !important;
                   -moz-user-select: none !important;
                   -ms-user-select: none !important;
                 }
               `}</style>
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 
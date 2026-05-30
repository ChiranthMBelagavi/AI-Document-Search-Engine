import { useState, useEffect } from 'react'
import axios from 'axios'
import { Bot, User } from 'lucide-react'

export default function Chat() {

  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  // Auto Scroll Only Inside Chat Container
  useEffect(() => {

    const container = document.querySelector(
      '.messages-container'
    )

    if (container) {

      container.scrollTop =
        container.scrollHeight
    }

  }, [messages, loading])

  const sendMessage = async () => {

    if (!query.trim() || loading) return

    const currentQuery = query

    // Clear input after sending
    setQuery('')

    // Add User Message
    setMessages(prev => [
      ...prev,
      {
        role: 'user',
        content: currentQuery
      }
    ])

    setLoading(true)

    try {

      const response = await axios.post(
        'http://127.0.0.1:5000/search',
        {
          query: currentQuery
        }
      )

      // Add AI Message
      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          content: response.data.answer,
          source: response.data.source
        }
      ])

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className='min-h-screen w-full px-6 py-6 relative overflow-hidden flex items-center justify-center'>

      {/* Background Glow */}
      <div className='absolute w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px]' />

      <div className='absolute w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]' />

      {/* Main Chat Container */}
      <div className='glass w-full max-w-6xl h-[92vh] rounded-[36px] flex flex-col relative z-10'>

        {/* Header */}
        <div className='px-10 py-8 border-b border-white/10 shrink-0'>

          <h1 className='text-4xl font-bold text-white'>
            AI Document Search Engine
          </h1>

          <p className='mt-3 text-gray-300 text-lg'>
            Ask intelligent questions from uploaded documents
          </p>

        </div>

        {/* Messages */}
        <div className='messages-container flex-1 overflow-y-auto px-10 py-8'>

          {messages.length === 0 && (

            <div className='h-full flex items-center justify-center text-center text-gray-400 text-lg'>

              Start asking questions from your uploaded PDF documents.

            </div>

          )}

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`mb-8 flex ${
                msg.role === 'user'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >

              <div
                className={`flex gap-4 max-w-4xl ${
                  msg.role === 'user'
                    ? 'flex-row-reverse'
                    : ''
                }`}
              >

                {/* Avatar */}
                <div className='w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shrink-0'>

                  {
                    msg.role === 'user'
                      ? <User size={22} />
                      : <Bot size={22} />
                  }

                </div>

                {/* Message Bubble */}
                <div
                  className={`p-6 rounded-3xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                      : 'glass'
                  }`}
                >

                  <p className='text-lg leading-8 whitespace-pre-wrap text-white'>
                    {msg.content}
                  </p>

                  {msg.source && (

                    <div className='mt-4 text-sm text-purple-300'>

                      Source: {msg.source}

                    </div>

                  )}

                </div>

              </div>

            </div>

          ))}

          {/* Loading */}
          {loading && (

            <div className='text-purple-300 animate-pulse text-lg'>

              AI is generating response...

            </div>

          )}

        </div>

        {/* Input Area */}
        <div className='p-6 border-t border-white/10 flex gap-4 shrink-0'>

          <input

            type='text'

            value={query}

            onChange={(e) => setQuery(e.target.value)}

            onKeyDown={(e) => {

              if (
                e.key === 'Enter' &&
                query.trim() &&
                !loading
              ) {
                sendMessage()
              }

            }}

            placeholder='Ask anything from uploaded document...'

            disabled={loading}

            className='flex-1 bg-[#0f172a] px-6 py-5 rounded-2xl outline-none text-lg text-white disabled:opacity-50'

          />

          <button

            onClick={sendMessage}

            disabled={loading}

            className='px-10 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-lg font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100'

          >

            {
              loading
                ? 'Thinking...'
                : 'Send'
            }

          </button>

        </div>

      </div>

    </div>

  )
}
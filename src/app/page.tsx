'use client';

import { useState, FormEvent } from 'react';
import ComponentDisplay from '../components/ComponentDisplay';
import NavBar from '../components/NavBar';
import { useChat } from '../context/ChatContext';
import { ChatContextType } from '../context/ChatContext';

interface Component {
  html: string;
}

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [components, setComponents] = useState<Component[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { chatHistory, addMessage } = useChat() as ChatContextType;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_input: userInput }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate components');
      }
      const data = await response.json();
      setComponents([{ html: data.components.join('\n') }]); // Changed this line
      addMessage(JSON.stringify({ role: 'user', content: userInput }));
      addMessage(JSON.stringify({ role: 'assistant', content: JSON.stringify(data.components) }));
      setUserInput('');
    } catch (error) {
      console.error('Error generating components:', error);
      setError('Failed to generate components. Please try again.');
      setComponents([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-3xl mb-4">Generate DaisyUI Components</h1>
            <form onSubmit={handleSubmit} className="mb-8">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                rows={4}
                className="textarea textarea-bordered w-full"
                placeholder="Enter your component instructions here..."
              />
              <button type="submit" className="btn btn-primary mt-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Generating...
                  </>
                ) : (
                  'Generate Components'
                )}
              </button>
            </form>
            
            {error && (
              <div className="alert alert-error shadow-lg mt-4">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 0118 0 9 9 0 0118 0z" /></svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
            
            {components.length > 0 && (
              <div className="space-y-8 mt-8">
                <h2 className="text-2xl font-bold mb-4">Generated Components</h2>
                {components.map((component, index) => (
                  <ComponentDisplay key={index} html={component.html} />
                ))}
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Chat History</h2>
              <div className="space-y-4">
                {chatHistory && chatHistory.length > 0 ? (
                  chatHistory.map((message: { role: string; content: string }, index: number) => (
                    <div key={index} className={`chat ${message.role === 'user' ? 'chat-start' : 'chat-end'}`}>
                      <div className={`chat-bubble ${message.role === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
                        {message.role === 'user' ? message.content : (
                          <pre className="whitespace-pre-wrap overflow-x-auto">
                            <code>{message.content}</code>
                          </pre>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No chat history available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
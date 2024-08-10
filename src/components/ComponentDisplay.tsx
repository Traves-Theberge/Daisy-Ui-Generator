import React from 'react';
import { useFramework } from '../context/FrameworkContext';

interface ComponentDisplayProps {
  html: string;
}

const ComponentDisplay: React.FC<ComponentDisplayProps> = ({ html }) => {
  const { framework } = useFramework();
  let actualHtml: string;

  try {
    // Remove any JSON formatting and extract only the HTML content
    const cleanHtml = html.replace(/^```json[\s\S]*?\n|(^|\n)```$/gm, '').trim();
    const parsedHtml = JSON.parse(cleanHtml);

    // Handle different possible structures
    if (typeof parsedHtml === 'string') {
      actualHtml = parsedHtml;
    } else if (parsedHtml.components && Array.isArray(parsedHtml.components)) {
      actualHtml = parsedHtml.components[0].html || JSON.stringify(parsedHtml.components[0]);
    } else if (parsedHtml.html) {
      actualHtml = parsedHtml.html;
    } else {
      actualHtml = JSON.stringify(parsedHtml);
    }
  } catch (error) {
    console.error('Error parsing HTML:', error);
    actualHtml = html; // Use the original input if parsing fails
  }

  return (
    <div className={framework === 'daisyui' ? 'card bg-base-200 shadow-xl' : 'card'}>
      <div className={framework === 'daisyui' ? 'card-body' : 'card-body p-4'}>
        <h3 className={framework === 'daisyui' ? 'card-title' : 'h3'}>Generated Component</h3>
        <div className={framework === 'daisyui' ? 'bg-base-100 p-4 rounded-lg mb-4' : 'bg-light p-4 rounded mb-4'} dangerouslySetInnerHTML={{ __html: actualHtml }} />
        <div className={framework === 'daisyui' ? 'bg-base-300 p-4 rounded-lg' : 'bg-secondary p-4 rounded'}>
          <h4 className={framework === 'daisyui' ? 'text-lg font-semibold mb-2' : 'h4 mb-2'}>HTML Code:</h4>
          <pre className="whitespace-pre-wrap overflow-x-auto">
            <code>{actualHtml}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ComponentDisplay;
import React from 'react';

interface ComponentDisplayProps {
  html: string;
}

const ComponentDisplay: React.FC<ComponentDisplayProps> = ({ html }) => {
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h3 className="card-title">Generated Component</h3>
        <div className="bg-base-100 p-4 rounded-lg mb-4" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="bg-base-300 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">HTML Code:</h4>
          <pre className="whitespace-pre-wrap overflow-x-auto">
            <code>{html}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ComponentDisplay;
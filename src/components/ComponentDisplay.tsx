import React from 'react';

interface ComponentDisplayProps {
  html: string;
}

const ComponentDisplay: React.FC<ComponentDisplayProps> = ({ html }) => {
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-2xl mb-4">Generated Component</h3>
        <div className="bg-base-100 p-6 rounded-lg mb-6 shadow-inner">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <div className="bg-base-300 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">HTML Code:</h4>
          <pre className="whitespace-pre-wrap overflow-x-auto bg-base-100 p-4 rounded">
            <code>{html}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ComponentDisplay;
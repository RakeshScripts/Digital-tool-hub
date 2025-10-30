
import React from 'react';

interface AdPlaceholderProps {
  width: string;
  height: string;
  label?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ width, height, label = "Advertisement" }) => {
  return (
    <div
      className={`bg-gray-200 border border-dashed border-gray-400 flex items-center justify-center ${width} ${height}`}
    >
      <span className="text-gray-500 text-sm">{label}</span>
    </div>
  );
};

export default AdPlaceholder;

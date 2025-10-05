
import React from 'react';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="border-b-2 border-black pb-2 mb-6">
      <h2 className="text-2xl font-bold font-serif text-gray-900">{title}</h2>
    </div>
  );
};

export default SectionHeader;

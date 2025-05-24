"use client";

interface CommandsProps {
  commands: string[];
  certifications: string[];
}

export function Commands({ commands, certifications }: CommandsProps) {
  // Format for display
  const formatName = (name: string) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Remove duplicates and sort
  const uniqueCommands = [...new Set(commands)].sort();
  const uniqueCertifications = [...new Set(certifications)].sort();

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-[rgba(13,20,40,0.8)] p-4 rounded-md border border-[#1a1a4a]">
        <h2 className="text-xl font-bold text-white mb-4">Commands</h2>

        {uniqueCommands.length === 0 ? (
          <p className="text-gray-400 text-sm italic">Select skill boxes to unlock commands</p>
        ) : (
          <div className="max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            <ul className="space-y-1">
              {uniqueCommands.map(command => (
                <li key={command} className="text-gray-300 text-sm">
                  {formatName(command)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-[rgba(13,20,40,0.8)] p-4 rounded-md border border-[#1a1a4a]">
        <h2 className="text-xl font-bold text-white mb-4">Certifications</h2>

        {uniqueCertifications.length === 0 ? (
          <p className="text-gray-400 text-sm italic">Select skill boxes to unlock certifications</p>
        ) : (
          <div className="max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            <ul className="space-y-1">
              {uniqueCertifications.map(cert => (
                <li key={cert} className="text-gray-300 text-sm">
                  {formatName(cert)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

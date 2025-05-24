"use client";

interface SkillModifiersProps {
  modifiers: {[key: string]: number};
}

export function SkillModifiers({ modifiers }: SkillModifiersProps) {
  // Format modifier names for display
  const formatModifierName = (name: string) => {
    // Handle private modifiers separately
    if (name.startsWith('private_')) {
      return name;
    }

    // Convert snake_case to Title Case with spaces
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Sort modifiers for better display
  const sortedModifiers = Object.entries(modifiers)
    .sort((a, b) => {
      // Put private_ modifiers at the bottom
      if (a[0].startsWith('private_') && !b[0].startsWith('private_')) return 1;
      if (!a[0].startsWith('private_') && b[0].startsWith('private_')) return -1;

      // Sort alphabetically
      return a[0].localeCompare(b[0]);
    });

  return (
    <div className="bg-[rgba(13,20,40,0.8)] p-4 rounded-md border border-[#1a1a4a]">
      <h2 className="text-xl font-bold text-white mb-4">Skill Modifiers</h2>

      {sortedModifiers.length === 0 ? (
        <p className="text-gray-400 text-sm italic">Select skill boxes to see modifiers</p>
      ) : (
        <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <table className="w-full">
            <tbody>
              {sortedModifiers.map(([name, value]) => (
                <tr key={name} className="border-b border-[#1a1a4a] last:border-0">
                  <td className="py-2 text-gray-300 text-sm">{formatModifierName(name)}</td>
                  <td className="py-2 text-right text-[hsl(var(--swg-accent-gold))] font-medium">
                    {value >= 0 ? `+${value}` : value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

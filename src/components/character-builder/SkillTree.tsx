"use client";

import { Profession, SkillBox } from "./CharacterBuilder";

interface SkillTreeProps {
  profession: Profession;
  selectedSkillBoxes: string[];
  onSelectSkillBox: (id: string) => void;
}

export function SkillTree({ profession, selectedSkillBoxes, onSelectSkillBox }: SkillTreeProps) {
  // Format the "leads to" connections for each tree branch
  const formatLeadsTo = () => {
    if (!profession.leadsTo || Object.keys(profession.leadsTo).length === 0) {
      return null;
    }

    const connections = [];

    for (const targetProf in profession.leadsTo) {
      const requiredSkillId = profession.leadsTo[targetProf];
      let requiredSkillName = "";

      // Search for the skill box name
      for (const treeKey in profession.skillTrees) {
        const tree = profession.skillTrees[treeKey];
        const box = tree.boxes.find(b => b.id === requiredSkillId);
        if (box) {
          requiredSkillName = box.name;
          break;
        }
      }

      // If we couldn't find it in the trees, check novice and master boxes
      if (!requiredSkillName) {
        if (profession.noviceBox.id === requiredSkillId) {
          requiredSkillName = profession.noviceBox.name;
        } else if (profession.masterBox && profession.masterBox.id === requiredSkillId) {
          requiredSkillName = profession.masterBox.name;
        }
      }

      // Format the profession name for display
      const targetProfName = targetProf.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      connections.push(`To: ${targetProfName} (${requiredSkillName})`);
    }

    return (
      <div className="mb-4 text-gray-300 space-y-1">
        {connections.map((connection, index) => (
          <p key={index} className="text-sm">{connection}</p>
        ))}
      </div>
    );
  };

  // Render Skill Box
  const renderSkillBox = (box: SkillBox, isMasterBox: boolean = false) => {
    const isSelected = selectedSkillBoxes.includes(box.id);

    // Check if prerequisites are met
    const prerequisitesMet = box.prerequisites.every(prereq =>
      selectedSkillBoxes.includes(prereq)
    );

    const boxStyle = isSelected
      ? "bg-[#075365] border-[hsl(var(--swg-accent-gold))]"
      : prerequisitesMet
        ? "bg-[rgba(13,20,40,0.8)] border-[#1a1a4a] hover:border-[hsl(var(--swg-accent-gold))/50%]"
        : "bg-[rgba(13,20,40,0.4)] border-[#1a1a4a] opacity-70 cursor-not-allowed";

    return (
      <div
        key={box.id}
        className={`border rounded-md p-3 text-center mb-2 transition-colors ${boxStyle}`}
        onClick={() => prerequisitesMet && onSelectSkillBox(box.id)}
      >
        <p className={`text-sm ${isSelected ? "text-white" : "text-gray-300"}`}>
          {box.name}
        </p>
      </div>
    );
  };

  return (
    <div className="skill-tree">
      {/* Master Box */}
      {profession.masterBox && (
        <div className="mb-4">
          {renderSkillBox(profession.masterBox, true)}
        </div>
      )}

      {/* Leads To Section */}
      {formatLeadsTo()}

      {/* Skill Branches */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {Object.entries(profession.skillTrees).map(([treeKey, tree]) => (
          <div key={treeKey} className="skill-branch">
            <div className="bg-[rgba(13,20,40,0.6)] border border-[#1a1a4a] rounded-md p-3">
              <h3 className="text-center text-[hsl(var(--swg-accent-gold))] font-medium mb-4">{tree.name}</h3>

              {tree.boxes.map(box => renderSkillBox(box))}
            </div>
          </div>
        ))}
      </div>

      {/* Novice Box */}
      <div className="my-4">
        {renderSkillBox(profession.noviceBox)}
      </div>
    </div>
  );
}

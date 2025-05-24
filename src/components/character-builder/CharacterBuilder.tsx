"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SkillTree } from "@/components/character-builder/SkillTree";
import { SkillModifiers } from "@/components/character-builder/SkillModifiers";
import { Commands } from "@/components/character-builder/Commands";
import { ProfessionList } from "@/components/character-builder/ProfessionList";
import { ExperienceTracker } from "@/components/character-builder/ExperienceTracker";
import { professionData } from "@/components/character-builder/data/professions";
import { speciesData } from "@/components/character-builder/data/species";

export type Species = {
  id: string;
  name: string;
  modifiers: {
    [key: string]: number;
  };
};

export type SkillBox = {
  id: string;
  name: string;
  skillPoints: number;
  xpCost: number;
  prerequisites: string[];
  grants: {
    commands?: string[];
    certifications?: string[];
    modifiers?: {
      [key: string]: number;
    };
  };
  isSelected?: boolean;
};

export type Profession = {
  id: string;
  name: string;
  description: string;
  type: "basic" | "elite" | "hybrid" | "force";
  skillTrees: {
    [key: string]: {
      name: string;
      boxes: SkillBox[];
      connections?: {
        [key: string]: string[]; // Maps skillBox ID to an array of IDs it connects to
      };
    };
  };
  noviceBox: SkillBox;
  masterBox?: SkillBox;
  leadsTo?: {
    [key: string]: string; // Profession ID -> Required skill box ID
  };
};

export function CharacterBuilder() {
  const MAX_SKILL_POINTS = 250;

  const [selectedSpecies, setSelectedSpecies] = useState<Species>(speciesData[1]); // Default to human
  const [selectedProfession, setSelectedProfession] = useState<Profession>(professionData.find(p => p.id === 'brawler')!);
  const [skillPoints, setSkillPoints] = useState<number>(MAX_SKILL_POINTS);
  const [usedSkillPoints, setUsedSkillPoints] = useState<number>(0);
  const [selectedSkillBoxes, setSelectedSkillBoxes] = useState<string[]>([]);
  const [earnedCommands, setEarnedCommands] = useState<string[]>([]);
  const [earnedCertifications, setEarnedCertifications] = useState<string[]>([]);
  const [skillModifiers, setSkillModifiers] = useState<{[key: string]: number}>({});

  // Initialize with novice box selected
  useEffect(() => {
    handleSkillBoxSelection(selectedProfession.noviceBox.id);
  }, [selectedProfession]);

  // Handle profession change
  const handleProfessionChange = (professionId: string) => {
    const profession = professionData.find(p => p.id === professionId);
    if (profession) {
      resetCharacter();
      setSelectedProfession(profession);
    }
  };

  // Handle species change
  const handleSpeciesChange = (speciesId: string) => {
    const species = speciesData.find(s => s.id === speciesId);
    if (species) {
      setSelectedSpecies(species);
      recalculateModifiers();
    }
  };

  // Handle skill box selection
  const handleSkillBoxSelection = (skillBoxId: string) => {
    // Find the skill box
    let skillBox: SkillBox | undefined;

    // Check novice box
    if (selectedProfession.noviceBox.id === skillBoxId) {
      skillBox = selectedProfession.noviceBox;
    }
    // Check master box
    else if (selectedProfession.masterBox && selectedProfession.masterBox.id === skillBoxId) {
      skillBox = selectedProfession.masterBox;
    }
    // Check skill trees
    else {
      for (const treeKey in selectedProfession.skillTrees) {
        const tree = selectedProfession.skillTrees[treeKey];
        const foundBox = tree.boxes.find(box => box.id === skillBoxId);
        if (foundBox) {
          skillBox = foundBox;
          break;
        }
      }
    }

    if (!skillBox) return;

    // Check if already selected
    if (selectedSkillBoxes.includes(skillBoxId)) {
      // Cannot deselect boxes that have dependents
      for (const treeKey in selectedProfession.skillTrees) {
        const tree = selectedProfession.skillTrees[treeKey];
        for (const box of tree.boxes) {
          if (box.prerequisites.includes(skillBoxId) && selectedSkillBoxes.includes(box.id)) {
            return; // Cannot deselect because it's a prerequisite for another selected box
          }
        }
      }

      // Remove the skill box and update points
      setSelectedSkillBoxes(prev => prev.filter(id => id !== skillBoxId));
      setUsedSkillPoints(prev => prev - skillBox!.skillPoints);

      // Remove commands, certifications, and modifiers
      if (skillBox.grants.commands) {
        setEarnedCommands(prev => prev.filter(cmd => !skillBox!.grants.commands!.includes(cmd)));
      }
      if (skillBox.grants.certifications) {
        setEarnedCertifications(prev => prev.filter(cert => !skillBox!.grants.certifications!.includes(cert)));
      }
      recalculateModifiers();

      return;
    }

    // Check if have enough skill points
    if (usedSkillPoints + skillBox.skillPoints > MAX_SKILL_POINTS) {
      return;
    }

    // Check prerequisites
    for (const prereq of skillBox.prerequisites) {
      if (!selectedSkillBoxes.includes(prereq)) {
        return; // Prerequisite not met
      }
    }

    // Add the skill box and update points
    setSelectedSkillBoxes(prev => [...prev, skillBoxId]);
    setUsedSkillPoints(prev => prev + skillBox.skillPoints);

    // Add commands, certifications, and modifiers
    if (skillBox.grants.commands) {
      setEarnedCommands(prev => [...prev, ...skillBox.grants.commands!]);
    }
    if (skillBox.grants.certifications) {
      setEarnedCertifications(prev => [...prev, ...skillBox.grants.certifications!]);
    }
    recalculateModifiers();
  };

  // Recalculate all modifiers
  const recalculateModifiers = () => {
    let newModifiers: {[key: string]: number} = {};

    // Add species modifiers
    for (const key in selectedSpecies.modifiers) {
      newModifiers[key] = (newModifiers[key] || 0) + selectedSpecies.modifiers[key];
    }

    // Add skill box modifiers
    for (const boxId of selectedSkillBoxes) {
      let skillBox: SkillBox | undefined;

      // Check novice box
      if (selectedProfession.noviceBox.id === boxId) {
        skillBox = selectedProfession.noviceBox;
      }
      // Check master box
      else if (selectedProfession.masterBox && selectedProfession.masterBox.id === boxId) {
        skillBox = selectedProfession.masterBox;
      }
      // Check skill trees
      else {
        for (const treeKey in selectedProfession.skillTrees) {
          const tree = selectedProfession.skillTrees[treeKey];
          const foundBox = tree.boxes.find(box => box.id === boxId);
          if (foundBox) {
            skillBox = foundBox;
            break;
          }
        }
      }

      if (skillBox && skillBox.grants.modifiers) {
        for (const key in skillBox.grants.modifiers) {
          newModifiers[key] = (newModifiers[key] || 0) + skillBox.grants.modifiers[key];
        }
      }
    }

    setSkillModifiers(newModifiers);
  };

  // Reset character
  const resetCharacter = () => {
    setUsedSkillPoints(0);
    setSelectedSkillBoxes([]);
    setEarnedCommands([]);
    setEarnedCertifications([]);
    setSkillModifiers({});
  };

  return (
    <PageLayout
      title="Character Builder"
      subtitle="Plan your character's profession and skills"
    >
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
        {/* Sidebar - Professions and Experience */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <ProfessionList
              professions={professionData}
              selectedProfession={selectedProfession.id}
              onSelectProfession={handleProfessionChange}
            />

            <ExperienceTracker
              usedSkillPoints={usedSkillPoints}
              maxSkillPoints={MAX_SKILL_POINTS}
            />
          </div>
        </div>

        {/* Main Area - Skill Tree */}
        <div className="lg:col-span-5">
          <div className="bg-[rgba(13,20,40,0.8)] p-4 rounded-md border border-[#1a1a4a] mb-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="flex items-center mb-2 md:mb-0">
                <h2 className="text-xl font-bold text-white mr-4">{selectedProfession.name}</h2>
                <select
                  className="bg-[rgba(20,30,60,0.8)] border border-[#1a1a4a] text-white rounded-md px-2 py-1"
                  value={selectedSpecies.id}
                  onChange={(e) => handleSpeciesChange(e.target.value)}
                >
                  <option value="" disabled>Species:</option>
                  {speciesData.map(species => (
                    <option key={species.id} value={species.id}>{species.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <div className="text-white mr-4">
                  SP: <span className={usedSkillPoints === MAX_SKILL_POINTS ? "text-green-500" : "text-[hsl(var(--swg-accent-gold))]"}>{MAX_SKILL_POINTS - usedSkillPoints}</span> / {MAX_SKILL_POINTS}
                </div>
                <button
                  className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  onClick={resetCharacter}
                >
                  Reset Char
                </button>
              </div>
            </div>

            <SkillTree
              profession={selectedProfession}
              selectedSkillBoxes={selectedSkillBoxes}
              onSelectSkillBox={handleSkillBoxSelection}
            />
          </div>
        </div>

        {/* Right Sidebar - Modifiers, Commands, etc */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            <SkillModifiers modifiers={skillModifiers} />

            <Commands
              commands={earnedCommands}
              certifications={earnedCertifications}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 bg-[rgba(13,20,40,0.6)] p-6 rounded-md border border-[#1a1a4a]">
        <h3 className="text-white font-semibold text-lg mb-4">About the Character Builder</h3>
        <p className="text-gray-300 mb-4">
          This tool allows you to plan your Star Wars Galaxies character's profession and skill progression.
          Select skill boxes to simulate your character's development and see what abilities, modifiers, and
          certifications you'll earn along the way.
        </p>
        <p className="text-gray-300">
          Remember that in SWG Infinity, you can have up to 250 skill points across all professions,
          allowing for unique character customization and hybrid builds.
        </p>
      </div>
    </PageLayout>
  );
}

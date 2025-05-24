"use client";

import { useState } from "react";
import { Profession } from "./CharacterBuilder";

interface ProfessionListProps {
  professions: Profession[];
  selectedProfession: string;
  onSelectProfession: (id: string) => void;
}

export function ProfessionList({ professions, selectedProfession, onSelectProfession }: ProfessionListProps) {
  const [filter, setFilter] = useState<'all' | 'basic' | 'elite' | 'hybrid' | 'force'>('all');

  // Filter professions based on the selected filter
  const filteredProfessions = professions.filter(profession => {
    if (filter === 'all') return true;
    return profession.type === filter;
  });

  // Sort professions alphabetically
  const sortedProfessions = [...filteredProfessions].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Group professions for better organization
  const groupedProfessions = {
    basic: sortedProfessions.filter(p => p.type === 'basic'),
    elite: sortedProfessions.filter(p => p.type === 'elite'),
    hybrid: sortedProfessions.filter(p => p.type === 'hybrid'),
    force: sortedProfessions.filter(p => p.type === 'force'),
  };

  // Render profession groups based on filter
  const renderProfessions = () => {
    if (filter === 'all') {
      return (
        <>
          {groupedProfessions.basic.length > 0 && (
            <>
              <h4 className="text-sm font-medium text-[hsl(var(--swg-accent-gold))] mt-3 mb-1">Basic Professions</h4>
              {groupedProfessions.basic.map(renderProfessionButton)}
            </>
          )}

          {groupedProfessions.elite.length > 0 && (
            <>
              <h4 className="text-sm font-medium text-[hsl(var(--swg-accent-gold))] mt-3 mb-1">Elite Professions</h4>
              {groupedProfessions.elite.map(renderProfessionButton)}
            </>
          )}

          {groupedProfessions.hybrid.length > 0 && (
            <>
              <h4 className="text-sm font-medium text-[hsl(var(--swg-accent-gold))] mt-3 mb-1">Hybrid Professions</h4>
              {groupedProfessions.hybrid.map(renderProfessionButton)}
            </>
          )}

          {groupedProfessions.force.length > 0 && (
            <>
              <h4 className="text-sm font-medium text-[hsl(var(--swg-accent-gold))] mt-3 mb-1">Force Professions</h4>
              {groupedProfessions.force.map(renderProfessionButton)}
            </>
          )}
        </>
      );
    } else {
      return sortedProfessions.map(renderProfessionButton);
    }
  };

  // Render a single profession button
  const renderProfessionButton = (profession: Profession) => {
    const isSelected = profession.id === selectedProfession;

    return (
      <button
        key={profession.id}
        className={`w-full text-left py-1 px-2 rounded mb-1 text-sm transition-colors ${
          isSelected
            ? 'bg-[#075365] text-white font-medium'
            : 'text-gray-300 hover:bg-[rgba(13,20,40,0.8)]'
        }`}
        onClick={() => onSelectProfession(profession.id)}
      >
        {profession.name}
      </button>
    );
  };

  return (
    <div className="bg-[rgba(13,20,40,0.8)] p-4 rounded-md border border-[#1a1a4a]">
      <h2 className="text-xl font-bold text-white mb-4">Professions</h2>

      <div className="flex flex-wrap gap-1 mb-3">
        <button
          className={`px-2 py-1 text-xs rounded ${filter === 'all' ? 'bg-[hsl(var(--swg-accent-gold))] text-black' : 'bg-[rgba(13,20,40,0.6)] text-gray-300'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-2 py-1 text-xs rounded ${filter === 'basic' ? 'bg-[hsl(var(--swg-accent-gold))] text-black' : 'bg-[rgba(13,20,40,0.6)] text-gray-300'}`}
          onClick={() => setFilter('basic')}
        >
          Basic
        </button>
        <button
          className={`px-2 py-1 text-xs rounded ${filter === 'elite' ? 'bg-[hsl(var(--swg-accent-gold))] text-black' : 'bg-[rgba(13,20,40,0.6)] text-gray-300'}`}
          onClick={() => setFilter('elite')}
        >
          Elite
        </button>
        <button
          className={`px-2 py-1 text-xs rounded ${filter === 'hybrid' ? 'bg-[hsl(var(--swg-accent-gold))] text-black' : 'bg-[rgba(13,20,40,0.6)] text-gray-300'}`}
          onClick={() => setFilter('hybrid')}
        >
          Hybrid
        </button>
        <button
          className={`px-2 py-1 text-xs rounded ${filter === 'force' ? 'bg-[hsl(var(--swg-accent-gold))] text-black' : 'bg-[rgba(13,20,40,0.6)] text-gray-300'}`}
          onClick={() => setFilter('force')}
        >
          Force
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {renderProfessions()}
      </div>
    </div>
  );
}

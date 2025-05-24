"use client";

interface ExperienceTrackerProps {
  usedSkillPoints: number;
  maxSkillPoints: number;
}

export function ExperienceTracker({ usedSkillPoints, maxSkillPoints }: ExperienceTrackerProps) {
  // Calculate percentage used
  const percentUsed = (usedSkillPoints / maxSkillPoints) * 100;

  // Determine color based on usage
  let progressColor = '';
  if (percentUsed <= 33) {
    progressColor = 'bg-green-500';
  } else if (percentUsed <= 66) {
    progressColor = 'bg-[hsl(var(--swg-accent-gold))]';
  } else {
    progressColor = percentUsed === 100 ? 'bg-green-600' : 'bg-orange-500';
  }

  return (
    <div className="bg-[rgba(13,20,40,0.8)] p-4 rounded-md border border-[#1a1a4a]">
      <h2 className="text-xl font-bold text-white mb-4">Skill Points</h2>

      <div className="mb-2">
        <div className="flex justify-between mb-1">
          <span className="text-gray-300 text-sm">Used: {usedSkillPoints} SP</span>
          <span className="text-gray-300 text-sm">Available: {maxSkillPoints - usedSkillPoints} SP</span>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${progressColor}`}
            style={{ width: `${percentUsed}%` }}
          ></div>
        </div>
      </div>

      <p className="text-gray-400 text-xs mt-3">
        SWG characters can have a maximum of {maxSkillPoints} skill points distributed across professions.
      </p>
    </div>
  );
}

interface MatchedSkillsProps {
  skills: string[];
}

export default function MatchedSkills({
  skills,
}: MatchedSkillsProps) {
  return (
    <div className="rounded-xl border border-green-200 bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-green-700">
        ✅ Matched Skills
      </h2>

      {skills.length === 0 ? (
        <p className="text-gray-500">
          No matched skills found.
        </p>
      ) : (
        <ul className="space-y-2">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="rounded-md bg-green-100 px-3 py-2"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
interface MissingSkillsProps {
  skills: string[];
}

export default function MissingSkills({
  skills,
}: MissingSkillsProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-red-700">
        ❌ Missing Skills
      </h2>

      {skills.length === 0 ? (
        <p className="text-gray-500">
          No missing skills 🎉
        </p>
      ) : (
        <ul className="space-y-2">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="rounded-md bg-red-100 px-3 py-2"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
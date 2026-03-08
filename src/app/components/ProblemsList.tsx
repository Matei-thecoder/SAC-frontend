import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";

interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance: string;
  completed?: boolean;
}

const problems: Problem[] = [
  { id: 1, title: "Doi Sumă", difficulty: "Ușor", acceptance: "48.2%", completed: true },
  { id: 2, title: "Adăuga Două Numere", difficulty: "Mediu", acceptance: "39.8%" },
  { id: 3, title: "Subșir Cel Mai Lung Fără Caractere Repetate", difficulty: "Mediu", acceptance: "33.5%" },
  { id: 4, title: "Mediana a Două Tablouri Sortate", difficulty: "Greu", acceptance: "35.2%" },
  { id: 5, title: "Subșir Palindromic Cel Mai Lung", difficulty: "Mediu", acceptance: "32.1%" },
  { id: 7, title: "Întoarce Întreg", difficulty: "Ușor", acceptance: "27.8%" },
  { id: 8, title: "String la Întreg (atoi)", difficulty: "Mediu", acceptance: "16.5%" },
  { id: 10, title: "Potrivire Expresie Regulată", difficulty: "Greu", acceptance: "27.9%" },
  { id: 11, title: "Container Cu Cea Mai Multă Apă", difficulty: "Mediu", acceptance: "53.8%" },
  { id: 15, title: "3Sumă", difficulty: "Mediu", acceptance: "31.4%" },
];

function getDifficultyColor(difficulty: Problem["difficulty"]) {
  switch (difficulty) {
    case "Ușor":
      return "text-green-600 bg-green-50";
    case "Mediu":
      return "text-yellow-600 bg-yellow-50";
    case "Greu":
      return "text-red-600 bg-red-50";
  }
}

export function ProblemsList() {
  const navigate = useNavigate();

  return (
    <section id="problems" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Probleme Populare
        </h2>
        
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Titlu
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Dificultate
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Rata de Acceptare
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {problems.map((problem) => (
                  <tr
                    key={problem.id}
                    onClick={() => navigate(`/problem/${problem.id}`)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      {problem.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900 hover:text-blue-600">
                        {problem.id}. {problem.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                          problem.difficulty
                        )}`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {problem.acceptance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { CheckCircle, XCircle } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  category: string;
}

/*const questionsData: Question[] = [
  {
    id: 1,
    question: "Care este scopul principal al unui Makefile în programarea C?",
    options: [
      "Să execute automat programul",
      "Să automatizeze procesul de compilare și linking",
      "Să verifice sintaxa codului",
      "Să creeze documentație"
    ],
    correctAnswer: 1,
    explanation: "Makefile-ul automatizează procesul de compilare și linking al programelor C, făcând mai ușoară gestionarea proiectelor mari.",
    category: "Makefile"
  },
  {
    id: 2,
    question: "Ce se întâmplă dacă apelezi free() de două ori pe același pointer?",
    options: [
      "Nu se întâmplă nimic",
      "Memoria este eliberată de două ori",
      "Comportament nedefinit (undefined behavior)",
      "Programul se oprește normal"
    ],
    correctAnswer: 2,
    explanation: "Apelarea free() de două ori pe același pointer duce la comportament nedefinit, ceea ce poate cauza crash-ul programului.",
    category: "Memory Management"
  },
  {
    id: 3,
    question: "Ce înseamnă 'recursivitate' în programare?",
    options: [
      "O buclă care se repetă la infinit",
      "O funcție care se apelează pe sine însăși",
      "O structură de date",
      "Un tip de variabilă"
    ],
    correctAnswer: 1,
    explanation: "Recursivitatea este tehnica prin care o funcție se apelează pe sine însăși pentru a rezolva o problemă.",
    category: "Fundamental Concepts"
  },
  {
    id: 4,
    question: "Care este diferența între malloc() și calloc()?",
    options: [
      "malloc() inițializează memoria cu 0, calloc() nu",
      "calloc() inițializează memoria cu 0, malloc() nu",
      "Nu există diferență",
      "malloc() este mai rapid decât calloc()"
    ],
    correctAnswer: 1,
    explanation: "calloc() alocă memorie și o inițializează cu 0, în timp ce malloc() alocă memorie fără a o inițializa.",
    category: "Memory Management"
  },
  {
    id: 5,
    question: "Ce face directiva #include <stdio.h>?",
    options: [
      "Include biblioteca standard de intrare/ieșire",
      "Definește funcția main",
      "Creează un fișier nou",
      "Compilează programul"
    ],
    correctAnswer: 0,
    explanation: "#include <stdio.h> include headerul bibliotecii standard de intrare/ieșire care conține declarații pentru printf(), scanf(), etc.",
    category: "Preprocessor"
  },
  {
    id: 6,
    question: "Care este scopul unui pointer în C?",
    options: [
      "Să stocheze numere mari",
      "Să stocheze adrese de memorie",
      "Să optimizeze codul",
      "Să creeze funcții"
    ],
    correctAnswer: 1,
    explanation: "Un pointer stochează adresa de memorie a unei variabile, permițând accesul indirect la acea variabilă.",
    category: "Pointers"
  },
  {
    id: 7,
    question: "Ce înseamnă 'segmentation fault'?",
    options: [
      "Eroare de sintaxă",
      "Acces la memorie invalidă",
      "Diviziune cu zero",
      "Buclă infinită"
    ],
    correctAnswer: 1,
    explanation: "Segmentation fault apare când programul încearcă să acceseze o zonă de memorie la care nu are permisiune.",
    category: "Debugging"
  },
  {
    id: 8,
    question: "Care este diferența între parametrii formali și cei efectivi?",
    options: [
      "Nu există diferență",
      "Parametrii formali sunt în definiția funcției, cei efectivi la apel",
      "Parametrii efectivi sunt în definiția funcției, cei formali la apel",
      "Parametrii formali sunt mai rapizi"
    ],
    correctAnswer: 1,
    explanation: "Parametrii formali sunt cei din definiția funcției, iar parametrii efectivi (argumentele) sunt valorile transmise la apelul funcției.",
    category: "Functions"
  },
];
*/
export function Questions() {
  const { isLoggedIn, logout, getQuestions } = useAuth();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [questionsData, setQuestionsData] = useState<Question[]>([]);

  useEffect(() => {
    getQuestions().then(setQuestionsData);
  }, [getQuestions]);

  const categories = ["All", ...Array.from(new Set(questionsData.map(q => q.category)))];

  const filteredQuestions = filterCategory === "All" 
    ? questionsData 
    : questionsData.filter(q => q.category === filterCategory);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = (questionId: number) => {
    setShowResults(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const handleReset = (questionId: number) => {
    setSelectedAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
    setShowResults(prev => {
      const newResults = { ...prev };
      delete newResults[questionId];
      return newResults;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        isLoggedIn={isLoggedIn}
        onLogout={logout}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Grile - Întrebări Teoretice</h1>
          <p className="text-gray-600">Testează-ți cunoștințele teoretice pentru examenele AC</p>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.map((question) => {
            const selectedAnswer = selectedAnswers[question.id];
            const showResult = showResults[question.id];
            const isCorrect = selectedAnswer === question.correct_answer;  // 0-based
            //console.log(`Question ID: ${question.id}, Selected Answer: ${selectedAnswer}, Correct Answer: ${question.correct_answer}, Is Correct: ${isCorrect}`);
            return (
              <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mb-3">
                      {question.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {question.id}. {question.question}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrectOption = index === question.correct_answer;  // Changed: removed - 1
                    
                    let optionClass = "border-2 border-gray-200 hover:border-blue-400";
                    if (showResult) {
                      if (isCorrectOption) {
                        optionClass = "border-2 border-green-500 bg-green-50";
                      } else if (isSelected && !isCorrect) {
                        optionClass = "border-2 border-red-500 bg-red-50";
                      }
                    } else if (isSelected) {
                      optionClass = "border-2 border-blue-600 bg-blue-50";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => !showResult && handleAnswerSelect(question.id, index)}
                        disabled={showResult}
                        className={`w-full text-left p-4 rounded-lg transition-all ${optionClass} ${
                          showResult ? 'cursor-default' : 'cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                          }`}>
                            {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </div>
                          <span className="text-gray-700">{option}</span>
                          {showResult && isCorrectOption && (
                            <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {showResult && question.explanation && (
                  <div className={`p-4 rounded-lg mb-4 ${
                    isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? '✓ Corect!' : '✗ Incorect'}
                    </p>
                    <p className="text-gray-700 text-sm">{question.explanation}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  {!showResult ? (
                    <button
                      onClick={() => handleSubmit(question.id)}
                      disabled={selectedAnswer === undefined}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Verifică Răspuns
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReset(question.id)}
                      className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Încearcă Din Nou
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

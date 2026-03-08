import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Ia examenele de la AC
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Practica pentru examenul de la PC.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
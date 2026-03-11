import { Code2, Target, Users, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function GuestLanding() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Exam-Focused Problems",
      description: "Practice problems specifically designed to match your AC curriculum and past exam questions",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Instant Validation",
      description: "Submit your C programs and get immediate feedback to verify your solutions meet requirements",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Built by Students",
      description: "Created by AC students, for AC students - we understand exactly what you need to succeed",
    },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Platform Lead",
      image: "professional woman developer",
    },
    {
      name: "Marcus Johnson",
      role: "Technical Architect",
      image: "professional man engineer",
    },
    {
      name: "Aisha Patel",
      role: "Community Manager",
      image: "professional woman manager",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold">SAC</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-32">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Ace Your <span className="text-blue-200">AC Exams</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              The ultimate practice platform for students at Automatica și Calculatoare Iași. 
              Master your programming assignments, prepare for exams, and succeed in your studies.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/signup")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-lg font-semibold shadow-lg"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors text-lg font-semibold"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SAC?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to excel in coding interviews and beyond
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <div>
              <div className="text-5xl font-bold mb-2">200+</div>
              <div className="text-blue-100 text-lg">Practice Problems</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1500+</div>
              <div className="text-blue-100 text-lg">AC Students</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-blue-100 text-lg">Pass Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100 text-lg">Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Built for AC Students</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                SAC is specifically designed for students at Facultatea de Automatică și Calculatoare, 
                Universitatea Tehnică "Gheorghe Asachi" din Iași. Practice programming problems 
                aligned with your coursework and prepare effectively for your exams.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Problems matching your semester curriculum and exam format</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">C programming practice with header files, source files, and Makefiles</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Track your progress and prepare systematically for exams</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="AC students studying together"
                className="rounded-xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AC students who created this platform to help fellow students succeed
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-${index === 0 ? '1573496359142-b8d87734a5a2' : index === 1 ? '1560250097-0b93528c311a' : '1573497019940-1c28c88b4f3e'}?w=400&h=400&fit=crop`}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Excel in Your Exams?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of AC students already using SAC to prepare for exams and improve their programming skills
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-lg font-semibold shadow-lg"
          >
            Start Practicing Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Code2 className="w-6 h-6 text-blue-500" />
              <span className="text-white font-semibold">SAC</span>
            </div>
            <div className="text-sm">
              © 2026 SAC. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
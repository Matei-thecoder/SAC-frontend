import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Upload, Lock, FileCode, File } from "lucide-react";
import { Header } from "../components/Header";
import { useAuth } from "../context/AuthContext";

const problemsData: Record<string, { title: string; difficulty: string; description: string }> = {
  "1": {
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  },
  "2": {
    title: "Add Two Numbers",
    difficulty: "Medium",
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit.",
  },
  "3": {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
  },
  "4": {
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
  },
  "5": {
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    description: "Given a string s, return the longest palindromic substring in s.",
  },
  "7": {
    title: "Reverse Integer",
    difficulty: "Easy",
    description: "Given a signed 32-bit integer x, return x with its digits reversed.",
  },
  "8": {
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    description: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.",
  },
  "10": {
    title: "Regular Expression Matching",
    difficulty: "Hard",
    description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.",
  },
  "11": {
    title: "Container With Most Water",
    difficulty: "Medium",
    description: "You are given an integer array height of length n. Find two lines that together with the x-axis form a container, such that the container contains the most water.",
  },
  "15": {
    title: "3Sum",
    difficulty: "Medium",
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
  },
};

export function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [cFile1, setCFile1] = useState<File | null>(null);
  const [cFile2, setCFile2] = useState<File | null>(null);
  const [makefileFile, setMakefileFile] = useState<File | null>(null);

  const problem = problemsData[id || "1"];

  const handleSubmit = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    
    console.log("Submitting files:", {
      header: headerFile?.name,
      cFile1: cFile1?.name,
      cFile2: cFile2?.name,
      makefile: makefileFile?.name,
    });
    
    alert("Files submitted successfully!");
    
    // Reset files
    setHeaderFile(null);
    setCFile1(null);
    setCFile2(null);
    setMakefileFile(null);
  };

  if (!problem) {
    return <div>Problem not found</div>;
  }

  const allFilesUploaded = headerFile && cFile1 && cFile2 && makefileFile;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        isLoggedIn={isLoggedIn}
        onLogout={logout}
      />

      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Problems
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 container mx-auto px-4 pb-8">
          {/* Problem Description */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {id}. {problem.title}
              </h1>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  problem.difficulty === "Easy"
                    ? "text-green-600 bg-green-50"
                    : problem.difficulty === "Medium"
                    ? "text-yellow-600 bg-yellow-50"
                    : "text-red-600 bg-red-50"
                }`}
              >
                {problem.difficulty}
              </span>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">{problem.description}</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">Example:</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-800">
                  Input: nums = [2,7,11,15], target = 9<br />
                  Output: [0,1]<br />
                  Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                </code>
              </div>
            </div>
          </div>

          {/* Upload Module */}
          <div className={`bg-white border border-gray-200 rounded-lg p-6 ${!isLoggedIn ? 'opacity-60' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Upload Solution Files</h2>
              {!isLoggedIn && <Lock className="w-6 h-6 text-gray-400" />}
            </div>
            
            {!isLoggedIn && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Please{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="underline font-medium hover:text-yellow-900"
                  >
                    log in
                  </button>{" "}
                  to upload files and submit your solution
                </p>
              </div>
            )}

            <div className="space-y-4">
              {/* Header File */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileCode className="w-4 h-4" />
                  Header File (.h)
                </label>
                <input
                  type="file"
                  accept=".h"
                  onChange={(e) => setHeaderFile(e.target.files?.[0] || null)}
                  disabled={!isLoggedIn}
                  className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {headerFile && (
                  <p className="text-sm text-green-600 mt-1">✓ {headerFile.name}</p>
                )}
              </div>

              {/* C File 1 */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileCode className="w-4 h-4" />
                  C File 1 (.c)
                </label>
                <input
                  type="file"
                  accept=".c"
                  onChange={(e) => setCFile1(e.target.files?.[0] || null)}
                  disabled={!isLoggedIn}
                  className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {cFile1 && (
                  <p className="text-sm text-green-600 mt-1">✓ {cFile1.name}</p>
                )}
              </div>

              {/* C File 2 */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileCode className="w-4 h-4" />
                  C File 2 (.c)
                </label>
                <input
                  type="file"
                  accept=".c"
                  onChange={(e) => setCFile2(e.target.files?.[0] || null)}
                  disabled={!isLoggedIn}
                  className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {cFile2 && (
                  <p className="text-sm text-green-600 mt-1">✓ {cFile2.name}</p>
                )}
              </div>

              {/* Makefile */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <File className="w-4 h-4" />
                  Makefile
                </label>
                <input
                  type="file"
                  accept="*"
                  onChange={(e) => setMakefileFile(e.target.files?.[0] || null)}
                  disabled={!isLoggedIn}
                  className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {makefileFile && (
                  <p className="text-sm text-green-600 mt-1">✓ {makefileFile.name}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!isLoggedIn || !allFilesUploaded}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                <Upload className="w-5 h-5" />
                Submit Solution
              </button>

              {!allFilesUploaded && isLoggedIn && (
                <p className="text-sm text-gray-600 text-center">
                  Please upload all required files to submit
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
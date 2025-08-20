import React, { useState, useEffect } from "react";
import { FaVial, FaCode, FaDownload, FaCopy, FaSpinner } from "react-icons/fa";

const TestGeneration = ({ file, currentCode }) => {
  const [testFramework, setTestFramework] = useState("jest");
  const [testType, setTestType] = useState("unit");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("tests");
  const [toast, setToast] = useState(null);

  const frameworks = [
    { value: "jest", label: "Jest" },
    { value: "mocha", label: "Mocha" },
    { value: "vitest", label: "Vitest" },
    { value: "pytest", label: "Pytest" },
    { value: "unittest", label: "Unittest" },
    { value: "phpunit", label: "PHPUnit" },
  ];

  const testTypes = [
    { value: "unit", label: "Unit Tests" },
    { value: "integration", label: "Integration Tests" },
    { value: "e2e", label: "End-to-End Tests" },
  ];

  const getLanguageFromFile = (file) => {
    if (!file) return "javascript";
    const ext = file.name?.split(".").pop()?.toLowerCase();
    const langMap = {
      js: "javascript",
      jsx: "javascript",
      ts: "typescript",
      tsx: "typescript",
      py: "python",
      java: "java",
      cpp: "cpp",
      c: "c",
      php: "php",
      rb: "ruby",
      go: "go",
      rs: "rust",
    };
    return langMap[ext] || "javascript";
  };

  const createFallbackResult = (responseText) => {
    return {
      tests: {
        code: responseText,
        framework: testFramework,
        description: "Generated tests (parsed from text response)",
        coverage_areas: ["Basic functionality", "Error handling"],
      },
      analysis: {
        code_quality: {
          score: 75,
          readability: 75,
          maintainability: 75,
          issues: ["Response format not structured"],
          suggestions: ["Use structured JSON response format"],
        },
        complexity: {
          cyclomatic_complexity: 0,
          cognitive_complexity: 0,
          lines_of_code: responseText.split("\n").length,
          functions_count: 0,
          complexity_rating: "unknown",
        },
        security: {
          vulnerability_score: 90,
          vulnerabilities: [],
          recommendations: ["Review generated code for security issues"],
        },
        performance: {
          performance_score: 80,
          bottlenecks: [],
          optimizations: ["Manual review recommended"],
        },
        best_practices: {
          score: 70,
          followed: [],
          violations: ["Unstructured response format"],
          recommendations: ["Use proper JSON structure"],
        },
      },
      suggestions: [
        {
          type: "improvement",
          title: "Structure Response Format",
          description:
            "Consider using a structured JSON format for better parsing and display.",
          priority: "medium",
          line_numbers: [],
        },
      ],
      metrics: {
        maintainability_index: 75,
        technical_debt_ratio: 15,
        duplication_percentage: 0,
      },
    };
  };

  const generateTests = async () => {
    if (!currentCode || !file) {
      setError("Please select a file and ensure code is loaded");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: currentCode,
          filename: file.name || "unknown.js",
          language: getLanguageFromFile(file),
          test_framework: testFramework,
          test_type: testType,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Parse the AI response which should be JSON
      let parsedResult;
      try {
        // First try to parse the entire response as JSON
        if (typeof data.analysis_result === "string") {
          parsedResult = JSON.parse(data.analysis_result);
        } else {
          parsedResult = data.analysis_result;
        }

        // Ensure the result has the expected structure
        if (!parsedResult.tests || !parsedResult.analysis) {
          throw new Error("Invalid response structure");
        }
      } catch (e) {
        console.warn(
          "Failed to parse as structured JSON, attempting to extract code blocks:",
          e
        );

        // Try to extract code from markdown-style response
        const responseText =
          typeof data.analysis_result === "string"
            ? data.analysis_result
            : JSON.stringify(data.analysis_result);

        // Look for JSON code blocks
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          try {
            parsedResult = JSON.parse(jsonMatch[1]);
          } catch (jsonError) {
            console.warn("Failed to parse extracted JSON:", jsonError);
            parsedResult = createFallbackResult(responseText);
          }
        } else {
          // Look for any code blocks
          const codeMatch = responseText.match(/```[\w]*\s*([\s\S]*?)\s*```/);
          const extractedCode = codeMatch ? codeMatch[1] : responseText;
          parsedResult = createFallbackResult(extractedCode);
        }
      }

      setResult(parsedResult);
    } catch (err) {
      setError(`Failed to generate tests: ${err.message}`);
      console.error("Test generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setToast({
          type: "success",
          message: "Copied to clipboard successfully!",
        });
        setTimeout(() => setToast(null), 3000);
      })
      .catch((err) => {
        setToast({ type: "error", message: "Failed to copy to clipboard" });
        setTimeout(() => setToast(null), 3000);
        console.error("Failed to copy:", err);
      });
  };

  const downloadTests = () => {
    if (!result?.tests?.code) return;

    const element = document.createElement("a");
    const file = new Blob([result.tests.code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);

    const language = getLanguageFromFile(file);
    const ext = language === "python" ? ".py" : ".test.js";
    element.download = `${file?.name?.split(".")[0] || "test"}${ext}`;

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderScore = (score, label) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center space-x-2">
        <div className="w-20 bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              score >= 80
                ? "bg-green-500"
                : score >= 60
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-sm font-medium">{score}</span>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-app text-app">
      {/* Header */}
      <div className="bg-card border-b border-app p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaVial className="text-secondary" />
            <h2 className="text-lg font-semibold">Test Generation</h2>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={testFramework}
              onChange={(e) => setTestFramework(e.target.value)}
              className="px-3 py-1 text-sm bg-muted border border-app rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              {frameworks.map((fw) => (
                <option key={fw.value} value={fw.value}>
                  {fw.label}
                </option>
              ))}
            </select>
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              className="px-3 py-1 text-sm bg-muted border border-app rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              {testTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <button
              onClick={generateTests}
              disabled={loading || !file || !currentCode}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-sm"
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaVial />}
              <span>{loading ? "Generating..." : "Generate Tests"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {!file ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <FaVial className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No File Selected</h3>
              <p className="text-muted-foreground">
                Select a file from the file explorer to generate tests
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaVial className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-red-600">Error</h3>
              <p className="text-muted-foreground max-w-md">{error}</p>
              <button
                onClick={generateTests}
                className="mt-4 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : !result ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <FaCode className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Ready to Generate Tests
              </h3>
              <p className="text-muted-foreground mb-4">
                File: {file.name} ({getLanguageFromFile(file)})
              </p>
              <p className="text-sm text-muted-foreground">
                Click "Generate Tests" to create comprehensive test cases
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {/* Tabs */}
            <div className="bg-muted border-b border-app">
              <div className="flex">
                {["tests", "analysis", "suggestions", "raw"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? "text-secondary border-secondary"
                        : "text-muted-foreground border-transparent hover:text-app"
                    }`}
                  >
                    {tab === "raw"
                      ? "Raw JSON"
                      : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === "tests" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Generated Tests</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          copyToClipboard(result.tests?.code || "")
                        }
                        className="p-2 text-muted-foreground hover:text-app transition-colors"
                        title="Copy to clipboard"
                      >
                        <FaCopy />
                      </button>
                      <button
                        onClick={downloadTests}
                        className="p-2 text-muted-foreground hover:text-app transition-colors"
                        title="Download tests"
                      >
                        <FaDownload />
                      </button>
                    </div>
                  </div>

                  {/* Test Summary Card */}
                  <div className="bg-card border border-app rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">
                          {result.tests?.framework || testFramework}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Framework
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">
                          {result.tests?.coverage_areas?.length || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Coverage Areas
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">
                          {result.tests?.code
                            ? result.tests.code.split("\n").length
                            : 0}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Lines of Code
                        </div>
                      </div>
                    </div>
                  </div>

                  {result.tests?.description && (
                    <div className="bg-muted rounded-lg p-4">
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">
                        {result.tests.description}
                      </p>
                    </div>
                  )}

                  {/* Test Code Block */}
                  <div className="bg-card border border-app rounded-lg overflow-hidden">
                    <div className="bg-muted px-4 py-3 border-b border-app flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FaCode className="text-secondary" />
                        <span className="text-sm font-medium">
                          {result.tests?.framework || testFramework} Test Code
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            copyToClipboard(result.tests?.code || "")
                          }
                          className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors"
                        >
                          Copy Code
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <pre className="p-4 text-sm overflow-x-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                        <code className="language-javascript">
                          {result.tests?.code || "No test code generated"}
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* Coverage Areas */}
                  {result.tests?.coverage_areas?.length > 0 && (
                    <div className="bg-card border border-app rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center">
                        <FaVial className="mr-2 text-secondary" />
                        Test Coverage Areas
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {result.tests.coverage_areas.map((area, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-2 bg-muted rounded"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-muted-foreground">
                              {area}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "analysis" && result.analysis && (
                <div className="space-y-6">
                  {/* Metrics Overview */}
                  {result.metrics && (
                    <div className="bg-card border border-app rounded-lg p-4">
                      <h4 className="font-medium mb-4">
                        Quality Metrics Overview
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {result.metrics.maintainability_index || "N/A"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Maintainability Index
                          </div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">
                            {result.metrics.technical_debt_ratio || "N/A"}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Technical Debt
                          </div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {result.metrics.duplication_percentage || "N/A"}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Code Duplication
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Code Quality */}
                  {result.analysis.code_quality && (
                    <div className="bg-card border border-app rounded-lg p-4">
                      <h4 className="font-medium mb-3">
                        Code Quality Analysis
                      </h4>
                      <div className="space-y-3">
                        {renderScore(
                          result.analysis.code_quality.score,
                          "Overall Quality Score"
                        )}
                        {renderScore(
                          result.analysis.code_quality.readability,
                          "Readability"
                        )}
                        {renderScore(
                          result.analysis.code_quality.maintainability,
                          "Maintainability"
                        )}
                      </div>

                      {result.analysis.code_quality.issues?.length > 0 && (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium mb-2 text-red-600">
                            Issues Found
                          </h5>
                          <div className="space-y-2">
                            {result.analysis.code_quality.issues.map(
                              (issue, index) => (
                                <div
                                  key={index}
                                  className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700"
                                >
                                  {issue}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {result.analysis.code_quality.suggestions?.length > 0 && (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium mb-2 text-blue-600">
                            Suggestions
                          </h5>
                          <div className="space-y-2">
                            {result.analysis.code_quality.suggestions.map(
                              (suggestion, index) => (
                                <div
                                  key={index}
                                  className="p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700"
                                >
                                  {suggestion}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Complexity */}
                  {result.analysis.complexity && (
                    <div className="bg-card border border-app rounded-lg p-4">
                      <h4 className="font-medium mb-3">Complexity Analysis</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center p-3 bg-muted rounded">
                          <div className="text-lg font-bold text-secondary">
                            {result.analysis.complexity.cyclomatic_complexity}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Cyclomatic
                          </div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded">
                          <div className="text-lg font-bold text-secondary">
                            {result.analysis.complexity.lines_of_code}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Lines of Code
                          </div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded">
                          <div className="text-lg font-bold text-secondary">
                            {result.analysis.complexity.functions_count}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Functions
                          </div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded">
                          <div
                            className={`text-lg font-bold ${
                              result.analysis.complexity.complexity_rating ===
                              "low"
                                ? "text-green-600"
                                : result.analysis.complexity
                                    .complexity_rating === "medium"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {result.analysis.complexity.complexity_rating?.toUpperCase()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Rating
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security */}
                  {result.analysis.security && (
                    <div className="bg-card border border-app rounded-lg p-4">
                      <h4 className="font-medium mb-3">Security Analysis</h4>
                      {renderScore(
                        result.analysis.security.vulnerability_score,
                        "Security Score"
                      )}

                      {result.analysis.security.vulnerabilities?.length > 0 ? (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium mb-2 text-red-600">
                            Security Vulnerabilities
                          </h5>
                          <div className="space-y-2">
                            {result.analysis.security.vulnerabilities.map(
                              (vuln, index) => (
                                <div
                                  key={index}
                                  className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700"
                                >
                                  {vuln}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                          No security vulnerabilities detected
                        </div>
                      )}

                      {result.analysis.security.recommendations?.length > 0 && (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium mb-2 text-blue-600">
                            Security Recommendations
                          </h5>
                          <div className="space-y-2">
                            {result.analysis.security.recommendations.map(
                              (rec, index) => (
                                <div
                                  key={index}
                                  className="p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700"
                                >
                                  {rec}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Performance */}
                  {result.analysis.performance && (
                    <div className="bg-card border border-app rounded-lg p-4">
                      <h4 className="font-medium mb-3">Performance Analysis</h4>
                      {renderScore(
                        result.analysis.performance.performance_score,
                        "Performance Score"
                      )}

                      {result.analysis.performance.bottlenecks?.length > 0 && (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium mb-2 text-yellow-600">
                            Performance Bottlenecks
                          </h5>
                          <div className="space-y-2">
                            {result.analysis.performance.bottlenecks.map(
                              (bottleneck, index) => (
                                <div
                                  key={index}
                                  className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700"
                                >
                                  {bottleneck}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {result.analysis.performance.optimizations?.length >
                        0 && (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium mb-2 text-green-600">
                            Optimization Suggestions
                          </h5>
                          <div className="space-y-2">
                            {result.analysis.performance.optimizations.map(
                              (opt, index) => (
                                <div
                                  key={index}
                                  className="p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700"
                                >
                                  {opt}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Best Practices */}
                  {result.analysis.best_practices && (
                    <div className="bg-card border border-app rounded-lg p-4">
                      <h4 className="font-medium mb-3">
                        Best Practices Analysis
                      </h4>
                      {renderScore(
                        result.analysis.best_practices.score,
                        "Best Practices Score"
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {result.analysis.best_practices.followed?.length >
                          0 && (
                          <div>
                            <h5 className="text-sm font-medium mb-2 text-green-600">
                              Practices Followed
                            </h5>
                            <div className="space-y-1">
                              {result.analysis.best_practices.followed.map(
                                (practice, index) => (
                                  <div
                                    key={index}
                                    className="text-sm text-green-600 flex items-center"
                                  >
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                    {practice}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {result.analysis.best_practices.violations?.length >
                          0 && (
                          <div>
                            <h5 className="text-sm font-medium mb-2 text-red-600">
                              Violations Found
                            </h5>
                            <div className="space-y-1">
                              {result.analysis.best_practices.violations.map(
                                (violation, index) => (
                                  <div
                                    key={index}
                                    className="text-sm text-red-600 flex items-center"
                                  >
                                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                    {violation}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {result.analysis.best_practices.recommendations?.length >
                        0 && (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium mb-2 text-blue-600">
                            Recommendations
                          </h5>
                          <div className="space-y-2">
                            {result.analysis.best_practices.recommendations.map(
                              (rec, index) => (
                                <div
                                  key={index}
                                  className="p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700"
                                >
                                  {rec}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "suggestions" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Improvement Suggestions
                  </h3>
                  {result.suggestions?.length > 0 ? (
                    <div className="space-y-4">
                      {result.suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="bg-card border border-app rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                                    suggestion.priority === "high"
                                      ? "bg-red-100 text-red-700"
                                      : suggestion.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-blue-100 text-blue-700"
                                  }`}
                                >
                                  {suggestion.priority}
                                </span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                  {suggestion.type}
                                </span>
                              </div>
                              <h4 className="font-medium mb-2">
                                {suggestion.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                {suggestion.description}
                              </p>

                              {suggestion.code_example && (
                                <div className="bg-muted rounded p-3">
                                  <pre className="text-sm overflow-x-auto">
                                    <code>{suggestion.code_example}</code>
                                  </pre>
                                </div>
                              )}

                              {suggestion.line_numbers?.length > 0 && (
                                <div className="mt-2">
                                  <span className="text-xs text-muted-foreground">
                                    Lines: {suggestion.line_numbers.join(", ")}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        No suggestions available
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "raw" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Raw JSON Response</h3>
                    <button
                      onClick={() =>
                        copyToClipboard(JSON.stringify(result, null, 2))
                      }
                      className="p-2 text-muted-foreground hover:text-app transition-colors"
                      title="Copy JSON to clipboard"
                    >
                      <FaCopy />
                    </button>
                  </div>

                  <div className="bg-card border border-app rounded-lg overflow-hidden">
                    <div className="bg-muted px-4 py-2 border-b border-app">
                      <span className="text-sm font-medium">
                        JSON Structure
                      </span>
                    </div>
                    <pre className="p-4 text-sm overflow-x-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 max-h-96 overflow-y-auto">
                      <code className="language-json">
                        {JSON.stringify(result, null, 2)}
                      </code>
                    </pre>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 mb-2">
                      Debug Information
                    </h4>
                    <p className="text-sm text-yellow-700">
                      This tab shows the raw JSON structure received from the
                      API. Use this for debugging response format issues or to
                      understand the complete data structure.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-center space-x-2">
            {toast.type === "success" ? (
              <div className="w-5 h-5 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                ✓
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                ✕
              </div>
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestGeneration;

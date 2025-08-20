"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Copy, Download, RefreshCw, Zap, BookOpen, Clock, Moon, Sun } from "lucide-react";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [wordCount, setWordCount] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setWordCount(newText.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const handleSummarize = async () => {
    if (!text) return;
    setLoading(true);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setSummary(data.summary || "No summary generated.");
    } catch (err) {
      console.error("Error:", err);
      setSummary("Something went wrong.");
    }

    setLoading(false);
  };

  const handleCopy = async () => {
    if (!summary) return;
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
    setSummary("");
    setWordCount(0);
  };

  const estimatedReadTime = Math.ceil(wordCount / 200);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          onClick={toggleDarkMode}
          variant="ghost"
          size="sm"
          className={`p-3 rounded-full transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400 hover:text-yellow-300' 
              : 'bg-white/50 hover:bg-white/70 text-gray-700 hover:text-gray-900'
          } backdrop-blur-sm shadow-lg`}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>
      {/* Header */}
      <header className="pt-8 pb-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2`}>
          AI Summarizer
        </h1>
        <p className={`text-lg max-w-md mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Transform lengthy articles into concise, actionable summaries in seconds
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className={`shadow-xl border-0 transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/80 backdrop-blur-sm' 
              : 'bg-white/80 backdrop-blur-sm'
          }`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                    <FileText className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <CardTitle className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    Input Text
                  </CardTitle>
                </div>
                {text && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Textarea
                  rows={12}
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Paste your article, research paper, blog post, or any text you'd like to summarize here..."
                  className={`resize-none border-2 transition-colors duration-200 leading-relaxed ${
                    isDarkMode 
                      ? 'border-gray-600 focus:border-blue-400 bg-gray-700/50 text-gray-100 placeholder:text-gray-400' 
                      : 'border-gray-200 focus:border-blue-400 text-gray-700 placeholder:text-gray-500'
                  }`}
                />
                <div className={`absolute bottom-3 right-3 text-xs px-2 py-1 rounded ${
                  isDarkMode 
                    ? 'text-gray-400 bg-gray-800' 
                    : 'text-gray-400 bg-white'
                }`}>
                  {text.length > 0 && `${text.length} chars`}
                </div>
              </div>
              
              {/* Stats */}
              {wordCount > 0 && (
                <div className={`flex items-center gap-6 text-sm pt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{wordCount} words</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>~{estimatedReadTime} min read</span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleSummarize}
                disabled={loading || !text.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Analyzing & Summarizing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    <span>Generate Summary</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className={`shadow-xl border-0 transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/80 backdrop-blur-sm' 
              : 'bg-white/80 backdrop-blur-sm'
          }`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'}`}>
                    <Sparkles className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                  <CardTitle className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    AI Summary
                  </CardTitle>
                </div>
                {summary && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!summary && !loading && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-gray-700 to-gray-600' 
                      : 'bg-gradient-to-r from-gray-200 to-gray-300'
                  }`}>
                    <FileText className={`w-10 h-10 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    No summary yet
                  </h3>
                  <p className={`max-w-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Enter your text and click "Generate Summary" to see AI-powered insights appear here.
                  </p>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    AI is working...
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Analyzing your text and generating a concise summary
                  </p>
                </div>
              )}

              {summary && !loading && (
                <div className="space-y-4">
                  <div className={`rounded-xl p-6 border-l-4 border-blue-400 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-gray-700/50 to-gray-600/50' 
                      : 'bg-gradient-to-r from-blue-50 to-purple-50'
                  }`}>
                    <p className={`leading-relaxed text-base ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                      {summary}
                    </p>
                  </div>
                  
                  <div className={`flex items-center justify-between text-xs pt-2 border-t ${
                    isDarkMode 
                      ? 'text-gray-400 border-gray-600' 
                      : 'text-gray-500 border-gray-200'
                  }`}>
                    <span>Summary generated by AI</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        
      </main>
    </div>
  );
}
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface AIResponseProps {
  response: string;
}

const AICodeResponse: React.FC<AIResponseProps> = ({ response }) => {
  // Extract code blocks from the response
  const extractCodeBlocks = (text: string) => {
    const parts = [];
    let currentIndex = 0;

    // Regular expression to match code blocks with language specification
    const codeBlockRegex = /```([a-zA-Z0-9]+)?\n([\s\S]*?)\n```/g;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > currentIndex) {
        parts.push({
          type: "text",
          content: text.slice(currentIndex, match.index),
        });
      }

      // Add code block
      parts.push({
        type: "code",
        language: match[1] || "plaintext",
        content: match[2],
      });

      currentIndex = match.index + match[0].length;
    }

    // Add remaining text after last code block
    if (currentIndex < text.length) {
      parts.push({
        type: "text",
        content: text.slice(currentIndex),
      });
    }

    return parts;
  };

  const responseParts = extractCodeBlocks(response);

  return (
    <div className="ai-response-container max-w-4xl mx-auto my-8 p-4  rounded-lg ">
      {responseParts.map((part, index) => (
        <div key={index} className="mb-4">
          {part.type === "text" ? (
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: formatMarkdown(part.content) }}
            />
          ) : (
            <div className="relative">
              <div className="flex justify-between items-center bg-gray-800 text-white px-4 py-2 rounded-t-md">
                <span className="text-sm font-mono">{part.language}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(part.content)}
                  className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                >
                  Copy
                </button>
              </div>
              <SyntaxHighlighter
                language={part.language}
                style={vscDarkPlus}
                className="rounded-b-md"
                customStyle={{
                  margin: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}
              >
                {part.content}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Helper function to format markdown text
const formatMarkdown = (text: string) => {
  // This is a simplified markdown parser
  // For a real app, consider using a proper markdown library like marked

  // Handle headings
  text = text.replace(/###\s(.*)/g, "<h3>$1</h3>");
  text = text.replace(/##\s(.*)/g, "<h2>$1</h2>");
  text = text.replace(/#\s(.*)/g, "<h1>$1</h1>");

  // Handle bold
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Handle italic
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Handle lists
  text = text.replace(/^\s*-\s(.*)$/gm, "<li>$1</li>");

  // Handle paragraphs
  text = text.replace(/(?:\r\n|\r|\n){2,}/g, "</p><p>");
  text = "<p>" + text + "</p>";

  // Clean up any empty paragraphs
  text = text.replace(/<p><\/p>/g, "");

  return text;
};

export default AICodeResponse;

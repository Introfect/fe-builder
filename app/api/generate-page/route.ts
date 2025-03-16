import fs from "fs";
import path from "path";
import { mkdir } from "fs/promises";
import OpenAI from "openai";

function extractCodeOnly(input: string) {
  // Look for code blocks that start with triple backticks and optional language indicator
  const codeRegex = /```(?:\w+)?\n([\s\S]*?)```/;

  // Execute the regex to find the code block
  const match = input.match(codeRegex);

  // Return the code if found, otherwise return empty string
  return match ? match[1] : "";
}

// Example usage
function getOnlyCode(input: string) {
  const code = extractCodeOnly(input);
  return code;
}

function extractComponentName(codeString: string) {
  // Pattern to match component declarations like "const ComponentName: React.FC = () => {"
  const constComponentRegex = /const\s+([A-Za-z0-9_]+)\s*:\s*React\.FC\s*=/;

  // Pattern to match class component declarations like "class ComponentName extends React.Component"
  const classComponentRegex =
    /class\s+([A-Za-z0-9_]+)\s+extends\s+React\.Component/;

  // Pattern to match function declarations like "function ComponentName()"
  const functionComponentRegex = /function\s+([A-Za-z0-9_]+)\s*\(/;

  // Try to find a match using the patterns
  const constMatch = codeString.match(constComponentRegex);
  const classMatch = codeString.match(classComponentRegex);
  const functionMatch = codeString.match(functionComponentRegex);

  // Return the first matched component name
  if (constMatch && constMatch[1]) {
    return constMatch[1];
  } else if (classMatch && classMatch[1]) {
    return classMatch[1];
  } else if (functionMatch && functionMatch[1]) {
    return functionMatch[1];
  }

  // Also check for default export statements to handle cases where component name might be there
  const defaultExportRegex = /export\s+default\s+([A-Za-z0-9_]+)/;
  const exportMatch = codeString.match(defaultExportRegex);

  if (exportMatch && exportMatch[1]) {
    return exportMatch[1];
  }

  // If no component name is found
  return null;
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getNewPageCode({ userPrompt }: { userPrompt: string }) {
  await openai.beta.threads.messages.create(process.env.ASSISTANT_THREAD_ID!, {
    role: "user",
    content: userPrompt,
  });

  const run = await openai.beta.threads.runs.create(
    process.env.ASSISTANT_THREAD_ID!,
    {
      assistant_id: process.env.ASSISTANT_ID!,
    }
  );

  let runStatus = run;

  while (runStatus.status === "queued" || runStatus.status === "in_progress") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    runStatus = await openai.beta.threads.runs.retrieve(
      process.env.ASSISTANT_THREAD_ID!,
      run.id
    );
  }

  const messages = await openai.beta.threads.messages.list(
    process.env.ASSISTANT_THREAD_ID!
  );

  const assistantMessage = messages.data.find(
    (msg) => msg.role === "assistant"
  );

  if (assistantMessage) {
    // @ts-expect-error
    return getOnlyCode(assistantMessage.content[0].text.value);
  } else {
    console.log("No assistant response found.");
  }
}

export async function POST(req: Request) {
  const { pageName } = await req.json();
  console.log(pageName);
  const newPageCode = await getNewPageCode({ userPrompt: pageName });

  const componentName = extractComponentName(newPageCode ?? "");
  if (!componentName) {
    return;
  }
  const formattedName = componentName.replace(/\s+/g, " ");

  const dirPath = path.join(process.cwd(), "app", formattedName);
  try {
    await mkdir(dirPath, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EXIST") {
      return new Response(
        JSON.stringify({ ok: false, error: "Failed to create directory" })
      );
    }
  }

  const filePath = path.join(dirPath, `page.tsx`);
  try {
    fs.writeFileSync(filePath, newPageCode!);

    return new Response(
      JSON.stringify({
        ok: true,
        data: {
          message: `Page ${formattedName} created successfully!`,
          route: `New page generated `,
        },
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, error: "Failed to write a filed" })
    );
  }
}

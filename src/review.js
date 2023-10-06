import { getOpenAICompletion } from "./getOpenAICompletion.js";
import { criterias } from "../criterias/index.js";
import { memory_logs } from "./memory_logs.js";
import { react_style_guide_rules } from "../rules/react_style_guide_rules.js";

export async function review(pullRequest) {
  memory_logs.push("Requesting PR files changes");
  const filesChanges = await pullRequest.getFilesChanged();

  const reviewComments = await getReviewComments(filesChanges);
  memory_logs.push("Review comments: " + JSON.stringify(reviewComments));

  return Promise.all(
    reviewComments.map((comment) => pullRequest.createReviewComment(comment))
  );
}

async function getReviewComments(filesChanges) {
  const assistant_behavior = {
    role: "system",
    content: `You are a code reviewer assistant that evaluates if a code change is following certain coding rules.
    To obtain the coding rules, you must use the function get_coding_rules_to_evaluate.
    Your response MUST be a JSON with feedback following this structure [{"filename":"","line":0,"comment":""}]. 
    You MUST use ONLY the rules you receive, be accurate determining violations from given list.
    The comment should explain why it's violating the rule in this line number and you should propose a change to follow the rule.
    If you don't have any comment or the rule doesn't make sense for these changes, return an empty array [].
    You must select the most accurate line number for your feedback.`
  };
  const user_message = {
    role: "user",
    content: `A programmer is proposing this code change: ${JSON.stringify(
      filesChanges
    )}`
  };
  const reviewCommentsJSON = await getOpenAICompletion({
    messages: [assistant_behavior, user_message],
    functions
  });
  return JSON.parse(reviewCommentsJSON);
}

const functions = [
  {
    name: "get_coding_rules_to_evaluate",
    description: "Gets the rules for a file extension and framework detected",
    parameters: {
      type: "object",
      properties: {
        language: {
          type: "string",
          description:
            "Programming language, can be 'javascript' or 'typescript'"
        },
        framework: {
          type: "string",
          description:
            "The framework used, can be 'react', 'angular' or 'vuejs'"
        }
      },
      required: ["language", "framework"]
    },
    fn: async ({ language, framework }) => {
      memory_logs.push(
        `Calling the function to obtain rules for language ${language} and framework ${framework} `
      );

      if (language === "javascript" && framework === "react") {
        return JSON.stringify(react_style_guide_rules);
      }
    }
  }
];

import { Conversation } from "@helpscout/javascript-sdk";

export const generateIssueBody = (body: string, conversation: Conversation): string => {
  // This is markdown, so whitespace is significant
  return `
## Report
${body}

## References
[HS-${conversation?.id}](https://secure.helpscout.net/conversation/${conversation?.id}/${conversation?.number})
  `;
};
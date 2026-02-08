export const summarizePrompt = (content: string) => `
Summarize the following content into a concise, creator-friendly summary.

Rules:
- Preserve core ideas
- Remove fluff
- Write in simple language
- Max 6 bullet points

Content:
${content}
`;

export const scriptPrompt = (summary: string) => `
Using the summary below, write a short-form video script.

Rules:
- Duration: 30 to 45 seconds
- Conversational tone
- Strong hook in first 2 lines
- Clear ending CTA
- No emojis

Summary:
${summary}
`;

export const storyboardPrompt = (script: string) => `
Convert the script into a storyboard.

Return JSON ONLY in the following format:

{
  "scenes": [
    {
      "scene": 1,
      "visual_description": "Description of what appears on screen",
      "narration": "Exact voiceover text"
    }
  ]
}

Rules:
- 4 to 6 scenes
- Visuals must be generatable images
- Avoid abstract concepts

Script:
${script}
`;

export const imagePrompt = (description: string) => `
Generate a high-quality cinematic image.

Style:
- Clean
- Modern
- Minimal
- No text in image

Scene description:
${description}
`;


const tools = {
  caption: (topic, platform, tone) =>
    `Create a ${tone} ${platform} caption about ${topic}. Make it engaging and encourage interaction.`,
  hashtags: (topic, platform) =>
    `#${topic.replace(/\s+/g, "")} #${platform} #ContentCreator #Trending #Explore`,
  ideas: (topic, platform) =>
    `1. 5 surprising facts about ${topic}\n2. Common mistakes about ${topic}\n3. Things nobody tells you about ${topic}\n4. Beginner's guide to ${topic}\n5. Myths vs facts about ${topic}`,
  title: (topic, platform) =>
    `You Won't Believe These Facts About ${topic}!`
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const generateBtn = document.querySelector("#generateBtn");
  const output = document.querySelector("#result");
  const copyBtn = document.querySelector("#copyBtn");

  if (generateBtn) {
    generateBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const topic = document.querySelector("#topic")?.value.trim();
      const platform = document.querySelector("#platform")?.value || "Instagram";
      const tone = document.querySelector("#tone")?.value || "Engaging";
      const tool = document.querySelector("#tool")?.value || "caption";

      if (!topic) {
        alert("Please enter a topic first.");
        return;
      }

      const result = tools[tool]
        ? tool === "caption" ? tools[tool](topic, platform, tone)
        : tools[tool](topic, platform)
        : tools.caption(topic, platform, tone);

      if (output) output.textContent = result;
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      if (output) {
        await navigator.clipboard.writeText(output.textContent);
        copyBtn.textContent = "Copied!";
      }
    });
  }
});

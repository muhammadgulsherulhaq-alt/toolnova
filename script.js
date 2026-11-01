
const tools = {
  caption: (topic, platform, tone) =>
    `Here is a ${tone.toLowerCase()} caption for ${platform} about ${topic}: ${topic} deserves the spotlight! Share your thoughts below and join the conversation.`,

  hashtags: (topic, platform) =>
    `#${topic.replace(/\s+/g, "")} #${platform.replace(/\s+/g, "")} #ContentCreator #SocialMedia #Explore`,

  ideas: (topic) =>
    `1. 5 surprising facts about ${topic}\n2. Common mistakes people make about ${topic}\n3. Beginner's guide to ${topic}\n4. Myths vs facts about ${topic}\n5. Things nobody tells you about ${topic}`,

  titles: (topic) =>
    `1. The Truth About ${topic}\n2. 5 Things You Should Know About ${topic}\n3. What Nobody Tells You About ${topic}\n4. This Changes Everything About ${topic}\n5. Surprising Facts About ${topic}`
};

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("tool-modal");
  const closeBtn = document.getElementById("modal-close");
  const title = document.getElementById("modal-title");
  const description = document.getElementById("modal-description");
  const topic = document.getElementById("topic-input");
  const platform = document.getElementById("platform-input");
  const tone = document.getElementById("tone-input");
  const generateBtn = document.getElementById("generate-button");
  const resultArea = document.getElementById("result-area");

  let selectedTool = "caption";

  const details = {
    caption: ["Caption Generator", "Create a caption for your social media post."],
    hashtags: ["Hashtag Ideas", "Find hashtags for your topic."],
    ideas: ["Content Ideas", "Discover fresh content ideas."],
    titles: ["Video Title Generator", "Create interesting video titles."]
  };

  document.querySelectorAll("[data-tool]").forEach(button => {
    button.addEventListener("click", () => {
      selectedTool = button.dataset.tool;

      title.textContent = details[selectedTool][0];
      description.textContent = details[selectedTool][1];

      topic.value = "";
      resultArea.innerHTML =
        '<div class="result-placeholder">Your result will appear here.</div>';

      modal.hidden = false;
      topic.focus();
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.hidden = true;
  });

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.hidden = true;
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      modal.hidden = true;
    }
  });

  generateBtn.addEventListener("click", () => {
    const subject = topic.value.trim();

    if (!subject) {
      alert("Please enter a topic first.");
      topic.focus();
      return;
    }

    let output;

    if (selectedTool === "caption") {
      output = tools.caption(subject, platform.value, tone.value);
    } else if (selectedTool === "hashtags") {
      output = tools.hashtags(subject, platform.value);
    } else {
      output = tools[selectedTool](subject);
    }

    resultArea.innerHTML = "";

    const resultText = document.createElement("p");
    resultText.textContent = output;
    resultArea.appendChild(resultText);

    const copyButton = document.createElement("button");
    copyButton.className = "button button-primary";
    copyButton.textContent = "Copy Result";

    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(output);
        copyButton.textContent = "Copied!";
      } catch {
        copyButton.textContent = "Please copy manually";
      }
    });

    resultArea.appendChild(copyButton);
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
   

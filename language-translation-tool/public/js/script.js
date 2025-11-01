const translateBtn = document.getElementById("translateBtn");
const inputText = document.getElementById("inputText");
const translatedText = document.getElementById("translatedText");
const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");
const copyBtn = document.getElementById("copyBtn");
const speakBtn = document.getElementById("speakBtn");

translateBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();
  const source = sourceLang.value;
  const target = targetLang.value;

  if (!text) return alert("Please enter text!");

  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, source, target }),
    });
    const data = await res.json();
    translatedText.textContent = data.translatedText;
  } catch (e) {
    alert("Translation failed!");
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(translatedText.textContent);
  alert("Copied!");
});

speakBtn.addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(translatedText.textContent);
  utterance.lang = targetLang.value;
  speechSynthesis.speak(utterance);
});

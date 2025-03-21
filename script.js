document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const chatContainer = document.getElementById("chat-container");
  const resetBtn = document.getElementById("reset-btn");
  const downloadBtn = document.getElementById("download-btn");
  const languageSelector = document.getElementById("language");

  let selectedLanguage = languageSelector.value;

  const baseSystemMessage = {
    es: "Eres CodeConnect, un asistente experto en desarrollo web, con lenguaje claro, amigable y profesional. Tu objetivo es ayudar a emprendedores, pymes y clientes con poca experiencia técnica a construir y mejorar su presencia online. Responde siempre en español. Usa markdown bien formateado con encabezados, negritas, listas y bloques de código (```html).",
    en: "You are CodeConnect, a web development assistant with a clear, friendly, and professional tone. Your goal is to help entrepreneurs and small businesses improve their online presence. Always reply in English. Use well-structured markdown with headers, bold, lists, and code blocks (```html)."
  };

  // 💬 Inicializar con system message
  const messages = [{
    role: "system",
    content: baseSystemMessage[selectedLanguage]
  }];

  // 🔁 Restaurar historial al cargar (sin sobrescribir el system)
  const saved = localStorage.getItem("codeconnect_chat");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      parsed.forEach((msg) => {
        messages.push(msg);
        addMessage(msg.role, msg.content);
      });
    } catch (e) {
      console.error("❌ Error cargando historial:", e);
    }
  }

  // 🌐 Cambiar idioma dinámicamente
  languageSelector.addEventListener("change", () => {
    selectedLanguage = languageSelector.value;
    messages[0].content = baseSystemMessage[selectedLanguage];
  });

  // Añadir mensaje al chat y guardar
  function addMessage(role, content) {
    const div = document.createElement("div");
    div.className = `message ${role}`;

    if (role === "assistant") {
      div.innerHTML = `<div class="respuesta-formateada">${formatearRespuesta(content)}</div>`;
    } else {
      div.innerHTML = `<pre>${content}</pre>`;
    }

    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 💾 Guardar historial (solo user + assistant)
    try {
      const chatGuardado = messages.filter(m => m.role !== "system");
      localStorage.setItem("codeconnect_chat", JSON.stringify(chatGuardado));
    } catch (err) {
      console.warn("⚠️ No se pudo guardar el historial:", err);
    }

    // 📋 Botón copiar en bloques de código
    setTimeout(() => {
      document.querySelectorAll(".respuesta-formateada pre").forEach((block) => {
        if (block.querySelector(".copy-btn")) return;

        const btn = document.createElement("button");
        btn.className = "copy-btn";
        btn.textContent = "📋";
        btn.title = "Copiar código";

        btn.onclick = () => {
          const code = block.querySelector("code");
          if (!code) return;
          navigator.clipboard.writeText(code.innerText).then(() => {
            btn.textContent = "✅";
            setTimeout(() => (btn.textContent = "📋"), 1500);
          });
        };

        block.appendChild(btn);
        block.style.position = "relative";
      });
    }, 100);
  }

  // Formatear texto con markdown seguro
  function formatearRespuesta(texto) {
    if (!texto || typeof texto !== "string") return "";

    const limpio = texto
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<link[^>]*>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '');

    const escapado = limpio
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return escapado
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\n/g, '<br>');
  }

  // Envío de mensaje
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const textarea = form.querySelector("textarea");
    const userText = textarea.value.trim();
    if (!userText) return;

    messages.push({ role: "user", content: userText });
    addMessage("user", userText);
    textarea.value = "";

    const pending = document.createElement("div");
    pending.className = "message assistant";
    pending.innerHTML = `<div class="respuesta-formateada"><em>... escribiendo ...</em></div>`;
    chatContainer.appendChild(pending);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages })
      });

      const data = await response.json();

      if (response.ok) {
        messages.push({ role: "assistant", content: data.response });
        pending.innerHTML = `<div class="respuesta-formateada">${formatearRespuesta(data.response)}</div>`;
      } else {
        pending.innerHTML = `<pre style="color:red;">❌ ${data.error}</pre>`;
      }
    } catch (err) {
      pending.innerHTML = `<pre style="color:red;">❌ ${err.message}</pre>`;
    }
  });

  // 🗑 Resetear conversación
  resetBtn.addEventListener("click", () => {
    messages.length = 1;
    messages[0].content = baseSystemMessage[selectedLanguage];
    chatContainer.innerHTML = "";
    localStorage.removeItem("codeconnect_chat");
  });

  // 📥 Descargar conversación
  downloadBtn.addEventListener("click", () => {
    if (messages.length <= 1) {
      alert("No hay conversación para descargar.");
      return;
    }

    let texto = "💬 RESUMEN DE LA CONVERSACIÓN\n\n";
    messages.forEach(msg => {
      if (msg.role === "system") return;
      const autor = msg.role === "user" ? "🧑 Usuario" : "🤖 Asistente";
      texto += `${autor}:\n${msg.content}\n\n`;
    });

    const blob = new Blob([texto], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resumen_codeconnect.txt";
    a.click();
    URL.revokeObjectURL(url);
  });
});

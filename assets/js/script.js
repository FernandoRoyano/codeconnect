document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const chatContainer = document.getElementById("chat-container");
  const resetBtn = document.getElementById("reset-btn");
  const downloadBtn = document.getElementById("download-btn");
  const languageSelector = document.getElementById("language");
  const uploadBtn = document.getElementById("upload-btn");
  const fileStatus = document.getElementById("file-status");
  const themeToggle = document.getElementById("theme-toggle");

  // Registro
  const authModal = document.getElementById("auth-modal");
  const authSubmit = document.getElementById("auth-submit");
  const probarGratisBtn = document.querySelector(".plan.free .btn");

  probarGratisBtn.addEventListener("click", (e) => {
    e.preventDefault();
    authModal.style.display = "flex";
  });

  form.querySelector("button[type='submit']").disabled = true;

  function checkLogin() {
    const user = JSON.parse(localStorage.getItem("codeconnect_user"));
    if (!user) {
      authModal.style.display = "flex";
    } else {
      authModal.style.display = "none";
      form.querySelector("button[type='submit']").disabled = false;
    }
  }

  authSubmit.addEventListener("click", () => {
    const name = document.getElementById("auth-name").value.trim();
    const email = document.getElementById("auth-email").value.trim();
    const password = document.getElementById("auth-password").value;

    if (!name || !email || !password) {
      alert("Completa todos los campos");
      return;
    }

    const user = { name, email };
    localStorage.setItem("codeconnect_user", JSON.stringify(user));
    authModal.style.display = "none";
    form.querySelector("button[type='submit']").disabled = false;
    alert(`¡Bienvenido, ${name}! Ya puedes usar el asistente.`);
  });

  checkLogin();

  // Tema
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      themeToggle.textContent = isLight ? "🌙 Tema oscuro" : "☀️ Tema claro";
    });
  }

  let selectedLanguage = languageSelector.value;

  const baseSystemMessage = {
    es: "Eres CodeConnect, un asistente experto en desarrollo web...",
    en: "You are CodeConnect, a web development assistant..."
  };

  const messages = [
    { role: "system", content: baseSystemMessage[selectedLanguage] }
  ];

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

  languageSelector.addEventListener("change", () => {
    selectedLanguage = languageSelector.value;
    messages[0].content = baseSystemMessage[selectedLanguage];
  });

  function addMessage(role, content) {
    const div = document.createElement("div");
    div.className = `message ${role}`;
    div.innerHTML = role === "assistant"
      ? `<div class="respuesta-formateada">${formatearRespuesta(content)}</div>`
      : `<pre>${content}</pre>`;
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
      const chatGuardado = messages.filter(m => m.role !== "system");
      localStorage.setItem("codeconnect_chat", JSON.stringify(chatGuardado));
    } catch (err) {
      console.warn("⚠️ No se pudo guardar el historial:", err);
    }

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

  function formatearRespuesta(texto) {
    if (!texto || typeof texto !== "string") return "";
    const limpio = texto
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<link[^>]*>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '');
    const escapado = limpio.replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

  resetBtn.addEventListener("click", () => {
    messages.length = 1;
    messages[0].content = baseSystemMessage[selectedLanguage];
    chatContainer.innerHTML = "";
    localStorage.removeItem("codeconnect_chat");
  });

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

    const blobTxt = new Blob([texto], { type: "text/plain" });
    const urlTxt = URL.createObjectURL(blobTxt);
    const aTxt = document.createElement("a");
    aTxt.href = urlTxt;
    aTxt.download = "resumen_codeconnect.txt";
    aTxt.click();
    URL.revokeObjectURL(urlTxt);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const lineas = texto.split("\n");
    let y = 10;

    doc.setFont("courier", "normal");
    doc.setFontSize(12);
    lineas.forEach((linea) => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(linea, 10, y);
      y += 7;
    });

    doc.save("resumen_codeconnect.pdf");
  });

  uploadBtn.addEventListener("click", async () => {
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    fileStatus.textContent = "⏳ Subiendo archivo...";

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      if (res.ok) {
        fileStatus.textContent = "✅ Documento cargado como contexto.";
        addMessage("assistant", `📎 Documento cargado: **${file.name}**\nEste contenido se usará como referencia.`);
        messages.push({
          role: "system",
          content: `📄 Documento "${file.name}" subido por el usuario. Contenido:\n${data.content}`
        });
      } else {
        fileStatus.textContent = "❌ Error: " + data.error;
      }
    } catch (err) {
      fileStatus.textContent = "❌ Error de conexión con el servidor.";
    }
  });
});

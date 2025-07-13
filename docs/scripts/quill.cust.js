
document.addEventListener("DOMContentLoaded", function () {
  var quill = new Quill("#editor", {
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        ["link", "blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
      ],
    },
    placeholder: "Compose an epic...",
  });

  // Automatically adjust editor height on mobile devices
  function adjustEditorHeight() {
    var editorElement = document.querySelector("#editor");
    if (window.innerWidth <= 600) {
      editorElement.style.height = window.innerHeight - 100 + "px";
    } else {
      editorElement.style.height = "400px";
    }
  }

  window.addEventListener("resize", adjustEditorHeight);
  adjustEditorHeight();

  function loadContentFromFile(fileName) {
    fetch(`assets/${fileName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((content) => {
        if (content && content.ops) {
          quill.setContents(content.ops);
        } else {
          throw new Error("Invalid content format");
        }
      })
      .catch((error) => {
        console.error("Error loading content:", error);
        // Fallback content in Delta format
        const fallbackContent = {
          ops: [
            { insert: "Welcome to Quill editor" },
            { attributes: { header: 1 }, insert: "\n" },
            { insert: "This is a fallback content. When running on a server, this will be replaced with content from the file.\n\n" },
            { insert: "You can edit this content." },
            { attributes: { list: "bullet" }, insert: "\n" },
            { insert: "Try out different formatting options." },
            { attributes: { list: "bullet" }, insert: "\n" },
            { insert: "Experiment with inserting images or links." },
            { attributes: { list: "bullet" }, insert: "\n" },
          ]
        };
        quill.setContents(fallbackContent.ops);
      });
  }

  // Load content after editor initialization
  loadContentFromFile("content.json");

  // New functionality: Log editor content on update
  quill.on("text-change", function () {
    console.log("Editor content updated:");
    console.log(JSON.stringify(quill.getContents())); // Delta format
  });
});
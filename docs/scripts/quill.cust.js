
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  var quill = new Quill("#editor", {
    theme: "snow",
    modules: {
      toolbar: [
        ['undo', 'redo']
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        ["blockquote", "code-block", "link", "image"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
      ],
      history: {          // Module to enable undo/redo functionality
        delay: 2000,
        maxStack: 500,
        userOnly: true
      }
    },
    placeholder: "Compose an epic...",
  });

  console.log("Quill initialized");

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
    console.log("Attempting to load content from:", fileName);
    fetch(`assets/${fileName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((content) => {
        console.log("Content loaded:", content);
        if (content && content.ops) {
          quill.setContents(content.ops);
          console.log("Content set in Quill editor");
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
        console.log("Fallback content set in Quill editor");
      });
  }

  // Load content after editor initialization
  loadContentFromFile("content.json");

  // New functionality: Log editor content on update
  quill.on("text-change", function () {
    console.log("Editor content updated:");
    console.log(JSON.stringify(quill.getContents())); // Delta format
  });

  // Add a small delay to ensure Quill is fully initialized
  setTimeout(() => {
    console.log("Current editor contents:");
    console.log(JSON.stringify(quill.getContents()));
  }, 1000);
});
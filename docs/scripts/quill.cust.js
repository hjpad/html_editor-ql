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
        return response.text();
      })
      .then((content) => {
        const delta = quill.clipboard.convert(content);
        quill.setContents(delta);
      })
      .catch((error) => {
        console.error("Error loading content:", error);
        // Fallback content in Delta format
        const fallbackContent = [
          { insert: "Welcome to Quill editor" },
          { attributes: { header: 1 }, insert: "\n" },
          {
            insert:
              "\nThis is a fallback content. When running on a server, this will be replaced with content from the file.\n\nYou can edit this content.",
          },
          { attributes: { list: "bullet" }, insert: "\n" },
          { insert: "Try out different formatting options." },
          { attributes: { list: "bullet" }, insert: "\n" },
          { insert: "Experiment with inserting images or links." },
          { attributes: { list: "bullet" }, insert: "\n" },
          {
            insert:
              "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
          },
          {
            insert:
              "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
          },
          {
            insert:
              "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
          },
          {
            insert:
              "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
          },
        ];
        quill.setContents(fallbackContent);
      });
  }

  // Load content after editor initialization
  loadContentFromFile("content.json");

  // New functionality: Log editor content on update
  quill.on("text-change", function () {
    console.log("Editor content updated:");
    console.log(JSON.stringify(quill.getContents())); // Delta format
    // console.log("HTML content:");
    // console.log(quill.root.innerHTML); // HTML format
  });
});

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

// Load content from file
fetch("/assets/example_content.txt")
  .then((response) => response.text())
  .then((content) => {
    quill.setText(content);
  })
  .catch((error) => {
    console.error("Error loading content:", error);
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

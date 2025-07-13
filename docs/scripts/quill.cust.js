
document.addEventListener('DOMContentLoaded', function() {
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
                quill.setText(content);
            })
            .catch((error) => {
                console.error("Error loading content:", error);
                // Fallback content
                const fallbackContent = `
                    <h1>Welcome to Quill editor</h1>
                    <p>This is a fallback content. When running on a server, this will be replaced with content from the file.</p>
                    <ul>
                        <li>You can edit this content.</li>
                        <li>Try out different formatting options.</li>
                        <li>Experiment with inserting images or links.</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                `;
                quill.root.innerHTML = fallbackContent;
            });
    }

    // Load content after editor initialization
    loadContentFromFile("content.html");
});
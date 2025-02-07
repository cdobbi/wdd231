document.addEventListener("DOMContentLoaded", () => {
    fetch("data/quilt.json") // Ensure this path is correct
      .then((response) => response.json())
      .then((data) => {
        const container = document.getElementById("articles-container");
        if (!container) {
          console.error("Error: articles-container element not found");
          return;
        }
        data.forEach((item, index) => {
          const article = document.createElement("article");
          article.style.setProperty("--index", index);
  
          const imgDiv = document.createElement("div");
          imgDiv.classList.add("article__img");
          const img = document.createElement("img");
          img.src = item.url;
          img.alt = item.title;
          imgDiv.appendChild(img);
  
          const infoDiv = document.createElement("div");
          infoDiv.classList.add("article__info");
          const h2 = document.createElement("h2");
          h2.textContent = item.title;
          const p = document.createElement("p");
          p.textContent = item.description;
          const a = document.createElement("a");
          a.href = item.link;
          a.textContent = item.linkText;
  
          infoDiv.appendChild(h2);
          infoDiv.appendChild(p);
          infoDiv.appendChild(a);
  
          article.appendChild(imgDiv);
          article.appendChild(infoDiv);
  
          container.appendChild(article);
        });
      })
      .catch((error) => console.error("Error loading images:", error));
  });
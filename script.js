const category = document.getElementById("category");
const cardSection = document.getElementById("card-section");
const emptySection = document.getElementById("empty-section");




const loadCategory = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    displayCategory(data.data);
    // console.log(data)
}
loadCategory();

const displayCategory = (data) => {

    data.forEach((data, index) => {
        const button = document.createElement("button");
        button.classList.add("btn", "fw-semibold", "bg-secondary", "nav-item");
        if (index === 0) {
            button.classList.add("bg-danger", "text-white");
        }
        button.textContent = data.category;
        button.onclick = () => {
          loadingData(data.category_id);
          activeNav(button);
        };
        category.appendChild(button);
      })
}


const activeNav = (ele) => {
    const items = document.getElementsByClassName("nav-item");
    for (let item of items) {
      item.classList.remove("bg-danger", "text-white");
    }
    ele.classList.add("bg-danger", "text-white");
  };





const loadingData = async (id) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    // console.log(data.data)
    displayData(data.data);
}

loadingData(1000); // it will load by default all category data

const displayData = (data) => {

    cardSection.innerHTML = "";

    if (data.length === 0) {
        emptySection.classList.remove("d-none");
        return;
      } else {
        emptySection.classList.add("d-none");
      }
      
    
    data.forEach((data) => {
        cardSection.innerHTML += `
        <div class="col">
            <div class="card h-100 border-0 position-relative">
              <img src="${data.thumbnail}" class="card-img-top rounded h-50" alt="...">
              ${
                data.others.posted_date && 
                `<p class="position-absolute end-0 me-1 bottom-50  rounded bg-secondary opacity-75 text-white ">${postedDate(data.others.posted_date)}</p>`
              }
              <div class="card-body p-0 mt-3">
                <div class="d-flex justify-content-between gap-3">
                    <div class="w-25">
                        <img src="${data.authors[0].profile_picture}" alt="" class="rounded-circle" width="40px" height="40px">
                    </div>
                    <div class="w-75">
                        <h5 class="card-title fw-bold">${data.title}</h5>
                        <p class="fw-semibold mb-0 text-secondary">${data.authors[0].profile_name} <span>${ data.authors[0].verified == true ? '<img src="./verified-badge.png" alt=""  height="20px" width="20px"></img>' : ''}</span></p>
                        <p class="fw-semibold text-secondary">${data.others.views} views</p>
                    </div>
                </div>
              </div>
            </div>
          </div>`;
})}


// converting seconds to hours and minutes
const postedDate = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    if (hours === 0) {
      return `${minutes} min ago`;
    } else if (minutes === 0) {
      return `${hours} hrs ago`;
    } else {
      return `${hours} hrs ${minutes} min ago`;
    }
  };

  // sorting data by views
  const sortByViews = (data) => {
      
    const sortedData = data.sort((a, b) => b.others.views - a.others.views);
    displayData(sortedData);
  }

  

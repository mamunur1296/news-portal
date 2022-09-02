
const makeRequest = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        const message = `Error : ${res.status}`;
        throw res.json();
    }
    const data = await res.json();
    return data;
}
const getData = () => {
    makeRequest(`https://openapi.programming-hero.com/api/news/categories`)
        .then((res) => displayData(res))
        .catch((err) => console.log(err))
};

const displayData = (dataa) => {
    const newses = dataa.data.news_category;
    const setCatagory = document.getElementById('set-catagory');
    const categoryNamees = [];
    newses.forEach(news => {
        if (categoryNamees.indexOf(news.category_name) === -1) {
            categoryNamees.push(news.category_name);
            const li = document.createElement('li');
            li.innerHTML = `
             <a onclick="getBreakingNews('${news.category_id}')" class="nav-link mx-4 active" aria-current="page" href="#">${news.category_name}</a>
            `;
            setCatagory.appendChild(li);
        }
    });
}
getData();
const getBreakingNews = (id) => {
    makeRequest(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then((res) => displayBreakingNews(res))
        .catch((err) => console.log(err))
};
const displayBreakingNews = allnews => {
    const newses = allnews.data;
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';
    const sarceRejult = document.getElementById('sarce-rejult').innerText = newses.length;
    console.log(sarceRejult);
    console.log(mainContainer.innerHTML);
    newses.forEach(news => {
        const maindiv = document.createElement("div");
        maindiv.classList = ('row my-5');
        maindiv.innerHTML = `
                    <div class="col-md-3">
                        <img src="${news.image_url ? news.image_url : "https://i.ibb.co/g9CSkZQ/image.png "}"
                            class="img-fluid my-img rounded-start" alt="...">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.details.length > 10 ? news.details.slice(0, 150) : "NO details"}</p>
                            <p class="card-text">${news.details.length > 150 ? news.details.slice(150, 400) + '...' : "NO details"}</p>
                            
                            <div class="d-flex align-items-center justify-content-between mt-5">
                                <div class="d-flex align-items-center">
                                    <div>
                                        <a class="navbar-brand " href="#">
                                            <img class="rounded-circle"
                                                src="${news.author.img ? news.author.img : "https://i.ibb.co/g9CSkZQ/image.png "}"
                                                alt="" width="40" height="40">
                                        </a>
                                    </div>
                                    <div>
                                        <div>${news.author.name ? news.author.name : "No data"}</div>
                                        <div>${news.author.published_date ? news.author.published_date : "No data"}</div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div class="h5">
                                        <i class="fa-regular fa-eye"></i>
                                    </div>
                                    <div class="ms-2">
                                        <h5>${news.total_view ? news.total_view : "No data"}</h5>
                                    </div>
                                </div>
                                <div>
                                    <i class="fa-solid fa-star-half-stroke"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                                <div>
                                    <button onclick="modalBodyById('${news._id}')" type="button" class="btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        mainContainer.appendChild(maindiv)
    })
}

const modalBodyById = (id) => {
    makeRequest(`https://openapi.programming-hero.com/api/news/${id}`)
        .then((res) => displaymodalBodyById(res))
        .catch((err) => console.log(err))
};
const displaymodalBodyById = (modals) => {
    const modal = modals.data[0];
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
                        <div class="card">
                            <img src="${modal.thumbnail_url ? modal.thumbnail_url : "https://i.ibb.co/g9CSkZQ/image.png "}" class="card-img-top"
                                alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${modal.title}</h5>
                                <div class="d-flex align-items-center justify-content-between my-5">
                                    <h6>author Name : ${modal.author.name ? modal.author.name : "No data"}</h6>
                                    <h6>${modal.author.published_date ? modal.author.published_date : "No data"}</h6>
                                </div>
                                <p class="card-text">${modal.details ? modal.details : "NO details"}</p>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="h5">
                                        view : ${modal.rating.badge ? modal.rating.badge : "NO details"}
                                    </div>
                                    <div class="ms-2">
                                        <h5> rating : ${modal.rating.number ? modal.rating.number : "NO details"}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
    `;
}
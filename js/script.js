
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
        .catch((err) => displayBreakingNews(err))
};
const displayBreakingNews = allnews => {
    const newses = allnews.data;
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';
    newses.forEach(news => {
        console.log(news);
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
                                        <div>${news.author.published_date}</div>
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
                                    <button type="button" class="btn btn-outline-primary">Primary <i
                                            class="fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        mainContainer.appendChild(maindiv)

    })

}
displayBreakingNews();
{/* <p class="card-text">${news.details.length > 270 ? news.details.slice(270, 500) + '...' : title}</p> */ }
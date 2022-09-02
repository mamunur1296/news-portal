
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
const getBreakingNews = (id) => {
    makeRequest(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then((res) => displayBreakingNews(res))
        .catch((err) => console.log(err))
};
const displayBreakingNews = brakingnews => {
    console.log(brakingnews);
}
getData();
// displayData();
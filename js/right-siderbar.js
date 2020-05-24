let newsList = []
let pageNumber = 1;
const apiKey = "0772b01374944094a2c6a39147e609b1"

const newsRenderTop = (resultlist) => {
  let newsHtml = resultlist.slice(0, 1).map(item =>
    `
    <div class="card-header blue lighten-3 z-depth-1" role="tab" id="newsHeadline1">
        <h5 class="mb-0 py-1">
            <a class="white-text" data-toggle="collapse" href="#newsCollapse1"
                aria-expanded="true" aria-controls="newsCollapse1">
                ${item.name}
            </a>
        </h5>
    </div>
    <div id="newsCollapse1" class="collapse show" role="tabpanel" aria-labelledby="newsHeadline1"
        data-parent="#trendingAccordion">
        <div class="card-body">
            <div class="row my-4">
                <div class="col-md-8">
                    <p class="">${item.description}</p>
                </div>
                <div class="col-md-4 mt-3 pt-2">
                    <div class="view z-depth-1">
                        <img src="${item.image.thumbnail.contentUrl}" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
    </div>

	`
  ).join('')

  document.getElementById("card1").innerHTML = newsHtml;

}

const newsRenderCollapse1 = (resultlist) => {
  let newsHtml = resultlist.slice(1, 2).map(item =>
    `
      <div class="card-header blue lighten-3 z-depth-1" role="tab" id="newsHeadline2">
          <h5 class="mb-0 py-1">
              <a class="collapsed white-text" data-toggle="collapse"
                  href="#newsCollapse2" aria-expanded="false" aria-controls="newsCollapse2">
                  ${item.name}
              </a>
          </h5>
      </div>
      <div id="newsCollapse2" class="collapse" role="tabpanel" aria-labelledby="newsHeadline2"
          data-parent="#trendingAccordion">
          <div class="card-body">
              <div class="row my-4">
                  <div class="col-md-8">
                      <p class="">${item.description}</p>
                  </div>
                  <div class="col-md-4 mt-3 pt-2">
                      <div class="view z-depth-1">
                        <img src="${item.image.thumbnail.contentUrl}" class="img-fluid">
                      </div>
                  </div>
              </div>
          </div>
      </div> 
    `
  ).join('')

  document.getElementById("card2").innerHTML = newsHtml;
}

const newsRenderCollapse2 = (resultlist) => {
  let newsHtml = resultlist.slice(2, 3).map(item =>
    `
      <div class="card-header blue lighten-3 z-depth-1" role="tab" id="newsHeadline3">
          <h5 class="mb-0 py-1">
              <a class="collapsed white-text" data-toggle="collapse"
                  href="#newsCollapse3" aria-expanded="false" aria-controls="newsCollapse3">
                  ${item.name}
              </a>
          </h5>
      </div>
      <div id="newsCollapse3" class="collapse" role="tabpanel" aria-labelledby="newsHeadline3"
          data-parent="#trendingAccordion">
          <div class="card-body">
              <div class="row my-4">
                  <div class="col-md-8">
                      <p class="">${item.description}</p>
                  </div>
                  <div class="col-md-4 mt-3 pt-2">
                      <div class="view z-depth-1">
                        <img src="${item.image.thumbnail.contentUrl}" class="img-fluid">
                      </div>
                  </div>
              </div>
          </div>
      </div> 
    `
  ).join('')

  document.getElementById("card3").innerHTML = newsHtml;
}

const loadNews = async () => {


  let result = await fetch("https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "microsoft-azure-bing-news-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "913937811dmsh031b5a6b695af0ap1662b8jsn4c186691c16a"
    }
  })

  let data = await result.json()
  console.log(data)
  newsRenderTop(data.value);
  newsRenderCollapse1(data.value);
  newsRenderCollapse2(data.value);
}
loadNews();










$(document).ready(function () {
  // executes when HTML-Document is loaded and DOM is ready
  console.log("document is ready");


  $(".list-group-flush").hover(
    function () {
      $(this).addClass('shadow-lg').css('cursor', 'pointer');
    }, function () {
      $(this).removeClass('shadow-lg');
    }
  );

  // document ready  
});



$('.share-btn').click(function () {
  $(this).addClass("clicked");
});
$('.close').click(function (e) {
  $('.clicked').removeClass('clicked');
  e.stopPropagation();
});




// function render(articles) {
//   return articles.reduce(function (result, article) {
//       result += `
//       <article>
//           <h2><a class="article-header" href="${article.url}">${article.title}</a></h2>
//           <div class="row">
//               <div class="col-md-4">
//                   <img class="img-fluid rounded mb-3" src="${article.img}"  />
//               </div>
//               <div class="col-md-8">
//                   <p class="date">${article.date}</p>
//                   <p class="author">by ${article.author}</p>
//                   <div>${article.description}</div>
//                   <a class="btn-more" href="${article.url}">Read More</a>
//               </div>
//           </div>
//       </article>		
//       `;
//       return result;
//   }, '');
// }

// function articleData(item) {
//   return {
//       url: item.newsSearchUrl,
//       title: item.name,
//       // author: item.author,
//       // date: item.publishedAt,
//       img: item.image.url ? item.image.url : null,
//       // description: item.description
//   };
// }
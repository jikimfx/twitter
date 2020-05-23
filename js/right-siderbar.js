let newsList =[]
let pageNumber=1;
const apiKey = "0772b01374944094a2c6a39147e609b1"

const render = (resultlist) =>{
  console.log("you call render list", resultlist)
     
  let newsHtml = resultlist.map(item =>
  
  `<div id="news">
  <div id="contentsArea">
     <div "id="title">${item.name}</div>
     
     
     
     
     
  </div>
  
 
  
  
</div>

`
  ).join('')


  console.log(newsHtml,"html")

document.getElementById("newsArea").innerHTML = newsHtml


}

const loadNews = async() =>{


let result= await  fetch("https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "microsoft-azure-bing-news-search-v1.p.rapidapi.com",
		"x-rapidapi-key": "913937811dmsh031b5a6b695af0ap1662b8jsn4c186691c16a"
	}
})

let data=await result.json()
console.log(data)
render(data.value
  )

   
}
loadNews();










$(document).ready(function() {
    // executes when HTML-Document is loaded and DOM is ready
   console.log("document is ready");
     
   
     $( ".list-group-flush" ).hover(
     function() {
       $(this).addClass('shadow-lg').css('cursor', 'pointer'); 
     }, function() {
       $(this).removeClass('shadow-lg');
     }
   );
     
   // document ready  
   });



   $('.share-btn').click(function(){
    $(this).addClass("clicked");
});
$('.close').click(function (e) {
  $('.clicked').removeClass('clicked');
  e.stopPropagation();
});  
   


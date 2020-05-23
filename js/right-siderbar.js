let newsList =[]
let pageNumber=1;
const apiKey = "0772b01374944094a2c6a39147e609b1"
const loadNews = async() =>{
    let url = `http://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`
    let data =  await fetch(url)
    let result =  await data.json();
    let resultList = result.articles
    newsList=newsList.concat(resultList)
    console.log("length of news",newsList.length)
    render(newsList)
   
}
const render = (list) =>{
  console.log("you call render list", list)
     
  let newsHtml = newsList.map(item =>{
     console.log(item.publishedAt)
  `<div id="news">
  <div id="contentsArea">
     <div style="font-size: 25px;"id="title">${item.title}</div>
     
     <div id="source">${item.source.name}</div>
    
     <div class="row-mb5" style="font-size: 12px;">${moment(item.publishedAt).startOf('hour').fromNow()}</div>
     
     
     
  </div>
  <div id="imgArea">
            
  </div>
 
  
  
</div>

`
  }).join('')



document.getElementById("news").innerHTML = newsHtml

}









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
   


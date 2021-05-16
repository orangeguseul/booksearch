const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

$(document).ready(function () {
    $( AboutBook ).hide();
    $('#search').click(function () {
        $.ajax({
            method: "GET",
            url: "https://dapi.kakao.com/v3/search/book?target=title",
            data: { query: $("#bookName").val() },
            headers: {Authorization: "KakaoAK c32e31fac03d0354e04836db13cc4164" }   
        })
            .done(function (msg) {
                console.log(msg.documents[0].title);
                console.log(msg.documents[0].thumbnail);
                console.log(msg.documents[0].contents);
                console.log(msg.documents[0].authors);
                console.log(msg.documents[0].price);
                console.log(msg.documents[0].sale_price);
                console.log(msg.documents[0].status);
                $( AboutBook ).show();
                $( "h1" ).empty();
                $( book ).empty();
                $( author ).empty();
                $( contents ).empty();
                $( price ).empty();
                $( saleprice ).empty();
                $( 판매여부 ).empty();
                $( "h1" ).append( "<strong>"+msg.documents[0].title+"</strong>" );
                $( contents ).append( "줄거리:"+msg.documents[0].contents+"(이하 생략)" );
                $( author ).append( "작가:"+msg.documents[0].authors );
                $( price ).append( "가격:"+msg.documents[0].price+"원" );
                $( saleprice ).append( "할인 가격:"+msg.documents[0].sale_price+"원" );
                $( 판매여부 ).append( "판매현황:"+msg.documents[0].status );
                $( book ).append("<img src='" +msg.documents[0].thumbnail+ "'/>");
            });
    });
});



/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === 'http:') {
  const requireHTTPS = document.getElementById('requireHTTPS');
  const link = requireHTTPS.querySelector('a');
  link.href = window.location.href.replace('http://', 'https://');
  requireHTTPS.classList.remove('hidden');
}           
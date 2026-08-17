window.onload = handleOnload;

function handleOnload () {
    // it's ok if this is an estimate. we just need to lengthen the top color of the gradient
    // to be much longer if the page is long so that the gradient doesn't go transparent
    // before overlapping the background image
    var pageHeight = document.body.scrollHeight;
    var bgImgHeight = 0.5625 * document.body.clientWidth;
    var percentPageToTopOfBgImg = bgImgHeight/pageHeight * 100;
    //console.log(percentPageToTopOfBgImg);

    var bg = "linear-gradient(0deg, rgba(156, 217, 65, 0.5) 0%, rgba(0, 0, 0, 1) " + percentPageToTopOfBgImg + "%, rgba(0, 0, 0, 1) 100%), url(\"https://travislindenreid.github.io/assets/grid.jpg\")";
    document.body.style.background = bg;
    document.body.style.backgroundSize = "100%";
    document.body.style.backgroundPosition = "center bottom";
    document.body.style.backgroundRepeat = "no-repeat";
    //console.log(bg);
    //console.log(document.body.style.background);
}
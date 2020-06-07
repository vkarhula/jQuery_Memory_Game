$(document).ready(function(){
    var kortit = new Array('sininen','sininen','punainen','punainen','vihrea',
    'vihrea','oranssi','oranssi','violetti','violetti','ruskea','ruskea');
    var ekaKortti = '';
    var arvauksia = 0;

    /* Pelin aloituksessa kortit sekoitetaan ja sijoitetaan dynaamisesti pelialueelle  */
    $('#aloita').click(function(e){
        arvauksia = 0;
        $('#arvauksia').text("Etsi pareja valitsemalla kaksi korttia");
        $('#pelialue').empty();
        shuffle(kortit);
        $.each(kortit, function(key,value){
            $('#pelialue').append("<div id='" + key + "' class='" + value +
                    " kortti' style='background-image: url(img/tausta.png)';></div>");
            //console.log(key + ':' + value);
        });
    });
    
    /* Pelilogiikka */
    $('#sisalto').delegate('.kortti','click',function(){
       if($(this).attr('style') !== undefined) {
           $(this).removeAttr('style');
           if (ekaKortti === '') {
               ekaKortti = $(this).attr('id');
           }
           else {
               if ($(this).attr('id') !== ekaKortti) {
                   if (parseInt(arvauksia) === 0){
                       $('#arvauksia').text("Pelaaja on arvannut kerran");
                       ++arvauksia;
                   } else {
                       $('#arvauksia').text("Pelaaja on arvannut " + ++arvauksia + " kertaa");
                   }
                   if ($(this).hasClass($('#' + ekaKortti).attr('class'))) {
                       ekaKortti = '';
                   }
                   else {
                       $(this).animate({
                          backgroundImage: 'url(img/tausta.png)'
                      }, 500, function() {
                          $('#' + ekaKortti).css('background-image', 'url(img/tausta.png)');
                          $(this).css('background-image','url(img/tausta.png)');
                          ekaKortti = '';
                       });
                   }
               }
           }
       }
    });

    /* Funktio sekoittaa taulukon alkiot */
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
    }

});
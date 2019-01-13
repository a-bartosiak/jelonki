(function(){
    console.log('Witamy Jelonki! ');

    var modal = document.getElementById('show-modal');
    var btn = document.getElementById("open-modal");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
      modal.style.display = "block";
    }

    span.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

})();

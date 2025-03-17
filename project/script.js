let infoOpen = false;
function openInfo(){
    if(!infoOpen){
        document.getElementById("howTo").style.display = "block";
    }
    else{
        document.getElementById("howTo").style.display = "none";
    }
    infoOpen = !infoOpen;
}
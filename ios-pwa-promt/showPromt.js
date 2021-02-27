var iosPromtPwa = {
   timesToShow : 5,
   promptOnVisit : 1,



  showPromt : function({debug = false, countAsShown = true}){

   let promptData = JSON.parse(localStorage.getItem("johnny-iosPwaPrompt"));

   if(promptData === null) {
      promptData = { isiOS: this.deviceCheck(), visits: 0 };
      localStorage.setItem("johnny-iosPwaPrompt", JSON.stringify(promptData));
    }

    if (promptData.isiOS || debug) {
      const aboveMinVisits = promptData.visits + 1 >= this.promptOnVisit;
      const belowMaxVisits = promptData.visits + 1 < this.promptOnVisit + this.timesToShow;

      if(!countAsShown){
        promptData.visits--;
      }
      if (belowMaxVisits || debug) {
        localStorage.setItem(
          "johnny-iosPwaPrompt",
          JSON.stringify({
            ...promptData,
            visits: promptData.visits + 1,
          })
        );


        document.getElementsByClassName("pwaPromptOverlay")[0].classList.add("visible");
        document.getElementsByClassName("pwaPromptOverlay")[0].classList.remove("hidden");

        document.getElementsByClassName("pwaPrompt")[0].classList.add("visible");
        document.getElementsByClassName("pwaPrompt")[0].classList.remove("hidden");
      }

    }


  },

  deviceCheck : function(){
    const isiOS = /iphone|ipad|ipod/.test(
      window.navigator.userAgent.toLowerCase()
    );
    const isiPadOS =
      navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    const isStandalone =
      "standalone" in window.navigator && window.navigator.standalone;

    return (isiOS || isiPadOS) && !isStandalone;
  },

dismissPrompt:  function(){
    document.getElementsByClassName("pwaPromptOverlay")[0].classList.remove("visible");
    document.getElementsByClassName("pwaPromptOverlay")[0].classList.add("hidden");

    document.getElementsByClassName("pwaPrompt")[0].classList.remove("visible");
    document.getElementsByClassName("pwaPrompt")[0].classList.add("hidden");
  }

}


iosPromtPwa.showPromt({debug: false,countAsShown:true}); //you can call this any time to bring up the promt

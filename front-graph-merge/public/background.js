/*
chrome.runtime.onMessage.addListener(function(msg){
   // console.assert(port.name == "knockknock");
   if(msg.popupOpen) { 
    var constraints = {
        audio: true,
        video: false,
      };
      
      chrome.tabCapture.capture(constraints, function(stream) {
        console.log("\ngot stream");
        console.log(stream);
        
        

        chrome.tabs.query({active: true, currentWindow:true},
            function(tabs) {
              //const port = chrome.tabs.connect(tabs[0].id);
              chrome.tabs.executeScript(tabs[0].id, {file: "/static/js/main.js"});
                console.log("send!")
                /*port.postMessage(
                  {"stream" : stream,
                  message: "stream"}
                )*/
               /*
               chrome.tabs.sendMessage(tabs[0].id, 
                   {"message": "stream",
                     "stream": stream}
               );

               
         });
        
      });
 }
/*
    port.onMessage.addListener(function(msg){
        
    })*/
    
//  });
/*
chrome.browserAction.onClicked.addListener(function(tab) {
        // Send a message to the active tab
        

        
     });*/
    
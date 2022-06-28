chrome.runtime.onMessage.addListener((req) => {
    console.log(req.message)
    
    
    if (req.message == 'openPopup'){    
           
        
        const popupUrl = chrome.runtime.getURL('index.html')
        chrome.windows.create({
            url: popupUrl,
            type: "popup",
            top: req.positionY,
            left: req.positionX,
            height : 580, 
            width : 450
        })
        
    }
})
// chrome.runtime.onMessage.addListener((req) => {
//     console.log(req.message)
    
    
//     if (req.message == 'openPopup'){    
           
        
//         const popupUrl = chrome.runtime.getURL('index.html')
//         chrome.tabs.query({url: popupUrl}, (tabs) => {
//             console.log(tabs[0])
//             if(tabs.length == 0){
//                 chrome.windows.create({
//                     url: "popup.html", 
//                     type: "popup",
//                     height : 580, 
//                     width : 450, 
//                     top: req.positionY,
//                     left: req.positionX
                    
//                 })

//             } else chrome.tabs.get(tabs[0].id, (tab)=>{
//                 chrome.windows.get(tab.windowId, (win)=>{
//                     console.log(win)
//                     chrome.windows.update(win.id, {drawAttention: true, focused: true})
//                 })
//             })
            
            
//            // chrome.windows.update(tabs[0].windowId, {drawAttention: true})
                  
            

//         })
            
        
//        /* chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//             var activeTab = tabs[0];
//             var activeTabId = activeTab.id;
//             chrome.browserAction.setPopup({tabId: activeTabId , popup: "popup.html"})
//         })  */
        
//     }
// })
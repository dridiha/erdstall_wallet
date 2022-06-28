const positionX = window.screenLeft + (window.outerWidth - 500);
const positionY =  window.screenTop

console.log(typeof positionX)


document.getElementById("trigger").addEventListener("click", ()=>{
        chrome.runtime.sendMessage({message: 'openPopup',
        positionX: positionX,
        positionY: positionY});              
        
        
        console.log("sent")
})
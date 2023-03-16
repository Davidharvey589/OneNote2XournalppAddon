import browser from "webextension-polyfill";

const exportButton = document.getElementById("export");
const fileNameInput = document.getElementById("fileName") as (HTMLInputElement | null);
const exportImages = document.getElementById("exportImages") as (HTMLInputElement | null);
const exportTexts = document.getElementById("exportTexts") as (HTMLInputElement | null);
const exportStrokes = document.getElementById("exportStrokes") as (HTMLInputElement | null);
const exportSeparateLayers = document.getElementById("exportSeparateLayers") as (HTMLInputElement | null);
const container = document.getElementById('container');

document.addEventListener('DOMContentLoaded', async () => {
    const tab = (await browser.tabs.query({active: true, currentWindow: true}))[0];
    if(!tab.url?.startsWith('https://onedrive.live.com/')){
        if(container){
            container.innerHTML = '';
            const error = document.createElement("span");
            error.classList.add('border-color');
            error.innerText = "This addon works only on OneNote pages";
            container.append(error);
        }
    }
})

exportButton?.addEventListener('click', async () => {
    const tab = (await browser.tabs.query({active: true, currentWindow: true}))[0];
    await browser.tabs.sendMessage(tab?.id ?? 0, {
        text: JSON.stringify({
            message: 'convert',
            filename: fileNameInput?.value,
            images: exportImages?.checked ?? true,
            texts: exportTexts?.checked ?? true,
            strokes: exportStrokes?.checked ?? true,
            separateLayers: exportSeparateLayers?.checked ?? true
        })
    });
});

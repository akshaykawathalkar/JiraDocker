define("jira/util/assistive",["jira/util/navigator"],function(Navigator){var ASSISTIVE_TIMEOUT=50;var textProperty=Navigator.isIE()?"innerText":"textContent";var assistiveEl;var assistiveId=0;function wait(callback){setTimeout(callback,ASSISTIVE_TIMEOUT)}function readText(toRead){if(!assistiveEl){assistiveEl=document.createElement("div");assistiveEl.setAttribute("id","assistive-text");assistiveEl.setAttribute("class","visually-hidden");assistiveEl.setAttribute("aria-hidden","false");assistiveEl.setAttribute("role","status");assistiveEl.setAttribute("aria-live","assertive");assistiveEl.setAttribute("aria-relevant","additions");document.body.appendChild(assistiveEl)}assistiveEl[textProperty]=" ";wait(function(){assistiveEl[textProperty]=toRead})}function createOrUpdateLabel(text,id){if(!id){id="label-"+assistiveId;assistiveId+=1}var element=document.getElementById(id);if(!element){element=document.createElement("div");element.setAttribute("id",id);element.setAttribute("class","visually-hidden");element.setAttribute("aria-hidden","false");document.body.appendChild(element)}element[textProperty]=text;return id}return{wait:wait,readText:readText,createOrUpdateLabel:createOrUpdateLabel}});
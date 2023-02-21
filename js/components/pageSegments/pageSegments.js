const IMAGE_PATH="~/../../../img/projects";function renderFactory(e,t=0){let n="";switch(e.type){case 0:n=renderFullWidthImageWithTextOverlay(e);break;case 1:n=renderTextBlockCentered(e);break;case 3:n=renderFullWidthImage(e);break;case 4:n=renderTextBlockTwoColumn(e);break;case 5:n=renderTextBlocksWithHeading(e);break;case 6:n=renderMixedBlock(e);break;case 7:n=renderAnimatedImageReveal(e);break;case 11:n=renderStickySection(e);break;case 20:n=renderQuestionAnswer(e,t);break;default:console.log("renderFactory: unidentified type -> ",t),n=renderOops()}return n}function createNode(e){const t=document.createElement("div");return t.innerHTML=e,t}function createImage(e){let t=e.class??"",n=e.image??"",s=e.alt??"",a="";if(""!==n){a+=`<div ${` class='${t} scroll-target'`}><img src='${IMAGE_PATH}/${n}' alt='${s}'></img></div>`}return a}function createText(e){let t=e.classes??"",n=e.text??"",s="";if(""!==n){let e="";""!=t&&(e=` class='${t}'`),s+=`<p ${e}>${n}</p>`}return s}function renderOops(){return createNode('<div class="grid-center" style="color:red; padding:20px; border: 1px solid red;margin:20px;">oops</div>')}function renderFullWidthImage(e){const t=e.image?.path??"",n=e.image?.alt??"";return createNode(`\n        \x3c!-- Full width Image --\x3e\n        <div class='segment ${e.classes??""}'>\n            <div class='image-full-width'>\n                ${createImage({image:t,class:e.image?.classes??"",alt:n})}                                    \n            </div>\n        </div>\n    `)}function renderFullWidthImageWithTextOverlay(e){const t=e.image?.path??"",n=e.image?.alt??"",s=e.wording[0]?e.wording[0].text:"",a=e.wording[1]?e.wording[1].text:"",i=e.classes??"";let c="";""!=t&&(c=`<img class='scroll-target' src='${IMAGE_PATH}/${t}' alt='${n}'></img>`);let l="";""!=s&&(l=`<div class='text-container grid-center'>\n            <h1 class='text-overlay bottom-right slide-right'>${s}</h1>               \n        </div>`);let r="";return""!=a&&(r=`<div class='top-right slide-left'>${a}</div>`),createNode(`\n        \x3c!-- Full width Image with Text Overlay --\x3e\n        <div class='segment ${i}'>\n            <div class='image-full-width'>\n                ${c}                        \n                ${l}\n                ${r}\n            </div>\n        </div>\n    `)}function renderTextBlockCentered(e){const t=e.text;return createNode(`\n        \x3c!-- Centered Text Block --\x3e\n        <div class='segment p80 ${e.classes||""}'>\n            <div class='text-block-half grid-center'>\n                <p>${t}</p>            \n            </div>\n        </div>\n    `)}function renderTextBlockTwoColumn(e){const t=e.text1,n=e.text2;return createNode(`\n        \x3c!-- 2 text columns --\x3e\n        <div class='segment p80 ${e.classes||""}'>\n            <div class='text-block-2'>\n                <div class='text-block-half grid-center'>\n                    <p>${t}</p>            \n                </div>\n                <div class='text-block-half grid-center'>\n                <p>${n}</p>            \n                </div>\n            </div>        \n        </div>\n    `)}function renderTextBlocksWithHeading(e){const t=e.heading||"",n=e.classes||"";let s="";""!=t&&(s=`<h2>${t}</h2>`);let a="";return e.wording.map((e=>{let t=e.classes??"";e.text&&(a+=`<p class='${t}'>${e.text}</p>`)})),createNode(`\n        \x3c!-- Centered Text Block --\x3e\n        <div class='segment p80 ${n}'>\n            <div class='text-block-half grid-center'>\n                ${s}\n                ${a}\n            </div>\n        </div>\n    `)}function renderMixedBlock(e){const t=e.classes||"",n=e.heading||"";let s="";""!=n&&(s=`<h4>${n}</h4>`);let a="";return e.content.map((e=>{let t=e.classes??"";a+=`<div class=${t}>`;let n=e.text??"";""!=n&&(a+=`<p>${n}</p>`);let s=e.image??"";""!=s&&(a+=`<img src='${IMAGE_PATH}/${s}'></img>`),a+="</div>"})),createNode(`\n        \x3c!-- Centered Text Block --\x3e\n        <div class='segment p80 ${t}'>\n            <div class='image-full-width grid-center'> \n                ${s}               \n                ${a}\n            </div>\n        </div>\n    `)}function renderAnimatedImageReveal(e){const t=e.classes||"";let n="";return e.content.map((e=>{let t=e.classes??"",s=e.image??"",a=e.imageAlt??"";""!=s&&(n+=`<div class='${t}'><img src='${IMAGE_PATH}/${s}' alt='${a}'></img></div>`)})),createNode(`\n        \x3c!-- Three Images with Animation Sequence --\x3e\n        <div class='segment ${t}'>\n            ${n}\n        </div>\n    `)}function renderStickySection(e){let t=e.classes??"",n=e.text??"",s=e.textClasses??"",a=e.image??"",i=e.imageAlt??"",c=`<div class='sticky-container ${t}'>`;return c+=`<div class='sticky ${s}'>${n}</div>`,c+=`<div class='image-full-width'>${createImage({image:a,class:e.imageClasses??"",alt:i})}</div>`,c+="</div>",createNode(c)}function renderQuestionAnswer(e,t){const n=e.question??"",s=e.classes??"";let a="";""!=n&&(a=e.summary.startsWith("-")?`<a class='anchor' id='question${t}'></a><h6 class='question sub-item' data-index=${t}>${n}</h6>`:`<a class='anchor' id='question${t}'></a><h5 class='question' data-index=${t}>${n}</h5>`);let i="";return e.answer.map((e=>{i+=createText({text:e.text,classes:e.classes})})),createNode(`\n        \x3c!-- Question and Answer Block --\x3e\n        <div class='segment p40 ${s}'>\n            <div class='text-block-half' data-index=${t}>\n                ${a}\n                ${i}\n            </div>\n        </div>\n    `)}function renderDynamicFooter(e){let t=`<div class='dynamic-footer flex-row-between ${e.classes??""}'>`,n="";return e.links.map((e=>{let t=e.classes??"",s=e.label??"",a=e.text??"",i=e.url??"";if(a){if(n+=`<div class='footer-nav-item ${t}'><a href='${i}'>\n                    <div class='label'>${s}</div>\n                    <div class='text'>${a}</div>`,e.icon){let t=e.icon.classes??"",s=e.icon.name??"";s&&(n+=`<div class='icon ${t}'><img src='~/../../../img/icons/${s}' alt='Go to next page' /></div>`)}n+="</a></div>"}})),t+=n,t+="</div>",t}
(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class e{constructor(t,n,r,i,a=`div`){this.parent=t,this.object=n,this.property=r,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(a),this.domElement.classList.add(`lil-controller`),this.domElement.classList.add(i),this.$name=document.createElement(`div`),this.$name.classList.add(`lil-name`),e.nextNameID=e.nextNameID||0,this.$name.id=`lil-gui-name-${++e.nextNameID}`,this.$widget=document.createElement(`div`),this.$widget.classList.add(`lil-widget`),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener(`keydown`,e=>e.stopPropagation()),this.domElement.addEventListener(`keyup`,e=>e.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(r)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle(`lil-disabled`,e),this.$disable.toggleAttribute(`disabled`,e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?`none`:``,this}hide(){return this.show(!1)}options(e){let t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);let e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}},t=class extends e{constructor(e,t,n){super(e,t,n,`lil-boolean`,`label`),this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`checkbox`),this.$input.setAttribute(`aria-labelledby`,this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener(`change`,()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function n(e){let t,n;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?n=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?n=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(n=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),n?`#`+n:!1}var r={isPrimitive:!0,match:e=>typeof e==`string`,fromHexString:n,toHexString:n},i={isPrimitive:!0,match:e=>typeof e==`number`,fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>`#`+e.toString(16).padStart(6,0)},a=[r,i,{isPrimitive:!1,match:e=>Array.isArray(e)||ArrayBuffer.isView(e),fromHexString(e,t,n=1){let r=i.fromHexString(e);t[0]=(r>>16&255)/255*n,t[1]=(r>>8&255)/255*n,t[2]=(r&255)/255*n},toHexString([e,t,n],r=1){r=255/r;let a=e*r<<16^t*r<<8^n*r<<0;return i.toHexString(a)}},{isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,n=1){let r=i.fromHexString(e);t.r=(r>>16&255)/255*n,t.g=(r>>8&255)/255*n,t.b=(r&255)/255*n},toHexString({r:e,g:t,b:n},r=1){r=255/r;let a=e*r<<16^t*r<<8^n*r<<0;return i.toHexString(a)}}];function o(e){return a.find(t=>t.match(e))}var s=class extends e{constructor(e,t,r,i){super(e,t,r,`lil-color`),this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`color`),this.$input.setAttribute(`tabindex`,-1),this.$input.setAttribute(`aria-labelledby`,this.$name.id),this.$text=document.createElement(`input`),this.$text.setAttribute(`type`,`text`),this.$text.setAttribute(`spellcheck`,`false`),this.$text.setAttribute(`aria-labelledby`,this.$name.id),this.$display=document.createElement(`div`),this.$display.classList.add(`lil-display`),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=o(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener(`input`,()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener(`blur`,()=>{this._callOnFinishChange()}),this.$text.addEventListener(`input`,()=>{let e=n(this.$text.value);e&&this._setValueFromHexString(e)}),this.$text.addEventListener(`focus`,()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener(`blur`,()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){let t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}},c=class extends e{constructor(e,t,n){super(e,t,n,`lil-function`),this.$button=document.createElement(`button`),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener(`click`,e=>{e.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener(`touchstart`,()=>{},{passive:!0}),this.$disable=this.$button}},l=class extends e{constructor(e,t,n,r,i,a){super(e,t,n,`lil-number`),this._initInput(),this.min(r),this.max(i);let o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){let e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+`%`}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`text`),this.$input.setAttribute(`aria-labelledby`,this.$name.id),window.matchMedia(`(pointer: coarse)`).matches&&(this.$input.setAttribute(`type`,`number`),this.$input.setAttribute(`step`,`any`)),this.$widget.appendChild(this.$input),this.$disable=this.$input;let e=()=>{let e=parseFloat(this.$input.value);isNaN(e)||(this._stepExplicit&&(e=this._snap(e)),this.setValue(this._clamp(e)))},t=e=>{let t=parseFloat(this.$input.value);isNaN(t)||(this._snapClampSetValue(t+e),this.$input.value=this.getValue())},n=e=>{e.key===`Enter`&&this.$input.blur(),e.code===`ArrowUp`&&(e.preventDefault(),t(this._step*this._arrowKeyMultiplier(e))),e.code===`ArrowDown`&&(e.preventDefault(),t(this._step*this._arrowKeyMultiplier(e)*-1))},r=e=>{this._inputFocused&&(e.preventDefault(),t(this._step*this._normalizeMouseWheel(e)))},i=!1,a,o,s,c,l,u=e=>{a=e.clientX,o=s=e.clientY,i=!0,c=this.getValue(),l=0,window.addEventListener(`mousemove`,d),window.addEventListener(`mouseup`,f)},d=e=>{if(i){let t=e.clientX-a,n=e.clientY-o;Math.abs(n)>5?(e.preventDefault(),this.$input.blur(),i=!1,this._setDraggingStyle(!0,`vertical`)):Math.abs(t)>5&&f()}if(!i){let t=e.clientY-s;l-=t*this._step*this._arrowKeyMultiplier(e),c+l>this._max?l=this._max-c:c+l<this._min&&(l=this._min-c),this._snapClampSetValue(c+l)}s=e.clientY},f=()=>{this._setDraggingStyle(!1,`vertical`),this._callOnFinishChange(),window.removeEventListener(`mousemove`,d),window.removeEventListener(`mouseup`,f)};this.$input.addEventListener(`input`,e),this.$input.addEventListener(`keydown`,n),this.$input.addEventListener(`wheel`,r,{passive:!1}),this.$input.addEventListener(`mousedown`,u),this.$input.addEventListener(`focus`,()=>{this._inputFocused=!0}),this.$input.addEventListener(`blur`,()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement(`div`),this.$slider.classList.add(`lil-slider`),this.$fill=document.createElement(`div`),this.$fill.classList.add(`lil-fill`),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add(`lil-has-slider`);let e=(e,t,n,r,i)=>(e-t)/(n-t)*(i-r)+r,t=t=>{let n=this.$slider.getBoundingClientRect(),r=e(t,n.left,n.right,this._min,this._max);this._snapClampSetValue(r)},n=e=>{this._setDraggingStyle(!0),t(e.clientX),window.addEventListener(`mousemove`,r),window.addEventListener(`mouseup`,i)},r=e=>{t(e.clientX)},i=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener(`mousemove`,r),window.removeEventListener(`mouseup`,i)},a=!1,o,s,c=e=>{e.preventDefault(),this._setDraggingStyle(!0),t(e.touches[0].clientX),a=!1},l=e=>{e.touches.length>1||(this._hasScrollBar?(o=e.touches[0].clientX,s=e.touches[0].clientY,a=!0):c(e),window.addEventListener(`touchmove`,u,{passive:!1}),window.addEventListener(`touchend`,d))},u=e=>{if(a){let t=e.touches[0].clientX-o,n=e.touches[0].clientY-s;Math.abs(t)>Math.abs(n)?c(e):(window.removeEventListener(`touchmove`,u),window.removeEventListener(`touchend`,d))}else e.preventDefault(),t(e.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener(`touchmove`,u),window.removeEventListener(`touchend`,d)},f=this._callOnFinishChange.bind(this),p;this.$slider.addEventListener(`mousedown`,n),this.$slider.addEventListener(`touchstart`,l,{passive:!1}),this.$slider.addEventListener(`wheel`,e=>{if(Math.abs(e.deltaX)<Math.abs(e.deltaY)&&this._hasScrollBar)return;e.preventDefault();let t=this._normalizeMouseWheel(e)*this._step;this._snapClampSetValue(this.getValue()+t),this.$input.value=this.getValue(),clearTimeout(p),p=setTimeout(f,400)},{passive:!1})}_setDraggingStyle(e,t=`horizontal`){this.$slider&&this.$slider.classList.toggle(`lil-active`,e),document.body.classList.toggle(`lil-dragging`,e),document.body.classList.toggle(`lil-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){let e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}},u=class extends e{constructor(e,t,n,r){super(e,t,n,`lil-option`),this.$select=document.createElement(`select`),this.$select.setAttribute(`aria-labelledby`,this.$name.id),this.$display=document.createElement(`div`),this.$display.classList.add(`lil-display`),this.$select.addEventListener(`change`,()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener(`focus`,()=>{this.$display.classList.add(`lil-focus`)}),this.$select.addEventListener(`blur`,()=>{this.$display.classList.remove(`lil-focus`)}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(e=>{let t=document.createElement(`option`);t.textContent=e,this.$select.appendChild(t)}),this.updateDisplay(),this}updateDisplay(){let e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}},d=class extends e{constructor(e,t,n){super(e,t,n,`lil-string`),this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`text`),this.$input.setAttribute(`spellcheck`,`false`),this.$input.setAttribute(`aria-labelledby`,this.$name.id),this.$input.addEventListener(`input`,()=>{this.setValue(this.$input.value)}),this.$input.addEventListener(`keydown`,e=>{e.code===`Enter`&&this.$input.blur()}),this.$input.addEventListener(`blur`,()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},f=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.lil-root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.lil-root > .lil-children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.lil-allow-touch-styles, .lil-gui.lil-allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.lil-force-touch-styles, .lil-gui.lil-force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.lil-auto-place, .lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-controller.lil-disabled {
  opacity: 0.5;
}
.lil-controller.lil-disabled, .lil-controller.lil-disabled * {
  pointer-events: none !important;
}
.lil-controller > .lil-name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-controller .lil-widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-controller.lil-string input {
  color: var(--string-color);
}
.lil-controller.lil-boolean {
  cursor: pointer;
}
.lil-controller.lil-color .lil-display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-controller.lil-color .lil-display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-controller.lil-color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-controller.lil-color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-controller.lil-option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-controller.lil-option .lil-display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-display.lil-focus {
    background: var(--focus-color);
  }
}
.lil-controller.lil-option .lil-display.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-option .lil-display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-controller.lil-option .lil-widget,
.lil-controller.lil-option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-widget:hover .lil-display {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number input {
  color: var(--number-color);
}
.lil-controller.lil-number.lil-has-slider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-controller.lil-number .lil-slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-controller.lil-number .lil-slider:hover {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number .lil-slider.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-number .lil-slider.lil-active .lil-fill {
  opacity: 0.95;
}
.lil-controller.lil-number .lil-fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-dragging * {
  cursor: ew-resize !important;
}
.lil-dragging.lil-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .lil-title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .lil-title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .lil-title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-dragging) .lil-gui .lil-title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .lil-title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.lil-root > .lil-title:focus {
  text-decoration: none !important;
}
.lil-gui.lil-closed > .lil-title:before {
  content: "▸";
}
.lil-gui.lil-closed > .lil-children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.lil-closed:not(.lil-transition) > .lil-children {
  display: none;
}
.lil-gui.lil-transition > .lil-children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .lil-children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.lil-root > .lil-children > .lil-gui > .lil-title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.lil-root > .lil-children > .lil-gui.lil-closed > .lil-title {
  border-bottom-color: transparent;
}
.lil-gui + .lil-controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .lil-title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .lil-children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .lil-controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .lil-controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .lil-controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .lil-controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .lil-controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtQAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqBBIEbATYCJAMUCwwABCAFhAoHgQQbHAbIDiUFEYVARAAAYQTVWNmz9MxhEgodq49wYRUFKE8GWNiUBxI2LBRaVnc51U83Gmhs0Q7JXWMiz5eteLwrKwuxHO8VFxUX9UpZBs6pa5ABRwHA+t3UxUnH20EvVknRerzQgX6xC/GH6ZUvTcAjAv122dF28OTqCXrPuyaDER30YBA1xnkVutDDo4oCi71Ca7rrV9xS8dZHbPHefsuwIyCpmT7j+MnjAH5X3984UZoFFuJ0yiZ4XEJFxjagEBeqs+e1iyK8Xf/nOuwF+vVK0ur765+vf7txotUi0m3N0m/84RGSrBCNrh8Ee5GjODjF4gnWP+dJrH/Lk9k4oT6d+gr6g/wssA2j64JJGP6cmx554vUZnpZfn6ZfX2bMwPPrlANsB86/DiHjhl0OP+c87+gaJo/gY084s3HoYL/ZkWHTRfBXvvoHnnkHvngKun4KBE/ede7tvq3/vQOxDXB1/fdNz6XbPdcr0Vhpojj9dG+owuSKFsslCi1tgEjirjXdwMiov2EioadxmqTHUCIwo8NgQaeIasAi0fTYSPTbSmwbMOFduyh9wvBrESGY0MtgRjtgQR8Q1bRPohn2UoCRZf9wyYANMXFeJTysqAe0I4mrherOekFdKMrYvJjLvOIUM9SuwYB5DVZUwwVjJJOaUnZCmcEkIZZrKqNvRGRMvmFZsmhP4VMKCSXBhSqUBxgMS7h0cZvEd71AWkEhGWaeMFcNnpqyJkyXgYL7PQ1MoSq0wDAkRtJIijkZSmqYTiSImfLiSWXIZwhRh3Rug2X0kk1Dgj+Iu43u5p98ghopcpSo0Uyc8SnjlYX59WUeaMoDqmVD2TOWD9a4pCRAzf2ECgwGcrHjPOWY9bNxq/OL3I/QjwEAAAA=") format("woff2");
}`;function p(e){let t=document.createElement(`style`);t.innerHTML=e;let n=document.querySelector(`head link[rel=stylesheet], head style`);n?document.head.insertBefore(t,n):document.head.appendChild(t)}var m=!1,h=class e{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:r,title:i=`Controls`,closeFolders:a=!1,injectStyles:o=!0,touchStyles:s=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement(`div`),this.domElement.classList.add(`lil-gui`),this.$title=document.createElement(`button`),this.$title.classList.add(`lil-title`),this.$title.setAttribute(`aria-expanded`,!0),this.$title.addEventListener(`click`,()=>this.openAnimated(this._closed)),this.$title.addEventListener(`touchstart`,()=>{},{passive:!0}),this.$children=document.createElement(`div`),this.$children.classList.add(`lil-children`),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(i),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add(`lil-root`),s&&this.domElement.classList.add(`lil-allow-touch-styles`),!m&&o&&(p(f),m=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add(`lil-auto-place`,`autoPlace`),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty(`--width`,r+`px`),this._closeFolders=a}add(e,n,r,i,a){if(Object(r)===r)return new u(this,e,n,r);let o=e[n];switch(typeof o){case`number`:return new l(this,e,n,r,i,a);case`boolean`:return new t(this,e,n);case`string`:return new d(this,e,n);case`function`:return new c(this,e,n)}console.error(`gui.add failed
	property:`,n,`
	object:`,e,`
	value:`,o)}addColor(e,t,n=1){return new s(this,e,t,n)}addFolder(t){let n=new e({parent:this,title:t});return this.root._closeFolders&&n.close(),n}load(e,t=!0){return e.controllers&&this.controllers.forEach(t=>{t instanceof c||t._name in e.controllers&&t.load(e.controllers[t._name])}),t&&e.folders&&this.folders.forEach(t=>{t._title in e.folders&&t.load(e.folders[t._title])}),this}save(e=!0){let t={controllers:{},folders:{}};return this.controllers.forEach(e=>{if(!(e instanceof c)){if(e._name in t.controllers)throw Error(`Cannot save GUI with duplicate property "${e._name}"`);t.controllers[e._name]=e.save()}}),e&&this.folders.forEach(e=>{if(e._title in t.folders)throw Error(`Cannot save GUI with duplicate folder "${e._title}"`);t.folders[e._title]=e.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute(`aria-expanded`,!this._closed),this.domElement.classList.toggle(`lil-closed`,this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?`none`:``,this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute(`aria-expanded`,!this._closed),requestAnimationFrame(()=>{let t=this.$children.clientHeight;this.$children.style.height=t+`px`,this.domElement.classList.add(`lil-transition`);let n=e=>{e.target===this.$children&&(this.$children.style.height=``,this.domElement.classList.remove(`lil-transition`),this.$children.removeEventListener(`transitionend`,n))};this.$children.addEventListener(`transitionend`,n);let r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle(`lil-closed`,!e),requestAnimationFrame(()=>{this.$children.style.height=r+`px`})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(e=>e.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}};(function(e,t){function n(e){return document.createElement(e)}function r(e,t){for(var n in t)try{e.style[n]=t[n]}catch{}return e}function i(e){return e==null?String(e):typeof e==`object`||typeof e==`function`?Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase()||`object`:typeof e}function a(e,t){if(i(t)!==`array`)return-1;if(t.indexOf)return t.indexOf(e);for(var n=0,r=t.length;n<r;n++)if(t[n]===e)return n;return-1}function o(){var e=arguments;for(var t in e[1])if(e[1].hasOwnProperty(t))switch(i(e[1][t])){case`object`:e[0][t]=o({},e[0][t],e[1][t]);break;case`array`:e[0][t]=e[1][t].slice(0);break;default:e[0][t]=e[1][t]}return e.length>2?o.apply(null,[e[0]].concat(Array.prototype.slice.call(e,2))):e[0]}function s(e,t,n){var r,i,a,o=n<=.5?n*(1+t):n+t-n*t,s,l,u,d,f;return o===0?`#000`:(s=2*n-o,l=(o-s)/o,e=6*e,u=Math.floor(e),d=e-u,f=o*l*d,u===0||u===6?(r=o,i=s+f,a=s):u===1?(r=o-f,i=o,a=s):u===2?(r=s,i=o,a=s+f):u===3?(r=s,i=o-f,a=o):u===4?(r=s+f,i=s,a=o):(r=o,i=s,a=o-f),`#`+c(r)+c(i)+c(a))}function c(e){return e=Math.round(e*255).toString(16),e.length===1?`0`+e:e}function l(e,t,n,r){e.addEventListener?e[r?`removeEventListener`:`addEventListener`](t,n,!1):e.attachEvent&&e[r?`detachEvent`:`attachEvent`](`on`+t,n)}var u;(function(){var t=e.performance;u=t&&(t.now||t.webkitNow)?t[t.now?`now`:`webkitNow`].bind(t):function(){return+new Date}})();var d=e.cancelAnimationFrame||e.cancelRequestAnimationFrame,f=e.requestAnimationFrame;(function(){for(var t=[`moz`,`webkit`,`o`],n=0,r=0,i=t.length;r<i&&!d;++r)d=e[t[r]+`CancelAnimationFrame`]||e[t[r]+`CancelRequestAnimationFrame`],f=d&&e[t[r]+`RequestAnimationFrame`];d||=(f=function(t){var r=u(),i=Math.max(0,16-(r-n));return n=r+i,e.setTimeout(function(){t(r+i)},i)},function(e){clearTimeout(e)})})();var p=i(document.createElement(`div`).textContent)===`string`?`textContent`:`innerText`;function m(e,c){i(e)===`object`&&e.nodeType===t&&(c=e,e=document.body),e||=document.body;var _=this,v=o({},m.defaults,c||{}),y={},b=[],x,S,C=100,w=[],T=0,E=v.threshold,D=0,O=u()-E,k,A=[],j=[],M,N,P=v.show===`fps`,F,I,L,R;_.options=v,_.fps=0,_.duration=0,_.isPaused=0,_.tickStart=function(){D=u()},_.tick=function(){k=u(),T=k-O,E+=(T-E)/v.smoothing,_.fps=1e3/E,_.duration=D<O?E:k-D,O=k},_.pause=function(){return M&&=(_.isPaused=1,clearTimeout(M),d(M),d(N),N=0),_},_.resume=function(){return M||(_.isPaused=0,U()),_},_.set=function(e,t){return v[e]=t,P=v.show===`fps`,a(e,h)!==-1&&q(),a(e,g)!==-1&&J(),_},_.showDuration=function(){return _.set(`show`,`ms`),_},_.showFps=function(){return _.set(`show`,`fps`),_},_.toggle=function(){return _.set(`show`,P?`ms`:`fps`),_},_.hide=function(){return _.pause(),y.container.style.display=`none`,_},_.show=function(){return _.resume(),y.container.style.display=`block`,_};function z(){for(L=v.history;L--;)A[L]=L===0?_.fps:A[L-1],j[L]=L===0?_.duration:j[L-1]}function B(e,t,n,r){return S[0|e][Math.round(Math.min((t-n)/(r-n)*C,C))]}function V(){y.legend.fps!==P&&(y.legend.fps=P,y.legend[p]=P?`FPS`:`ms`),I=P?_.fps:_.duration,y.count[p]=I>999?`999+`:I.toFixed(I>99?0:v.decimals)}function H(){if(k=u(),O<k-v.threshold&&(_.fps-=_.fps/Math.max(1,v.smoothing*60/v.interval),_.duration=1e3/_.fps),z(),V(),v.heat){if(w.length)for(L=w.length;L--;)w[L].el.style[x[w[L].name].heatOn]=P?B(x[w[L].name].heatmap,_.fps,0,v.maxFps):B(x[w[L].name].heatmap,_.duration,v.threshold,0);if(y.graph&&x.column.heatOn)for(L=b.length;L--;)b[L].style[x.column.heatOn]=P?B(x.column.heatmap,A[L],0,v.maxFps):B(x.column.heatmap,j[L],v.threshold,0)}if(y.graph)for(R=0;R<v.history;R++)b[R].style.height=(P?A[R]?Math.round(F/v.maxFps*Math.min(A[R],v.maxFps)):0:j[R]?Math.round(F/v.threshold*Math.min(j[R],v.threshold)):0)+`px`}function U(){v.interval<20?(M=f(U),H()):(M=setTimeout(U,v.interval),N=f(H))}function W(e){e||=window.event,e.preventDefault?(e.preventDefault(),e.stopPropagation()):(e.returnValue=!1,e.cancelBubble=!0),_.toggle()}_.destroy=function(){_.pause(),G(),_.tick=_.tickStart=function(){}};function G(){v.toggleOn&&l(y.container,v.toggleOn,W,1),e.removeChild(y.container)}function K(){if(x=m.theme[v.theme],S=x.compiledHeatmaps||[],!S.length&&x.heatmaps.length){for(R=0;R<x.heatmaps.length;R++)for(S[R]=[],L=0;L<=C;L++)S[R][L]=s(.33/C*L,x.heatmaps[R].saturation,x.heatmaps[R].lightness);x.compiledHeatmaps=S}}function q(){for(var t in y.container&&G(),K(),y.container=r(n(`div`),x.container),y.count=y.container.appendChild(r(n(`div`),x.count)),y.legend=y.container.appendChild(r(n(`div`),x.legend)),y.graph=v.graph?y.container.appendChild(r(n(`div`),x.graph)):0,w.length=0,y)y[t]&&x[t].heatOn&&w.push({name:t,el:y[t]});if(b.length=0,y.graph)for(y.graph.style.width=v.history*x.column.width+(v.history-1)*x.column.spacing+`px`,L=0;L<v.history;L++)b[L]=y.graph.appendChild(r(n(`div`),x.column)),b[L].style.position=`absolute`,b[L].style.bottom=0,b[L].style.right=L*x.column.width+L*x.column.spacing+`px`,b[L].style.width=x.column.width+`px`,b[L].style.height=`0px`;J(),V(),e.appendChild(y.container),y.graph&&(F=y.graph.clientHeight),v.toggleOn&&(v.toggleOn===`click`&&(y.container.style.cursor=`pointer`),l(y.container,v.toggleOn,W))}function J(){r(y.container,v)}(function(){q(),U()})()}m.extend=o,window.FPSMeter=m,m.defaults={interval:100,smoothing:10,show:`fps`,toggleOn:`click`,decimals:1,maxFps:60,threshold:100,position:`absolute`,zIndex:10,left:`5px`,top:`5px`,right:`auto`,bottom:`auto`,margin:`0 0 0 0`,theme:`dark`,heat:0,graph:0,history:20};var h=[`toggleOn`,`theme`,`heat`,`graph`,`history`],g=[`position`,`zIndex`,`left`,`top`,`right`,`bottom`,`margin`]})(window),(function(e,t,n){t.theme={};var r=t.theme.base={heatmaps:[],container:{heatOn:null,heatmap:null,padding:`5px`,minWidth:`95px`,height:`30px`,lineHeight:`30px`,textAlign:`right`,textShadow:`none`},count:{heatOn:null,heatmap:null,position:`absolute`,top:0,right:0,padding:`5px 10px`,height:`30px`,fontSize:`24px`,fontFamily:`Consolas, Andale Mono, monospace`,zIndex:2},legend:{heatOn:null,heatmap:null,position:`absolute`,top:0,left:0,padding:`5px 10px`,height:`30px`,fontSize:`12px`,lineHeight:`32px`,fontFamily:`sans-serif`,textAlign:`left`,zIndex:2},graph:{heatOn:null,heatmap:null,position:`relative`,boxSizing:`padding-box`,MozBoxSizing:`padding-box`,height:`100%`,zIndex:1},column:{width:4,spacing:1,heatOn:null,heatmap:null}};t.theme.dark=t.extend({},r,{heatmaps:[{saturation:.8,lightness:.8}],container:{background:`#222`,color:`#fff`,border:`1px solid #1a1a1a`,textShadow:`1px 1px 0 #222`},count:{heatOn:`color`},column:{background:`#3f3f3f`}}),t.theme.light=t.extend({},r,{heatmaps:[{saturation:.5,lightness:.5}],container:{color:`#666`,background:`#fff`,textShadow:`1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)`,boxShadow:`0 0 0 1px rgba(0,0,0,.1)`},count:{heatOn:`color`},column:{background:`#eaeaea`}}),t.theme.colorful=t.extend({},r,{heatmaps:[{saturation:.5,lightness:.6}],container:{heatOn:`backgroundColor`,background:`#888`,color:`#fff`,textShadow:`1px 1px 0 rgba(0,0,0,.2)`,boxShadow:`0 0 0 1px rgba(0,0,0,.1)`},column:{background:`#777`,backgroundColor:`rgba(0,0,0,.2)`}}),t.theme.transparent=t.extend({},r,{heatmaps:[{saturation:.8,lightness:.5}],container:{padding:0,color:`#fff`,textShadow:`1px 1px 0 rgba(0,0,0,.5)`},count:{padding:`0 5px`,height:`40px`,lineHeight:`40px`},legend:{padding:`0 5px`,height:`40px`,lineHeight:`42px`},graph:{height:`40px`},column:{width:5,background:`#999`,heatOn:`backgroundColor`,opacity:.5}})})(window,FPSMeter);function g(e,...t){if(typeof e==`function`&&e.name){let n=e.name;console.debug(`[${n.toLowerCase()}]`,...t);return}if(typeof e==`object`&&e.constructor){g(e.constructor,...t);return}console.debug(...t)}function _(e,t){if(!Number.isInteger(e)||!Number.isInteger(t))throw Error(`Both min and max must be integers.`);if(e>t)throw Error(`Parameter 'min' must be less than or equal to 'max'.`);return Math.floor(Math.random()*(t-e))+e}function v(e,t){if(!Number.isInteger(e)||!Number.isInteger(t))throw Error(`Both min and max must be integers.`);if(e>t)throw Error(`Parameter 'min' must be less than or equal to 'max'.`);return Math.floor(Math.random()*(t-e+1))+e}var y=class{_offscreenCanvas;_offscreenCanvasContext;constructor(){let e=new OffscreenCanvas(this.width,this.height),t=e.getContext(`2d`);if(!t)throw Error(`The OffscreenCanvasRenderingContext2D object is not supported.`);this._offscreenCanvas=e,this._offscreenCanvasContext=t}get height(){return b.height}get width(){return b.width}create(){g(this,`The 'create()' method is not implemented.`)}isBusy(){return!1}isReady(){return!0}render(e){this.draw(this._offscreenCanvasContext),e.drawImage(this._offscreenCanvas,0,0,this.width,this.height)}resize(){this._offscreenCanvas.width=this.width,this._offscreenCanvas.height=this.height}start(){g(this,`The 'start()' method is not implemented.`)}stop(){g(this,`The 'stop()' method is not implemented.`)}terminate(){g(this,`The 'terminate()' method is not implemented.`)}update(e){}draw(e){}},b=class{static _canvas;static _context;static _fpsmeter;static _fpsmeterBox;static _fpsmeterToggled=!1;static _frameCount=0;static _height=0;static _width=0;constructor(){throw TypeError(`This is a static class.`)}static get context(){return this._context}static get frameCount(){return Math.floor(this._frameCount)}static get height(){return this._height}static get width(){return this._width}static clear(){this._context&&this._context.clearRect(0,0,this.width,this.height)}static init(){try{g(this,`initializing...`),this.initCanvas(),this.setupEventHandlers(),this.initFpsmeter(),this.resize(),g(this,`initialized.`)}catch(e){console.error(e)}}static render(e){e&&e.render(this._context)}static resize(e,t){this._width=e??window.innerWidth,this._height=t??window.innerHeight,this._canvas.width=this._width,this._canvas.height=this._height,this._canvas.style.width=this._width+`px`,this._canvas.style.height=this._height+`px`}static tickEnd(){this._fpsmeterToggled&&this._fpsmeter&&this._fpsmeter.tick()}static tickStart(){this._fpsmeterToggled&&this._fpsmeter&&this._fpsmeter.tickStart()}static toggleFps(e){this._fpsmeter&&this._fpsmeterBox&&(e?(this._fpsmeter.show(),this._fpsmeterBox.style.display=`block`):(this._fpsmeter.hide(),this._fpsmeterBox.style.display=`none`),this._fpsmeterToggled=e)}static update(e){this._frameCount+=1*e}static initCanvas(){let e=document.createElement(`canvas`),t=e.getContext(`2d`);e.style.backgroundColor=`black`,e.style.position=`fixed`,e.style.left=`0`,e.style.top=`0`,e.style.zIndex=`0`,document.body.appendChild(e),this._context=t,this._canvas=e}static initFpsmeter(){let e={left:`20px`,graph:1,decimals:1,theme:`transparent`,toggleOn:void 0};this._fpsmeterBox=document.createElement(`div`),this._fpsmeterBox.id=`fpsmeter-box`,this._fpsmeterBox.style.backgroundColor=`rgb(255 255 255 / .1)`,this._fpsmeterBox.style.position=`absolute`,this._fpsmeterBox.style.top=`0`,this._fpsmeterBox.style.left=`15px`,this._fpsmeterBox.style.width=`129px`,this._fpsmeterBox.style.height=`50px`,this._fpsmeterBox.style.zIndex=`9`,this._fpsmeter=new FPSMeter(document.body,e),document.body.appendChild(this._fpsmeterBox),this.toggleFps(!1)}static onResize(){this.resize(window.innerWidth,window.innerHeight)}static setupEventHandlers(){window.addEventListener(`resize`,this.onResize.bind(this))}},x={},S=class{static _currentState;static _latestKey;static _pressedTime;static _previousState;static _repeatInterval=6;static _repeatWait=24;constructor(){throw TypeError(`This is a static class.`)}static get repeatInterval(){return this._repeatInterval}static set repeatInterval(e){this._repeatInterval!==e&&(this._repeatInterval=e)}static get repeatWait(){return this._repeatWait}static set repeatWait(e){this._repeatWait!==e&&(this._repeatWait=e)}static config(e){x=Object.assign({},x,e),console.info(x)}static init(){try{g(this,`initializing...`),this.clear(),this.setupEventHandlers(),g(this,`initialized`)}catch(e){console.error(e)}}static longPressed(e){return this._latestKey===e&&this._pressedTime>=this._repeatWait}static pressed(e){return!!this._currentState[e]}static repeated(e){return this._latestKey===e&&(this._pressedTime===0||this._pressedTime>=this._repeatWait&&this._pressedTime%this._repeatInterval===0)}static triggered(e){return this._latestKey===e&&this._pressedTime===0}static update(e){this._latestKey&&this._currentState[this._latestKey]?this._pressedTime+=1*e:this._latestKey=null;for(let e in this._currentState)this._currentState[e]&&!this._previousState[e]&&(this._latestKey=e,this._pressedTime=0),this._previousState[e]=this._currentState[e]}static clear(){this._currentState={},this._previousState={},this._latestKey=null,this._pressedTime=0}static onLostFocus(){this.clear()}static onKeyDown(e){e.key===`NumLock`&&this.clear();let t=x[e.key];t&&(this._currentState[t]=!0)}static onKeyUp(e){let t=x[e.key];t&&(this._currentState[t]=!1)}static setupEventHandlers(){document.addEventListener(`keydown`,this.onKeyDown.bind(this)),document.addEventListener(`keyup`,this.onKeyUp.bind(this)),window.addEventListener(`blur`,this.onLostFocus.bind(this))}},C={0:`left`,1:`right`,2:`middle`,3:`back`,4:`forward`},w=class{static _currentState;static _latestButton;static _pressedTime;static _previousState;static _repeatInterval=6;static _repeatWait=24;static _x;static _y;constructor(){throw TypeError(`This is a static class.`)}static get x(){return this._x}static get y(){return this._y}static config(e){C=Object.assign({},C,e)}static init(){try{g(this,`initializing...`),this.clear(),this.setupEventHandlers(),g(this,`initialized.`)}catch(e){console.error(e)}}static longPressed(e){return this._latestButton===e&&this._pressedTime>=this._repeatWait}static pressed(e){return!!this._currentState[e]}static repeated(e){return this._latestButton===e&&(this._pressedTime===0||this._pressedTime>=this._repeatWait&&this._pressedTime%this._repeatInterval===0)}static triggered(e){return this._latestButton===e&&this._pressedTime===0}static update(e){this._latestButton&&this._currentState[this._latestButton]?this._pressedTime+=1*e:this._latestButton=null;for(let e in this._currentState)this._currentState[e]&&!this._previousState[e]&&(this._latestButton=e,this._pressedTime=0),this._previousState[e]=this._currentState[e]}static clear(){this._currentState={},this._previousState={},this._latestButton=null,this._pressedTime=0,this._x=null,this._y=null}static onLostFocus(){this.clear()}static onMouseDown(e){let t=C[e.button];t&&(this._currentState[t]=!0)}static onMouseLeave(){this.clear()}static onMouseMove(e){this._x=e.x,this._y=e.y}static onMouseUp(e){let t=C[e.button];t&&(this._currentState[t]=!1)}static setupEventHandlers(){document.addEventListener(`mousedown`,this.onMouseDown.bind(this)),document.addEventListener(`mouseleave`,this.onMouseLeave.bind(this)),document.addEventListener(`mousemove`,this.onMouseMove.bind(this)),document.addEventListener(`mouseup`,this.onMouseUp.bind(this)),window.addEventListener(`blur`,this.onLostFocus.bind(this))}},T=class e{_finalized=!1;_sceneList=null;_scenes;constructor(){this._scenes=new Map}get scenes(){if(!this._sceneList){let t={},n=[...this._scenes.entries()];for(let[r,{title:i}]of n.sort(e.compareFn))t=Object.assign({},t,{[i]:r});this._sceneList=t}return this._sceneList}static create(){return new e}static compareFn(e,t){let[,{title:n}]=e,[,{title:r}]=t;return n.localeCompare(r)}finalize(){this._finalized||=!0}get(e){if(e&&e!==``){let t=this._scenes.get(e);if(t){let{title:n,scene:r}=t;if(r instanceof y)return r;if(typeof r==`function`)return r=new r,t.title=n,t.scene=r,this._scenes.set(e,t),r}}return null}register(e,t,n){if(this._finalized)throw Error(`Scene manager instance is already final.`);if(!e||typeof e!=`function`)throw Error(`Parameter 'scene' is not a valid type of 'Scene' object.`);return t??=e.name,n??=e.name,this._scenes.has(t)||this._scenes.set(t,{title:n,scene:e}),this}}.create,E=class{static _accumulator=0;static _fadeDuration=0;static _nextSceneOpacity=0;static _lastSceneOpacity=1;static _fps=60;static _gui;static _lastScene;static _lastUpdateTime=0;static _manager;static _nextScene;static _options={fps:!1,scene:``};static _scene;static _sceneSelector;static _sceneStarted=!1;static _step=1/this._fps;static _stopped;constructor(){throw TypeError(`This is a static class.`)}static get fps(){return this._fps}static run(e){try{g(this,`starting...`),this.init(),this.initManager(e),this.initGui(),this.requestUpdate(),g(this,`started.`)}catch(e){console.error(e)}}static runScene(e){try{g(this,`starting...`),this.init(),this.initGui(),this.goto(e),this.requestUpdate(),g(this,`started.`)}catch(e){console.error(e)}}static changeScene(){this.isSceneChanging()&&!this.isCurrentSceneBusy()&&(this._scene&&(this._scene.terminate(),this._lastScene=this._scene,this.startSceneTransition(15)),this._scene=this._nextScene,this._scene&&(this._scene.create(),this._nextScene=null,this._sceneStarted=!1))}static goto(e){if(e instanceof y)this._nextScene=e;else if(typeof e==`string`&&e!==``)this._manager&&(this._nextScene=this._manager.get(e));else if(typeof e==`function`)this._nextScene=new e;else if(this._manager){let e=Object.values(this._manager.scenes),t=e.length>0?e[0]:null;this._nextScene=this._manager.get(t)}this._scene&&this._scene.stop()}static init(){S.init(),w.init(),b.init(),this.setupEventHandlers()}static initGui(){this._gui=new h({title:`control panel`});let e=this._gui.add(this._options,`fps`);if(e.onChange(b.toggleFps.bind(b)),e.name(`show fps`),this._sceneSelector=this._gui.add(this._options,`scene`,this._manager?.scenes),this._sceneSelector.onChange(this.goto.bind(this)),this._sceneSelector.name(`scene`),this._sceneSelector.show(!!this._manager),this.loadOptions(this._gui),this._options.scene===``){let e=Object.values(this._manager?.scenes??{}),t=e.length>0?e[0]:null;this._sceneSelector.setValue(t)}this._gui.onFinishChange(this.saveOptions)}static initManager(e){this._manager=T(),e&&e.call(this._manager,this._manager),this._manager.finalize()}static isCurrentSceneBusy(){return!!this._scene&&this._scene.isBusy()}static isCurrentSceneStarted(){return!!this._scene&&this._sceneStarted}static isSceneChanging(){return!!this._nextScene}static loadOptions(e){try{let t=localStorage.getItem(`/:root`)??`{}`,n=JSON.parse(t);e.load(n,!0)}catch(e){console.error(e)}}static loop(e){try{for(this.tickStart(),this.setAccumulator((e-this._lastUpdateTime)/1e3);this._accumulator>=this._step;)this.updateInput(),this.updateGraphics(),this.changeScene(),this.updateScene(),this.updateFade(),this._accumulator-=this._step;this.renderScene(),this.setLastUpdateTime(e),this.tickEnd(),this.requestUpdate()}catch(e){console.error(e)}}static onResize(){this._scene&&this._scene.resize()}static renderScene(){b.clear(),this._fadeDuration>0?(b.context.save(),this._lastScene&&(b.context.globalAlpha=this._lastSceneOpacity,b.render(this._lastScene)),this._scene&&(b.context.globalAlpha=this._nextSceneOpacity,b.render(this._scene)),b.context.restore()):this._scene&&b.render(this._scene)}static requestUpdate(){this._stopped||requestAnimationFrame(this.loop.bind(this))}static saveOptions(t){try{if(t.controller instanceof e){let e=t.controller.parent.save(!0),n=JSON.stringify(e);localStorage.setItem(`/:root`,n)}}catch(e){console.error(e)}}static setAccumulator(e){this._accumulator+=e}static setLastUpdateTime(e){this._lastUpdateTime=e}static setupEventHandlers(){window.addEventListener(`resize`,this.onResize.bind(this))}static startSceneTransition(e){this._fadeDuration=e,this._lastSceneOpacity=1,this._nextSceneOpacity=0}static tickEnd(){b.tickEnd()}static tickStart(){b.tickStart()}static updateFade(){if(this._fadeDuration>0){let e=this._fadeDuration;this._lastSceneOpacity-=this._lastSceneOpacity/e,this._nextSceneOpacity+=(1-this._nextSceneOpacity)/e,this._fadeDuration--}}static updateGraphics(){b.update(this._step)}static updateInput(){S.update(this._step),w.update(this._step)}static updateScene(){this._scene&&(!this._sceneStarted&&this._scene.isReady()&&(this._scene.start(),this._sceneStarted=!0),this.isCurrentSceneStarted()&&this._scene.update(this._step))}},D=class extends y{_particles=Array(1e3);create(){for(let e=0;e<this._particles.length;e++){let t=_(50,501),n=_(0,361)*Math.PI/180,r=_(10,51),i=_(r,this.width-r+1),a=_(r,this.height-r+1),o=_(0,361);this._particles[e]={hue:o,size:r,x:i,y:a,velocity:{x:t*Math.cos(n),y:t*Math.sin(n)}}}}draw(e){e.clearRect(0,0,this.width,this.height),e.save();for(let t of this._particles)e.beginPath(),e.arc(t.x,t.y,t.size,0,Math.PI*2),e.closePath(),e.fillStyle=`hsl(${t.hue}, 100%, 50%)`,e.fill();e.restore()}update(e){for(let t of this._particles)t.x+=t.velocity.x*e,t.y+=t.velocity.y*e,(t.x<t.size||t.x>this.width-t.size)&&(t.x=Math.max(Math.min(t.x,this.width-t.size),t.size),t.velocity.x=-t.velocity.x),(t.y<t.size||t.y>this.height-t.size)&&(t.y=Math.max(Math.min(t.y,this.height-t.size),t.size),t.velocity.y=-t.velocity.y)}},O=Math.PI*2,k=class extends y{_pieAngle=0;_pieDuration=0;_pieHue=0;_pieRadius=10;_pieSpeed={x:0,y:0};_particleCount=1e4;_particles=[];create(){this.startPieCreation()}update(e){this.updateParticles(e),this.updatePie()}draw(e){e.clearRect(0,0,this.width,this.height),this.drawParticles(e),this.drawPie(e)}drawParticles(e){e.save();for(let t of this._particles)e.beginPath(),e.arc(t.x,t.y,t.size,0,Math.PI*2),e.closePath(),e.fillStyle=`hsl(${t.hue}, 100%, 50%)`,e.fill();e.restore()}drawPie(e){if(this._particles.length<this._particleCount){e.save(),e.font=`bold 24px Consolas`;let t=this._particles.length.toString(),n=e.measureText(t),r=(this.width-n.width)/2,i=(this.height-n.alphabeticBaseline)/2;e.fillStyle=`white`,e.fillText(t,r,i),e.strokeStyle=`black`,e.strokeText(t,r,i),e.save(),e.beginPath(),e.moveTo(this.width/2,this.height/2),e.arc(this.width/2,this.height/2,this._pieRadius,0,this._pieAngle),e.lineTo(this.width/2,this.height/2),e.closePath(),e.save(),e.strokeStyle=`hsl(${this._pieHue}, 100%, 50%)`,e.stroke(),e.restore()}}pushParticle(){this._particles.push({x:this.width/2,y:this.height/2,velocity:{x:this._pieSpeed.x,y:this._pieSpeed.y},size:this._pieRadius,hue:this._pieHue})}startPieCreation(){let e=_(0,361)*Math.PI/180,t=_(10,100);this._pieAngle=0,this._pieDuration=1,this._pieHue=_(0,361),this._pieRadius=_(10,60),this._pieSpeed={x:Math.cos(e)*t,y:Math.sin(e)*t}}updateParticles(e){for(let t of this._particles)t.x+=t.velocity.x*e,t.y+=t.velocity.y*e,(t.x<t.size||t.x>this.width-t.size)&&(t.x=Math.max(Math.min(t.x,this.width-t.size),t.size),t.velocity.x=-t.velocity.x),(t.y<t.size||t.y>this.height-t.size)&&(t.y=Math.max(Math.min(t.y,this.height-t.size),t.size),t.velocity.y=-t.velocity.y)}updatePie(){if(this._particles.length<this._particleCount)if(this._pieDuration>0){let e=this._pieDuration;this._pieAngle+=(O-this._pieAngle)/e,this._pieDuration--}else this.pushParticle(),this.startPieCreation()}},A=8,j=8,M=class extends y{_cellHeight=0;_cells=[];_cellSelectInterval=0;_cellWidth=0;_selectedCells=[];_selectedCellCount=Math.floor(A*j/2);create(){for(let e=0;e<j;e++){let e=[];for(let t=0;t<A;t++)e.push({hue:v(0,360),sat:100,lum:50});this._cells.push(e)}this._cellWidth=this.width/A,this._cellHeight=this.height/j}draw(e){e.clearRect(0,0,this.width,this.height),e.save();for(let t=0;t<this._cells.length;t++)for(let n=0;n<this._cells[t].length;n++){let r=this._cells[t][n],i=n*this._cellWidth,a=t*this._cellHeight;e.fillStyle=`hsl(${r.hue}, ${r.sat}%, ${r.lum}%)`,e.fillRect(i,a,this._cellWidth,this._cellHeight)}e.restore()}resize(){super.resize(),this._cellWidth=this.width/A,this._cellHeight=this.height/j}update(e){if(this._cellSelectInterval<0){this._selectedCells.splice(0);for(let e=0;e<this._selectedCellCount;e++){let e=_(0,A),t=_(0,j);this._selectedCells.push({x:e,y:t})}this._cellSelectInterval=3}for(let t of this._selectedCells){let n=this._cells[t.y][t.x];n.hue=(n.hue+60*e)%360}this._cellSelectInterval-=1*e}};E.run(e=>{e.register(M,`57fe0d3ee1b34399b464053e459eb18d`),e.register(D,`841e5a91ffaf4432b3db034b520a2d52`),e.register(k,`460e07675b054958b8bdcb57628b2c53`)});
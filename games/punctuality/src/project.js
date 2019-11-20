window.__require=function e(t,i,c){function s(o,r){if(!i[o]){if(!t[o]){var a=o.split("/");if(a=a[a.length-1],!t[a]){var u="function"==typeof __require&&__require;if(!r&&u)return u(a,!0);if(n)return n(a,!0);throw new Error("Cannot find module '"+o+"'")}}var d=i[o]={exports:{}};t[o][0].call(d.exports,function(e){return s(t[o][1][e]||e)},d,d.exports,e,t,i,c)}return i[o].exports}for(var n="function"==typeof __require&&__require,o=0;o<c.length;o++)s(c[o]);return s}({CaptureWeb:[function(e,t,i){"use strict";cc._RF.push(t,"1f2d1LENytOzqVuUB752zdo","CaptureWeb"),cc.Class({extends:cc.Component,properties:{hideNodes:{type:cc.Node,default:[]},maskNode:{type:cc.Node,default:null},qrImg:cc.Node},onLoad:function(){this.maskNode.active=!1,this.qrImg.active=!1},onEnable:function(){},onDisable:function(){},cap:function(){var e=this;for(var t in this.hideNodes)this.hideNodes[t].active=!1;this.qrImg.active=!0,cc.director.once(cc.Director.EVENT_AFTER_DRAW,function(){var t=document.getElementById("GameCanvas").toDataURL(),i=new Image;i.src=t,e.maskNode.active=!0,e.addLongPress(i)})},capture:function(){var e=document.getElementById("GameCanvas").toDataURL("image/jpeg"),t=document.createElement("img");return t.src=e,t},addLongPress:function(e){var t=document.getElementById("Cocos2dGameContainer");e.id="QRCode",e.alt="bigImg";var i=parseInt(t.style.width.replace(/px/,""))/1080,c=parseInt(t.style.height.replace(/px/,""))/1920;e.width=this.node.width*i*.8,e.height=this.node.height*c*.8,e.style.position="absolute",e.style.top=.12*parseInt(t.style.height.replace(/px/,""))+"px",e.style.left=parseInt(t.style.width.replace(/px/,""))/2-e.width/2+"px",t.appendChild(e)},removeLongPress:function(){var e=document.getElementById("Cocos2dGameContainer"),t=document.getElementById("QRCode");t&&e.removeChild(t)}}),cc._RF.pop()},{}],game:[function(e,t,i){"use strict";cc._RF.push(t,"c7717BjuiBOfo1hyI2ikGiF","game"),cc.Class({extends:cc.Component,properties:{questionNode:cc.Node,scoreNode:cc.Node,resultNode:cc.Node,shareBtn:cc.Node},onLoad:function(){this.scores=[[2,1,3],[1,3,2],[1,3,2],[1,2,3]],this.results=[[4,5],[6,8],[9,11],[12,12]],this.shareBtn.active=!1},start:function(){this.curIdx=0,this.maxIdx=this.scores.length,this.score=0,this.resultNode.active=!1,this.playQuestIn()},playQuestIn:function(){this.scoreNode.active=!1,this.questionNode.active=!0,this.questionNode.getComponent("spriteSwitcher").switchFrame(this.curIdx),this.questionNode.getComponent(cc.Animation).play("quest-in")},playScore:function(e){this.scoreNode.active=!0,this.questionNode.active=!1,this.scoreNode.getComponent("spriteSwitcher").switchFrame(3*this.curIdx+e-1),this.scoreNode.getComponent(cc.Animation).play("score-in")},playResult:function(){var e=this;this.scoreNode.active=!1,this.questionNode.active=!1,this.resultNode.active=!0;var t=0;for(var i in this.results){var c=this.results[i][0],s=this.results[i][1];if(this.score>=c&&this.score<=s){t=i;break}}this.resultNode.getComponent("spriteSwitcher").switchFrame(t);var n=this.resultNode.getComponent(cc.Animation);n.on(cc.Animation.EventType.FINISHED,function(){e.shareBtn.active=!0}),n.play("result-in")},onOptionClick:function(e,t){var i=parseInt(t),c=this.scores[this.curIdx][i-1];this.score+=c,this.playScore(i)},onNextClick:function(e){this.curIdx+=1,this.curIdx==this.maxIdx?this.playResult():this.playQuestIn()}}),cc._RF.pop()},{}],index:[function(e,t,i){"use strict";cc._RF.push(t,"e01c2SHv7BKbbXnd5ZbAfVQ","index"),cc.Class({extends:cc.Component,properties:{music:{type:cc.AudioClip,default:null},clockNode:{type:cc.Node,default:null}},onLoad:function(){var e=this;this.loadEnded=!1,this.clockNode.opacity=0,cc.director.preloadScene("game",function(t,i){e.clockNode.opacity=t/i*255},function(){e.loadEnded=!0})},start:function(){},onClickEnter:function(){this.loadEnded&&(cc.director.loadScene("game"),cc.audioEngine.playMusic(this.music,!0))}}),cc._RF.pop()},{}],music:[function(e,t,i){"use strict";cc._RF.push(t,"33bd8iEUmtJJKkdj5jaxea3","music"),cc.Class({extends:cc.Component,properties:{sign:cc.Node},onLoad:function(){this.isMusicOn=!0},start:function(){var e=this;this.schedule(function(){e.playMusicSign()},1.5)},playMusicSign:function(){if(this.isMusicOn){var e=this.sign;e.stopAllActions(),e.x=0,e.y=0,e.opacity=255;var t=(60*Math.random()-30)*Math.PI/180,i=100*Math.sin(t),c=100*Math.cos(t),s=cc.moveTo(1,i,c),n=cc.fadeOut(1),o=cc.rotateBy(1,180),r=cc.scaleTo(1,.8),a=cc.spawn(s,n,o,r);e.runAction(a)}},onClickMusic:function(){cc.audioEngine.isMusicPlaying()?(cc.audioEngine.pauseMusic(),this.isMusicOn=!1,this.node.angle=0):(cc.audioEngine.resumeMusic(),this.isMusicOn=!0)},update:function(){this.isMusicOn&&(this.node.angle+=1,this.node.angle>360&&(this.node.angle=0))}}),cc._RF.pop()},{}],spriteSwitcher:[function(e,t,i){"use strict";cc._RF.push(t,"e492aCpsdVOoKD5uJE70m12","spriteSwitcher"),cc.Class({extends:cc.Component,properties:{sprites:[cc.Sprite],frames:[cc.SpriteFrame]},start:function(){},switchFrame:function(e){for(var t=this.sprites.length,i=e*t,c=0;c<t;c++)this.sprites[c].spriteFrame=this.frames[i+c]}}),cc._RF.pop()},{}]},{},["CaptureWeb","game","index","music","spriteSwitcher"]);
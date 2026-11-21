(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wc="169",$h=0,Bl=1,Wh=2,au=1,su=2,ai=3,Ri=0,cn=1,jn=2,wi=0,qi=1,vs=2,Hl=3,Gl=4,qh=5,Hi=100,Xh=101,jh=102,Yh=103,Kh=104,Zh=200,Jh=201,Qh=202,ef=203,Xo=204,jo=205,tf=206,nf=207,af=208,sf=209,rf=210,of=211,cf=212,lf=213,df=214,Yo=0,Ko=1,Zo=2,Da=3,Jo=4,Qo=5,ec=6,tc=7,qc=0,uf=1,hf=2,Ai=0,ff=1,pf=2,mf=3,ru=4,gf=5,vf=6,_f=7,ou=300,Na=301,Ua=302,nc=303,ic=304,Gr=306,Yi=1e3,$i=1001,ac=1002,Cn=1003,bf=1004,zs=1005,kn=1006,ro=1007,Wi=1008,ui=1009,cu=1010,lu=1011,_s=1012,Xc=1013,Ki=1014,ri=1015,Rs=1016,jc=1017,Yc=1018,za=1020,du=35902,uu=1021,hu=1022,Gn=1023,fu=1024,pu=1025,Ca=1026,Oa=1027,mu=1028,Kc=1029,gu=1030,Zc=1031,Jc=1033,pr=33776,mr=33777,gr=33778,vr=33779,sc=35840,rc=35841,oc=35842,cc=35843,lc=36196,dc=37492,uc=37496,hc=37808,fc=37809,pc=37810,mc=37811,gc=37812,vc=37813,_c=37814,bc=37815,xc=37816,Sc=37817,yc=37818,Mc=37819,Ec=37820,wc=37821,_r=36492,Ac=36494,Tc=36495,vu=36283,Rc=36284,Cc=36285,Pc=36286,xf=3200,Sf=3201,Qc=0,yf=1,Mi="",Xt="srgb",Ci="srgb-linear",el="display-p3",Vr="display-p3-linear",Rr="linear",bt="srgb",Cr="rec709",Pr="p3",aa=7680,Vl=519,Mf=512,Ef=513,wf=514,_u=515,Af=516,Tf=517,Rf=518,Cf=519,Ic=35044,$l="300 es",oi=2e3,Ir=2001;class Va{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const s=a.indexOf(t);s!==-1&&a.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wl=1234567;const fs=Math.PI/180,bs=180/Math.PI;function li(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function on(n,e,t){return Math.max(e,Math.min(t,n))}function tl(n,e){return(n%e+e)%e}function Pf(n,e,t,i,a){return i+(n-e)*(a-i)/(t-e)}function If(n,e,t){return n!==e?(t-n)/(e-n):0}function ps(n,e,t){return(1-t)*n+t*e}function Lf(n,e,t,i){return ps(n,e,1-Math.exp(-t*i))}function Df(n,e=1){return e-Math.abs(tl(n,e*2)-e)}function Nf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Uf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function zf(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Of(n,e){return n+Math.random()*(e-n)}function Ff(n){return n*(.5-Math.random())}function kf(n){n!==void 0&&(Wl=n);let e=Wl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Bf(n){return n*fs}function Hf(n){return n*bs}function Gf(n){return(n&n-1)===0&&n!==0}function Vf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function $f(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Wf(n,e,t,i,a){const s=Math.cos,r=Math.sin,o=s(t/2),c=r(t/2),l=s((e+i)/2),d=r((e+i)/2),h=s((e-i)/2),u=r((e-i)/2),f=s((i-e)/2),v=r((i-e)/2);switch(a){case"XYX":n.set(o*d,c*h,c*u,o*l);break;case"YZY":n.set(c*u,o*d,c*h,o*l);break;case"ZXZ":n.set(c*h,c*u,o*d,o*l);break;case"XZX":n.set(o*d,c*v,c*f,o*l);break;case"YXY":n.set(c*f,o*d,c*v,o*l);break;case"ZYZ":n.set(c*v,c*f,o*d,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function Bn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ut(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const sa={DEG2RAD:fs,RAD2DEG:bs,generateUUID:li,clamp:on,euclideanModulo:tl,mapLinear:Pf,inverseLerp:If,lerp:ps,damp:Lf,pingpong:Df,smoothstep:Nf,smootherstep:Uf,randInt:zf,randFloat:Of,randFloatSpread:Ff,seededRandom:kf,degToRad:Bf,radToDeg:Hf,isPowerOfTwo:Gf,ceilPowerOfTwo:Vf,floorPowerOfTwo:$f,setQuaternionFromProperEuler:Wf,normalize:ut,denormalize:Bn};class Be{constructor(e=0,t=0){Be.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6],this.y=a[1]*t+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(on(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),a=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*a+e.x,this.y=s*a+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class je{constructor(e,t,i,a,s,r,o,c,l){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,a,s,r,o,c,l)}set(e,t,i,a,s,r,o,c,l){const d=this.elements;return d[0]=e,d[1]=a,d[2]=o,d[3]=t,d[4]=s,d[5]=c,d[6]=i,d[7]=r,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,s=this.elements,r=i[0],o=i[3],c=i[6],l=i[1],d=i[4],h=i[7],u=i[2],f=i[5],v=i[8],b=a[0],m=a[3],p=a[6],E=a[1],S=a[4],w=a[7],L=a[2],R=a[5],T=a[8];return s[0]=r*b+o*E+c*L,s[3]=r*m+o*S+c*R,s[6]=r*p+o*w+c*T,s[1]=l*b+d*E+h*L,s[4]=l*m+d*S+h*R,s[7]=l*p+d*w+h*T,s[2]=u*b+f*E+v*L,s[5]=u*m+f*S+v*R,s[8]=u*p+f*w+v*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*r*d-t*o*l-i*s*d+i*o*c+a*s*l-a*r*c}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=d*r-o*l,u=o*c-d*s,f=l*s-r*c,v=t*h+i*u+a*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/v;return e[0]=h*b,e[1]=(a*l-d*i)*b,e[2]=(o*i-a*r)*b,e[3]=u*b,e[4]=(d*t-a*c)*b,e[5]=(a*s-o*t)*b,e[6]=f*b,e[7]=(i*c-l*t)*b,e[8]=(r*t-i*s)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,a,s,r,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*r+l*o)+r+e,-a*l,a*c,-a*(-l*r+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(oo.makeScale(e,t)),this}rotate(e){return this.premultiply(oo.makeRotation(-e)),this}translate(e,t){return this.premultiply(oo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<9;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const oo=new je;function bu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function xs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function qf(){const n=xs("canvas");return n.style.display="block",n}const ql={};function br(n){n in ql||(ql[n]=!0,console.warn(n))}function Xf(n,e,t){return new Promise(function(i,a){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:a();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function jf(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Yf(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Xl=new je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),jl=new je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ja={[Ci]:{transfer:Rr,primaries:Cr,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[Xt]:{transfer:bt,primaries:Cr,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Vr]:{transfer:Rr,primaries:Pr,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(jl),fromReference:n=>n.applyMatrix3(Xl)},[el]:{transfer:bt,primaries:Pr,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(jl),fromReference:n=>n.applyMatrix3(Xl).convertLinearToSRGB()}},Kf=new Set([Ci,Vr]),ot={enabled:!0,_workingColorSpace:Ci,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Kf.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=ja[e].toReference,a=ja[t].fromReference;return a(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return ja[n].primaries},getTransfer:function(n){return n===Mi?Rr:ja[n].transfer},getLuminanceCoefficients:function(n,e=this._workingColorSpace){return n.fromArray(ja[e].luminanceCoefficients)}};function Pa(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function co(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ra;class Zf{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ra===void 0&&(ra=xs("canvas")),ra.width=e.width,ra.height=e.height;const i=ra.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ra}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=xs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=Pa(s[r]/255)*255;return i.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Pa(t[i]/255)*255):t[i]=Pa(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jf=0;class xu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=li(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(lo(a[r].image)):s.push(lo(a[r]))}else s=lo(a);i.url=s}return t||(e.images[this.uuid]=i),i}}function lo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Zf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qf=0;class tn extends Va{constructor(e=tn.DEFAULT_IMAGE,t=tn.DEFAULT_MAPPING,i=$i,a=$i,s=kn,r=Wi,o=Gn,c=ui,l=tn.DEFAULT_ANISOTROPY,d=Mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=li(),this.name="",this.source=new xu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Be(0,0),this.repeat=new Be(1,1),this.center=new Be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ou)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Yi:e.x=e.x-Math.floor(e.x);break;case $i:e.x=e.x<0?0:1;break;case ac:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Yi:e.y=e.y-Math.floor(e.y);break;case $i:e.y=e.y<0?0:1;break;case ac:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=ou;tn.DEFAULT_ANISOTROPY=1;class At{constructor(e=0,t=0,i=0,a=1){At.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,a){return this.x=e,this.y=t,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*t+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*t+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*t+r[7]*i+r[11]*a+r[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,a,s;const c=e.elements,l=c[0],d=c[4],h=c[8],u=c[1],f=c[5],v=c[9],b=c[2],m=c[6],p=c[10];if(Math.abs(d-u)<.01&&Math.abs(h-b)<.01&&Math.abs(v-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+b)<.1&&Math.abs(v+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,w=(f+1)/2,L=(p+1)/2,R=(d+u)/4,T=(h+b)/4,D=(v+m)/4;return S>w&&S>L?S<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(S),a=R/i,s=T/i):w>L?w<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(w),i=R/a,s=D/a):L<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(L),i=T/s,a=D/s),this.set(i,a,s,t),this}let E=Math.sqrt((m-v)*(m-v)+(h-b)*(h-b)+(u-d)*(u-d));return Math.abs(E)<.001&&(E=1),this.x=(m-v)/E,this.y=(h-b)/E,this.z=(u-d)/E,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ep extends Va{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new At(0,0,e,t),this.scissorTest=!1,this.viewport=new At(0,0,e,t);const a={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new tn(a,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,a=e.textures.length;i<a;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new xu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zi extends ep{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Su extends tn{constructor(e=null,t=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=$i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class tp extends tn{constructor(e=null,t=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=$i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cs{constructor(e=0,t=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=a}static slerpFlat(e,t,i,a,s,r,o){let c=i[a+0],l=i[a+1],d=i[a+2],h=i[a+3];const u=s[r+0],f=s[r+1],v=s[r+2],b=s[r+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=v,e[t+3]=b;return}if(h!==b||c!==u||l!==f||d!==v){let m=1-o;const p=c*u+l*f+d*v+h*b,E=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const L=Math.sqrt(S),R=Math.atan2(L,p*E);m=Math.sin(m*R)/L,o=Math.sin(o*R)/L}const w=o*E;if(c=c*m+u*w,l=l*m+f*w,d=d*m+v*w,h=h*m+b*w,m===1-o){const L=1/Math.sqrt(c*c+l*l+d*d+h*h);c*=L,l*=L,d*=L,h*=L}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,a,s,r){const o=i[a],c=i[a+1],l=i[a+2],d=i[a+3],h=s[r],u=s[r+1],f=s[r+2],v=s[r+3];return e[t]=o*v+d*h+c*f-l*u,e[t+1]=c*v+d*u+l*h-o*f,e[t+2]=l*v+d*f+o*u-c*h,e[t+3]=d*v-o*h-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,a){return this._x=e,this._y=t,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,a=e._y,s=e._z,r=e._order,o=Math.cos,c=Math.sin,l=o(i/2),d=o(a/2),h=o(s/2),u=c(i/2),f=c(a/2),v=c(s/2);switch(r){case"XYZ":this._x=u*d*h+l*f*v,this._y=l*f*h-u*d*v,this._z=l*d*v+u*f*h,this._w=l*d*h-u*f*v;break;case"YXZ":this._x=u*d*h+l*f*v,this._y=l*f*h-u*d*v,this._z=l*d*v-u*f*h,this._w=l*d*h+u*f*v;break;case"ZXY":this._x=u*d*h-l*f*v,this._y=l*f*h+u*d*v,this._z=l*d*v+u*f*h,this._w=l*d*h-u*f*v;break;case"ZYX":this._x=u*d*h-l*f*v,this._y=l*f*h+u*d*v,this._z=l*d*v-u*f*h,this._w=l*d*h+u*f*v;break;case"YZX":this._x=u*d*h+l*f*v,this._y=l*f*h+u*d*v,this._z=l*d*v-u*f*h,this._w=l*d*h-u*f*v;break;case"XZY":this._x=u*d*h-l*f*v,this._y=l*f*h-u*d*v,this._z=l*d*v+u*f*h,this._w=l*d*h+u*f*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],a=t[4],s=t[8],r=t[1],o=t[5],c=t[9],l=t[2],d=t[6],h=t[10],u=i+o+h;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-c)*f,this._y=(s-l)*f,this._z=(r-a)*f}else if(i>o&&i>h){const f=2*Math.sqrt(1+i-o-h);this._w=(d-c)/f,this._x=.25*f,this._y=(a+r)/f,this._z=(s+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-i-h);this._w=(s-l)/f,this._x=(a+r)/f,this._y=.25*f,this._z=(c+d)/f}else{const f=2*Math.sqrt(1+h-i-o);this._w=(r-a)/f,this._x=(s+l)/f,this._y=(c+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(on(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,t/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,a=e._y,s=e._z,r=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=i*d+r*o+a*l-s*c,this._y=a*d+r*c+s*o-i*l,this._z=s*d+r*l+i*c-a*o,this._w=r*d-i*o-a*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,a=this._y,s=this._z,r=this._w;let o=r*e._w+i*e._x+a*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=i,this._y=a,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*r+t*this._w,this._x=f*i+t*this._x,this._y=f*a+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),d=Math.atan2(l,o),h=Math.sin((1-t)*d)/l,u=Math.sin(t*d)/l;return this._w=r*h+this._w*u,this._x=i*h+this._x*u,this._y=a*h+this._y*u,this._z=s*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*a,this.y=s[1]*t+s[4]*i+s[7]*a,this.z=s[2]*t+s[5]*i+s[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,s=e.elements,r=1/(s[3]*t+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*t+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*t+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,a=this.z,s=e.x,r=e.y,o=e.z,c=e.w,l=2*(r*a-o*i),d=2*(o*t-s*a),h=2*(s*i-r*t);return this.x=t+c*l+r*h-o*d,this.y=i+c*d+o*l-s*h,this.z=a+c*h+s*d-r*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*a,this.y=s[1]*t+s[5]*i+s[9]*a,this.z=s[2]*t+s[6]*i+s[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,a=e.y,s=e.z,r=t.x,o=t.y,c=t.z;return this.x=a*c-s*o,this.y=s*r-i*c,this.z=i*o-a*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return uo.copy(this).projectOnVector(e),this.sub(uo)}reflect(e){return this.sub(uo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(on(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return t*t+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const a=Math.sin(t)*e;return this.x=a*Math.sin(i),this.y=Math.cos(t)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const uo=new U,Yl=new Cs;class Ps{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,Nn):Nn.fromBufferAttribute(s,r),Nn.applyMatrix4(e.matrixWorld),this.expandByPoint(Nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Os.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Os.copy(i.boundingBox)),Os.applyMatrix4(e.matrixWorld),this.union(Os)}const a=e.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Nn),Nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ya),Fs.subVectors(this.max,Ya),oa.subVectors(e.a,Ya),ca.subVectors(e.b,Ya),la.subVectors(e.c,Ya),pi.subVectors(ca,oa),mi.subVectors(la,ca),Ii.subVectors(oa,la);let t=[0,-pi.z,pi.y,0,-mi.z,mi.y,0,-Ii.z,Ii.y,pi.z,0,-pi.x,mi.z,0,-mi.x,Ii.z,0,-Ii.x,-pi.y,pi.x,0,-mi.y,mi.x,0,-Ii.y,Ii.x,0];return!ho(t,oa,ca,la,Fs)||(t=[1,0,0,0,1,0,0,0,1],!ho(t,oa,ca,la,Fs))?!1:(ks.crossVectors(pi,mi),t=[ks.x,ks.y,ks.z],ho(t,oa,ca,la,Fs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Qn=[new U,new U,new U,new U,new U,new U,new U,new U],Nn=new U,Os=new Ps,oa=new U,ca=new U,la=new U,pi=new U,mi=new U,Ii=new U,Ya=new U,Fs=new U,ks=new U,Li=new U;function ho(n,e,t,i,a){for(let s=0,r=n.length-3;s<=r;s+=3){Li.fromArray(n,s);const o=a.x*Math.abs(Li.x)+a.y*Math.abs(Li.y)+a.z*Math.abs(Li.z),c=e.dot(Li),l=t.dot(Li),d=i.dot(Li);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const np=new Ps,Ka=new U,fo=new U;class nl{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):np.setFromPoints(e).getCenter(i);let a=0;for(let s=0,r=e.length;s<r;s++)a=Math.max(a,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ka.subVectors(e,this.center);const t=Ka.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),a=(i-this.radius)*.5;this.center.addScaledVector(Ka,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ka.copy(e.center).add(fo)),this.expandByPoint(Ka.copy(e.center).sub(fo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ei=new U,po=new U,Bs=new U,gi=new U,mo=new U,Hs=new U,go=new U;class yu{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,i,a){po.copy(e).add(t).multiplyScalar(.5),Bs.copy(t).sub(e).normalize(),gi.copy(this.origin).sub(po);const s=e.distanceTo(t)*.5,r=-this.direction.dot(Bs),o=gi.dot(this.direction),c=-gi.dot(Bs),l=gi.lengthSq(),d=Math.abs(1-r*r);let h,u,f,v;if(d>0)if(h=r*c-o,u=r*o-c,v=s*d,h>=0)if(u>=-v)if(u<=v){const b=1/d;h*=b,u*=b,f=h*(h+r*u+2*o)+u*(r*h+u+2*c)+l}else u=s,h=Math.max(0,-(r*u+o)),f=-h*h+u*(u+2*c)+l;else u=-s,h=Math.max(0,-(r*u+o)),f=-h*h+u*(u+2*c)+l;else u<=-v?(h=Math.max(0,-(-r*s+o)),u=h>0?-s:Math.min(Math.max(-s,-c),s),f=-h*h+u*(u+2*c)+l):u<=v?(h=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+l):(h=Math.max(0,-(r*s+o)),u=h>0?s:Math.min(Math.max(-s,-c),s),f=-h*h+u*(u+2*c)+l);else u=r>0?-s:s,h=Math.max(0,-(r*u+o)),f=-h*h+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),a&&a.copy(po).addScaledVector(Bs,u),f}intersectSphere(e,t){ei.subVectors(e.center,this.origin);const i=ei.dot(this.direction),a=ei.dot(ei)-i*i,s=e.radius*e.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,c=i+r;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,a,s,r,o,c;const l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,a=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,a=(e.min.x-u.x)*l),d>=0?(s=(e.min.y-u.y)*d,r=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,r=(e.min.y-u.y)*d),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),h>=0?(o=(e.min.z-u.z)*h,c=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,c=(e.min.z-u.z)*h),i>c||o>a)||((o>i||i!==i)&&(i=o),(c<a||a!==a)&&(a=c),a<0)?null:this.at(i>=0?i:a,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,i,a,s){mo.subVectors(t,e),Hs.subVectors(i,e),go.crossVectors(mo,Hs);let r=this.direction.dot(go),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;gi.subVectors(this.origin,e);const c=o*this.direction.dot(Hs.crossVectors(gi,Hs));if(c<0)return null;const l=o*this.direction.dot(mo.cross(gi));if(l<0||c+l>r)return null;const d=-o*gi.dot(go);return d<0?null:this.at(d/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class yt{constructor(e,t,i,a,s,r,o,c,l,d,h,u,f,v,b,m){yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,a,s,r,o,c,l,d,h,u,f,v,b,m)}set(e,t,i,a,s,r,o,c,l,d,h,u,f,v,b,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=a,p[1]=s,p[5]=r,p[9]=o,p[13]=c,p[2]=l,p[6]=d,p[10]=h,p[14]=u,p[3]=f,p[7]=v,p[11]=b,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,a=1/da.setFromMatrixColumn(e,0).length(),s=1/da.setFromMatrixColumn(e,1).length(),r=1/da.setFromMatrixColumn(e,2).length();return t[0]=i[0]*a,t[1]=i[1]*a,t[2]=i[2]*a,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,a=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),c=Math.cos(a),l=Math.sin(a),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const u=r*d,f=r*h,v=o*d,b=o*h;t[0]=c*d,t[4]=-c*h,t[8]=l,t[1]=f+v*l,t[5]=u-b*l,t[9]=-o*c,t[2]=b-u*l,t[6]=v+f*l,t[10]=r*c}else if(e.order==="YXZ"){const u=c*d,f=c*h,v=l*d,b=l*h;t[0]=u+b*o,t[4]=v*o-f,t[8]=r*l,t[1]=r*h,t[5]=r*d,t[9]=-o,t[2]=f*o-v,t[6]=b+u*o,t[10]=r*c}else if(e.order==="ZXY"){const u=c*d,f=c*h,v=l*d,b=l*h;t[0]=u-b*o,t[4]=-r*h,t[8]=v+f*o,t[1]=f+v*o,t[5]=r*d,t[9]=b-u*o,t[2]=-r*l,t[6]=o,t[10]=r*c}else if(e.order==="ZYX"){const u=r*d,f=r*h,v=o*d,b=o*h;t[0]=c*d,t[4]=v*l-f,t[8]=u*l+b,t[1]=c*h,t[5]=b*l+u,t[9]=f*l-v,t[2]=-l,t[6]=o*c,t[10]=r*c}else if(e.order==="YZX"){const u=r*c,f=r*l,v=o*c,b=o*l;t[0]=c*d,t[4]=b-u*h,t[8]=v*h+f,t[1]=h,t[5]=r*d,t[9]=-o*d,t[2]=-l*d,t[6]=f*h+v,t[10]=u-b*h}else if(e.order==="XZY"){const u=r*c,f=r*l,v=o*c,b=o*l;t[0]=c*d,t[4]=-h,t[8]=l*d,t[1]=u*h+b,t[5]=r*d,t[9]=f*h-v,t[2]=v*h-f,t[6]=o*d,t[10]=b*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ip,e,ap)}lookAt(e,t,i){const a=this.elements;return bn.subVectors(e,t),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),vi.crossVectors(i,bn),vi.lengthSq()===0&&(Math.abs(i.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),vi.crossVectors(i,bn)),vi.normalize(),Gs.crossVectors(bn,vi),a[0]=vi.x,a[4]=Gs.x,a[8]=bn.x,a[1]=vi.y,a[5]=Gs.y,a[9]=bn.y,a[2]=vi.z,a[6]=Gs.z,a[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,s=this.elements,r=i[0],o=i[4],c=i[8],l=i[12],d=i[1],h=i[5],u=i[9],f=i[13],v=i[2],b=i[6],m=i[10],p=i[14],E=i[3],S=i[7],w=i[11],L=i[15],R=a[0],T=a[4],D=a[8],j=a[12],_=a[1],y=a[5],G=a[9],W=a[13],Z=a[2],te=a[6],X=a[10],ne=a[14],Y=a[3],le=a[7],be=a[11],we=a[15];return s[0]=r*R+o*_+c*Z+l*Y,s[4]=r*T+o*y+c*te+l*le,s[8]=r*D+o*G+c*X+l*be,s[12]=r*j+o*W+c*ne+l*we,s[1]=d*R+h*_+u*Z+f*Y,s[5]=d*T+h*y+u*te+f*le,s[9]=d*D+h*G+u*X+f*be,s[13]=d*j+h*W+u*ne+f*we,s[2]=v*R+b*_+m*Z+p*Y,s[6]=v*T+b*y+m*te+p*le,s[10]=v*D+b*G+m*X+p*be,s[14]=v*j+b*W+m*ne+p*we,s[3]=E*R+S*_+w*Z+L*Y,s[7]=E*T+S*y+w*te+L*le,s[11]=E*D+S*G+w*X+L*be,s[15]=E*j+S*W+w*ne+L*we,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],a=e[8],s=e[12],r=e[1],o=e[5],c=e[9],l=e[13],d=e[2],h=e[6],u=e[10],f=e[14],v=e[3],b=e[7],m=e[11],p=e[15];return v*(+s*c*h-a*l*h-s*o*u+i*l*u+a*o*f-i*c*f)+b*(+t*c*f-t*l*u+s*r*u-a*r*f+a*l*d-s*c*d)+m*(+t*l*h-t*o*f-s*r*h+i*r*f+s*o*d-i*l*d)+p*(-a*o*d-t*c*h+t*o*u+a*r*h-i*r*u+i*c*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=e[9],u=e[10],f=e[11],v=e[12],b=e[13],m=e[14],p=e[15],E=h*m*l-b*u*l+b*c*f-o*m*f-h*c*p+o*u*p,S=v*u*l-d*m*l-v*c*f+r*m*f+d*c*p-r*u*p,w=d*b*l-v*h*l+v*o*f-r*b*f-d*o*p+r*h*p,L=v*h*c-d*b*c-v*o*u+r*b*u+d*o*m-r*h*m,R=t*E+i*S+a*w+s*L;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/R;return e[0]=E*T,e[1]=(b*u*s-h*m*s-b*a*f+i*m*f+h*a*p-i*u*p)*T,e[2]=(o*m*s-b*c*s+b*a*l-i*m*l-o*a*p+i*c*p)*T,e[3]=(h*c*s-o*u*s-h*a*l+i*u*l+o*a*f-i*c*f)*T,e[4]=S*T,e[5]=(d*m*s-v*u*s+v*a*f-t*m*f-d*a*p+t*u*p)*T,e[6]=(v*c*s-r*m*s-v*a*l+t*m*l+r*a*p-t*c*p)*T,e[7]=(r*u*s-d*c*s+d*a*l-t*u*l-r*a*f+t*c*f)*T,e[8]=w*T,e[9]=(v*h*s-d*b*s-v*i*f+t*b*f+d*i*p-t*h*p)*T,e[10]=(r*b*s-v*o*s+v*i*l-t*b*l-r*i*p+t*o*p)*T,e[11]=(d*o*s-r*h*s-d*i*l+t*h*l+r*i*f-t*o*f)*T,e[12]=L*T,e[13]=(d*b*a-v*h*a+v*i*u-t*b*u-d*i*m+t*h*m)*T,e[14]=(v*o*a-r*b*a-v*i*c+t*b*c+r*i*m-t*o*m)*T,e[15]=(r*h*a-d*o*a+d*i*c-t*h*c-r*i*u+t*o*u)*T,this}scale(e){const t=this.elements,i=e.x,a=e.y,s=e.z;return t[0]*=i,t[4]*=a,t[8]*=s,t[1]*=i,t[5]*=a,t[9]*=s,t[2]*=i,t[6]*=a,t[10]*=s,t[3]*=i,t[7]*=a,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,a))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),a=Math.sin(t),s=1-i,r=e.x,o=e.y,c=e.z,l=s*r,d=s*o;return this.set(l*r+i,l*o-a*c,l*c+a*o,0,l*o+a*c,d*o+i,d*c-a*r,0,l*c-a*o,d*c+a*r,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,a,s,r){return this.set(1,i,s,0,e,1,r,0,t,a,1,0,0,0,0,1),this}compose(e,t,i){const a=this.elements,s=t._x,r=t._y,o=t._z,c=t._w,l=s+s,d=r+r,h=o+o,u=s*l,f=s*d,v=s*h,b=r*d,m=r*h,p=o*h,E=c*l,S=c*d,w=c*h,L=i.x,R=i.y,T=i.z;return a[0]=(1-(b+p))*L,a[1]=(f+w)*L,a[2]=(v-S)*L,a[3]=0,a[4]=(f-w)*R,a[5]=(1-(u+p))*R,a[6]=(m+E)*R,a[7]=0,a[8]=(v+S)*T,a[9]=(m-E)*T,a[10]=(1-(u+b))*T,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,i){const a=this.elements;let s=da.set(a[0],a[1],a[2]).length();const r=da.set(a[4],a[5],a[6]).length(),o=da.set(a[8],a[9],a[10]).length();this.determinant()<0&&(s=-s),e.x=a[12],e.y=a[13],e.z=a[14],Un.copy(this);const l=1/s,d=1/r,h=1/o;return Un.elements[0]*=l,Un.elements[1]*=l,Un.elements[2]*=l,Un.elements[4]*=d,Un.elements[5]*=d,Un.elements[6]*=d,Un.elements[8]*=h,Un.elements[9]*=h,Un.elements[10]*=h,t.setFromRotationMatrix(Un),i.x=s,i.y=r,i.z=o,this}makePerspective(e,t,i,a,s,r,o=oi){const c=this.elements,l=2*s/(t-e),d=2*s/(i-a),h=(t+e)/(t-e),u=(i+a)/(i-a);let f,v;if(o===oi)f=-(r+s)/(r-s),v=-2*r*s/(r-s);else if(o===Ir)f=-r/(r-s),v=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,a,s,r,o=oi){const c=this.elements,l=1/(t-e),d=1/(i-a),h=1/(r-s),u=(t+e)*l,f=(i+a)*d;let v,b;if(o===oi)v=(r+s)*h,b=-2*h;else if(o===Ir)v=s*h,b=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=b,c[14]=-v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<16;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const da=new U,Un=new yt,ip=new U(0,0,0),ap=new U(1,1,1),vi=new U,Gs=new U,bn=new U,Kl=new yt,Zl=new Cs;class $n{constructor(e=0,t=0,i=0,a=$n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,a=this._order){return this._x=e,this._y=t,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const a=e.elements,s=a[0],r=a[4],o=a[8],c=a[1],l=a[5],d=a[9],h=a[2],u=a[6],f=a[10];switch(t){case"XYZ":this._y=Math.asin(on(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-on(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(on(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-on(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(on(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-on(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Kl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Kl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zl.setFromEuler(this),this.setFromQuaternion(Zl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$n.DEFAULT_ORDER="XYZ";class il{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let sp=0;const Jl=new U,ua=new Cs,ti=new yt,Vs=new U,Za=new U,rp=new U,op=new Cs,Ql=new U(1,0,0),ed=new U(0,1,0),td=new U(0,0,1),nd={type:"added"},cp={type:"removed"},ha={type:"childadded",child:null},vo={type:"childremoved",child:null};class $t extends Va{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sp++}),this.uuid=li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$t.DEFAULT_UP.clone();const e=new U,t=new $n,i=new Cs,a=new U(1,1,1);function s(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new yt},normalMatrix:{value:new je}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=$t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new il,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ua.setFromAxisAngle(e,t),this.quaternion.multiply(ua),this}rotateOnWorldAxis(e,t){return ua.setFromAxisAngle(e,t),this.quaternion.premultiply(ua),this}rotateX(e){return this.rotateOnAxis(Ql,e)}rotateY(e){return this.rotateOnAxis(ed,e)}rotateZ(e){return this.rotateOnAxis(td,e)}translateOnAxis(e,t){return Jl.copy(e).applyQuaternion(this.quaternion),this.position.add(Jl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ql,e)}translateY(e){return this.translateOnAxis(ed,e)}translateZ(e){return this.translateOnAxis(td,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Vs.copy(e):Vs.set(e,t,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Za.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(Za,Vs,this.up):ti.lookAt(Vs,Za,this.up),this.quaternion.setFromRotationMatrix(ti),a&&(ti.extractRotation(a.matrixWorld),ua.setFromRotationMatrix(ti),this.quaternion.premultiply(ua.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nd),ha.child=e,this.dispatchEvent(ha),ha.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(cp),vo.child=e,this.dispatchEvent(vo),vo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nd),ha.child=e,this.dispatchEvent(ha),ha.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Za,e,rp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Za,op,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));a.material=o}else a.material=s(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];a.animations.push(s(e.animations,c))}}if(t){const o=r(e.geometries),c=r(e.materials),l=r(e.textures),d=r(e.images),h=r(e.shapes),u=r(e.skeletons),f=r(e.animations),v=r(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),v.length>0&&(i.nodes=v)}return i.object=a,i;function r(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}$t.DEFAULT_UP=new U(0,1,0);$t.DEFAULT_MATRIX_AUTO_UPDATE=!0;$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zn=new U,ni=new U,_o=new U,ii=new U,fa=new U,pa=new U,id=new U,bo=new U,xo=new U,So=new U,yo=new At,Mo=new At,Eo=new At;class Rn{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,a){a.subVectors(i,t),zn.subVectors(e,t),a.cross(zn);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(e,t,i,a,s){zn.subVectors(a,t),ni.subVectors(i,t),_o.subVectors(e,t);const r=zn.dot(zn),o=zn.dot(ni),c=zn.dot(_o),l=ni.dot(ni),d=ni.dot(_o),h=r*l-o*o;if(h===0)return s.set(0,0,0),null;const u=1/h,f=(l*c-o*d)*u,v=(r*d-o*c)*u;return s.set(1-f-v,v,f)}static containsPoint(e,t,i,a){return this.getBarycoord(e,t,i,a,ii)===null?!1:ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getInterpolation(e,t,i,a,s,r,o,c){return this.getBarycoord(e,t,i,a,ii)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ii.x),c.addScaledVector(r,ii.y),c.addScaledVector(o,ii.z),c)}static getInterpolatedAttribute(e,t,i,a,s,r){return yo.setScalar(0),Mo.setScalar(0),Eo.setScalar(0),yo.fromBufferAttribute(e,t),Mo.fromBufferAttribute(e,i),Eo.fromBufferAttribute(e,a),r.setScalar(0),r.addScaledVector(yo,s.x),r.addScaledVector(Mo,s.y),r.addScaledVector(Eo,s.z),r}static isFrontFacing(e,t,i,a){return zn.subVectors(i,t),ni.subVectors(e,t),zn.cross(ni).dot(a)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,a){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,i,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zn.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),zn.cross(ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Rn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Rn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,a,s){return Rn.getInterpolation(e,this.a,this.b,this.c,t,i,a,s)}containsPoint(e){return Rn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Rn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,a=this.b,s=this.c;let r,o;fa.subVectors(a,i),pa.subVectors(s,i),bo.subVectors(e,i);const c=fa.dot(bo),l=pa.dot(bo);if(c<=0&&l<=0)return t.copy(i);xo.subVectors(e,a);const d=fa.dot(xo),h=pa.dot(xo);if(d>=0&&h<=d)return t.copy(a);const u=c*h-d*l;if(u<=0&&c>=0&&d<=0)return r=c/(c-d),t.copy(i).addScaledVector(fa,r);So.subVectors(e,s);const f=fa.dot(So),v=pa.dot(So);if(v>=0&&f<=v)return t.copy(s);const b=f*l-c*v;if(b<=0&&l>=0&&v<=0)return o=l/(l-v),t.copy(i).addScaledVector(pa,o);const m=d*v-f*h;if(m<=0&&h-d>=0&&f-v>=0)return id.subVectors(s,a),o=(h-d)/(h-d+(f-v)),t.copy(a).addScaledVector(id,o);const p=1/(m+b+u);return r=b*p,o=u*p,t.copy(i).addScaledVector(fa,r).addScaledVector(pa,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Mu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},$s={h:0,s:0,l:0};function wo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class We{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.toWorkingColorSpace(this,t),this}setRGB(e,t,i,a=ot.workingColorSpace){return this.r=e,this.g=t,this.b=i,ot.toWorkingColorSpace(this,a),this}setHSL(e,t,i,a=ot.workingColorSpace){if(e=tl(e,1),t=on(t,0,1),i=on(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,r=2*i-s;this.r=wo(r,s,e+1/3),this.g=wo(r,s,e),this.b=wo(r,s,e-1/3)}return ot.toWorkingColorSpace(this,a),this}setStyle(e,t=Xt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xt){const i=Mu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pa(e.r),this.g=Pa(e.g),this.b=Pa(e.b),this}copyLinearToSRGB(e){return this.r=co(e.r),this.g=co(e.g),this.b=co(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return ot.fromWorkingColorSpace(Zt.copy(this),e),Math.round(on(Zt.r*255,0,255))*65536+Math.round(on(Zt.g*255,0,255))*256+Math.round(on(Zt.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.fromWorkingColorSpace(Zt.copy(this),t);const i=Zt.r,a=Zt.g,s=Zt.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let c,l;const d=(o+r)/2;if(o===r)c=0,l=0;else{const h=r-o;switch(l=d<=.5?h/(r+o):h/(2-r-o),r){case i:c=(a-s)/h+(a<s?6:0);break;case a:c=(s-i)/h+2;break;case s:c=(i-a)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=ot.workingColorSpace){return ot.fromWorkingColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=Xt){ot.fromWorkingColorSpace(Zt.copy(this),e);const t=Zt.r,i=Zt.g,a=Zt.b;return e!==Xt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,t,i){return this.getHSL(_i),this.setHSL(_i.h+e,_i.s+t,_i.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(_i),e.getHSL($s);const i=ps(_i.h,$s.h,t),a=ps(_i.s,$s.s,t),s=ps(_i.l,$s.l,t);return this.setHSL(i,a,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,a=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*a,this.g=s[1]*t+s[4]*i+s[7]*a,this.b=s[2]*t+s[5]*i+s[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new We;We.NAMES=Mu;let lp=0;class ta extends Va{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=li(),this.name="",this.type="Material",this.blending=qi,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xo,this.blendDst=jo,this.blendEquation=Hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=Da,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=aa,this.stencilZFail=aa,this.stencilZPass=aa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==qi&&(i.blending=this.blending),this.side!==Ri&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Xo&&(i.blendSrc=this.blendSrc),this.blendDst!==jo&&(i.blendDst=this.blendDst),this.blendEquation!==Hi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Da&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==aa&&(i.stencilFail=this.stencilFail),this.stencilZFail!==aa&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==aa&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const c=s[o];delete c.metadata,r.push(c)}return r}if(t){const s=a(e.textures),r=a(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const a=t.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Oe extends ta{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=qc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pt=new U,Ws=new Be;class Pn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ic,this.updateRanges=[],this.gpuType=ri,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[e+a]=t.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ws.fromBufferAttribute(this,t),Ws.applyMatrix3(e),this.setXY(t,Ws.x,Ws.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Bn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ut(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,a){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array),a=ut(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,t,i,a,s){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array),a=ut(a,this.array),s=ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ic&&(e.usage=this.usage),e}}class Eu extends Pn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class wu extends Pn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ot extends Pn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let dp=0;const wn=new yt,Ao=new $t,ma=new U,xn=new Ps,Ja=new Ps,Bt=new U;class Mn extends Va{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=li(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bu(e)?wu:Eu)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return wn.makeRotationFromQuaternion(e),this.applyMatrix4(wn),this}rotateX(e){return wn.makeRotationX(e),this.applyMatrix4(wn),this}rotateY(e){return wn.makeRotationY(e),this.applyMatrix4(wn),this}rotateZ(e){return wn.makeRotationZ(e),this.applyMatrix4(wn),this}translate(e,t,i){return wn.makeTranslation(e,t,i),this.applyMatrix4(wn),this}scale(e,t,i){return wn.makeScale(e,t,i),this.applyMatrix4(wn),this}lookAt(e){return Ao.lookAt(e),Ao.updateMatrix(),this.applyMatrix4(Ao.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ma).negate(),this.translate(ma.x,ma.y,ma.z),this}setFromPoints(e){const t=[];for(let i=0,a=e.length;i<a;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ot(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ps);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,a=t.length;i<a;i++){const s=t[i];xn.setFromBufferAttribute(s),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(xn.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){const o=t[s];Ja.setFromBufferAttribute(o),this.morphTargetsRelative?(Bt.addVectors(xn.min,Ja.min),xn.expandByPoint(Bt),Bt.addVectors(xn.max,Ja.max),xn.expandByPoint(Bt)):(xn.expandByPoint(Ja.min),xn.expandByPoint(Ja.max))}xn.getCenter(i);let a=0;for(let s=0,r=e.count;s<r;s++)Bt.fromBufferAttribute(e,s),a=Math.max(a,i.distanceToSquared(Bt));if(t)for(let s=0,r=t.length;s<r;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Bt.fromBufferAttribute(o,l),c&&(ma.fromBufferAttribute(e,l),Bt.add(ma)),a=Math.max(a,i.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,a=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pn(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],c=[];for(let D=0;D<i.count;D++)o[D]=new U,c[D]=new U;const l=new U,d=new U,h=new U,u=new Be,f=new Be,v=new Be,b=new U,m=new U;function p(D,j,_){l.fromBufferAttribute(i,D),d.fromBufferAttribute(i,j),h.fromBufferAttribute(i,_),u.fromBufferAttribute(s,D),f.fromBufferAttribute(s,j),v.fromBufferAttribute(s,_),d.sub(l),h.sub(l),f.sub(u),v.sub(u);const y=1/(f.x*v.y-v.x*f.y);isFinite(y)&&(b.copy(d).multiplyScalar(v.y).addScaledVector(h,-f.y).multiplyScalar(y),m.copy(h).multiplyScalar(f.x).addScaledVector(d,-v.x).multiplyScalar(y),o[D].add(b),o[j].add(b),o[_].add(b),c[D].add(m),c[j].add(m),c[_].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let D=0,j=E.length;D<j;++D){const _=E[D],y=_.start,G=_.count;for(let W=y,Z=y+G;W<Z;W+=3)p(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const S=new U,w=new U,L=new U,R=new U;function T(D){L.fromBufferAttribute(a,D),R.copy(L);const j=o[D];S.copy(j),S.sub(L.multiplyScalar(L.dot(j))).normalize(),w.crossVectors(R,j);const y=w.dot(c[D])<0?-1:1;r.setXYZW(D,S.x,S.y,S.z,y)}for(let D=0,j=E.length;D<j;++D){const _=E[D],y=_.start,G=_.count;for(let W=y,Z=y+G;W<Z;W+=3)T(e.getX(W+0)),T(e.getX(W+1)),T(e.getX(W+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Pn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const a=new U,s=new U,r=new U,o=new U,c=new U,l=new U,d=new U,h=new U;if(e)for(let u=0,f=e.count;u<f;u+=3){const v=e.getX(u+0),b=e.getX(u+1),m=e.getX(u+2);a.fromBufferAttribute(t,v),s.fromBufferAttribute(t,b),r.fromBufferAttribute(t,m),d.subVectors(r,s),h.subVectors(a,s),d.cross(h),o.fromBufferAttribute(i,v),c.fromBufferAttribute(i,b),l.fromBufferAttribute(i,m),o.add(d),c.add(d),l.add(d),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(b,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)a.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),r.fromBufferAttribute(t,u+2),d.subVectors(r,s),h.subVectors(a,s),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(o,c){const l=o.array,d=o.itemSize,h=o.normalized,u=new l.constructor(c.length*d);let f=0,v=0;for(let b=0,m=c.length;b<m;b++){o.isInterleavedBufferAttribute?f=c[b]*o.data.stride+o.offset:f=c[b]*d;for(let p=0;p<d;p++)u[v++]=l[f++]}return new Pn(u,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Mn,i=this.index.array,a=this.attributes;for(const o in a){const c=a[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let d=0,h=l.length;d<h;d++){const u=l[d],f=e(u,i);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,c=r.length;o<c;o++){const l=r[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const a={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let h=0,u=l.length;h<u;h++){const f=l[h];d.push(f.toJSON(e.data))}d.length>0&&(a[c]=d,s=!0)}s&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const a=e.attributes;for(const l in a){const d=a[l];this.setAttribute(l,d.clone(t))}const s=e.morphAttributes;for(const l in s){const d=[],h=s[l];for(let u=0,f=h.length;u<f;u++)d.push(h[u].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let l=0,d=r.length;l<d;l++){const h=r[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ad=new yt,Di=new yu,qs=new nl,sd=new U,Xs=new U,js=new U,Ys=new U,To=new U,Ks=new U,rd=new U,Zs=new U;class pe extends $t{constructor(e=new Mn,t=new Oe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const a=t[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(s&&o){Ks.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const d=o[c],h=s[c];d!==0&&(To.fromBufferAttribute(h,e),r?Ks.addScaledVector(To,d):Ks.addScaledVector(To.sub(t),d))}t.add(Ks)}return t}raycast(e,t){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),qs.copy(i.boundingSphere),qs.applyMatrix4(s),Di.copy(e.ray).recast(e.near),!(qs.containsPoint(Di.origin)===!1&&(Di.intersectSphere(qs,sd)===null||Di.origin.distanceToSquared(sd)>(e.far-e.near)**2))&&(ad.copy(s).invert(),Di.copy(e.ray).applyMatrix4(ad),!(i.boundingBox!==null&&Di.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Di)))}_computeIntersections(e,t,i){let a;const s=this.geometry,r=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(r))for(let v=0,b=u.length;v<b;v++){const m=u[v],p=r[m.materialIndex],E=Math.max(m.start,f.start),S=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let w=E,L=S;w<L;w+=3){const R=o.getX(w),T=o.getX(w+1),D=o.getX(w+2);a=Js(this,p,e,i,l,d,h,R,T,D),a&&(a.faceIndex=Math.floor(w/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const v=Math.max(0,f.start),b=Math.min(o.count,f.start+f.count);for(let m=v,p=b;m<p;m+=3){const E=o.getX(m),S=o.getX(m+1),w=o.getX(m+2);a=Js(this,r,e,i,l,d,h,E,S,w),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}else if(c!==void 0)if(Array.isArray(r))for(let v=0,b=u.length;v<b;v++){const m=u[v],p=r[m.materialIndex],E=Math.max(m.start,f.start),S=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let w=E,L=S;w<L;w+=3){const R=w,T=w+1,D=w+2;a=Js(this,p,e,i,l,d,h,R,T,D),a&&(a.faceIndex=Math.floor(w/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const v=Math.max(0,f.start),b=Math.min(c.count,f.start+f.count);for(let m=v,p=b;m<p;m+=3){const E=m,S=m+1,w=m+2;a=Js(this,r,e,i,l,d,h,E,S,w),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}}}function up(n,e,t,i,a,s,r,o){let c;if(e.side===cn?c=i.intersectTriangle(r,s,a,!0,o):c=i.intersectTriangle(a,s,r,e.side===Ri,o),c===null)return null;Zs.copy(o),Zs.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Zs);return l<t.near||l>t.far?null:{distance:l,point:Zs.clone(),object:n}}function Js(n,e,t,i,a,s,r,o,c,l){n.getVertexPosition(o,Xs),n.getVertexPosition(c,js),n.getVertexPosition(l,Ys);const d=up(n,e,t,i,Xs,js,Ys,rd);if(d){const h=new U;Rn.getBarycoord(rd,Xs,js,Ys,h),a&&(d.uv=Rn.getInterpolatedAttribute(a,o,c,l,h,new Be)),s&&(d.uv1=Rn.getInterpolatedAttribute(s,o,c,l,h,new Be)),r&&(d.normal=Rn.getInterpolatedAttribute(r,o,c,l,h,new U),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new U,materialIndex:0};Rn.getNormal(Xs,js,Ys,u.normal),d.face=u,d.barycoord=h}return d}class at extends Mn{constructor(e=1,t=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const c=[],l=[],d=[],h=[];let u=0,f=0;v("z","y","x",-1,-1,i,t,e,r,s,0),v("z","y","x",1,-1,i,t,-e,r,s,1),v("x","z","y",1,1,e,i,t,a,r,2),v("x","z","y",1,-1,e,i,-t,a,r,3),v("x","y","z",1,-1,e,t,i,a,s,4),v("x","y","z",-1,-1,e,t,-i,a,s,5),this.setIndex(c),this.setAttribute("position",new Ot(l,3)),this.setAttribute("normal",new Ot(d,3)),this.setAttribute("uv",new Ot(h,2));function v(b,m,p,E,S,w,L,R,T,D,j){const _=w/T,y=L/D,G=w/2,W=L/2,Z=R/2,te=T+1,X=D+1;let ne=0,Y=0;const le=new U;for(let be=0;be<X;be++){const we=be*y-W;for(let Qe=0;Qe<te;Qe++){const g=Qe*_-G;le[b]=g*E,le[m]=we*S,le[p]=Z,l.push(le.x,le.y,le.z),le[b]=0,le[m]=0,le[p]=R>0?1:-1,d.push(le.x,le.y,le.z),h.push(Qe/T),h.push(1-be/D),ne+=1}}for(let be=0;be<D;be++)for(let we=0;we<T;we++){const Qe=u+we+te*be,g=u+we+te*(be+1),P=u+(we+1)+te*(be+1),C=u+(we+1)+te*be;c.push(Qe,g,C),c.push(g,P,C),Y+=6}o.addGroup(f,Y,j),f+=Y,u+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new at(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Fa(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const a=n[t][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=a.clone():Array.isArray(a)?e[t][i]=a.slice():e[t][i]=a}}return e}function rn(n){const e={};for(let t=0;t<n.length;t++){const i=Fa(n[t]);for(const a in i)e[a]=i[a]}return e}function hp(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Au(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}const fp={clone:Fa,merge:rn};var pp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hi extends ta{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pp,this.fragmentShader=mp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fa(e.uniforms),this.uniformsGroups=hp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?t.uniforms[a]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[a]={type:"m4",value:r.toArray()}:t.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Tu extends $t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=oi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const bi=new U,od=new Be,cd=new Be;class Fn extends Tu{constructor(e=50,t=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bs*2*Math.atan(Math.tan(fs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(bi.x,bi.y).multiplyScalar(-e/bi.z),bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(bi.x,bi.y).multiplyScalar(-e/bi.z)}getViewSize(e,t){return this.getViewBounds(e,od,cd),t.subVectors(cd,od)}setViewOffset(e,t,i,a,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(fs*.5*this.fov)/this.zoom,i=2*t,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;s+=r.offsetX*a/c,t-=r.offsetY*i/l,a*=r.width/c,i*=r.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ga=-90,va=1;class gp extends $t{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Fn(ga,va,e,t);a.layers=this.layers,this.add(a);const s=new Fn(ga,va,e,t);s.layers=this.layers,this.add(s);const r=new Fn(ga,va,e,t);r.layers=this.layers,this.add(r);const o=new Fn(ga,va,e,t);o.layers=this.layers,this.add(o);const c=new Fn(ga,va,e,t);c.layers=this.layers,this.add(c);const l=new Fn(ga,va,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,a,s,r,o,c]=t;for(const l of t)this.remove(l);if(e===oi)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ir)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,c,l,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,a),e.render(t,s),e.setRenderTarget(i,1,a),e.render(t,r),e.setRenderTarget(i,2,a),e.render(t,o),e.setRenderTarget(i,3,a),e.render(t,c),e.setRenderTarget(i,4,a),e.render(t,l),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,a),e.render(t,d),e.setRenderTarget(h,u,f),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Ru extends tn{constructor(e,t,i,a,s,r,o,c,l,d){e=e!==void 0?e:[],t=t!==void 0?t:Na,super(e,t,i,a,s,r,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class vp extends Zi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new Ru(a,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:kn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new at(5,5,5),s=new hi({name:"CubemapFromEquirect",uniforms:Fa(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:wi});s.uniforms.tEquirect.value=t;const r=new pe(a,s),o=t.minFilter;return t.minFilter===Wi&&(t.minFilter=kn),new gp(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,i,a){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,a);e.setRenderTarget(s)}}const Ro=new U,_p=new U,bp=new je;class ki{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,a){return this.normal.set(e,t,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const a=Ro.subVectors(i,t).cross(_p.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ro),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||bp.getNormalMatrix(e),a=this.coplanarPoint(Ro).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ni=new nl,Qs=new U;class al{constructor(e=new ki,t=new ki,i=new ki,a=new ki,s=new ki,r=new ki){this.planes=[e,t,i,a,s,r]}set(e,t,i,a,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=oi){const i=this.planes,a=e.elements,s=a[0],r=a[1],o=a[2],c=a[3],l=a[4],d=a[5],h=a[6],u=a[7],f=a[8],v=a[9],b=a[10],m=a[11],p=a[12],E=a[13],S=a[14],w=a[15];if(i[0].setComponents(c-s,u-l,m-f,w-p).normalize(),i[1].setComponents(c+s,u+l,m+f,w+p).normalize(),i[2].setComponents(c+r,u+d,m+v,w+E).normalize(),i[3].setComponents(c-r,u-d,m-v,w-E).normalize(),i[4].setComponents(c-o,u-h,m-b,w-S).normalize(),t===oi)i[5].setComponents(c+o,u+h,m+b,w+S).normalize();else if(t===Ir)i[5].setComponents(o,h,b,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(e){return Ni.center.set(0,0,0),Ni.radius=.7071067811865476,Ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(e){const t=this.planes,i=e.center,a=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const a=t[i];if(Qs.x=a.normal.x>0?e.max.x:e.min.x,Qs.y=a.normal.y>0?e.max.y:e.min.y,Qs.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Qs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Cu(){let n=null,e=!1,t=null,i=null;function a(s,r){t(s,r),i=n.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(a),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function xp(n){const e=new WeakMap;function t(o,c){const l=o.array,d=o.usage,h=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,d),o.onUploadCallback();let f;if(l instanceof Float32Array)f=n.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=n.SHORT;else if(l instanceof Uint32Array)f=n.UNSIGNED_INT;else if(l instanceof Int32Array)f=n.INT;else if(l instanceof Int8Array)f=n.BYTE;else if(l instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,c,l){const d=c.array,h=c.updateRanges;if(n.bindBuffer(l,o),h.length===0)n.bufferSubData(l,0,d);else{h.sort((f,v)=>f.start-v.start);let u=0;for(let f=1;f<h.length;f++){const v=h[u],b=h[f];b.start<=v.start+v.count+1?v.count=Math.max(v.count,b.start+b.count-v.start):(++u,h[u]=b)}h.length=u+1;for(let f=0,v=h.length;f<v;f++){const b=h[f];n.bufferSubData(l,b.start*d.BYTES_PER_ELEMENT,d,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function r(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:a,remove:s,update:r}}class Ht extends Mn{constructor(e=1,t=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:a};const s=e/2,r=t/2,o=Math.floor(i),c=Math.floor(a),l=o+1,d=c+1,h=e/o,u=t/c,f=[],v=[],b=[],m=[];for(let p=0;p<d;p++){const E=p*u-r;for(let S=0;S<l;S++){const w=S*h-s;v.push(w,-E,0),b.push(0,0,1),m.push(S/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<o;E++){const S=E+l*p,w=E+l*(p+1),L=E+1+l*(p+1),R=E+1+l*p;f.push(S,w,R),f.push(w,L,R)}this.setIndex(f),this.setAttribute("position",new Ot(v,3)),this.setAttribute("normal",new Ot(b,3)),this.setAttribute("uv",new Ot(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ht(e.width,e.height,e.widthSegments,e.heightSegments)}}var Sp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Mp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ep=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ap=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Tp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Rp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Pp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ip=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Dp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Np=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Up=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,zp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Op=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Hp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Vp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,$p=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Wp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Xp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Yp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jp=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,em=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,nm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,im=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,am=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,om=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,um=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,fm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,pm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_m=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,bm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,xm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Sm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ym=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Mm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Em=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Am=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Pm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Im=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Um=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Om=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,km=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Bm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$m=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Wm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ym=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Km=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,eg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ng=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ig=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ag=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,sg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,rg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,og=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,cg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ug=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,pg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,mg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_g=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,bg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const xg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ag=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Tg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Rg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Cg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ig=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Dg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ng=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ug=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Og=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,kg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Hg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Gg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$g=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Wg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Yg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Jg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:Sp,alphahash_pars_fragment:yp,alphamap_fragment:Mp,alphamap_pars_fragment:Ep,alphatest_fragment:wp,alphatest_pars_fragment:Ap,aomap_fragment:Tp,aomap_pars_fragment:Rp,batching_pars_vertex:Cp,batching_vertex:Pp,begin_vertex:Ip,beginnormal_vertex:Lp,bsdfs:Dp,iridescence_fragment:Np,bumpmap_pars_fragment:Up,clipping_planes_fragment:zp,clipping_planes_pars_fragment:Op,clipping_planes_pars_vertex:Fp,clipping_planes_vertex:kp,color_fragment:Bp,color_pars_fragment:Hp,color_pars_vertex:Gp,color_vertex:Vp,common:$p,cube_uv_reflection_fragment:Wp,defaultnormal_vertex:qp,displacementmap_pars_vertex:Xp,displacementmap_vertex:jp,emissivemap_fragment:Yp,emissivemap_pars_fragment:Kp,colorspace_fragment:Zp,colorspace_pars_fragment:Jp,envmap_fragment:Qp,envmap_common_pars_fragment:em,envmap_pars_fragment:tm,envmap_pars_vertex:nm,envmap_physical_pars_fragment:fm,envmap_vertex:im,fog_vertex:am,fog_pars_vertex:sm,fog_fragment:rm,fog_pars_fragment:om,gradientmap_pars_fragment:cm,lightmap_pars_fragment:lm,lights_lambert_fragment:dm,lights_lambert_pars_fragment:um,lights_pars_begin:hm,lights_toon_fragment:pm,lights_toon_pars_fragment:mm,lights_phong_fragment:gm,lights_phong_pars_fragment:vm,lights_physical_fragment:_m,lights_physical_pars_fragment:bm,lights_fragment_begin:xm,lights_fragment_maps:Sm,lights_fragment_end:ym,logdepthbuf_fragment:Mm,logdepthbuf_pars_fragment:Em,logdepthbuf_pars_vertex:wm,logdepthbuf_vertex:Am,map_fragment:Tm,map_pars_fragment:Rm,map_particle_fragment:Cm,map_particle_pars_fragment:Pm,metalnessmap_fragment:Im,metalnessmap_pars_fragment:Lm,morphinstance_vertex:Dm,morphcolor_vertex:Nm,morphnormal_vertex:Um,morphtarget_pars_vertex:zm,morphtarget_vertex:Om,normal_fragment_begin:Fm,normal_fragment_maps:km,normal_pars_fragment:Bm,normal_pars_vertex:Hm,normal_vertex:Gm,normalmap_pars_fragment:Vm,clearcoat_normal_fragment_begin:$m,clearcoat_normal_fragment_maps:Wm,clearcoat_pars_fragment:qm,iridescence_pars_fragment:Xm,opaque_fragment:jm,packing:Ym,premultiplied_alpha_fragment:Km,project_vertex:Zm,dithering_fragment:Jm,dithering_pars_fragment:Qm,roughnessmap_fragment:eg,roughnessmap_pars_fragment:tg,shadowmap_pars_fragment:ng,shadowmap_pars_vertex:ig,shadowmap_vertex:ag,shadowmask_pars_fragment:sg,skinbase_vertex:rg,skinning_pars_vertex:og,skinning_vertex:cg,skinnormal_vertex:lg,specularmap_fragment:dg,specularmap_pars_fragment:ug,tonemapping_fragment:hg,tonemapping_pars_fragment:fg,transmission_fragment:pg,transmission_pars_fragment:mg,uv_pars_fragment:gg,uv_pars_vertex:vg,uv_vertex:_g,worldpos_vertex:bg,background_vert:xg,background_frag:Sg,backgroundCube_vert:yg,backgroundCube_frag:Mg,cube_vert:Eg,cube_frag:wg,depth_vert:Ag,depth_frag:Tg,distanceRGBA_vert:Rg,distanceRGBA_frag:Cg,equirect_vert:Pg,equirect_frag:Ig,linedashed_vert:Lg,linedashed_frag:Dg,meshbasic_vert:Ng,meshbasic_frag:Ug,meshlambert_vert:zg,meshlambert_frag:Og,meshmatcap_vert:Fg,meshmatcap_frag:kg,meshnormal_vert:Bg,meshnormal_frag:Hg,meshphong_vert:Gg,meshphong_frag:Vg,meshphysical_vert:$g,meshphysical_frag:Wg,meshtoon_vert:qg,meshtoon_frag:Xg,points_vert:jg,points_frag:Yg,shadow_vert:Kg,shadow_frag:Zg,sprite_vert:Jg,sprite_frag:Qg},fe={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new Be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new Be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Xn={basic:{uniforms:rn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:rn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new We(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:rn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:rn([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:rn([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new We(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:rn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:rn([fe.points,fe.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:rn([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:rn([fe.common,fe.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:rn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:rn([fe.sprite,fe.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:rn([fe.common,fe.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:rn([fe.lights,fe.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Xn.physical={uniforms:rn([Xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new Be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new Be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new Be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const er={r:0,b:0,g:0},Ui=new $n,e0=new yt;function t0(n,e,t,i,a,s,r){const o=new We(0);let c=s===!0?0:1,l,d,h=null,u=0,f=null;function v(E){let S=E.isScene===!0?E.background:null;return S&&S.isTexture&&(S=(E.backgroundBlurriness>0?t:e).get(S)),S}function b(E){let S=!1;const w=v(E);w===null?p(o,c):w&&w.isColor&&(p(w,1),S=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,r):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(E,S){const w=v(S);w&&(w.isCubeTexture||w.mapping===Gr)?(d===void 0&&(d=new pe(new at(1,1,1),new hi({name:"BackgroundCubeMaterial",uniforms:Fa(Xn.backgroundCube.uniforms),vertexShader:Xn.backgroundCube.vertexShader,fragmentShader:Xn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(L,R,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(d)),Ui.copy(S.backgroundRotation),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),d.material.uniforms.envMap.value=w,d.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(e0.makeRotationFromEuler(Ui)),d.material.toneMapped=ot.getTransfer(w.colorSpace)!==bt,(h!==w||u!==w.version||f!==n.toneMapping)&&(d.material.needsUpdate=!0,h=w,u=w.version,f=n.toneMapping),d.layers.enableAll(),E.unshift(d,d.geometry,d.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new pe(new Ht(2,2),new hi({name:"BackgroundMaterial",uniforms:Fa(Xn.background.uniforms),vertexShader:Xn.background.vertexShader,fragmentShader:Xn.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=ot.getTransfer(w.colorSpace)!==bt,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(h!==w||u!==w.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,h=w,u=w.version,f=n.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function p(E,S){E.getRGB(er,Au(n)),i.buffers.color.setClear(er.r,er.g,er.b,S,r)}return{getClearColor:function(){return o},setClearColor:function(E,S=1){o.set(E),c=S,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,p(o,c)},render:b,addToRenderList:m}}function n0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},a=u(null);let s=a,r=!1;function o(_,y,G,W,Z){let te=!1;const X=h(W,G,y);s!==X&&(s=X,l(s.object)),te=f(_,W,G,Z),te&&v(_,W,G,Z),Z!==null&&e.update(Z,n.ELEMENT_ARRAY_BUFFER),(te||r)&&(r=!1,w(_,y,G,W),Z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function c(){return n.createVertexArray()}function l(_){return n.bindVertexArray(_)}function d(_){return n.deleteVertexArray(_)}function h(_,y,G){const W=G.wireframe===!0;let Z=i[_.id];Z===void 0&&(Z={},i[_.id]=Z);let te=Z[y.id];te===void 0&&(te={},Z[y.id]=te);let X=te[W];return X===void 0&&(X=u(c()),te[W]=X),X}function u(_){const y=[],G=[],W=[];for(let Z=0;Z<t;Z++)y[Z]=0,G[Z]=0,W[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:G,attributeDivisors:W,object:_,attributes:{},index:null}}function f(_,y,G,W){const Z=s.attributes,te=y.attributes;let X=0;const ne=G.getAttributes();for(const Y in ne)if(ne[Y].location>=0){const be=Z[Y];let we=te[Y];if(we===void 0&&(Y==="instanceMatrix"&&_.instanceMatrix&&(we=_.instanceMatrix),Y==="instanceColor"&&_.instanceColor&&(we=_.instanceColor)),be===void 0||be.attribute!==we||we&&be.data!==we.data)return!0;X++}return s.attributesNum!==X||s.index!==W}function v(_,y,G,W){const Z={},te=y.attributes;let X=0;const ne=G.getAttributes();for(const Y in ne)if(ne[Y].location>=0){let be=te[Y];be===void 0&&(Y==="instanceMatrix"&&_.instanceMatrix&&(be=_.instanceMatrix),Y==="instanceColor"&&_.instanceColor&&(be=_.instanceColor));const we={};we.attribute=be,be&&be.data&&(we.data=be.data),Z[Y]=we,X++}s.attributes=Z,s.attributesNum=X,s.index=W}function b(){const _=s.newAttributes;for(let y=0,G=_.length;y<G;y++)_[y]=0}function m(_){p(_,0)}function p(_,y){const G=s.newAttributes,W=s.enabledAttributes,Z=s.attributeDivisors;G[_]=1,W[_]===0&&(n.enableVertexAttribArray(_),W[_]=1),Z[_]!==y&&(n.vertexAttribDivisor(_,y),Z[_]=y)}function E(){const _=s.newAttributes,y=s.enabledAttributes;for(let G=0,W=y.length;G<W;G++)y[G]!==_[G]&&(n.disableVertexAttribArray(G),y[G]=0)}function S(_,y,G,W,Z,te,X){X===!0?n.vertexAttribIPointer(_,y,G,Z,te):n.vertexAttribPointer(_,y,G,W,Z,te)}function w(_,y,G,W){b();const Z=W.attributes,te=G.getAttributes(),X=y.defaultAttributeValues;for(const ne in te){const Y=te[ne];if(Y.location>=0){let le=Z[ne];if(le===void 0&&(ne==="instanceMatrix"&&_.instanceMatrix&&(le=_.instanceMatrix),ne==="instanceColor"&&_.instanceColor&&(le=_.instanceColor)),le!==void 0){const be=le.normalized,we=le.itemSize,Qe=e.get(le);if(Qe===void 0)continue;const g=Qe.buffer,P=Qe.type,C=Qe.bytesPerElement,B=P===n.INT||P===n.UNSIGNED_INT||le.gpuType===Xc;if(le.isInterleavedBufferAttribute){const H=le.data,J=H.stride,ie=le.offset;if(H.isInstancedInterleavedBuffer){for(let ye=0;ye<Y.locationSize;ye++)p(Y.location+ye,H.meshPerAttribute);_.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let ye=0;ye<Y.locationSize;ye++)m(Y.location+ye);n.bindBuffer(n.ARRAY_BUFFER,g);for(let ye=0;ye<Y.locationSize;ye++)S(Y.location+ye,we/Y.locationSize,P,be,J*C,(ie+we/Y.locationSize*ye)*C,B)}else{if(le.isInstancedBufferAttribute){for(let H=0;H<Y.locationSize;H++)p(Y.location+H,le.meshPerAttribute);_.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let H=0;H<Y.locationSize;H++)m(Y.location+H);n.bindBuffer(n.ARRAY_BUFFER,g);for(let H=0;H<Y.locationSize;H++)S(Y.location+H,we/Y.locationSize,P,be,we*C,we/Y.locationSize*H*C,B)}}else if(X!==void 0){const be=X[ne];if(be!==void 0)switch(be.length){case 2:n.vertexAttrib2fv(Y.location,be);break;case 3:n.vertexAttrib3fv(Y.location,be);break;case 4:n.vertexAttrib4fv(Y.location,be);break;default:n.vertexAttrib1fv(Y.location,be)}}}}E()}function L(){D();for(const _ in i){const y=i[_];for(const G in y){const W=y[G];for(const Z in W)d(W[Z].object),delete W[Z];delete y[G]}delete i[_]}}function R(_){if(i[_.id]===void 0)return;const y=i[_.id];for(const G in y){const W=y[G];for(const Z in W)d(W[Z].object),delete W[Z];delete y[G]}delete i[_.id]}function T(_){for(const y in i){const G=i[y];if(G[_.id]===void 0)continue;const W=G[_.id];for(const Z in W)d(W[Z].object),delete W[Z];delete G[_.id]}}function D(){j(),r=!0,s!==a&&(s=a,l(s.object))}function j(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:D,resetDefaultState:j,dispose:L,releaseStatesOfGeometry:R,releaseStatesOfProgram:T,initAttributes:b,enableAttribute:m,disableUnusedAttributes:E}}function i0(n,e,t){let i;function a(l){i=l}function s(l,d){n.drawArrays(i,l,d),t.update(d,i,1)}function r(l,d,h){h!==0&&(n.drawArraysInstanced(i,l,d,h),t.update(d,i,h))}function o(l,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,d,0,h);let f=0;for(let v=0;v<h;v++)f+=d[v];t.update(f,i,1)}function c(l,d,h,u){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let v=0;v<l.length;v++)r(l[v],d[v],u[v]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,d,0,u,0,h);let v=0;for(let b=0;b<h;b++)v+=d[b];for(let b=0;b<u.length;b++)t.update(v,i,u[b])}}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function a0(n,e,t,i){let a;function s(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");a=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(T){return!(T!==Gn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const D=T===Rs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==ui&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==ri&&!D)}function c(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const h=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(u===!0){const T=e.get("EXT_clip_control");T.clipControlEXT(T.LOWER_LEFT_EXT,T.ZERO_TO_ONE_EXT)}const f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),w=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=v>0,R=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:v,maxTextureSize:b,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:S,maxFragmentUniforms:w,vertexTextures:L,maxSamples:R}}function s0(n){const e=this;let t=null,i=0,a=!1,s=!1;const r=new ki,o=new je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const f=h.length!==0||u||i!==0||a;return a=u,i=h.length,f},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,f){const v=h.clippingPlanes,b=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!a||v===null||v.length===0||s&&!m)s?d(null):l();else{const E=s?0:i,S=E*4;let w=p.clippingState||null;c.value=w,w=d(v,u,S,f);for(let L=0;L!==S;++L)w[L]=t[L];p.clippingState=w,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,u,f,v){const b=h!==null?h.length:0;let m=null;if(b!==0){if(m=c.value,v!==!0||m===null){const p=f+b*4,E=u.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,w=f;S!==b;++S,w+=4)r.copy(h[S]).applyMatrix4(E,o),r.normal.toArray(m,w),m[w+3]=r.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}function r0(n){let e=new WeakMap;function t(r,o){return o===nc?r.mapping=Na:o===ic&&(r.mapping=Ua),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===nc||o===ic)if(e.has(r)){const c=e.get(r).texture;return t(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new vp(c.height);return l.fromEquirectangularTexture(n,r),e.set(r,l),r.addEventListener("dispose",a),t(l.texture,r.mapping)}else return null}}return r}function a(r){const o=r.target;o.removeEventListener("dispose",a);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class sl extends Tu{constructor(e=-1,t=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=a+t,c=a-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,r=s+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Aa=4,ld=[.125,.215,.35,.446,.526,.582],Gi=20,Co=new sl,dd=new We;let Po=null,Io=0,Lo=0,Do=!1;const Bi=(1+Math.sqrt(5))/2,_a=1/Bi,ud=[new U(-Bi,_a,0),new U(Bi,_a,0),new U(-_a,0,Bi),new U(_a,0,Bi),new U(0,Bi,-_a),new U(0,Bi,_a),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class Lc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,a=100){Po=this._renderer.getRenderTarget(),Io=this._renderer.getActiveCubeFace(),Lo=this._renderer.getActiveMipmapLevel(),Do=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,a,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Po,Io,Lo),this._renderer.xr.enabled=Do,e.scissorTest=!1,tr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Na||e.mapping===Ua?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Po=this._renderer.getRenderTarget(),Io=this._renderer.getActiveCubeFace(),Lo=this._renderer.getActiveMipmapLevel(),Do=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:kn,minFilter:kn,generateMipmaps:!1,type:Rs,format:Gn,colorSpace:Ci,depthBuffer:!1},a=hd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hd(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=o0(s)),this._blurMaterial=c0(s,e,t)}return a}_compileMaterial(e){const t=new pe(this._lodPlanes[0],e);this._renderer.compile(t,Co)}_sceneToCubeUV(e,t,i,a){const o=new Fn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,u=d.toneMapping;d.getClearColor(dd),d.toneMapping=Ai,d.autoClear=!1;const f=new Oe({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),v=new pe(new at,f);let b=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,b=!0):(f.color.copy(dd),b=!0);for(let p=0;p<6;p++){const E=p%3;E===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):E===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const S=this._cubeSize;tr(a,E*S,p>2?S:0,S,S),d.setRenderTarget(a),b&&d.render(v,o),d.render(e,o)}v.geometry.dispose(),v.material.dispose(),d.toneMapping=u,d.autoClear=h,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,a=e.mapping===Na||e.mapping===Ua;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=pd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fd());const s=a?this._cubemapMaterial:this._equirectMaterial,r=new pe(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;tr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(r,Co)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let s=1;s<a;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=ud[(a-s-1)%ud.length];this._blur(e,s-1,s,r,o)}t.autoClear=i}_blur(e,t,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,i,a,"latitudinal",s),this._halfBlur(r,e,i,i,a,"longitudinal",s)}_halfBlur(e,t,i,a,s,r,o){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new pe(this._lodPlanes[a],l),u=l.uniforms,f=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Gi-1),b=s/v,m=isFinite(s)?1+Math.floor(d*b):Gi;m>Gi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gi}`);const p=[];let E=0;for(let T=0;T<Gi;++T){const D=T/b,j=Math.exp(-D*D/2);p.push(j),T===0?E+=j:T<m&&(E+=2*j)}for(let T=0;T<p.length;T++)p[T]=p[T]/E;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:S}=this;u.dTheta.value=v,u.mipInt.value=S-i;const w=this._sizeLods[a],L=3*w*(a>S-Aa?a-S+Aa:0),R=4*(this._cubeSize-w);tr(t,L,R,3*w,2*w),c.setRenderTarget(t),c.render(h,Co)}}function o0(n){const e=[],t=[],i=[];let a=n;const s=n-Aa+1+ld.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);t.push(o);let c=1/o;r>n-Aa?c=ld[r-n+Aa-1]:r===0&&(c=0),i.push(c);const l=1/(o-2),d=-l,h=1+l,u=[d,d,h,d,h,h,d,d,h,h,d,h],f=6,v=6,b=3,m=2,p=1,E=new Float32Array(b*v*f),S=new Float32Array(m*v*f),w=new Float32Array(p*v*f);for(let R=0;R<f;R++){const T=R%3*2/3-1,D=R>2?0:-1,j=[T,D,0,T+2/3,D,0,T+2/3,D+1,0,T,D,0,T+2/3,D+1,0,T,D+1,0];E.set(j,b*v*R),S.set(u,m*v*R);const _=[R,R,R,R,R,R];w.set(_,p*v*R)}const L=new Mn;L.setAttribute("position",new Pn(E,b)),L.setAttribute("uv",new Pn(S,m)),L.setAttribute("faceIndex",new Pn(w,p)),e.push(L),a>Aa&&a--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function hd(n,e,t){const i=new Zi(n,e,t);return i.texture.mapping=Gr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function tr(n,e,t,i,a){n.viewport.set(e,t,i,a),n.scissor.set(e,t,i,a)}function c0(n,e,t){const i=new Float32Array(Gi),a=new U(0,1,0);return new hi({name:"SphericalGaussianBlur",defines:{n:Gi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:rl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function fd(){return new hi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function pd(){return new hi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function rl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function l0(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===nc||c===ic,d=c===Na||c===Ua;if(l||d){let h=e.get(o);const u=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new Lc(n)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return l&&f&&f.height>0||d&&f&&a(f)?(t===null&&(t=new Lc(n)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function a(o){let c=0;const l=6;for(let d=0;d<l;d++)o[d]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:r}}function d0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let a;switch(i){case"WEBGL_depth_texture":a=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=n.getExtension(i)}return e[i]=a,a}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const a=t(i);return a===null&&br("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function u0(n,e,t,i){const a={},s=new WeakMap;function r(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const v in u.attributes)e.remove(u.attributes[v]);for(const v in u.morphAttributes){const b=u.morphAttributes[v];for(let m=0,p=b.length;m<p;m++)e.remove(b[m])}u.removeEventListener("dispose",r),delete a[u.id];const f=s.get(u);f&&(e.remove(f),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return a[u.id]===!0||(u.addEventListener("dispose",r),a[u.id]=!0,t.memory.geometries++),u}function c(h){const u=h.attributes;for(const v in u)e.update(u[v],n.ARRAY_BUFFER);const f=h.morphAttributes;for(const v in f){const b=f[v];for(let m=0,p=b.length;m<p;m++)e.update(b[m],n.ARRAY_BUFFER)}}function l(h){const u=[],f=h.index,v=h.attributes.position;let b=0;if(f!==null){const E=f.array;b=f.version;for(let S=0,w=E.length;S<w;S+=3){const L=E[S+0],R=E[S+1],T=E[S+2];u.push(L,R,R,T,T,L)}}else if(v!==void 0){const E=v.array;b=v.version;for(let S=0,w=E.length/3-1;S<w;S+=3){const L=S+0,R=S+1,T=S+2;u.push(L,R,R,T,T,L)}}else return;const m=new(bu(u)?wu:Eu)(u,1);m.version=b;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function d(h){const u=s.get(h);if(u){const f=h.index;f!==null&&u.version<f.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:d}}function h0(n,e,t){let i;function a(u){i=u}let s,r;function o(u){s=u.type,r=u.bytesPerElement}function c(u,f){n.drawElements(i,f,s,u*r),t.update(f,i,1)}function l(u,f,v){v!==0&&(n.drawElementsInstanced(i,f,s,u*r,v),t.update(f,i,v))}function d(u,f,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,u,0,v);let m=0;for(let p=0;p<v;p++)m+=f[p];t.update(m,i,1)}function h(u,f,v,b){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)l(u[p]/r,f[p],b[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,s,u,0,b,0,v);let p=0;for(let E=0;E<v;E++)p+=f[E];for(let E=0;E<b.length;E++)t.update(p,i,b[E])}}this.setMode=a,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function f0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(t.calls++,r){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:i}}function p0(n,e,t){const i=new WeakMap,a=new At;function s(r,o,c){const l=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let _=function(){D.dispose(),i.delete(o),o.removeEventListener("dispose",_)};var f=_;u!==void 0&&u.texture.dispose();const v=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let w=0;v===!0&&(w=1),b===!0&&(w=2),m===!0&&(w=3);let L=o.attributes.position.count*w,R=1;L>e.maxTextureSize&&(R=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const T=new Float32Array(L*R*4*h),D=new Su(T,L,R,h);D.type=ri,D.needsUpdate=!0;const j=w*4;for(let y=0;y<h;y++){const G=p[y],W=E[y],Z=S[y],te=L*R*4*y;for(let X=0;X<G.count;X++){const ne=X*j;v===!0&&(a.fromBufferAttribute(G,X),T[te+ne+0]=a.x,T[te+ne+1]=a.y,T[te+ne+2]=a.z,T[te+ne+3]=0),b===!0&&(a.fromBufferAttribute(W,X),T[te+ne+4]=a.x,T[te+ne+5]=a.y,T[te+ne+6]=a.z,T[te+ne+7]=0),m===!0&&(a.fromBufferAttribute(Z,X),T[te+ne+8]=a.x,T[te+ne+9]=a.y,T[te+ne+10]=a.z,T[te+ne+11]=Z.itemSize===4?a.w:1)}}u={count:h,texture:D,size:new Be(L,R)},i.set(o,u),o.addEventListener("dispose",_)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",r.morphTexture,t);else{let v=0;for(let m=0;m<l.length;m++)v+=l[m];const b=o.morphTargetsRelative?1:1-v;c.getUniforms().setValue(n,"morphTargetBaseInfluence",b),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function m0(n,e,t,i){let a=new WeakMap;function s(c){const l=i.render.frame,d=c.geometry,h=e.get(c,d);if(a.get(h)!==l&&(e.update(h),a.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),a.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),a.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;a.get(u)!==l&&(u.update(),a.set(u,l))}return h}function r(){a=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:r}}class Pu extends tn{constructor(e,t,i,a,s,r,o,c,l,d=Ca){if(d!==Ca&&d!==Oa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Ca&&(i=Ki),i===void 0&&d===Oa&&(i=za),super(null,a,s,r,o,c,d,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Cn,this.minFilter=c!==void 0?c:Cn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Iu=new tn,md=new Pu(1,1),Lu=new Su,Du=new tp,Nu=new Ru,gd=[],vd=[],_d=new Float32Array(16),bd=new Float32Array(9),xd=new Float32Array(4);function $a(n,e,t){const i=n[0];if(i<=0||i>0)return n;const a=e*t;let s=gd[a];if(s===void 0&&(s=new Float32Array(a),gd[a]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=t,n[r].toArray(s,o)}return s}function Ft(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function kt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function $r(n,e){let t=vd[e];t===void 0&&(t=new Int32Array(e),vd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function g0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function v0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2fv(this.addr,e),kt(t,e)}}function _0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;n.uniform3fv(this.addr,e),kt(t,e)}}function b0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4fv(this.addr,e),kt(t,e)}}function x0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(Ft(t,i))return;xd.set(i),n.uniformMatrix2fv(this.addr,!1,xd),kt(t,i)}}function S0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(Ft(t,i))return;bd.set(i),n.uniformMatrix3fv(this.addr,!1,bd),kt(t,i)}}function y0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(Ft(t,i))return;_d.set(i),n.uniformMatrix4fv(this.addr,!1,_d),kt(t,i)}}function M0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function E0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2iv(this.addr,e),kt(t,e)}}function w0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;n.uniform3iv(this.addr,e),kt(t,e)}}function A0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4iv(this.addr,e),kt(t,e)}}function T0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function R0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2uiv(this.addr,e),kt(t,e)}}function C0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;n.uniform3uiv(this.addr,e),kt(t,e)}}function P0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4uiv(this.addr,e),kt(t,e)}}function I0(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a);let s;this.type===n.SAMPLER_2D_SHADOW?(md.compareFunction=_u,s=md):s=Iu,t.setTexture2D(e||s,a)}function L0(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTexture3D(e||Du,a)}function D0(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTextureCube(e||Nu,a)}function N0(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTexture2DArray(e||Lu,a)}function U0(n){switch(n){case 5126:return g0;case 35664:return v0;case 35665:return _0;case 35666:return b0;case 35674:return x0;case 35675:return S0;case 35676:return y0;case 5124:case 35670:return M0;case 35667:case 35671:return E0;case 35668:case 35672:return w0;case 35669:case 35673:return A0;case 5125:return T0;case 36294:return R0;case 36295:return C0;case 36296:return P0;case 35678:case 36198:case 36298:case 36306:case 35682:return I0;case 35679:case 36299:case 36307:return L0;case 35680:case 36300:case 36308:case 36293:return D0;case 36289:case 36303:case 36311:case 36292:return N0}}function z0(n,e){n.uniform1fv(this.addr,e)}function O0(n,e){const t=$a(e,this.size,2);n.uniform2fv(this.addr,t)}function F0(n,e){const t=$a(e,this.size,3);n.uniform3fv(this.addr,t)}function k0(n,e){const t=$a(e,this.size,4);n.uniform4fv(this.addr,t)}function B0(n,e){const t=$a(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function H0(n,e){const t=$a(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function G0(n,e){const t=$a(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function V0(n,e){n.uniform1iv(this.addr,e)}function $0(n,e){n.uniform2iv(this.addr,e)}function W0(n,e){n.uniform3iv(this.addr,e)}function q0(n,e){n.uniform4iv(this.addr,e)}function X0(n,e){n.uniform1uiv(this.addr,e)}function j0(n,e){n.uniform2uiv(this.addr,e)}function Y0(n,e){n.uniform3uiv(this.addr,e)}function K0(n,e){n.uniform4uiv(this.addr,e)}function Z0(n,e,t){const i=this.cache,a=e.length,s=$r(t,a);Ft(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let r=0;r!==a;++r)t.setTexture2D(e[r]||Iu,s[r])}function J0(n,e,t){const i=this.cache,a=e.length,s=$r(t,a);Ft(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let r=0;r!==a;++r)t.setTexture3D(e[r]||Du,s[r])}function Q0(n,e,t){const i=this.cache,a=e.length,s=$r(t,a);Ft(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let r=0;r!==a;++r)t.setTextureCube(e[r]||Nu,s[r])}function ev(n,e,t){const i=this.cache,a=e.length,s=$r(t,a);Ft(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let r=0;r!==a;++r)t.setTexture2DArray(e[r]||Lu,s[r])}function tv(n){switch(n){case 5126:return z0;case 35664:return O0;case 35665:return F0;case 35666:return k0;case 35674:return B0;case 35675:return H0;case 35676:return G0;case 5124:case 35670:return V0;case 35667:case 35671:return $0;case 35668:case 35672:return W0;case 35669:case 35673:return q0;case 5125:return X0;case 36294:return j0;case 36295:return Y0;case 36296:return K0;case 35678:case 36198:case 36298:case 36306:case 35682:return Z0;case 35679:case 36299:case 36307:return J0;case 35680:case 36300:case 36308:case 36293:return Q0;case 36289:case 36303:case 36311:case 36292:return ev}}class nv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=U0(t.type)}}class iv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tv(t.type)}}class av{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(e,t[o.id],i)}}}const No=/(\w+)(\])?(\[|\.)?/g;function Sd(n,e){n.seq.push(e),n.map[e.id]=e}function sv(n,e,t){const i=n.name,a=i.length;for(No.lastIndex=0;;){const s=No.exec(i),r=No.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&r+2===a){Sd(t,l===void 0?new nv(o,n,e):new iv(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new av(o),Sd(t,h)),t=h}}}class xr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const s=e.getActiveUniform(t,a),r=e.getUniformLocation(t,s.name);sv(s,r,this)}}setValue(e,t,i,a){const s=this.map[t];s!==void 0&&s.setValue(e,i,a)}setOptional(e,t,i){const a=t[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,t,i,a){for(let s=0,r=t.length;s!==r;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,a)}}static seqWithValue(e,t){const i=[];for(let a=0,s=e.length;a!==s;++a){const r=e[a];r.id in t&&i.push(r)}return i}}function yd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const rv=37297;let ov=0;function cv(n,e){const t=n.split(`
`),i=[],a=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}function lv(n){const e=ot.getPrimaries(ot.workingColorSpace),t=ot.getPrimaries(n);let i;switch(e===t?i="":e===Pr&&t===Cr?i="LinearDisplayP3ToLinearSRGB":e===Cr&&t===Pr&&(i="LinearSRGBToLinearDisplayP3"),n){case Ci:case Vr:return[i,"LinearTransferOETF"];case Xt:case el:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Md(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=n.getShaderInfoLog(e).trim();if(i&&a==="")return"";const s=/ERROR: 0:(\d+)/.exec(a);if(s){const r=parseInt(s[1]);return t.toUpperCase()+`

`+a+`

`+cv(n.getShaderSource(e),r)}else return a}function dv(n,e){const t=lv(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function uv(n,e){let t;switch(e){case ff:t="Linear";break;case pf:t="Reinhard";break;case mf:t="Cineon";break;case ru:t="ACESFilmic";break;case vf:t="AgX";break;case _f:t="Neutral";break;case gf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const nr=new U;function hv(){ot.getLuminanceCoefficients(nr);const n=nr.x.toFixed(4),e=nr.y.toFixed(4),t=nr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ds).join(`
`)}function pv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function mv(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=n.getActiveAttrib(e,a),r=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[r]={type:s.type,location:n.getAttribLocation(e,r),locationSize:o}}return t}function ds(n){return n!==""}function Ed(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const gv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dc(n){return n.replace(gv,_v)}const vv=new Map;function _v(n,e){let t=Xe[e];if(t===void 0){const i=vv.get(e);if(i!==void 0)t=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Dc(t)}const bv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ad(n){return n.replace(bv,xv)}function xv(n,e,t,i){let a="";for(let s=parseInt(e);s<parseInt(t);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function Td(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Sv(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===au?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===su?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ai&&(e="SHADOWMAP_TYPE_VSM"),e}function yv(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Na:case Ua:e="ENVMAP_TYPE_CUBE";break;case Gr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Mv(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ua:e="ENVMAP_MODE_REFRACTION";break}return e}function Ev(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case qc:e="ENVMAP_BLENDING_MULTIPLY";break;case uf:e="ENVMAP_BLENDING_MIX";break;case hf:e="ENVMAP_BLENDING_ADD";break}return e}function wv(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Av(n,e,t,i){const a=n.getContext(),s=t.defines;let r=t.vertexShader,o=t.fragmentShader;const c=Sv(t),l=yv(t),d=Mv(t),h=Ev(t),u=wv(t),f=fv(t),v=pv(s),b=a.createProgram();let m,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ds).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ds).join(`
`),p.length>0&&(p+=`
`)):(m=[Td(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ds).join(`
`),p=[Td(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ai?"#define TONE_MAPPING":"",t.toneMapping!==Ai?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Ai?uv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,dv("linearToOutputTexel",t.outputColorSpace),hv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ds).join(`
`)),r=Dc(r),r=Ed(r,t),r=wd(r,t),o=Dc(o),o=Ed(o,t),o=wd(o,t),r=Ad(r),o=Ad(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===$l?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===$l?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=E+m+r,w=E+p+o,L=yd(a,a.VERTEX_SHADER,S),R=yd(a,a.FRAGMENT_SHADER,w);a.attachShader(b,L),a.attachShader(b,R),t.index0AttributeName!==void 0?a.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(b,0,"position"),a.linkProgram(b);function T(y){if(n.debug.checkShaderErrors){const G=a.getProgramInfoLog(b).trim(),W=a.getShaderInfoLog(L).trim(),Z=a.getShaderInfoLog(R).trim();let te=!0,X=!0;if(a.getProgramParameter(b,a.LINK_STATUS)===!1)if(te=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(a,b,L,R);else{const ne=Md(a,L,"vertex"),Y=Md(a,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(b,a.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+G+`
`+ne+`
`+Y)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(W===""||Z==="")&&(X=!1);X&&(y.diagnostics={runnable:te,programLog:G,vertexShader:{log:W,prefix:m},fragmentShader:{log:Z,prefix:p}})}a.deleteShader(L),a.deleteShader(R),D=new xr(a,b),j=mv(a,b)}let D;this.getUniforms=function(){return D===void 0&&T(this),D};let j;this.getAttributes=function(){return j===void 0&&T(this),j};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=a.getProgramParameter(b,rv)),_},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ov++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=L,this.fragmentShader=R,this}let Tv=0;class Rv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,a=this._getShaderStage(t),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(a)===!1&&(r.add(a),a.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Cv(e),t.set(e,i)),i}}class Cv{constructor(e){this.id=Tv++,this.code=e,this.usedTimes=0}}function Pv(n,e,t,i,a,s,r){const o=new il,c=new Rv,l=new Set,d=[],h=a.logarithmicDepthBuffer,u=a.reverseDepthBuffer,f=a.vertexTextures;let v=a.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return l.add(_),_===0?"uv":`uv${_}`}function p(_,y,G,W,Z){const te=W.fog,X=Z.geometry,ne=_.isMeshStandardMaterial?W.environment:null,Y=(_.isMeshStandardMaterial?t:e).get(_.envMap||ne),le=Y&&Y.mapping===Gr?Y.image.height:null,be=b[_.type];_.precision!==null&&(v=a.getMaxPrecision(_.precision),v!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",v,"instead."));const we=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Qe=we!==void 0?we.length:0;let g=0;X.morphAttributes.position!==void 0&&(g=1),X.morphAttributes.normal!==void 0&&(g=2),X.morphAttributes.color!==void 0&&(g=3);let P,C,B,H;if(be){const dn=Xn[be];P=dn.vertexShader,C=dn.fragmentShader}else P=_.vertexShader,C=_.fragmentShader,c.update(_),B=c.getVertexShaderID(_),H=c.getFragmentShaderID(_);const J=n.getRenderTarget(),ie=Z.isInstancedMesh===!0,ye=Z.isBatchedMesh===!0,Ce=!!_.map,me=!!_.matcap,I=!!Y,De=!!_.aoMap,Te=!!_.lightMap,ze=!!_.bumpMap,he=!!_.normalMap,Ye=!!_.displacementMap,Ne=!!_.emissiveMap,A=!!_.metalnessMap,x=!!_.roughnessMap,V=_.anisotropy>0,ee=_.clearcoat>0,se=_.dispersion>0,k=_.iridescence>0,de=_.sheen>0,ue=_.transmission>0,Me=V&&!!_.anisotropyMap,Ze=ee&&!!_.clearcoatMap,re=ee&&!!_.clearcoatNormalMap,ge=ee&&!!_.clearcoatRoughnessMap,He=k&&!!_.iridescenceMap,Ge=k&&!!_.iridescenceThicknessMap,Ee=de&&!!_.sheenColorMap,Je=de&&!!_.sheenRoughnessMap,$e=!!_.specularMap,gt=!!_.specularColorMap,N=!!_.specularIntensityMap,xe=ue&&!!_.transmissionMap,K=ue&&!!_.thicknessMap,ae=!!_.gradientMap,ve=!!_.alphaMap,Se=_.alphaTest>0,et=!!_.alphaHash,Ct=!!_.extensions;let ln=Ai;_.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(ln=n.toneMapping);const it={shaderID:be,shaderType:_.type,shaderName:_.name,vertexShader:P,fragmentShader:C,defines:_.defines,customVertexShaderID:B,customFragmentShaderID:H,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:v,batching:ye,batchingColor:ye&&Z._colorsTexture!==null,instancing:ie,instancingColor:ie&&Z.instanceColor!==null,instancingMorph:ie&&Z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:J===null?n.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Ci,alphaToCoverage:!!_.alphaToCoverage,map:Ce,matcap:me,envMap:I,envMapMode:I&&Y.mapping,envMapCubeUVHeight:le,aoMap:De,lightMap:Te,bumpMap:ze,normalMap:he,displacementMap:f&&Ye,emissiveMap:Ne,normalMapObjectSpace:he&&_.normalMapType===yf,normalMapTangentSpace:he&&_.normalMapType===Qc,metalnessMap:A,roughnessMap:x,anisotropy:V,anisotropyMap:Me,clearcoat:ee,clearcoatMap:Ze,clearcoatNormalMap:re,clearcoatRoughnessMap:ge,dispersion:se,iridescence:k,iridescenceMap:He,iridescenceThicknessMap:Ge,sheen:de,sheenColorMap:Ee,sheenRoughnessMap:Je,specularMap:$e,specularColorMap:gt,specularIntensityMap:N,transmission:ue,transmissionMap:xe,thicknessMap:K,gradientMap:ae,opaque:_.transparent===!1&&_.blending===qi&&_.alphaToCoverage===!1,alphaMap:ve,alphaTest:Se,alphaHash:et,combine:_.combine,mapUv:Ce&&m(_.map.channel),aoMapUv:De&&m(_.aoMap.channel),lightMapUv:Te&&m(_.lightMap.channel),bumpMapUv:ze&&m(_.bumpMap.channel),normalMapUv:he&&m(_.normalMap.channel),displacementMapUv:Ye&&m(_.displacementMap.channel),emissiveMapUv:Ne&&m(_.emissiveMap.channel),metalnessMapUv:A&&m(_.metalnessMap.channel),roughnessMapUv:x&&m(_.roughnessMap.channel),anisotropyMapUv:Me&&m(_.anisotropyMap.channel),clearcoatMapUv:Ze&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:re&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:He&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:Ge&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:Je&&m(_.sheenRoughnessMap.channel),specularMapUv:$e&&m(_.specularMap.channel),specularColorMapUv:gt&&m(_.specularColorMap.channel),specularIntensityMapUv:N&&m(_.specularIntensityMap.channel),transmissionMapUv:xe&&m(_.transmissionMap.channel),thicknessMapUv:K&&m(_.thicknessMap.channel),alphaMapUv:ve&&m(_.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(he||V),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:Z.isPoints===!0&&!!X.attributes.uv&&(Ce||ve),fog:!!te,useFog:_.fog===!0,fogExp2:!!te&&te.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:u,skinning:Z.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:Qe,morphTextureStride:g,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&G.length>0,shadowMapType:n.shadowMap.type,toneMapping:ln,decodeVideoTexture:Ce&&_.map.isVideoTexture===!0&&ot.getTransfer(_.map.colorSpace)===bt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===jn,flipSided:_.side===cn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Ct&&_.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ct&&_.extensions.multiDraw===!0||ye)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return it.vertexUv1s=l.has(1),it.vertexUv2s=l.has(2),it.vertexUv3s=l.has(3),l.clear(),it}function E(_){const y=[];if(_.shaderID?y.push(_.shaderID):(y.push(_.customVertexShaderID),y.push(_.customFragmentShaderID)),_.defines!==void 0)for(const G in _.defines)y.push(G),y.push(_.defines[G]);return _.isRawShaderMaterial===!1&&(S(y,_),w(y,_),y.push(n.outputColorSpace)),y.push(_.customProgramCacheKey),y.join()}function S(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)}function w(_,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),_.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.alphaToCoverage&&o.enable(20),_.push(o.mask)}function L(_){const y=b[_.type];let G;if(y){const W=Xn[y];G=fp.clone(W.uniforms)}else G=_.uniforms;return G}function R(_,y){let G;for(let W=0,Z=d.length;W<Z;W++){const te=d[W];if(te.cacheKey===y){G=te,++G.usedTimes;break}}return G===void 0&&(G=new Av(n,y,_,s),d.push(G)),G}function T(_){if(--_.usedTimes===0){const y=d.indexOf(_);d[y]=d[d.length-1],d.pop(),_.destroy()}}function D(_){c.remove(_)}function j(){c.dispose()}return{getParameters:p,getProgramCacheKey:E,getUniforms:L,acquireProgram:R,releaseProgram:T,releaseShaderCache:D,programs:d,dispose:j}}function Iv(){let n=new WeakMap;function e(r){return n.has(r)}function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function i(r){n.delete(r)}function a(r,o,c){n.get(r)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:a,dispose:s}}function Lv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Rd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Cd(){const n=[];let e=0;const t=[],i=[],a=[];function s(){e=0,t.length=0,i.length=0,a.length=0}function r(h,u,f,v,b,m){let p=n[e];return p===void 0?(p={id:h.id,object:h,geometry:u,material:f,groupOrder:v,renderOrder:h.renderOrder,z:b,group:m},n[e]=p):(p.id=h.id,p.object=h,p.geometry=u,p.material=f,p.groupOrder=v,p.renderOrder=h.renderOrder,p.z=b,p.group=m),e++,p}function o(h,u,f,v,b,m){const p=r(h,u,f,v,b,m);f.transmission>0?i.push(p):f.transparent===!0?a.push(p):t.push(p)}function c(h,u,f,v,b,m){const p=r(h,u,f,v,b,m);f.transmission>0?i.unshift(p):f.transparent===!0?a.unshift(p):t.unshift(p)}function l(h,u){t.length>1&&t.sort(h||Lv),i.length>1&&i.sort(u||Rd),a.length>1&&a.sort(u||Rd)}function d(){for(let h=e,u=n.length;h<u;h++){const f=n[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:a,init:s,push:o,unshift:c,finish:d,sort:l}}function Dv(){let n=new WeakMap;function e(i,a){const s=n.get(i);let r;return s===void 0?(r=new Cd,n.set(i,[r])):a>=s.length?(r=new Cd,s.push(r)):r=s[a],r}function t(){n=new WeakMap}return{get:e,dispose:t}}function Nv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new We};break;case"SpotLight":t={position:new U,direction:new U,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new U,halfWidth:new U,halfHeight:new U};break}return n[e.id]=t,t}}}function Uv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let zv=0;function Ov(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Fv(n){const e=new Nv,t=Uv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);const a=new U,s=new yt,r=new yt;function o(l){let d=0,h=0,u=0;for(let j=0;j<9;j++)i.probe[j].set(0,0,0);let f=0,v=0,b=0,m=0,p=0,E=0,S=0,w=0,L=0,R=0,T=0;l.sort(Ov);for(let j=0,_=l.length;j<_;j++){const y=l[j],G=y.color,W=y.intensity,Z=y.distance,te=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)d+=G.r*W,h+=G.g*W,u+=G.b*W;else if(y.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(y.sh.coefficients[X],W);T++}else if(y.isDirectionalLight){const X=e.get(y);if(X.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const ne=y.shadow,Y=t.get(y);Y.shadowIntensity=ne.intensity,Y.shadowBias=ne.bias,Y.shadowNormalBias=ne.normalBias,Y.shadowRadius=ne.radius,Y.shadowMapSize=ne.mapSize,i.directionalShadow[f]=Y,i.directionalShadowMap[f]=te,i.directionalShadowMatrix[f]=y.shadow.matrix,E++}i.directional[f]=X,f++}else if(y.isSpotLight){const X=e.get(y);X.position.setFromMatrixPosition(y.matrixWorld),X.color.copy(G).multiplyScalar(W),X.distance=Z,X.coneCos=Math.cos(y.angle),X.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),X.decay=y.decay,i.spot[b]=X;const ne=y.shadow;if(y.map&&(i.spotLightMap[L]=y.map,L++,ne.updateMatrices(y),y.castShadow&&R++),i.spotLightMatrix[b]=ne.matrix,y.castShadow){const Y=t.get(y);Y.shadowIntensity=ne.intensity,Y.shadowBias=ne.bias,Y.shadowNormalBias=ne.normalBias,Y.shadowRadius=ne.radius,Y.shadowMapSize=ne.mapSize,i.spotShadow[b]=Y,i.spotShadowMap[b]=te,w++}b++}else if(y.isRectAreaLight){const X=e.get(y);X.color.copy(G).multiplyScalar(W),X.halfWidth.set(y.width*.5,0,0),X.halfHeight.set(0,y.height*.5,0),i.rectArea[m]=X,m++}else if(y.isPointLight){const X=e.get(y);if(X.color.copy(y.color).multiplyScalar(y.intensity),X.distance=y.distance,X.decay=y.decay,y.castShadow){const ne=y.shadow,Y=t.get(y);Y.shadowIntensity=ne.intensity,Y.shadowBias=ne.bias,Y.shadowNormalBias=ne.normalBias,Y.shadowRadius=ne.radius,Y.shadowMapSize=ne.mapSize,Y.shadowCameraNear=ne.camera.near,Y.shadowCameraFar=ne.camera.far,i.pointShadow[v]=Y,i.pointShadowMap[v]=te,i.pointShadowMatrix[v]=y.shadow.matrix,S++}i.point[v]=X,v++}else if(y.isHemisphereLight){const X=e.get(y);X.skyColor.copy(y.color).multiplyScalar(W),X.groundColor.copy(y.groundColor).multiplyScalar(W),i.hemi[p]=X,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=fe.LTC_FLOAT_1,i.rectAreaLTC2=fe.LTC_FLOAT_2):(i.rectAreaLTC1=fe.LTC_HALF_1,i.rectAreaLTC2=fe.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;const D=i.hash;(D.directionalLength!==f||D.pointLength!==v||D.spotLength!==b||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==E||D.numPointShadows!==S||D.numSpotShadows!==w||D.numSpotMaps!==L||D.numLightProbes!==T)&&(i.directional.length=f,i.spot.length=b,i.rectArea.length=m,i.point.length=v,i.hemi.length=p,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=w+L-R,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=T,D.directionalLength=f,D.pointLength=v,D.spotLength=b,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=E,D.numPointShadows=S,D.numSpotShadows=w,D.numSpotMaps=L,D.numLightProbes=T,i.version=zv++)}function c(l,d){let h=0,u=0,f=0,v=0,b=0;const m=d.matrixWorldInverse;for(let p=0,E=l.length;p<E;p++){const S=l[p];if(S.isDirectionalLight){const w=i.directional[h];w.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),w.direction.sub(a),w.direction.transformDirection(m),h++}else if(S.isSpotLight){const w=i.spot[f];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),w.direction.sub(a),w.direction.transformDirection(m),f++}else if(S.isRectAreaLight){const w=i.rectArea[v];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(m),r.identity(),s.copy(S.matrixWorld),s.premultiply(m),r.extractRotation(s),w.halfWidth.set(S.width*.5,0,0),w.halfHeight.set(0,S.height*.5,0),w.halfWidth.applyMatrix4(r),w.halfHeight.applyMatrix4(r),v++}else if(S.isPointLight){const w=i.point[u];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(m),u++}else if(S.isHemisphereLight){const w=i.hemi[b];w.direction.setFromMatrixPosition(S.matrixWorld),w.direction.transformDirection(m),b++}}}return{setup:o,setupView:c,state:i}}function Pd(n){const e=new Fv(n),t=[],i=[];function a(d){l.camera=d,t.length=0,i.length=0}function s(d){t.push(d)}function r(d){i.push(d)}function o(){e.setup(t)}function c(d){e.setupView(t,d)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:r}}function kv(n){let e=new WeakMap;function t(a,s=0){const r=e.get(a);let o;return r===void 0?(o=new Pd(n),e.set(a,[o])):s>=r.length?(o=new Pd(n),r.push(o)):o=r[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}class Bv extends ta{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Hv extends ta{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Gv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function $v(n,e,t){let i=new al;const a=new Be,s=new Be,r=new At,o=new Bv({depthPacking:Sf}),c=new Hv,l={},d=t.maxTextureSize,h={[Ri]:cn,[cn]:Ri,[jn]:jn},u=new hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Be},radius:{value:4}},vertexShader:Gv,fragmentShader:Vv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const v=new Mn;v.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new pe(v,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=au;let p=this.type;this.render=function(R,T,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const j=n.getRenderTarget(),_=n.getActiveCubeFace(),y=n.getActiveMipmapLevel(),G=n.state;G.setBlending(wi),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const W=p!==ai&&this.type===ai,Z=p===ai&&this.type!==ai;for(let te=0,X=R.length;te<X;te++){const ne=R[te],Y=ne.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;a.copy(Y.mapSize);const le=Y.getFrameExtents();if(a.multiply(le),s.copy(Y.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(s.x=Math.floor(d/le.x),a.x=s.x*le.x,Y.mapSize.x=s.x),a.y>d&&(s.y=Math.floor(d/le.y),a.y=s.y*le.y,Y.mapSize.y=s.y)),Y.map===null||W===!0||Z===!0){const we=this.type!==ai?{minFilter:Cn,magFilter:Cn}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Zi(a.x,a.y,we),Y.map.texture.name=ne.name+".shadowMap",Y.camera.updateProjectionMatrix()}n.setRenderTarget(Y.map),n.clear();const be=Y.getViewportCount();for(let we=0;we<be;we++){const Qe=Y.getViewport(we);r.set(s.x*Qe.x,s.y*Qe.y,s.x*Qe.z,s.y*Qe.w),G.viewport(r),Y.updateMatrices(ne,we),i=Y.getFrustum(),w(T,D,Y.camera,ne,this.type)}Y.isPointLightShadow!==!0&&this.type===ai&&E(Y,D),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(j,_,y)};function E(R,T){const D=e.update(b);u.defines.VSM_SAMPLES!==R.blurSamples&&(u.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Zi(a.x,a.y)),u.uniforms.shadow_pass.value=R.map.texture,u.uniforms.resolution.value=R.mapSize,u.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(T,null,D,u,b,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(T,null,D,f,b,null)}function S(R,T,D,j){let _=null;const y=D.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(y!==void 0)_=y;else if(_=D.isPointLight===!0?c:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const G=_.uuid,W=T.uuid;let Z=l[G];Z===void 0&&(Z={},l[G]=Z);let te=Z[W];te===void 0&&(te=_.clone(),Z[W]=te,T.addEventListener("dispose",L)),_=te}if(_.visible=T.visible,_.wireframe=T.wireframe,j===ai?_.side=T.shadowSide!==null?T.shadowSide:T.side:_.side=T.shadowSide!==null?T.shadowSide:h[T.side],_.alphaMap=T.alphaMap,_.alphaTest=T.alphaTest,_.map=T.map,_.clipShadows=T.clipShadows,_.clippingPlanes=T.clippingPlanes,_.clipIntersection=T.clipIntersection,_.displacementMap=T.displacementMap,_.displacementScale=T.displacementScale,_.displacementBias=T.displacementBias,_.wireframeLinewidth=T.wireframeLinewidth,_.linewidth=T.linewidth,D.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const G=n.properties.get(_);G.light=D}return _}function w(R,T,D,j,_){if(R.visible===!1)return;if(R.layers.test(T.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&_===ai)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,R.matrixWorld);const W=e.update(R),Z=R.material;if(Array.isArray(Z)){const te=W.groups;for(let X=0,ne=te.length;X<ne;X++){const Y=te[X],le=Z[Y.materialIndex];if(le&&le.visible){const be=S(R,le,j,_);R.onBeforeShadow(n,R,T,D,W,be,Y),n.renderBufferDirect(D,null,W,be,R,Y),R.onAfterShadow(n,R,T,D,W,be,Y)}}}else if(Z.visible){const te=S(R,Z,j,_);R.onBeforeShadow(n,R,T,D,W,te,null),n.renderBufferDirect(D,null,W,te,R,null),R.onAfterShadow(n,R,T,D,W,te,null)}}const G=R.children;for(let W=0,Z=G.length;W<Z;W++)w(G[W],T,D,j,_)}function L(R){R.target.removeEventListener("dispose",L);for(const D in l){const j=l[D],_=R.target.uuid;_ in j&&(j[_].dispose(),delete j[_])}}}const Wv={[Yo]:Ko,[Zo]:ec,[Jo]:tc,[Da]:Qo,[Ko]:Yo,[ec]:Zo,[tc]:Jo,[Qo]:Da};function qv(n){function e(){let N=!1;const xe=new At;let K=null;const ae=new At(0,0,0,0);return{setMask:function(ve){K!==ve&&!N&&(n.colorMask(ve,ve,ve,ve),K=ve)},setLocked:function(ve){N=ve},setClear:function(ve,Se,et,Ct,ln){ln===!0&&(ve*=Ct,Se*=Ct,et*=Ct),xe.set(ve,Se,et,Ct),ae.equals(xe)===!1&&(n.clearColor(ve,Se,et,Ct),ae.copy(xe))},reset:function(){N=!1,K=null,ae.set(-1,0,0,0)}}}function t(){let N=!1,xe=!1,K=null,ae=null,ve=null;return{setReversed:function(Se){xe=Se},setTest:function(Se){Se?B(n.DEPTH_TEST):H(n.DEPTH_TEST)},setMask:function(Se){K!==Se&&!N&&(n.depthMask(Se),K=Se)},setFunc:function(Se){if(xe&&(Se=Wv[Se]),ae!==Se){switch(Se){case Yo:n.depthFunc(n.NEVER);break;case Ko:n.depthFunc(n.ALWAYS);break;case Zo:n.depthFunc(n.LESS);break;case Da:n.depthFunc(n.LEQUAL);break;case Jo:n.depthFunc(n.EQUAL);break;case Qo:n.depthFunc(n.GEQUAL);break;case ec:n.depthFunc(n.GREATER);break;case tc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ae=Se}},setLocked:function(Se){N=Se},setClear:function(Se){ve!==Se&&(n.clearDepth(Se),ve=Se)},reset:function(){N=!1,K=null,ae=null,ve=null}}}function i(){let N=!1,xe=null,K=null,ae=null,ve=null,Se=null,et=null,Ct=null,ln=null;return{setTest:function(it){N||(it?B(n.STENCIL_TEST):H(n.STENCIL_TEST))},setMask:function(it){xe!==it&&!N&&(n.stencilMask(it),xe=it)},setFunc:function(it,dn,Jn){(K!==it||ae!==dn||ve!==Jn)&&(n.stencilFunc(it,dn,Jn),K=it,ae=dn,ve=Jn)},setOp:function(it,dn,Jn){(Se!==it||et!==dn||Ct!==Jn)&&(n.stencilOp(it,dn,Jn),Se=it,et=dn,Ct=Jn)},setLocked:function(it){N=it},setClear:function(it){ln!==it&&(n.clearStencil(it),ln=it)},reset:function(){N=!1,xe=null,K=null,ae=null,ve=null,Se=null,et=null,Ct=null,ln=null}}}const a=new e,s=new t,r=new i,o=new WeakMap,c=new WeakMap;let l={},d={},h=new WeakMap,u=[],f=null,v=!1,b=null,m=null,p=null,E=null,S=null,w=null,L=null,R=new We(0,0,0),T=0,D=!1,j=null,_=null,y=null,G=null,W=null;const Z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let te=!1,X=0;const ne=n.getParameter(n.VERSION);ne.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(ne)[1]),te=X>=1):ne.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),te=X>=2);let Y=null,le={};const be=n.getParameter(n.SCISSOR_BOX),we=n.getParameter(n.VIEWPORT),Qe=new At().fromArray(be),g=new At().fromArray(we);function P(N,xe,K,ae){const ve=new Uint8Array(4),Se=n.createTexture();n.bindTexture(N,Se),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let et=0;et<K;et++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(xe,0,n.RGBA,1,1,ae,0,n.RGBA,n.UNSIGNED_BYTE,ve):n.texImage2D(xe+et,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ve);return Se}const C={};C[n.TEXTURE_2D]=P(n.TEXTURE_2D,n.TEXTURE_2D,1),C[n.TEXTURE_CUBE_MAP]=P(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),C[n.TEXTURE_2D_ARRAY]=P(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),C[n.TEXTURE_3D]=P(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),r.setClear(0),B(n.DEPTH_TEST),s.setFunc(Da),Te(!1),ze(Bl),B(n.CULL_FACE),I(wi);function B(N){l[N]!==!0&&(n.enable(N),l[N]=!0)}function H(N){l[N]!==!1&&(n.disable(N),l[N]=!1)}function J(N,xe){return d[N]!==xe?(n.bindFramebuffer(N,xe),d[N]=xe,N===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=xe),N===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=xe),!0):!1}function ie(N,xe){let K=u,ae=!1;if(N){K=h.get(xe),K===void 0&&(K=[],h.set(xe,K));const ve=N.textures;if(K.length!==ve.length||K[0]!==n.COLOR_ATTACHMENT0){for(let Se=0,et=ve.length;Se<et;Se++)K[Se]=n.COLOR_ATTACHMENT0+Se;K.length=ve.length,ae=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,ae=!0);ae&&n.drawBuffers(K)}function ye(N){return f!==N?(n.useProgram(N),f=N,!0):!1}const Ce={[Hi]:n.FUNC_ADD,[Xh]:n.FUNC_SUBTRACT,[jh]:n.FUNC_REVERSE_SUBTRACT};Ce[Yh]=n.MIN,Ce[Kh]=n.MAX;const me={[Zh]:n.ZERO,[Jh]:n.ONE,[Qh]:n.SRC_COLOR,[Xo]:n.SRC_ALPHA,[rf]:n.SRC_ALPHA_SATURATE,[af]:n.DST_COLOR,[tf]:n.DST_ALPHA,[ef]:n.ONE_MINUS_SRC_COLOR,[jo]:n.ONE_MINUS_SRC_ALPHA,[sf]:n.ONE_MINUS_DST_COLOR,[nf]:n.ONE_MINUS_DST_ALPHA,[of]:n.CONSTANT_COLOR,[cf]:n.ONE_MINUS_CONSTANT_COLOR,[lf]:n.CONSTANT_ALPHA,[df]:n.ONE_MINUS_CONSTANT_ALPHA};function I(N,xe,K,ae,ve,Se,et,Ct,ln,it){if(N===wi){v===!0&&(H(n.BLEND),v=!1);return}if(v===!1&&(B(n.BLEND),v=!0),N!==qh){if(N!==b||it!==D){if((m!==Hi||S!==Hi)&&(n.blendEquation(n.FUNC_ADD),m=Hi,S=Hi),it)switch(N){case qi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vs:n.blendFunc(n.ONE,n.ONE);break;case Hl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Gl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case qi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vs:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Hl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Gl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}p=null,E=null,w=null,L=null,R.set(0,0,0),T=0,b=N,D=it}return}ve=ve||xe,Se=Se||K,et=et||ae,(xe!==m||ve!==S)&&(n.blendEquationSeparate(Ce[xe],Ce[ve]),m=xe,S=ve),(K!==p||ae!==E||Se!==w||et!==L)&&(n.blendFuncSeparate(me[K],me[ae],me[Se],me[et]),p=K,E=ae,w=Se,L=et),(Ct.equals(R)===!1||ln!==T)&&(n.blendColor(Ct.r,Ct.g,Ct.b,ln),R.copy(Ct),T=ln),b=N,D=!1}function De(N,xe){N.side===jn?H(n.CULL_FACE):B(n.CULL_FACE);let K=N.side===cn;xe&&(K=!K),Te(K),N.blending===qi&&N.transparent===!1?I(wi):I(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),s.setFunc(N.depthFunc),s.setTest(N.depthTest),s.setMask(N.depthWrite),a.setMask(N.colorWrite);const ae=N.stencilWrite;r.setTest(ae),ae&&(r.setMask(N.stencilWriteMask),r.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),r.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ye(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?B(n.SAMPLE_ALPHA_TO_COVERAGE):H(n.SAMPLE_ALPHA_TO_COVERAGE)}function Te(N){j!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),j=N)}function ze(N){N!==$h?(B(n.CULL_FACE),N!==_&&(N===Bl?n.cullFace(n.BACK):N===Wh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):H(n.CULL_FACE),_=N}function he(N){N!==y&&(te&&n.lineWidth(N),y=N)}function Ye(N,xe,K){N?(B(n.POLYGON_OFFSET_FILL),(G!==xe||W!==K)&&(n.polygonOffset(xe,K),G=xe,W=K)):H(n.POLYGON_OFFSET_FILL)}function Ne(N){N?B(n.SCISSOR_TEST):H(n.SCISSOR_TEST)}function A(N){N===void 0&&(N=n.TEXTURE0+Z-1),Y!==N&&(n.activeTexture(N),Y=N)}function x(N,xe,K){K===void 0&&(Y===null?K=n.TEXTURE0+Z-1:K=Y);let ae=le[K];ae===void 0&&(ae={type:void 0,texture:void 0},le[K]=ae),(ae.type!==N||ae.texture!==xe)&&(Y!==K&&(n.activeTexture(K),Y=K),n.bindTexture(N,xe||C[N]),ae.type=N,ae.texture=xe)}function V(){const N=le[Y];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function ee(){try{n.compressedTexImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function se(){try{n.compressedTexImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function k(){try{n.texSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function de(){try{n.texSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ue(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Me(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ze(){try{n.texStorage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function re(){try{n.texStorage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ge(){try{n.texImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function He(){try{n.texImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ge(N){Qe.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),Qe.copy(N))}function Ee(N){g.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),g.copy(N))}function Je(N,xe){let K=c.get(xe);K===void 0&&(K=new WeakMap,c.set(xe,K));let ae=K.get(N);ae===void 0&&(ae=n.getUniformBlockIndex(xe,N.name),K.set(N,ae))}function $e(N,xe){const ae=c.get(xe).get(N);o.get(xe)!==ae&&(n.uniformBlockBinding(xe,ae,N.__bindingPointIndex),o.set(xe,ae))}function gt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),l={},Y=null,le={},d={},h=new WeakMap,u=[],f=null,v=!1,b=null,m=null,p=null,E=null,S=null,w=null,L=null,R=new We(0,0,0),T=0,D=!1,j=null,_=null,y=null,G=null,W=null,Qe.set(0,0,n.canvas.width,n.canvas.height),g.set(0,0,n.canvas.width,n.canvas.height),a.reset(),s.reset(),r.reset()}return{buffers:{color:a,depth:s,stencil:r},enable:B,disable:H,bindFramebuffer:J,drawBuffers:ie,useProgram:ye,setBlending:I,setMaterial:De,setFlipSided:Te,setCullFace:ze,setLineWidth:he,setPolygonOffset:Ye,setScissorTest:Ne,activeTexture:A,bindTexture:x,unbindTexture:V,compressedTexImage2D:ee,compressedTexImage3D:se,texImage2D:ge,texImage3D:He,updateUBOMapping:Je,uniformBlockBinding:$e,texStorage2D:Ze,texStorage3D:re,texSubImage2D:k,texSubImage3D:de,compressedTexSubImage2D:ue,compressedTexSubImage3D:Me,scissor:Ge,viewport:Ee,reset:gt}}function Id(n,e,t,i){const a=Xv(i);switch(t){case uu:return n*e;case fu:return n*e;case pu:return n*e*2;case mu:return n*e/a.components*a.byteLength;case Kc:return n*e/a.components*a.byteLength;case gu:return n*e*2/a.components*a.byteLength;case Zc:return n*e*2/a.components*a.byteLength;case hu:return n*e*3/a.components*a.byteLength;case Gn:return n*e*4/a.components*a.byteLength;case Jc:return n*e*4/a.components*a.byteLength;case pr:case mr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case gr:case vr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case rc:case cc:return Math.max(n,16)*Math.max(e,8)/4;case sc:case oc:return Math.max(n,8)*Math.max(e,8)/2;case lc:case dc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case uc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case hc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case pc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case mc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case gc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case vc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case _c:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case bc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case xc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Sc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case yc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Mc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ec:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case wc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case _r:case Ac:case Tc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case vu:case Rc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Cc:case Pc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Xv(n){switch(n){case ui:case cu:return{byteLength:1,components:1};case _s:case lu:case Rs:return{byteLength:2,components:1};case jc:case Yc:return{byteLength:2,components:4};case Ki:case Xc:case ri:return{byteLength:4,components:1};case du:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function jv(n,e,t,i,a,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Be,d=new WeakMap;let h;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(A,x){return f?new OffscreenCanvas(A,x):xs("canvas")}function b(A,x,V){let ee=1;const se=Ne(A);if((se.width>V||se.height>V)&&(ee=V/Math.max(se.width,se.height)),ee<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const k=Math.floor(ee*se.width),de=Math.floor(ee*se.height);h===void 0&&(h=v(k,de));const ue=x?v(k,de):h;return ue.width=k,ue.height=de,ue.getContext("2d").drawImage(A,0,0,k,de),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+k+"x"+de+")."),ue}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),A;return A}function m(A){return A.generateMipmaps&&A.minFilter!==Cn&&A.minFilter!==kn}function p(A){n.generateMipmap(A)}function E(A,x,V,ee,se=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let k=x;if(x===n.RED&&(V===n.FLOAT&&(k=n.R32F),V===n.HALF_FLOAT&&(k=n.R16F),V===n.UNSIGNED_BYTE&&(k=n.R8)),x===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(k=n.R8UI),V===n.UNSIGNED_SHORT&&(k=n.R16UI),V===n.UNSIGNED_INT&&(k=n.R32UI),V===n.BYTE&&(k=n.R8I),V===n.SHORT&&(k=n.R16I),V===n.INT&&(k=n.R32I)),x===n.RG&&(V===n.FLOAT&&(k=n.RG32F),V===n.HALF_FLOAT&&(k=n.RG16F),V===n.UNSIGNED_BYTE&&(k=n.RG8)),x===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(k=n.RG8UI),V===n.UNSIGNED_SHORT&&(k=n.RG16UI),V===n.UNSIGNED_INT&&(k=n.RG32UI),V===n.BYTE&&(k=n.RG8I),V===n.SHORT&&(k=n.RG16I),V===n.INT&&(k=n.RG32I)),x===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(k=n.RGB8UI),V===n.UNSIGNED_SHORT&&(k=n.RGB16UI),V===n.UNSIGNED_INT&&(k=n.RGB32UI),V===n.BYTE&&(k=n.RGB8I),V===n.SHORT&&(k=n.RGB16I),V===n.INT&&(k=n.RGB32I)),x===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(k=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(k=n.RGBA16UI),V===n.UNSIGNED_INT&&(k=n.RGBA32UI),V===n.BYTE&&(k=n.RGBA8I),V===n.SHORT&&(k=n.RGBA16I),V===n.INT&&(k=n.RGBA32I)),x===n.RGB&&V===n.UNSIGNED_INT_5_9_9_9_REV&&(k=n.RGB9_E5),x===n.RGBA){const de=se?Rr:ot.getTransfer(ee);V===n.FLOAT&&(k=n.RGBA32F),V===n.HALF_FLOAT&&(k=n.RGBA16F),V===n.UNSIGNED_BYTE&&(k=de===bt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(k=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(k=n.RGB5_A1)}return(k===n.R16F||k===n.R32F||k===n.RG16F||k===n.RG32F||k===n.RGBA16F||k===n.RGBA32F)&&e.get("EXT_color_buffer_float"),k}function S(A,x){let V;return A?x===null||x===Ki||x===za?V=n.DEPTH24_STENCIL8:x===ri?V=n.DEPTH32F_STENCIL8:x===_s&&(V=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Ki||x===za?V=n.DEPTH_COMPONENT24:x===ri?V=n.DEPTH_COMPONENT32F:x===_s&&(V=n.DEPTH_COMPONENT16),V}function w(A,x){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Cn&&A.minFilter!==kn?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function L(A){const x=A.target;x.removeEventListener("dispose",L),T(x),x.isVideoTexture&&d.delete(x)}function R(A){const x=A.target;x.removeEventListener("dispose",R),j(x)}function T(A){const x=i.get(A);if(x.__webglInit===void 0)return;const V=A.source,ee=u.get(V);if(ee){const se=ee[x.__cacheKey];se.usedTimes--,se.usedTimes===0&&D(A),Object.keys(ee).length===0&&u.delete(V)}i.remove(A)}function D(A){const x=i.get(A);n.deleteTexture(x.__webglTexture);const V=A.source,ee=u.get(V);delete ee[x.__cacheKey],r.memory.textures--}function j(A){const x=i.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(x.__webglFramebuffer[ee]))for(let se=0;se<x.__webglFramebuffer[ee].length;se++)n.deleteFramebuffer(x.__webglFramebuffer[ee][se]);else n.deleteFramebuffer(x.__webglFramebuffer[ee]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[ee])}else{if(Array.isArray(x.__webglFramebuffer))for(let ee=0;ee<x.__webglFramebuffer.length;ee++)n.deleteFramebuffer(x.__webglFramebuffer[ee]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let ee=0;ee<x.__webglColorRenderbuffer.length;ee++)x.__webglColorRenderbuffer[ee]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[ee]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const V=A.textures;for(let ee=0,se=V.length;ee<se;ee++){const k=i.get(V[ee]);k.__webglTexture&&(n.deleteTexture(k.__webglTexture),r.memory.textures--),i.remove(V[ee])}i.remove(A)}let _=0;function y(){_=0}function G(){const A=_;return A>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+a.maxTextures),_+=1,A}function W(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function Z(A,x){const V=i.get(A);if(A.isVideoTexture&&he(A),A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){const ee=A.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{g(V,A,x);return}}t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+x)}function te(A,x){const V=i.get(A);if(A.version>0&&V.__version!==A.version){g(V,A,x);return}t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+x)}function X(A,x){const V=i.get(A);if(A.version>0&&V.__version!==A.version){g(V,A,x);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+x)}function ne(A,x){const V=i.get(A);if(A.version>0&&V.__version!==A.version){P(V,A,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+x)}const Y={[Yi]:n.REPEAT,[$i]:n.CLAMP_TO_EDGE,[ac]:n.MIRRORED_REPEAT},le={[Cn]:n.NEAREST,[bf]:n.NEAREST_MIPMAP_NEAREST,[zs]:n.NEAREST_MIPMAP_LINEAR,[kn]:n.LINEAR,[ro]:n.LINEAR_MIPMAP_NEAREST,[Wi]:n.LINEAR_MIPMAP_LINEAR},be={[Mf]:n.NEVER,[Cf]:n.ALWAYS,[Ef]:n.LESS,[_u]:n.LEQUAL,[wf]:n.EQUAL,[Rf]:n.GEQUAL,[Af]:n.GREATER,[Tf]:n.NOTEQUAL};function we(A,x){if(x.type===ri&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===kn||x.magFilter===ro||x.magFilter===zs||x.magFilter===Wi||x.minFilter===kn||x.minFilter===ro||x.minFilter===zs||x.minFilter===Wi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,Y[x.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,Y[x.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,Y[x.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,le[x.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,le[x.minFilter]),x.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,be[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Cn||x.minFilter!==zs&&x.minFilter!==Wi||x.type===ri&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,a.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Qe(A,x){let V=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",L));const ee=x.source;let se=u.get(ee);se===void 0&&(se={},u.set(ee,se));const k=W(x);if(k!==A.__cacheKey){se[k]===void 0&&(se[k]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,V=!0),se[k].usedTimes++;const de=se[A.__cacheKey];de!==void 0&&(se[A.__cacheKey].usedTimes--,de.usedTimes===0&&D(x)),A.__cacheKey=k,A.__webglTexture=se[k].texture}return V}function g(A,x,V){let ee=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(ee=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(ee=n.TEXTURE_3D);const se=Qe(A,x),k=x.source;t.bindTexture(ee,A.__webglTexture,n.TEXTURE0+V);const de=i.get(k);if(k.version!==de.__version||se===!0){t.activeTexture(n.TEXTURE0+V);const ue=ot.getPrimaries(ot.workingColorSpace),Me=x.colorSpace===Mi?null:ot.getPrimaries(x.colorSpace),Ze=x.colorSpace===Mi||ue===Me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze);let re=b(x.image,!1,a.maxTextureSize);re=Ye(x,re);const ge=s.convert(x.format,x.colorSpace),He=s.convert(x.type);let Ge=E(x.internalFormat,ge,He,x.colorSpace,x.isVideoTexture);we(ee,x);let Ee;const Je=x.mipmaps,$e=x.isVideoTexture!==!0,gt=de.__version===void 0||se===!0,N=k.dataReady,xe=w(x,re);if(x.isDepthTexture)Ge=S(x.format===Oa,x.type),gt&&($e?t.texStorage2D(n.TEXTURE_2D,1,Ge,re.width,re.height):t.texImage2D(n.TEXTURE_2D,0,Ge,re.width,re.height,0,ge,He,null));else if(x.isDataTexture)if(Je.length>0){$e&&gt&&t.texStorage2D(n.TEXTURE_2D,xe,Ge,Je[0].width,Je[0].height);for(let K=0,ae=Je.length;K<ae;K++)Ee=Je[K],$e?N&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,Ee.width,Ee.height,ge,He,Ee.data):t.texImage2D(n.TEXTURE_2D,K,Ge,Ee.width,Ee.height,0,ge,He,Ee.data);x.generateMipmaps=!1}else $e?(gt&&t.texStorage2D(n.TEXTURE_2D,xe,Ge,re.width,re.height),N&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,re.width,re.height,ge,He,re.data)):t.texImage2D(n.TEXTURE_2D,0,Ge,re.width,re.height,0,ge,He,re.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){$e&&gt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,Ge,Je[0].width,Je[0].height,re.depth);for(let K=0,ae=Je.length;K<ae;K++)if(Ee=Je[K],x.format!==Gn)if(ge!==null)if($e){if(N)if(x.layerUpdates.size>0){const ve=Id(Ee.width,Ee.height,x.format,x.type);for(const Se of x.layerUpdates){const et=Ee.data.subarray(Se*ve/Ee.data.BYTES_PER_ELEMENT,(Se+1)*ve/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,Se,Ee.width,Ee.height,1,ge,et,0,0)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,Ee.width,Ee.height,re.depth,ge,Ee.data,0,0)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,Ge,Ee.width,Ee.height,re.depth,0,Ee.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?N&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,Ee.width,Ee.height,re.depth,ge,He,Ee.data):t.texImage3D(n.TEXTURE_2D_ARRAY,K,Ge,Ee.width,Ee.height,re.depth,0,ge,He,Ee.data)}else{$e&&gt&&t.texStorage2D(n.TEXTURE_2D,xe,Ge,Je[0].width,Je[0].height);for(let K=0,ae=Je.length;K<ae;K++)Ee=Je[K],x.format!==Gn?ge!==null?$e?N&&t.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,Ee.width,Ee.height,ge,Ee.data):t.compressedTexImage2D(n.TEXTURE_2D,K,Ge,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?N&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,Ee.width,Ee.height,ge,He,Ee.data):t.texImage2D(n.TEXTURE_2D,K,Ge,Ee.width,Ee.height,0,ge,He,Ee.data)}else if(x.isDataArrayTexture)if($e){if(gt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,Ge,re.width,re.height,re.depth),N)if(x.layerUpdates.size>0){const K=Id(re.width,re.height,x.format,x.type);for(const ae of x.layerUpdates){const ve=re.data.subarray(ae*K/re.data.BYTES_PER_ELEMENT,(ae+1)*K/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ae,re.width,re.height,1,ge,He,ve)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,ge,He,re.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ge,re.width,re.height,re.depth,0,ge,He,re.data);else if(x.isData3DTexture)$e?(gt&&t.texStorage3D(n.TEXTURE_3D,xe,Ge,re.width,re.height,re.depth),N&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,ge,He,re.data)):t.texImage3D(n.TEXTURE_3D,0,Ge,re.width,re.height,re.depth,0,ge,He,re.data);else if(x.isFramebufferTexture){if(gt)if($e)t.texStorage2D(n.TEXTURE_2D,xe,Ge,re.width,re.height);else{let K=re.width,ae=re.height;for(let ve=0;ve<xe;ve++)t.texImage2D(n.TEXTURE_2D,ve,Ge,K,ae,0,ge,He,null),K>>=1,ae>>=1}}else if(Je.length>0){if($e&&gt){const K=Ne(Je[0]);t.texStorage2D(n.TEXTURE_2D,xe,Ge,K.width,K.height)}for(let K=0,ae=Je.length;K<ae;K++)Ee=Je[K],$e?N&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,ge,He,Ee):t.texImage2D(n.TEXTURE_2D,K,Ge,ge,He,Ee);x.generateMipmaps=!1}else if($e){if(gt){const K=Ne(re);t.texStorage2D(n.TEXTURE_2D,xe,Ge,K.width,K.height)}N&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ge,He,re)}else t.texImage2D(n.TEXTURE_2D,0,Ge,ge,He,re);m(x)&&p(ee),de.__version=k.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function P(A,x,V){if(x.image.length!==6)return;const ee=Qe(A,x),se=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+V);const k=i.get(se);if(se.version!==k.__version||ee===!0){t.activeTexture(n.TEXTURE0+V);const de=ot.getPrimaries(ot.workingColorSpace),ue=x.colorSpace===Mi?null:ot.getPrimaries(x.colorSpace),Me=x.colorSpace===Mi||de===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Ze=x.isCompressedTexture||x.image[0].isCompressedTexture,re=x.image[0]&&x.image[0].isDataTexture,ge=[];for(let ae=0;ae<6;ae++)!Ze&&!re?ge[ae]=b(x.image[ae],!0,a.maxCubemapSize):ge[ae]=re?x.image[ae].image:x.image[ae],ge[ae]=Ye(x,ge[ae]);const He=ge[0],Ge=s.convert(x.format,x.colorSpace),Ee=s.convert(x.type),Je=E(x.internalFormat,Ge,Ee,x.colorSpace),$e=x.isVideoTexture!==!0,gt=k.__version===void 0||ee===!0,N=se.dataReady;let xe=w(x,He);we(n.TEXTURE_CUBE_MAP,x);let K;if(Ze){$e&&gt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Je,He.width,He.height);for(let ae=0;ae<6;ae++){K=ge[ae].mipmaps;for(let ve=0;ve<K.length;ve++){const Se=K[ve];x.format!==Gn?Ge!==null?$e?N&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve,0,0,Se.width,Se.height,Ge,Se.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve,Je,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?N&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve,0,0,Se.width,Se.height,Ge,Ee,Se.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve,Je,Se.width,Se.height,0,Ge,Ee,Se.data)}}}else{if(K=x.mipmaps,$e&&gt){K.length>0&&xe++;const ae=Ne(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Je,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(re){$e?N&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ge[ae].width,ge[ae].height,Ge,Ee,ge[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Je,ge[ae].width,ge[ae].height,0,Ge,Ee,ge[ae].data);for(let ve=0;ve<K.length;ve++){const et=K[ve].image[ae].image;$e?N&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve+1,0,0,et.width,et.height,Ge,Ee,et.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve+1,Je,et.width,et.height,0,Ge,Ee,et.data)}}else{$e?N&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Ge,Ee,ge[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Je,Ge,Ee,ge[ae]);for(let ve=0;ve<K.length;ve++){const Se=K[ve];$e?N&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve+1,0,0,Ge,Ee,Se.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve+1,Je,Ge,Ee,Se.image[ae])}}}m(x)&&p(n.TEXTURE_CUBE_MAP),k.__version=se.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function C(A,x,V,ee,se,k){const de=s.convert(V.format,V.colorSpace),ue=s.convert(V.type),Me=E(V.internalFormat,de,ue,V.colorSpace);if(!i.get(x).__hasExternalTextures){const re=Math.max(1,x.width>>k),ge=Math.max(1,x.height>>k);se===n.TEXTURE_3D||se===n.TEXTURE_2D_ARRAY?t.texImage3D(se,k,Me,re,ge,x.depth,0,de,ue,null):t.texImage2D(se,k,Me,re,ge,0,de,ue,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),ze(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,se,i.get(V).__webglTexture,0,Te(x)):(se===n.TEXTURE_2D||se>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ee,se,i.get(V).__webglTexture,k),t.bindFramebuffer(n.FRAMEBUFFER,null)}function B(A,x,V){if(n.bindRenderbuffer(n.RENDERBUFFER,A),x.depthBuffer){const ee=x.depthTexture,se=ee&&ee.isDepthTexture?ee.type:null,k=S(x.stencilBuffer,se),de=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=Te(x);ze(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue,k,x.width,x.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue,k,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,k,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,de,n.RENDERBUFFER,A)}else{const ee=x.textures;for(let se=0;se<ee.length;se++){const k=ee[se],de=s.convert(k.format,k.colorSpace),ue=s.convert(k.type),Me=E(k.internalFormat,de,ue,k.colorSpace),Ze=Te(x);V&&ze(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ze,Me,x.width,x.height):ze(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ze,Me,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Me,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function H(A,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Z(x.depthTexture,0);const ee=i.get(x.depthTexture).__webglTexture,se=Te(x);if(x.depthTexture.format===Ca)ze(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0,se):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0);else if(x.depthTexture.format===Oa)ze(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0,se):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function J(A){const x=i.get(A),V=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const ee=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),ee){const se=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,ee.removeEventListener("dispose",se)};ee.addEventListener("dispose",se),x.__depthDisposeCallback=se}x.__boundDepthTexture=ee}if(A.depthTexture&&!x.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");H(x.__webglFramebuffer,A)}else if(V){x.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[ee]),x.__webglDepthbuffer[ee]===void 0)x.__webglDepthbuffer[ee]=n.createRenderbuffer(),B(x.__webglDepthbuffer[ee],A,!1);else{const se=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,k=x.__webglDepthbuffer[ee];n.bindRenderbuffer(n.RENDERBUFFER,k),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,k)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),B(x.__webglDepthbuffer,A,!1);else{const ee=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,se=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,se),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,se)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ie(A,x,V){const ee=i.get(A);x!==void 0&&C(ee.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&J(A)}function ye(A){const x=A.texture,V=i.get(A),ee=i.get(x);A.addEventListener("dispose",R);const se=A.textures,k=A.isWebGLCubeRenderTarget===!0,de=se.length>1;if(de||(ee.__webglTexture===void 0&&(ee.__webglTexture=n.createTexture()),ee.__version=x.version,r.memory.textures++),k){V.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer[ue]=[];for(let Me=0;Me<x.mipmaps.length;Me++)V.__webglFramebuffer[ue][Me]=n.createFramebuffer()}else V.__webglFramebuffer[ue]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer=[];for(let ue=0;ue<x.mipmaps.length;ue++)V.__webglFramebuffer[ue]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(de)for(let ue=0,Me=se.length;ue<Me;ue++){const Ze=i.get(se[ue]);Ze.__webglTexture===void 0&&(Ze.__webglTexture=n.createTexture(),r.memory.textures++)}if(A.samples>0&&ze(A)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ue=0;ue<se.length;ue++){const Me=se[ue];V.__webglColorRenderbuffer[ue]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[ue]);const Ze=s.convert(Me.format,Me.colorSpace),re=s.convert(Me.type),ge=E(Me.internalFormat,Ze,re,Me.colorSpace,A.isXRRenderTarget===!0),He=Te(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,He,ge,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,V.__webglColorRenderbuffer[ue])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),B(V.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(k){t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),we(n.TEXTURE_CUBE_MAP,x);for(let ue=0;ue<6;ue++)if(x.mipmaps&&x.mipmaps.length>0)for(let Me=0;Me<x.mipmaps.length;Me++)C(V.__webglFramebuffer[ue][Me],A,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Me);else C(V.__webglFramebuffer[ue],A,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);m(x)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){for(let ue=0,Me=se.length;ue<Me;ue++){const Ze=se[ue],re=i.get(Ze);t.bindTexture(n.TEXTURE_2D,re.__webglTexture),we(n.TEXTURE_2D,Ze),C(V.__webglFramebuffer,A,Ze,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,0),m(Ze)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let ue=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ue=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,ee.__webglTexture),we(ue,x),x.mipmaps&&x.mipmaps.length>0)for(let Me=0;Me<x.mipmaps.length;Me++)C(V.__webglFramebuffer[Me],A,x,n.COLOR_ATTACHMENT0,ue,Me);else C(V.__webglFramebuffer,A,x,n.COLOR_ATTACHMENT0,ue,0);m(x)&&p(ue),t.unbindTexture()}A.depthBuffer&&J(A)}function Ce(A){const x=A.textures;for(let V=0,ee=x.length;V<ee;V++){const se=x[V];if(m(se)){const k=A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,de=i.get(se).__webglTexture;t.bindTexture(k,de),p(k),t.unbindTexture()}}}const me=[],I=[];function De(A){if(A.samples>0){if(ze(A)===!1){const x=A.textures,V=A.width,ee=A.height;let se=n.COLOR_BUFFER_BIT;const k=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=i.get(A),ue=x.length>1;if(ue)for(let Me=0;Me<x.length;Me++)t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let Me=0;Me<x.length;Me++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(se|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(se|=n.STENCIL_BUFFER_BIT)),ue){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,de.__webglColorRenderbuffer[Me]);const Ze=i.get(x[Me]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ze,0)}n.blitFramebuffer(0,0,V,ee,0,0,V,ee,se,n.NEAREST),c===!0&&(me.length=0,I.length=0,me.push(n.COLOR_ATTACHMENT0+Me),A.depthBuffer&&A.resolveDepthBuffer===!1&&(me.push(k),I.push(k),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,I)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,me))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ue)for(let Me=0;Me<x.length;Me++){t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,de.__webglColorRenderbuffer[Me]);const Ze=i.get(x[Me]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,Ze,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const x=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Te(A){return Math.min(a.maxSamples,A.samples)}function ze(A){const x=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function he(A){const x=r.render.frame;d.get(A)!==x&&(d.set(A,x),A.update())}function Ye(A,x){const V=A.colorSpace,ee=A.format,se=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||V!==Ci&&V!==Mi&&(ot.getTransfer(V)===bt?(ee!==Gn||se!==ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),x}function Ne(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=y,this.setTexture2D=Z,this.setTexture2DArray=te,this.setTexture3D=X,this.setTextureCube=ne,this.rebindTextures=ie,this.setupRenderTarget=ye,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=J,this.setupFrameBufferTexture=C,this.useMultisampledRTT=ze}function Yv(n,e){function t(i,a=Mi){let s;const r=ot.getTransfer(a);if(i===ui)return n.UNSIGNED_BYTE;if(i===jc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Yc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===du)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===cu)return n.BYTE;if(i===lu)return n.SHORT;if(i===_s)return n.UNSIGNED_SHORT;if(i===Xc)return n.INT;if(i===Ki)return n.UNSIGNED_INT;if(i===ri)return n.FLOAT;if(i===Rs)return n.HALF_FLOAT;if(i===uu)return n.ALPHA;if(i===hu)return n.RGB;if(i===Gn)return n.RGBA;if(i===fu)return n.LUMINANCE;if(i===pu)return n.LUMINANCE_ALPHA;if(i===Ca)return n.DEPTH_COMPONENT;if(i===Oa)return n.DEPTH_STENCIL;if(i===mu)return n.RED;if(i===Kc)return n.RED_INTEGER;if(i===gu)return n.RG;if(i===Zc)return n.RG_INTEGER;if(i===Jc)return n.RGBA_INTEGER;if(i===pr||i===mr||i===gr||i===vr)if(r===bt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===pr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===mr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===gr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===vr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===pr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===mr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===gr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===vr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===sc||i===rc||i===oc||i===cc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===sc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===rc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===oc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===cc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===lc||i===dc||i===uc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===lc||i===dc)return r===bt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===uc)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===hc||i===fc||i===pc||i===mc||i===gc||i===vc||i===_c||i===bc||i===xc||i===Sc||i===yc||i===Mc||i===Ec||i===wc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===hc)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fc)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pc)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===mc)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===gc)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===vc)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_c)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===bc)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===xc)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Sc)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===yc)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Mc)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ec)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===wc)return r===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===_r||i===Ac||i===Tc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===_r)return r===bt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ac)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Tc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===vu||i===Rc||i===Cc||i===Pc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===_r)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Rc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Cc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Pc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===za?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Kv extends Fn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class pt extends $t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Zv={type:"move"};class Uo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let a=null,s=null,r=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){r=!0;for(const b of e.hand.values()){const m=t.getJointPose(b,i),p=this._getHandJoint(l,b);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],u=d.position.distanceTo(h.position),f=.02,v=.005;l.inputState.pinching&&u>f+v?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-v&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(a=t.getPose(e.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Zv)))}return o!==null&&(o.visible=a!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new pt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Jv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Qv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class e_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const a=new tn,s=e.properties.get(a);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new hi({vertexShader:Jv,fragmentShader:Qv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pe(new Ht(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class t_ extends Va{constructor(e,t){super();const i=this;let a=null,s=1,r=null,o="local-floor",c=1,l=null,d=null,h=null,u=null,f=null,v=null;const b=new e_,m=t.getContextAttributes();let p=null,E=null;const S=[],w=[],L=new Be;let R=null;const T=new Fn;T.layers.enable(1),T.viewport=new At;const D=new Fn;D.layers.enable(2),D.viewport=new At;const j=[T,D],_=new Kv;_.layers.enable(1),_.layers.enable(2);let y=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(P){let C=S[P];return C===void 0&&(C=new Uo,S[P]=C),C.getTargetRaySpace()},this.getControllerGrip=function(P){let C=S[P];return C===void 0&&(C=new Uo,S[P]=C),C.getGripSpace()},this.getHand=function(P){let C=S[P];return C===void 0&&(C=new Uo,S[P]=C),C.getHandSpace()};function W(P){const C=w.indexOf(P.inputSource);if(C===-1)return;const B=S[C];B!==void 0&&(B.update(P.inputSource,P.frame,l||r),B.dispatchEvent({type:P.type,data:P.inputSource}))}function Z(){a.removeEventListener("select",W),a.removeEventListener("selectstart",W),a.removeEventListener("selectend",W),a.removeEventListener("squeeze",W),a.removeEventListener("squeezestart",W),a.removeEventListener("squeezeend",W),a.removeEventListener("end",Z),a.removeEventListener("inputsourceschange",te);for(let P=0;P<S.length;P++){const C=w[P];C!==null&&(w[P]=null,S[P].disconnect(C))}y=null,G=null,b.reset(),e.setRenderTarget(p),f=null,u=null,h=null,a=null,E=null,g.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(P){s=P,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(P){o=P,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(P){l=P},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return a},this.setSession=async function(P){if(a=P,a!==null){if(p=e.getRenderTarget(),a.addEventListener("select",W),a.addEventListener("selectstart",W),a.addEventListener("selectend",W),a.addEventListener("squeeze",W),a.addEventListener("squeezestart",W),a.addEventListener("squeezeend",W),a.addEventListener("end",Z),a.addEventListener("inputsourceschange",te),m.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(L),a.renderState.layers===void 0){const C={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(a,t,C),a.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),E=new Zi(f.framebufferWidth,f.framebufferHeight,{format:Gn,type:ui,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let C=null,B=null,H=null;m.depth&&(H=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,C=m.stencil?Oa:Ca,B=m.stencil?za:Ki);const J={colorFormat:t.RGBA8,depthFormat:H,scaleFactor:s};h=new XRWebGLBinding(a,t),u=h.createProjectionLayer(J),a.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),E=new Zi(u.textureWidth,u.textureHeight,{format:Gn,type:ui,depthTexture:new Pu(u.textureWidth,u.textureHeight,B,void 0,void 0,void 0,void 0,void 0,void 0,C),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await a.requestReferenceSpace(o),g.setContext(a),g.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function te(P){for(let C=0;C<P.removed.length;C++){const B=P.removed[C],H=w.indexOf(B);H>=0&&(w[H]=null,S[H].disconnect(B))}for(let C=0;C<P.added.length;C++){const B=P.added[C];let H=w.indexOf(B);if(H===-1){for(let ie=0;ie<S.length;ie++)if(ie>=w.length){w.push(B),H=ie;break}else if(w[ie]===null){w[ie]=B,H=ie;break}if(H===-1)break}const J=S[H];J&&J.connect(B)}}const X=new U,ne=new U;function Y(P,C,B){X.setFromMatrixPosition(C.matrixWorld),ne.setFromMatrixPosition(B.matrixWorld);const H=X.distanceTo(ne),J=C.projectionMatrix.elements,ie=B.projectionMatrix.elements,ye=J[14]/(J[10]-1),Ce=J[14]/(J[10]+1),me=(J[9]+1)/J[5],I=(J[9]-1)/J[5],De=(J[8]-1)/J[0],Te=(ie[8]+1)/ie[0],ze=ye*De,he=ye*Te,Ye=H/(-De+Te),Ne=Ye*-De;if(C.matrixWorld.decompose(P.position,P.quaternion,P.scale),P.translateX(Ne),P.translateZ(Ye),P.matrixWorld.compose(P.position,P.quaternion,P.scale),P.matrixWorldInverse.copy(P.matrixWorld).invert(),J[10]===-1)P.projectionMatrix.copy(C.projectionMatrix),P.projectionMatrixInverse.copy(C.projectionMatrixInverse);else{const A=ye+Ye,x=Ce+Ye,V=ze-Ne,ee=he+(H-Ne),se=me*Ce/x*A,k=I*Ce/x*A;P.projectionMatrix.makePerspective(V,ee,se,k,A,x),P.projectionMatrixInverse.copy(P.projectionMatrix).invert()}}function le(P,C){C===null?P.matrixWorld.copy(P.matrix):P.matrixWorld.multiplyMatrices(C.matrixWorld,P.matrix),P.matrixWorldInverse.copy(P.matrixWorld).invert()}this.updateCamera=function(P){if(a===null)return;let C=P.near,B=P.far;b.texture!==null&&(b.depthNear>0&&(C=b.depthNear),b.depthFar>0&&(B=b.depthFar)),_.near=D.near=T.near=C,_.far=D.far=T.far=B,(y!==_.near||G!==_.far)&&(a.updateRenderState({depthNear:_.near,depthFar:_.far}),y=_.near,G=_.far);const H=P.parent,J=_.cameras;le(_,H);for(let ie=0;ie<J.length;ie++)le(J[ie],H);J.length===2?Y(_,T,D):_.projectionMatrix.copy(T.projectionMatrix),be(P,_,H)};function be(P,C,B){B===null?P.matrix.copy(C.matrixWorld):(P.matrix.copy(B.matrixWorld),P.matrix.invert(),P.matrix.multiply(C.matrixWorld)),P.matrix.decompose(P.position,P.quaternion,P.scale),P.updateMatrixWorld(!0),P.projectionMatrix.copy(C.projectionMatrix),P.projectionMatrixInverse.copy(C.projectionMatrixInverse),P.isPerspectiveCamera&&(P.fov=bs*2*Math.atan(1/P.projectionMatrix.elements[5]),P.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(P){c=P,u!==null&&(u.fixedFoveation=P),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=P)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(_)};let we=null;function Qe(P,C){if(d=C.getViewerPose(l||r),v=C,d!==null){const B=d.views;f!==null&&(e.setRenderTargetFramebuffer(E,f.framebuffer),e.setRenderTarget(E));let H=!1;B.length!==_.cameras.length&&(_.cameras.length=0,H=!0);for(let ie=0;ie<B.length;ie++){const ye=B[ie];let Ce=null;if(f!==null)Ce=f.getViewport(ye);else{const I=h.getViewSubImage(u,ye);Ce=I.viewport,ie===0&&(e.setRenderTargetTextures(E,I.colorTexture,u.ignoreDepthValues?void 0:I.depthStencilTexture),e.setRenderTarget(E))}let me=j[ie];me===void 0&&(me=new Fn,me.layers.enable(ie),me.viewport=new At,j[ie]=me),me.matrix.fromArray(ye.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(ye.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),ie===0&&(_.matrix.copy(me.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),H===!0&&_.cameras.push(me)}const J=a.enabledFeatures;if(J&&J.includes("depth-sensing")){const ie=h.getDepthInformation(B[0]);ie&&ie.isValid&&ie.texture&&b.init(e,ie,a.renderState)}}for(let B=0;B<S.length;B++){const H=w[B],J=S[B];H!==null&&J!==void 0&&J.update(H,C,l||r)}we&&we(P,C),C.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:C}),v=null}const g=new Cu;g.setAnimationLoop(Qe),this.setAnimationLoop=function(P){we=P},this.dispose=function(){}}}const zi=new $n,n_=new yt;function i_(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Au(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function a(m,p,E,S,w){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),d(m,p)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,w)):p.isMeshMatcapMaterial?(s(m,p),v(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),b(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,E,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===cn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===cn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=e.get(p),S=E.envMap,w=E.envMapRotation;S&&(m.envMap.value=S,zi.copy(w),zi.x*=-1,zi.y*=-1,zi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(zi.y*=-1,zi.z*=-1),m.envMapRotation.value.setFromMatrix4(n_.makeRotationFromEuler(zi)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,E,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===cn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,p){p.matcap&&(m.matcap.value=p.matcap)}function b(m,p){const E=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function a_(n,e,t,i){let a={},s={},r=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,S){const w=S.program;i.uniformBlockBinding(E,w)}function l(E,S){let w=a[E.id];w===void 0&&(v(E),w=d(E),a[E.id]=w,E.addEventListener("dispose",m));const L=S.program;i.updateUBOMapping(E,L);const R=e.render.frame;s[E.id]!==R&&(u(E),s[E.id]=R)}function d(E){const S=h();E.__bindingPointIndex=S;const w=n.createBuffer(),L=E.__size,R=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,L,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,w),w}function h(){for(let E=0;E<o;E++)if(r.indexOf(E)===-1)return r.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(E){const S=a[E.id],w=E.uniforms,L=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let R=0,T=w.length;R<T;R++){const D=Array.isArray(w[R])?w[R]:[w[R]];for(let j=0,_=D.length;j<_;j++){const y=D[j];if(f(y,R,j,L)===!0){const G=y.__offset,W=Array.isArray(y.value)?y.value:[y.value];let Z=0;for(let te=0;te<W.length;te++){const X=W[te],ne=b(X);typeof X=="number"||typeof X=="boolean"?(y.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,G+Z,y.__data)):X.isMatrix3?(y.__data[0]=X.elements[0],y.__data[1]=X.elements[1],y.__data[2]=X.elements[2],y.__data[3]=0,y.__data[4]=X.elements[3],y.__data[5]=X.elements[4],y.__data[6]=X.elements[5],y.__data[7]=0,y.__data[8]=X.elements[6],y.__data[9]=X.elements[7],y.__data[10]=X.elements[8],y.__data[11]=0):(X.toArray(y.__data,Z),Z+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,G,y.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(E,S,w,L){const R=E.value,T=S+"_"+w;if(L[T]===void 0)return typeof R=="number"||typeof R=="boolean"?L[T]=R:L[T]=R.clone(),!0;{const D=L[T];if(typeof R=="number"||typeof R=="boolean"){if(D!==R)return L[T]=R,!0}else if(D.equals(R)===!1)return D.copy(R),!0}return!1}function v(E){const S=E.uniforms;let w=0;const L=16;for(let T=0,D=S.length;T<D;T++){const j=Array.isArray(S[T])?S[T]:[S[T]];for(let _=0,y=j.length;_<y;_++){const G=j[_],W=Array.isArray(G.value)?G.value:[G.value];for(let Z=0,te=W.length;Z<te;Z++){const X=W[Z],ne=b(X),Y=w%L,le=Y%ne.boundary,be=Y+le;w+=le,be!==0&&L-be<ne.storage&&(w+=L-be),G.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=w,w+=ne.storage}}}const R=w%L;return R>0&&(w+=L-R),E.__size=w,E.__cache={},this}function b(E){const S={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(S.boundary=4,S.storage=4):E.isVector2?(S.boundary=8,S.storage=8):E.isVector3||E.isColor?(S.boundary=16,S.storage=12):E.isVector4?(S.boundary=16,S.storage=16):E.isMatrix3?(S.boundary=48,S.storage=48):E.isMatrix4?(S.boundary=64,S.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),S}function m(E){const S=E.target;S.removeEventListener("dispose",m);const w=r.indexOf(S.__bindingPointIndex);r.splice(w,1),n.deleteBuffer(a[S.id]),delete a[S.id],delete s[S.id]}function p(){for(const E in a)n.deleteBuffer(a[E]);r=[],a={},s={}}return{bind:c,update:l,dispose:p}}class s_{constructor(e={}){const{canvas:t=qf(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let u;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=i.getContextAttributes().alpha}else u=r;const f=new Uint32Array(4),v=new Int32Array(4);let b=null,m=null;const p=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Xt,this.toneMapping=Ai,this.toneMappingExposure=1;const S=this;let w=!1,L=0,R=0,T=null,D=-1,j=null;const _=new At,y=new At;let G=null;const W=new We(0);let Z=0,te=t.width,X=t.height,ne=1,Y=null,le=null;const be=new At(0,0,te,X),we=new At(0,0,te,X);let Qe=!1;const g=new al;let P=!1,C=!1;const B=new yt,H=new yt,J=new U,ie=new At,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ce=!1;function me(){return T===null?ne:1}let I=i;function De(M,O){return t.getContext(M,O)}try{const M={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wc}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",ve,!1),t.addEventListener("webglcontextcreationerror",Se,!1),I===null){const O="webgl2";if(I=De(O,M),I===null)throw De(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Te,ze,he,Ye,Ne,A,x,V,ee,se,k,de,ue,Me,Ze,re,ge,He,Ge,Ee,Je,$e,gt,N;function xe(){Te=new d0(I),Te.init(),$e=new Yv(I,Te),ze=new a0(I,Te,e,$e),he=new qv(I),ze.reverseDepthBuffer&&he.buffers.depth.setReversed(!0),Ye=new f0(I),Ne=new Iv,A=new jv(I,Te,he,Ne,ze,$e,Ye),x=new r0(S),V=new l0(S),ee=new xp(I),gt=new n0(I,ee),se=new u0(I,ee,Ye,gt),k=new m0(I,se,ee,Ye),Ge=new p0(I,ze,A),re=new s0(Ne),de=new Pv(S,x,V,Te,ze,gt,re),ue=new i_(S,Ne),Me=new Dv,Ze=new kv(Te),He=new t0(S,x,V,he,k,u,c),ge=new $v(S,k,ze),N=new a_(I,Ye,ze,he),Ee=new i0(I,Te,Ye),Je=new h0(I,Te,Ye),Ye.programs=de.programs,S.capabilities=ze,S.extensions=Te,S.properties=Ne,S.renderLists=Me,S.shadowMap=ge,S.state=he,S.info=Ye}xe();const K=new t_(S,I);this.xr=K,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const M=Te.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Te.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(M){M!==void 0&&(ne=M,this.setSize(te,X,!1))},this.getSize=function(M){return M.set(te,X)},this.setSize=function(M,O,$=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}te=M,X=O,t.width=Math.floor(M*ne),t.height=Math.floor(O*ne),$===!0&&(t.style.width=M+"px",t.style.height=O+"px"),this.setViewport(0,0,M,O)},this.getDrawingBufferSize=function(M){return M.set(te*ne,X*ne).floor()},this.setDrawingBufferSize=function(M,O,$){te=M,X=O,ne=$,t.width=Math.floor(M*$),t.height=Math.floor(O*$),this.setViewport(0,0,M,O)},this.getCurrentViewport=function(M){return M.copy(_)},this.getViewport=function(M){return M.copy(be)},this.setViewport=function(M,O,$,q){M.isVector4?be.set(M.x,M.y,M.z,M.w):be.set(M,O,$,q),he.viewport(_.copy(be).multiplyScalar(ne).round())},this.getScissor=function(M){return M.copy(we)},this.setScissor=function(M,O,$,q){M.isVector4?we.set(M.x,M.y,M.z,M.w):we.set(M,O,$,q),he.scissor(y.copy(we).multiplyScalar(ne).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(M){he.setScissorTest(Qe=M)},this.setOpaqueSort=function(M){Y=M},this.setTransparentSort=function(M){le=M},this.getClearColor=function(M){return M.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor.apply(He,arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha.apply(He,arguments)},this.clear=function(M=!0,O=!0,$=!0){let q=0;if(M){let F=!1;if(T!==null){const ce=T.texture.format;F=ce===Jc||ce===Zc||ce===Kc}if(F){const ce=T.texture.type,_e=ce===ui||ce===Ki||ce===_s||ce===za||ce===jc||ce===Yc,Ae=He.getClearColor(),Re=He.getClearAlpha(),Fe=Ae.r,ke=Ae.g,Pe=Ae.b;_e?(f[0]=Fe,f[1]=ke,f[2]=Pe,f[3]=Re,I.clearBufferuiv(I.COLOR,0,f)):(v[0]=Fe,v[1]=ke,v[2]=Pe,v[3]=Re,I.clearBufferiv(I.COLOR,0,v))}else q|=I.COLOR_BUFFER_BIT}O&&(q|=I.DEPTH_BUFFER_BIT,I.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),$&&(q|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",ve,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),Me.dispose(),Ze.dispose(),Ne.dispose(),x.dispose(),V.dispose(),k.dispose(),gt.dispose(),N.dispose(),de.dispose(),K.dispose(),K.removeEventListener("sessionstart",Ll),K.removeEventListener("sessionend",Dl),Pi.stop()};function ae(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function ve(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const M=Ye.autoReset,O=ge.enabled,$=ge.autoUpdate,q=ge.needsUpdate,F=ge.type;xe(),Ye.autoReset=M,ge.enabled=O,ge.autoUpdate=$,ge.needsUpdate=q,ge.type=F}function Se(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function et(M){const O=M.target;O.removeEventListener("dispose",et),Ct(O)}function Ct(M){ln(M),Ne.remove(M)}function ln(M){const O=Ne.get(M).programs;O!==void 0&&(O.forEach(function($){de.releaseProgram($)}),M.isShaderMaterial&&de.releaseShaderCache(M))}this.renderBufferDirect=function(M,O,$,q,F,ce){O===null&&(O=ye);const _e=F.isMesh&&F.matrixWorld.determinant()<0,Ae=Bh(M,O,$,q,F);he.setMaterial(q,_e);let Re=$.index,Fe=1;if(q.wireframe===!0){if(Re=se.getWireframeAttribute($),Re===void 0)return;Fe=2}const ke=$.drawRange,Pe=$.attributes.position;let lt=ke.start*Fe,_t=(ke.start+ke.count)*Fe;ce!==null&&(lt=Math.max(lt,ce.start*Fe),_t=Math.min(_t,(ce.start+ce.count)*Fe)),Re!==null?(lt=Math.max(lt,0),_t=Math.min(_t,Re.count)):Pe!=null&&(lt=Math.max(lt,0),_t=Math.min(_t,Pe.count));const Et=_t-lt;if(Et<0||Et===1/0)return;gt.setup(F,q,Ae,$,Re);let vn,st=Ee;if(Re!==null&&(vn=ee.get(Re),st=Je,st.setIndex(vn)),F.isMesh)q.wireframe===!0?(he.setLineWidth(q.wireframeLinewidth*me()),st.setMode(I.LINES)):st.setMode(I.TRIANGLES);else if(F.isLine){let Ie=q.linewidth;Ie===void 0&&(Ie=1),he.setLineWidth(Ie*me()),F.isLineSegments?st.setMode(I.LINES):F.isLineLoop?st.setMode(I.LINE_LOOP):st.setMode(I.LINE_STRIP)}else F.isPoints?st.setMode(I.POINTS):F.isSprite&&st.setMode(I.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)st.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Te.get("WEBGL_multi_draw"))st.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ie=F._multiDrawStarts,Wt=F._multiDrawCounts,rt=F._multiDrawCount,Dn=Re?ee.get(Re).bytesPerElement:1,ia=Ne.get(q).currentProgram.getUniforms();for(let _n=0;_n<rt;_n++)ia.setValue(I,"_gl_DrawID",_n),st.render(Ie[_n]/Dn,Wt[_n])}else if(F.isInstancedMesh)st.renderInstances(lt,Et,F.count);else if($.isInstancedBufferGeometry){const Ie=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Wt=Math.min($.instanceCount,Ie);st.renderInstances(lt,Et,Wt)}else st.render(lt,Et)};function it(M,O,$){M.transparent===!0&&M.side===jn&&M.forceSinglePass===!1?(M.side=cn,M.needsUpdate=!0,Us(M,O,$),M.side=Ri,M.needsUpdate=!0,Us(M,O,$),M.side=jn):Us(M,O,$)}this.compile=function(M,O,$=null){$===null&&($=M),m=Ze.get($),m.init(O),E.push(m),$.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),M!==$&&M.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights();const q=new Set;return M.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ce=F.material;if(ce)if(Array.isArray(ce))for(let _e=0;_e<ce.length;_e++){const Ae=ce[_e];it(Ae,$,F),q.add(Ae)}else it(ce,$,F),q.add(ce)}),E.pop(),m=null,q},this.compileAsync=function(M,O,$=null){const q=this.compile(M,O,$);return new Promise(F=>{function ce(){if(q.forEach(function(_e){Ne.get(_e).currentProgram.isReady()&&q.delete(_e)}),q.size===0){F(M);return}setTimeout(ce,10)}Te.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let dn=null;function Jn(M){dn&&dn(M)}function Ll(){Pi.stop()}function Dl(){Pi.start()}const Pi=new Cu;Pi.setAnimationLoop(Jn),typeof self<"u"&&Pi.setContext(self),this.setAnimationLoop=function(M){dn=M,K.setAnimationLoop(M),M===null?Pi.stop():Pi.start()},K.addEventListener("sessionstart",Ll),K.addEventListener("sessionend",Dl),this.render=function(M,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(O),O=K.getCamera()),M.isScene===!0&&M.onBeforeRender(S,M,O,T),m=Ze.get(M,E.length),m.init(O),E.push(m),H.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),g.setFromProjectionMatrix(H),C=this.localClippingEnabled,P=re.init(this.clippingPlanes,C),b=Me.get(M,p.length),b.init(),p.push(b),K.enabled===!0&&K.isPresenting===!0){const ce=S.xr.getDepthSensingMesh();ce!==null&&no(ce,O,-1/0,S.sortObjects)}no(M,O,0,S.sortObjects),b.finish(),S.sortObjects===!0&&b.sort(Y,le),Ce=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,Ce&&He.addToRenderList(b,M),this.info.render.frame++,P===!0&&re.beginShadows();const $=m.state.shadowsArray;ge.render($,M,O),P===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=b.opaque,F=b.transmissive;if(m.setupLights(),O.isArrayCamera){const ce=O.cameras;if(F.length>0)for(let _e=0,Ae=ce.length;_e<Ae;_e++){const Re=ce[_e];Ul(q,F,M,Re)}Ce&&He.render(M);for(let _e=0,Ae=ce.length;_e<Ae;_e++){const Re=ce[_e];Nl(b,M,Re,Re.viewport)}}else F.length>0&&Ul(q,F,M,O),Ce&&He.render(M),Nl(b,M,O);T!==null&&(A.updateMultisampleRenderTarget(T),A.updateRenderTargetMipmap(T)),M.isScene===!0&&M.onAfterRender(S,M,O),gt.resetDefaultState(),D=-1,j=null,E.pop(),E.length>0?(m=E[E.length-1],P===!0&&re.setGlobalState(S.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?b=p[p.length-1]:b=null};function no(M,O,$,q){if(M.visible===!1)return;if(M.layers.test(O.layers)){if(M.isGroup)$=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(O);else if(M.isLight)m.pushLight(M),M.castShadow&&m.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||g.intersectsSprite(M)){q&&ie.setFromMatrixPosition(M.matrixWorld).applyMatrix4(H);const _e=k.update(M),Ae=M.material;Ae.visible&&b.push(M,_e,Ae,$,ie.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||g.intersectsObject(M))){const _e=k.update(M),Ae=M.material;if(q&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),ie.copy(M.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),ie.copy(_e.boundingSphere.center)),ie.applyMatrix4(M.matrixWorld).applyMatrix4(H)),Array.isArray(Ae)){const Re=_e.groups;for(let Fe=0,ke=Re.length;Fe<ke;Fe++){const Pe=Re[Fe],lt=Ae[Pe.materialIndex];lt&&lt.visible&&b.push(M,_e,lt,$,ie.z,Pe)}}else Ae.visible&&b.push(M,_e,Ae,$,ie.z,null)}}const ce=M.children;for(let _e=0,Ae=ce.length;_e<Ae;_e++)no(ce[_e],O,$,q)}function Nl(M,O,$,q){const F=M.opaque,ce=M.transmissive,_e=M.transparent;m.setupLightsView($),P===!0&&re.setGlobalState(S.clippingPlanes,$),q&&he.viewport(_.copy(q)),F.length>0&&Ns(F,O,$),ce.length>0&&Ns(ce,O,$),_e.length>0&&Ns(_e,O,$),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function Ul(M,O,$,q){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[q.id]===void 0&&(m.state.transmissionRenderTarget[q.id]=new Zi(1,1,{generateMipmaps:!0,type:Te.has("EXT_color_buffer_half_float")||Te.has("EXT_color_buffer_float")?Rs:ui,minFilter:Wi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ot.workingColorSpace}));const ce=m.state.transmissionRenderTarget[q.id],_e=q.viewport||_;ce.setSize(_e.z,_e.w);const Ae=S.getRenderTarget();S.setRenderTarget(ce),S.getClearColor(W),Z=S.getClearAlpha(),Z<1&&S.setClearColor(16777215,.5),S.clear(),Ce&&He.render($);const Re=S.toneMapping;S.toneMapping=Ai;const Fe=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),m.setupLightsView(q),P===!0&&re.setGlobalState(S.clippingPlanes,q),Ns(M,$,q),A.updateMultisampleRenderTarget(ce),A.updateRenderTargetMipmap(ce),Te.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let Pe=0,lt=O.length;Pe<lt;Pe++){const _t=O[Pe],Et=_t.object,vn=_t.geometry,st=_t.material,Ie=_t.group;if(st.side===jn&&Et.layers.test(q.layers)){const Wt=st.side;st.side=cn,st.needsUpdate=!0,zl(Et,$,q,vn,st,Ie),st.side=Wt,st.needsUpdate=!0,ke=!0}}ke===!0&&(A.updateMultisampleRenderTarget(ce),A.updateRenderTargetMipmap(ce))}S.setRenderTarget(Ae),S.setClearColor(W,Z),Fe!==void 0&&(q.viewport=Fe),S.toneMapping=Re}function Ns(M,O,$){const q=O.isScene===!0?O.overrideMaterial:null;for(let F=0,ce=M.length;F<ce;F++){const _e=M[F],Ae=_e.object,Re=_e.geometry,Fe=q===null?_e.material:q,ke=_e.group;Ae.layers.test($.layers)&&zl(Ae,O,$,Re,Fe,ke)}}function zl(M,O,$,q,F,ce){M.onBeforeRender(S,O,$,q,F,ce),M.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),F.onBeforeRender(S,O,$,q,M,ce),F.transparent===!0&&F.side===jn&&F.forceSinglePass===!1?(F.side=cn,F.needsUpdate=!0,S.renderBufferDirect($,O,q,F,M,ce),F.side=Ri,F.needsUpdate=!0,S.renderBufferDirect($,O,q,F,M,ce),F.side=jn):S.renderBufferDirect($,O,q,F,M,ce),M.onAfterRender(S,O,$,q,F,ce)}function Us(M,O,$){O.isScene!==!0&&(O=ye);const q=Ne.get(M),F=m.state.lights,ce=m.state.shadowsArray,_e=F.state.version,Ae=de.getParameters(M,F.state,ce,O,$),Re=de.getProgramCacheKey(Ae);let Fe=q.programs;q.environment=M.isMeshStandardMaterial?O.environment:null,q.fog=O.fog,q.envMap=(M.isMeshStandardMaterial?V:x).get(M.envMap||q.environment),q.envMapRotation=q.environment!==null&&M.envMap===null?O.environmentRotation:M.envMapRotation,Fe===void 0&&(M.addEventListener("dispose",et),Fe=new Map,q.programs=Fe);let ke=Fe.get(Re);if(ke!==void 0){if(q.currentProgram===ke&&q.lightsStateVersion===_e)return Fl(M,Ae),ke}else Ae.uniforms=de.getUniforms(M),M.onBeforeCompile(Ae,S),ke=de.acquireProgram(Ae,Re),Fe.set(Re,ke),q.uniforms=Ae.uniforms;const Pe=q.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Pe.clippingPlanes=re.uniform),Fl(M,Ae),q.needsLights=Gh(M),q.lightsStateVersion=_e,q.needsLights&&(Pe.ambientLightColor.value=F.state.ambient,Pe.lightProbe.value=F.state.probe,Pe.directionalLights.value=F.state.directional,Pe.directionalLightShadows.value=F.state.directionalShadow,Pe.spotLights.value=F.state.spot,Pe.spotLightShadows.value=F.state.spotShadow,Pe.rectAreaLights.value=F.state.rectArea,Pe.ltc_1.value=F.state.rectAreaLTC1,Pe.ltc_2.value=F.state.rectAreaLTC2,Pe.pointLights.value=F.state.point,Pe.pointLightShadows.value=F.state.pointShadow,Pe.hemisphereLights.value=F.state.hemi,Pe.directionalShadowMap.value=F.state.directionalShadowMap,Pe.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Pe.spotShadowMap.value=F.state.spotShadowMap,Pe.spotLightMatrix.value=F.state.spotLightMatrix,Pe.spotLightMap.value=F.state.spotLightMap,Pe.pointShadowMap.value=F.state.pointShadowMap,Pe.pointShadowMatrix.value=F.state.pointShadowMatrix),q.currentProgram=ke,q.uniformsList=null,ke}function Ol(M){if(M.uniformsList===null){const O=M.currentProgram.getUniforms();M.uniformsList=xr.seqWithValue(O.seq,M.uniforms)}return M.uniformsList}function Fl(M,O){const $=Ne.get(M);$.outputColorSpace=O.outputColorSpace,$.batching=O.batching,$.batchingColor=O.batchingColor,$.instancing=O.instancing,$.instancingColor=O.instancingColor,$.instancingMorph=O.instancingMorph,$.skinning=O.skinning,$.morphTargets=O.morphTargets,$.morphNormals=O.morphNormals,$.morphColors=O.morphColors,$.morphTargetsCount=O.morphTargetsCount,$.numClippingPlanes=O.numClippingPlanes,$.numIntersection=O.numClipIntersection,$.vertexAlphas=O.vertexAlphas,$.vertexTangents=O.vertexTangents,$.toneMapping=O.toneMapping}function Bh(M,O,$,q,F){O.isScene!==!0&&(O=ye),A.resetTextureUnits();const ce=O.fog,_e=q.isMeshStandardMaterial?O.environment:null,Ae=T===null?S.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Ci,Re=(q.isMeshStandardMaterial?V:x).get(q.envMap||_e),Fe=q.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ke=!!$.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Pe=!!$.morphAttributes.position,lt=!!$.morphAttributes.normal,_t=!!$.morphAttributes.color;let Et=Ai;q.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(Et=S.toneMapping);const vn=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,st=vn!==void 0?vn.length:0,Ie=Ne.get(q),Wt=m.state.lights;if(P===!0&&(C===!0||M!==j)){const En=M===j&&q.id===D;re.setState(q,M,En)}let rt=!1;q.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==Wt.state.version||Ie.outputColorSpace!==Ae||F.isBatchedMesh&&Ie.batching===!1||!F.isBatchedMesh&&Ie.batching===!0||F.isBatchedMesh&&Ie.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ie.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ie.instancing===!1||!F.isInstancedMesh&&Ie.instancing===!0||F.isSkinnedMesh&&Ie.skinning===!1||!F.isSkinnedMesh&&Ie.skinning===!0||F.isInstancedMesh&&Ie.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ie.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ie.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ie.instancingMorph===!1&&F.morphTexture!==null||Ie.envMap!==Re||q.fog===!0&&Ie.fog!==ce||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==re.numPlanes||Ie.numIntersection!==re.numIntersection)||Ie.vertexAlphas!==Fe||Ie.vertexTangents!==ke||Ie.morphTargets!==Pe||Ie.morphNormals!==lt||Ie.morphColors!==_t||Ie.toneMapping!==Et||Ie.morphTargetsCount!==st)&&(rt=!0):(rt=!0,Ie.__version=q.version);let Dn=Ie.currentProgram;rt===!0&&(Dn=Us(q,O,F));let ia=!1,_n=!1,io=!1;const Rt=Dn.getUniforms(),fi=Ie.uniforms;if(he.useProgram(Dn.program)&&(ia=!0,_n=!0,io=!0),q.id!==D&&(D=q.id,_n=!0),ia||j!==M){ze.reverseDepthBuffer?(B.copy(M.projectionMatrix),jf(B),Yf(B),Rt.setValue(I,"projectionMatrix",B)):Rt.setValue(I,"projectionMatrix",M.projectionMatrix),Rt.setValue(I,"viewMatrix",M.matrixWorldInverse);const En=Rt.map.cameraPosition;En!==void 0&&En.setValue(I,J.setFromMatrixPosition(M.matrixWorld)),ze.logarithmicDepthBuffer&&Rt.setValue(I,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Rt.setValue(I,"isOrthographic",M.isOrthographicCamera===!0),j!==M&&(j=M,_n=!0,io=!0)}if(F.isSkinnedMesh){Rt.setOptional(I,F,"bindMatrix"),Rt.setOptional(I,F,"bindMatrixInverse");const En=F.skeleton;En&&(En.boneTexture===null&&En.computeBoneTexture(),Rt.setValue(I,"boneTexture",En.boneTexture,A))}F.isBatchedMesh&&(Rt.setOptional(I,F,"batchingTexture"),Rt.setValue(I,"batchingTexture",F._matricesTexture,A),Rt.setOptional(I,F,"batchingIdTexture"),Rt.setValue(I,"batchingIdTexture",F._indirectTexture,A),Rt.setOptional(I,F,"batchingColorTexture"),F._colorsTexture!==null&&Rt.setValue(I,"batchingColorTexture",F._colorsTexture,A));const ao=$.morphAttributes;if((ao.position!==void 0||ao.normal!==void 0||ao.color!==void 0)&&Ge.update(F,$,Dn),(_n||Ie.receiveShadow!==F.receiveShadow)&&(Ie.receiveShadow=F.receiveShadow,Rt.setValue(I,"receiveShadow",F.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(fi.envMap.value=Re,fi.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&O.environment!==null&&(fi.envMapIntensity.value=O.environmentIntensity),_n&&(Rt.setValue(I,"toneMappingExposure",S.toneMappingExposure),Ie.needsLights&&Hh(fi,io),ce&&q.fog===!0&&ue.refreshFogUniforms(fi,ce),ue.refreshMaterialUniforms(fi,q,ne,X,m.state.transmissionRenderTarget[M.id]),xr.upload(I,Ol(Ie),fi,A)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(xr.upload(I,Ol(Ie),fi,A),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Rt.setValue(I,"center",F.center),Rt.setValue(I,"modelViewMatrix",F.modelViewMatrix),Rt.setValue(I,"normalMatrix",F.normalMatrix),Rt.setValue(I,"modelMatrix",F.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const En=q.uniformsGroups;for(let so=0,Vh=En.length;so<Vh;so++){const kl=En[so];N.update(kl,Dn),N.bind(kl,Dn)}}return Dn}function Hh(M,O){M.ambientLightColor.needsUpdate=O,M.lightProbe.needsUpdate=O,M.directionalLights.needsUpdate=O,M.directionalLightShadows.needsUpdate=O,M.pointLights.needsUpdate=O,M.pointLightShadows.needsUpdate=O,M.spotLights.needsUpdate=O,M.spotLightShadows.needsUpdate=O,M.rectAreaLights.needsUpdate=O,M.hemisphereLights.needsUpdate=O}function Gh(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(M,O,$){Ne.get(M.texture).__webglTexture=O,Ne.get(M.depthTexture).__webglTexture=$;const q=Ne.get(M);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=$===void 0,q.__autoAllocateDepthBuffer||Te.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,O){const $=Ne.get(M);$.__webglFramebuffer=O,$.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(M,O=0,$=0){T=M,L=O,R=$;let q=!0,F=null,ce=!1,_e=!1;if(M){const Re=Ne.get(M);if(Re.__useDefaultFramebuffer!==void 0)he.bindFramebuffer(I.FRAMEBUFFER,null),q=!1;else if(Re.__webglFramebuffer===void 0)A.setupRenderTarget(M);else if(Re.__hasExternalTextures)A.rebindTextures(M,Ne.get(M.texture).__webglTexture,Ne.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Pe=M.depthTexture;if(Re.__boundDepthTexture!==Pe){if(Pe!==null&&Ne.has(Pe)&&(M.width!==Pe.image.width||M.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(M)}}const Fe=M.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(_e=!0);const ke=Ne.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(ke[O])?F=ke[O][$]:F=ke[O],ce=!0):M.samples>0&&A.useMultisampledRTT(M)===!1?F=Ne.get(M).__webglMultisampledFramebuffer:Array.isArray(ke)?F=ke[$]:F=ke,_.copy(M.viewport),y.copy(M.scissor),G=M.scissorTest}else _.copy(be).multiplyScalar(ne).floor(),y.copy(we).multiplyScalar(ne).floor(),G=Qe;if(he.bindFramebuffer(I.FRAMEBUFFER,F)&&q&&he.drawBuffers(M,F),he.viewport(_),he.scissor(y),he.setScissorTest(G),ce){const Re=Ne.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+O,Re.__webglTexture,$)}else if(_e){const Re=Ne.get(M.texture),Fe=O||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Re.__webglTexture,$||0,Fe)}D=-1},this.readRenderTargetPixels=function(M,O,$,q,F,ce,_e){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=Ne.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&_e!==void 0&&(Ae=Ae[_e]),Ae){he.bindFramebuffer(I.FRAMEBUFFER,Ae);try{const Re=M.texture,Fe=Re.format,ke=Re.type;if(!ze.textureFormatReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ze.textureTypeReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=M.width-q&&$>=0&&$<=M.height-F&&I.readPixels(O,$,q,F,$e.convert(Fe),$e.convert(ke),ce)}finally{const Re=T!==null?Ne.get(T).__webglFramebuffer:null;he.bindFramebuffer(I.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(M,O,$,q,F,ce,_e){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=Ne.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&_e!==void 0&&(Ae=Ae[_e]),Ae){const Re=M.texture,Fe=Re.format,ke=Re.type;if(!ze.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ze.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=M.width-q&&$>=0&&$<=M.height-F){he.bindFramebuffer(I.FRAMEBUFFER,Ae);const Pe=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Pe),I.bufferData(I.PIXEL_PACK_BUFFER,ce.byteLength,I.STREAM_READ),I.readPixels(O,$,q,F,$e.convert(Fe),$e.convert(ke),0);const lt=T!==null?Ne.get(T).__webglFramebuffer:null;he.bindFramebuffer(I.FRAMEBUFFER,lt);const _t=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Xf(I,_t,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Pe),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ce),I.deleteBuffer(Pe),I.deleteSync(_t),ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,O=null,$=0){M.isTexture!==!0&&(br("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,M=arguments[1]);const q=Math.pow(2,-$),F=Math.floor(M.image.width*q),ce=Math.floor(M.image.height*q),_e=O!==null?O.x:0,Ae=O!==null?O.y:0;A.setTexture2D(M,0),I.copyTexSubImage2D(I.TEXTURE_2D,$,0,0,_e,Ae,F,ce),he.unbindTexture()},this.copyTextureToTexture=function(M,O,$=null,q=null,F=0){M.isTexture!==!0&&(br("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,M=arguments[1],O=arguments[2],F=arguments[3]||0,$=null);let ce,_e,Ae,Re,Fe,ke;$!==null?(ce=$.max.x-$.min.x,_e=$.max.y-$.min.y,Ae=$.min.x,Re=$.min.y):(ce=M.image.width,_e=M.image.height,Ae=0,Re=0),q!==null?(Fe=q.x,ke=q.y):(Fe=0,ke=0);const Pe=$e.convert(O.format),lt=$e.convert(O.type);A.setTexture2D(O,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment);const _t=I.getParameter(I.UNPACK_ROW_LENGTH),Et=I.getParameter(I.UNPACK_IMAGE_HEIGHT),vn=I.getParameter(I.UNPACK_SKIP_PIXELS),st=I.getParameter(I.UNPACK_SKIP_ROWS),Ie=I.getParameter(I.UNPACK_SKIP_IMAGES),Wt=M.isCompressedTexture?M.mipmaps[F]:M.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,Wt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Wt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ae),I.pixelStorei(I.UNPACK_SKIP_ROWS,Re),M.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,F,Fe,ke,ce,_e,Pe,lt,Wt.data):M.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,F,Fe,ke,Wt.width,Wt.height,Pe,Wt.data):I.texSubImage2D(I.TEXTURE_2D,F,Fe,ke,ce,_e,Pe,lt,Wt),I.pixelStorei(I.UNPACK_ROW_LENGTH,_t),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Et),I.pixelStorei(I.UNPACK_SKIP_PIXELS,vn),I.pixelStorei(I.UNPACK_SKIP_ROWS,st),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ie),F===0&&O.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),he.unbindTexture()},this.copyTextureToTexture3D=function(M,O,$=null,q=null,F=0){M.isTexture!==!0&&(br("WebGLRenderer: copyTextureToTexture3D function signature has changed."),$=arguments[0]||null,q=arguments[1]||null,M=arguments[2],O=arguments[3],F=arguments[4]||0);let ce,_e,Ae,Re,Fe,ke,Pe,lt,_t;const Et=M.isCompressedTexture?M.mipmaps[F]:M.image;$!==null?(ce=$.max.x-$.min.x,_e=$.max.y-$.min.y,Ae=$.max.z-$.min.z,Re=$.min.x,Fe=$.min.y,ke=$.min.z):(ce=Et.width,_e=Et.height,Ae=Et.depth,Re=0,Fe=0,ke=0),q!==null?(Pe=q.x,lt=q.y,_t=q.z):(Pe=0,lt=0,_t=0);const vn=$e.convert(O.format),st=$e.convert(O.type);let Ie;if(O.isData3DTexture)A.setTexture3D(O,0),Ie=I.TEXTURE_3D;else if(O.isDataArrayTexture||O.isCompressedArrayTexture)A.setTexture2DArray(O,0),Ie=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment);const Wt=I.getParameter(I.UNPACK_ROW_LENGTH),rt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Dn=I.getParameter(I.UNPACK_SKIP_PIXELS),ia=I.getParameter(I.UNPACK_SKIP_ROWS),_n=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Et.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Et.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Re),I.pixelStorei(I.UNPACK_SKIP_ROWS,Fe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ke),M.isDataTexture||M.isData3DTexture?I.texSubImage3D(Ie,F,Pe,lt,_t,ce,_e,Ae,vn,st,Et.data):O.isCompressedArrayTexture?I.compressedTexSubImage3D(Ie,F,Pe,lt,_t,ce,_e,Ae,vn,Et.data):I.texSubImage3D(Ie,F,Pe,lt,_t,ce,_e,Ae,vn,st,Et),I.pixelStorei(I.UNPACK_ROW_LENGTH,Wt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,rt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Dn),I.pixelStorei(I.UNPACK_SKIP_ROWS,ia),I.pixelStorei(I.UNPACK_SKIP_IMAGES,_n),F===0&&O.generateMipmaps&&I.generateMipmap(Ie),he.unbindTexture()},this.initRenderTarget=function(M){Ne.get(M).__webglFramebuffer===void 0&&A.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?A.setTextureCube(M,0):M.isData3DTexture?A.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?A.setTexture2DArray(M,0):A.setTexture2D(M,0),he.unbindTexture()},this.resetState=function(){L=0,R=0,T=null,he.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===el?"display-p3":"srgb",t.unpackColorSpace=ot.workingColorSpace===Vr?"display-p3":"srgb"}}class ol{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new We(e),this.near=t,this.far=i}clone(){return new ol(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Uu extends $t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class r_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ic,this.updateRanges=[],this.version=0,this.uuid=li()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let a=0,s=this.stride;a<s;a++)this.array[e+a]=t.array[i+a];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=li()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=li()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const nn=new U;class Lr{constructor(e,t,i,a=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=a}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Bn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ut(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Bn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array),a=ut(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=a,this}setXYZW(e,t,i,a,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array),a=ut(a,this.array),s=ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=a,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const a=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[a+s])}return new Pn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Lr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const a=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[a+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class zu extends ta{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ba;const Qa=new U,xa=new U,Sa=new U,ya=new Be,es=new Be,Ou=new yt,ir=new U,ts=new U,ar=new U,Ld=new Be,zo=new Be,Dd=new Be;class o_ extends $t{constructor(e=new zu){if(super(),this.isSprite=!0,this.type="Sprite",ba===void 0){ba=new Mn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new r_(t,5);ba.setIndex([0,1,2,0,2,3]),ba.setAttribute("position",new Lr(i,3,0,!1)),ba.setAttribute("uv",new Lr(i,2,3,!1))}this.geometry=ba,this.material=e,this.center=new Be(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),xa.setFromMatrixScale(this.matrixWorld),Ou.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Sa.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&xa.multiplyScalar(-Sa.z);const i=this.material.rotation;let a,s;i!==0&&(s=Math.cos(i),a=Math.sin(i));const r=this.center;sr(ir.set(-.5,-.5,0),Sa,r,xa,a,s),sr(ts.set(.5,-.5,0),Sa,r,xa,a,s),sr(ar.set(.5,.5,0),Sa,r,xa,a,s),Ld.set(0,0),zo.set(1,0),Dd.set(1,1);let o=e.ray.intersectTriangle(ir,ts,ar,!1,Qa);if(o===null&&(sr(ts.set(-.5,.5,0),Sa,r,xa,a,s),zo.set(0,1),o=e.ray.intersectTriangle(ir,ar,ts,!1,Qa),o===null))return;const c=e.ray.origin.distanceTo(Qa);c<e.near||c>e.far||t.push({distance:c,point:Qa.clone(),uv:Rn.getInterpolation(Qa,ir,ts,ar,Ld,zo,Dd,new Be),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function sr(n,e,t,i,a,s){ya.subVectors(n,t).addScalar(.5).multiply(i),a!==void 0?(es.x=s*ya.x-a*ya.y,es.y=a*ya.x+s*ya.y):es.copy(ya),n.copy(e),n.x+=es.x,n.y+=es.y,n.applyMatrix4(Ou)}class cl extends tn{constructor(e,t,i,a,s,r,o,c,l){super(e,t,i,a,s,r,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Vn extends Mn{constructor(e=1,t=1,i=1,a=32,s=1,r=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:a,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:c};const l=this;a=Math.floor(a),s=Math.floor(s);const d=[],h=[],u=[],f=[];let v=0;const b=[],m=i/2;let p=0;E(),r===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(d),this.setAttribute("position",new Ot(h,3)),this.setAttribute("normal",new Ot(u,3)),this.setAttribute("uv",new Ot(f,2));function E(){const w=new U,L=new U;let R=0;const T=(t-e)/i;for(let D=0;D<=s;D++){const j=[],_=D/s,y=_*(t-e)+e;for(let G=0;G<=a;G++){const W=G/a,Z=W*c+o,te=Math.sin(Z),X=Math.cos(Z);L.x=y*te,L.y=-_*i+m,L.z=y*X,h.push(L.x,L.y,L.z),w.set(te,T,X).normalize(),u.push(w.x,w.y,w.z),f.push(W,1-_),j.push(v++)}b.push(j)}for(let D=0;D<a;D++)for(let j=0;j<s;j++){const _=b[j][D],y=b[j+1][D],G=b[j+1][D+1],W=b[j][D+1];e>0&&(d.push(_,y,W),R+=3),t>0&&(d.push(y,G,W),R+=3)}l.addGroup(p,R,0),p+=R}function S(w){const L=v,R=new Be,T=new U;let D=0;const j=w===!0?e:t,_=w===!0?1:-1;for(let G=1;G<=a;G++)h.push(0,m*_,0),u.push(0,_,0),f.push(.5,.5),v++;const y=v;for(let G=0;G<=a;G++){const Z=G/a*c+o,te=Math.cos(Z),X=Math.sin(Z);T.x=j*X,T.y=m*_,T.z=j*te,h.push(T.x,T.y,T.z),u.push(0,_,0),R.x=te*.5+.5,R.y=X*.5*_+.5,f.push(R.x,R.y),v++}for(let G=0;G<a;G++){const W=L+G,Z=y+G;w===!0?d.push(Z,Z+1,W):d.push(Z+1,Z,W),D+=3}l.addGroup(p,D,w===!0?1:2),p+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ia extends Vn{constructor(e=1,t=1,i=32,a=1,s=!1,r=0,o=Math.PI*2){super(0,e,t,i,a,s,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:a,openEnded:s,thetaStart:r,thetaLength:o}}static fromJSON(e){return new Ia(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ll extends Mn{constructor(e=[],t=[],i=1,a=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:a};const s=[],r=[];o(a),l(i),d(),this.setAttribute("position",new Ot(s,3)),this.setAttribute("normal",new Ot(s.slice(),3)),this.setAttribute("uv",new Ot(r,2)),a===0?this.computeVertexNormals():this.normalizeNormals();function o(E){const S=new U,w=new U,L=new U;for(let R=0;R<t.length;R+=3)f(t[R+0],S),f(t[R+1],w),f(t[R+2],L),c(S,w,L,E)}function c(E,S,w,L){const R=L+1,T=[];for(let D=0;D<=R;D++){T[D]=[];const j=E.clone().lerp(w,D/R),_=S.clone().lerp(w,D/R),y=R-D;for(let G=0;G<=y;G++)G===0&&D===R?T[D][G]=j:T[D][G]=j.clone().lerp(_,G/y)}for(let D=0;D<R;D++)for(let j=0;j<2*(R-D)-1;j++){const _=Math.floor(j/2);j%2===0?(u(T[D][_+1]),u(T[D+1][_]),u(T[D][_])):(u(T[D][_+1]),u(T[D+1][_+1]),u(T[D+1][_]))}}function l(E){const S=new U;for(let w=0;w<s.length;w+=3)S.x=s[w+0],S.y=s[w+1],S.z=s[w+2],S.normalize().multiplyScalar(E),s[w+0]=S.x,s[w+1]=S.y,s[w+2]=S.z}function d(){const E=new U;for(let S=0;S<s.length;S+=3){E.x=s[S+0],E.y=s[S+1],E.z=s[S+2];const w=m(E)/2/Math.PI+.5,L=p(E)/Math.PI+.5;r.push(w,1-L)}v(),h()}function h(){for(let E=0;E<r.length;E+=6){const S=r[E+0],w=r[E+2],L=r[E+4],R=Math.max(S,w,L),T=Math.min(S,w,L);R>.9&&T<.1&&(S<.2&&(r[E+0]+=1),w<.2&&(r[E+2]+=1),L<.2&&(r[E+4]+=1))}}function u(E){s.push(E.x,E.y,E.z)}function f(E,S){const w=E*3;S.x=e[w+0],S.y=e[w+1],S.z=e[w+2]}function v(){const E=new U,S=new U,w=new U,L=new U,R=new Be,T=new Be,D=new Be;for(let j=0,_=0;j<s.length;j+=9,_+=6){E.set(s[j+0],s[j+1],s[j+2]),S.set(s[j+3],s[j+4],s[j+5]),w.set(s[j+6],s[j+7],s[j+8]),R.set(r[_+0],r[_+1]),T.set(r[_+2],r[_+3]),D.set(r[_+4],r[_+5]),L.copy(E).add(S).add(w).divideScalar(3);const y=m(L);b(R,_+0,E,y),b(T,_+2,S,y),b(D,_+4,w,y)}}function b(E,S,w,L){L<0&&E.x===1&&(r[S]=E.x-1),w.x===0&&w.z===0&&(r[S]=L/2/Math.PI+.5)}function m(E){return Math.atan2(E.z,-E.x)}function p(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ll(e.vertices,e.indices,e.radius,e.details)}}class dl extends ll{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,a=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(a,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new dl(e.radius,e.detail)}}class Wn extends Mn{constructor(e=1,t=32,i=16,a=0,s=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:a,phiLength:s,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(r+o,Math.PI);let l=0;const d=[],h=new U,u=new U,f=[],v=[],b=[],m=[];for(let p=0;p<=i;p++){const E=[],S=p/i;let w=0;p===0&&r===0?w=.5/t:p===i&&c===Math.PI&&(w=-.5/t);for(let L=0;L<=t;L++){const R=L/t;h.x=-e*Math.cos(a+R*s)*Math.sin(r+S*o),h.y=e*Math.cos(r+S*o),h.z=e*Math.sin(a+R*s)*Math.sin(r+S*o),v.push(h.x,h.y,h.z),u.copy(h).normalize(),b.push(u.x,u.y,u.z),m.push(R+w,1-S),E.push(l++)}d.push(E)}for(let p=0;p<i;p++)for(let E=0;E<t;E++){const S=d[p][E+1],w=d[p][E],L=d[p+1][E],R=d[p+1][E+1];(p!==0||r>0)&&f.push(S,w,R),(p!==i-1||c<Math.PI)&&f.push(w,L,R)}this.setIndex(f),this.setAttribute("position",new Ot(v,3)),this.setAttribute("normal",new Ot(b,3)),this.setAttribute("uv",new Ot(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ta extends Mn{constructor(e=1,t=.4,i=12,a=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:a,arc:s},i=Math.floor(i),a=Math.floor(a);const r=[],o=[],c=[],l=[],d=new U,h=new U,u=new U;for(let f=0;f<=i;f++)for(let v=0;v<=a;v++){const b=v/a*s,m=f/i*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(b),h.y=(e+t*Math.cos(m))*Math.sin(b),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),d.x=e*Math.cos(b),d.y=e*Math.sin(b),u.subVectors(h,d).normalize(),c.push(u.x,u.y,u.z),l.push(v/a),l.push(f/i)}for(let f=1;f<=i;f++)for(let v=1;v<=a;v++){const b=(a+1)*f+v-1,m=(a+1)*(f-1)+v-1,p=(a+1)*(f-1)+v,E=(a+1)*f+v;r.push(b,m,E),r.push(m,p,E)}this.setIndex(r),this.setAttribute("position",new Ot(o,3)),this.setAttribute("normal",new Ot(c,3)),this.setAttribute("uv",new Ot(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ta(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class c_ extends ta{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qc,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yn extends ta{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qc,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=qc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const Nd={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class l_{constructor(e,t,i){const a=this;let s=!1,r=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(d){o++,s===!1&&a.onStart!==void 0&&a.onStart(d,r,o),s=!0},this.itemEnd=function(d){r++,a.onProgress!==void 0&&a.onProgress(d,r,o),r===o&&(s=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(d){a.onError!==void 0&&a.onError(d)},this.resolveURL=function(d){return c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,h){return l.push(d,h),this},this.removeHandler=function(d){const h=l.indexOf(d);return h!==-1&&l.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=l.length;h<u;h+=2){const f=l[h],v=l[h+1];if(f.global&&(f.lastIndex=0),f.test(d))return v}return null}}}const d_=new l_;class ul{constructor(e){this.manager=e!==void 0?e:d_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(a,s){i.load(e,a,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ul.DEFAULT_MATERIAL_NAME="__DEFAULT";class u_ extends ul{constructor(e){super(e)}load(e,t,i,a){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=Nd.get(e);if(r!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r;const o=xs("img");function c(){d(),Nd.add(e,this),t&&t(this),s.manager.itemEnd(e)}function l(h){d(),a&&a(h),s.manager.itemError(e),s.manager.itemEnd(e)}function d(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class Oo extends ul{constructor(e){super(e)}load(e,t,i,a){const s=new tn,r=new u_(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,a),s}}class hl extends $t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class h_ extends hl{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Fo=new yt,Ud=new U,zd=new U;class f_{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Be(512,512),this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new al,this._frameExtents=new Be(1,1),this._viewportCount=1,this._viewports=[new At(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Ud.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ud),zd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zd),t.updateMatrixWorld(),Fo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Fo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class p_ extends f_{constructor(){super(new sl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class m_ extends hl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.target=new $t,this.shadow=new p_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class g_ extends hl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class v_{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Od(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Od();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Od(){return performance.now()}const Fd=new yt;class __{constructor(e,t,i=0,a=1/0){this.ray=new yu(e,t),this.near=i,this.far=a,this.camera=null,this.layers=new il,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Fd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Fd),this}intersectObject(e,t=!0,i=[]){return Nc(e,this,i,t),i.sort(kd),i}intersectObjects(e,t=!0,i=[]){for(let a=0,s=e.length;a<s;a++)Nc(e[a],this,i,t);return i.sort(kd),i}}function kd(n,e){return n.distance-e.distance}function Nc(n,e,t,i){let a=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(a=!1),a===!0&&i===!0){const s=n.children;for(let r=0,o=s.length;r<o;r++)Nc(s[r],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wc);const qe={x0:-21.5,z0:-1.5,x1:67.5,z1:65.5,wallH:4.2},pn=4.4,b_={x0:-21,z0:-1.5,x1:67.5,z1:58.2},fl=[{id:"ceo",nombre:"Despacho de Felipe",x:-20,z:0,w:34,d:12,kind:"oficina"},{id:"tecnologia",nombre:"Área de Tecnología",x:16,z:0,w:20,d:12,kind:"zona"},{id:"diseno",nombre:"Estudio de Diseño Gráfico",x:38,z:0,w:14,d:12,kind:"zona"},{id:"colaboracion",nombre:"Sala de colaboración",x:54,z:0,w:12,d:12,kind:"zona"},{id:"financiera",nombre:"Área Financiera",x:0,z:15,w:20,d:13,kind:"zona"},{id:"reuniones",nombre:"Sala de reuniones",x:22,z:15,w:22,d:13,kind:"oficina"},{id:"operaciones",nombre:"Operaciones y Clientes",x:46,z:15,w:18,d:13,kind:"zona"},{id:"azahar",nombre:"Oficina Azahar Coffee (piso 2)",x:-19,z:15,w:18,d:13,kind:"zona",lvl:1},{id:"salon",nombre:"Salón",x:0,z:31,w:20,d:13,kind:"descanso"},{id:"cocina",nombre:"Cocina-comedor",x:22,z:31,w:20,d:13,kind:"descanso"},{id:"capacitacion",nombre:"Sala de capacitación",x:44,z:31,w:20,d:13,kind:"zona"},{id:"recepcion",nombre:"Recepción",x:20,z:47,w:24,d:11,kind:"oficina"},{id:"proyectos",nombre:"Oficina de proyectos",x:-20,z:30,w:14,d:14,kind:"zona"},{id:"innovacion",nombre:"Sala de innovación",x:-20,z:46,w:18,d:12,kind:"zona"},{id:"clientes",nombre:"Sala de clientes",x:0,z:47,w:18,d:11,kind:"zona"},{id:"rrhh",nombre:"Recursos Humanos",x:46,z:47,w:18,d:11,kind:"zona"}],Dt=n=>fl.find(e=>e.id===n),x_=["recepcion","ceo","reuniones","azahar","colaboracion","capacitacion","proyectos","innovacion","clientes","salon","cocina"],Ke={x:-3,bottom:{x:-3,z:41},top:{x:-3,z:28},w:2.4,z0:28,z1:41},ft={};function Is(n,e,t,i,a=0){ft[n]={id:n,x:e,z:t,seat:{x:e+1.25,z:t},heading:-Math.PI/2,room:i,lvl:a}}function Wa(n,e,t,i,a=0){ft[n]={id:n,x:e,z:t,seat:{x:e-1.25,z:t},heading:Math.PI/2,leader:!0,room:i,lvl:a}}function Wr(n,e,t,i,a,s=0){let r=0;for(const o of i)for(const c of t){if(r>=a)return;r++,Is(`${n}-${r}`,c,o,e,s)}}Wa("fin-0",3,21.5,"financiera");Wr("fin","financiera",[9.5,15.5],[18.8,22.2,25.6],6);Wa("tec-0",19,6,"tecnologia");Wr("tec","tecnologia",[24,30],[2.2,4.8,7.4,10],7);Wa("ops-0",49,21.5,"operaciones");Wr("ops","operaciones",[54.5,60.5],[17.3,19.9,22.5,25.1],7);Wa("dis-0",41,6,"diseno");[2.2,4.8,7.4,10].forEach((n,e)=>Is(`dis-${e+1}`,45,n,"diseno"));Is("dis-5",50,2.2,"diseno");Wa("az-0",-16,21.5,"azahar",1);Wr("az","azahar",[-12.5,-7.8,-3.1],[17.3,20.1,22.9,25.7],12,1);const Dr=50;for(const[n,e]of[["rec-1",30.6],["rec-2",33.4]])ft[n]={id:n,x:e,z:Dr+.75,seat:{x:e,z:Dr},heading:0,room:"recepcion",lvl:0};Wa("rh-0",49.5,52.5,"rrhh");Is("rh-1",55.5,50.2,"rrhh");Is("rh-2",55.5,54.8,"rrhh");ft.ceo={id:"ceo",x:5.5,z:4.8,seat:{x:5.5,z:3.45},heading:0,leader:!0,room:"ceo",lvl:0};const S_=Object.keys(ft).filter(n=>n.startsWith("az-")&&n!=="az-0"),y_={salon:"Salón",cocina:"Cocina-comedor",jardin:"Jardín",cancha:"Cancha",recepcion:"Recepción"},Fu=0,qa=Math.PI,ku=Math.PI/2,Bu=-Math.PI/2,Ss=[];function Ln(n,e,t,i,a){Ss.push({id:`${n}-${Ss.filter(s=>s.zone===n).length+1}`,zone:n,x:e,z:t,heading:i,sit:a})}[9.4,11,12.6].forEach(n=>Ln("salon",n,37.2,qa,!0));[36.3,38,39.7].forEach(n=>Ln("salon",1.8,n,ku,!0));Ln("salon",16.5,35,Fu,!1);Ln("salon",17.6,38,Bu,!1);Ln("salon",14.6,41.4,qa,!1);Ln("salon",6.6,42,qa,!1);[28.4,30.8,33.2,35.6].forEach(n=>Ln("cocina",n,36.3,Fu,!0));[28.4,30.8,33.2,35.6].forEach(n=>Ln("cocina",n,39.9,qa,!0));Ln("cocina",26.2,33.1,qa,!1);Ln("cocina",28,33.1,qa,!1);[51.6,53.2,54.8].forEach(n=>Ln("recepcion",22.3,n,ku,!0));Ln("recepcion",36.5,50.6,Bu,!1);const Ma={x:32,z:56.6},Nr=[28.5,32,35.5],Ur=64.2,ys=["recepcion","rrhh"],Yn=.5,pl=-24,ml=-4,Ut=Math.ceil(100/Yn),Ms=Math.ceil(76/Yn),qr=[new Uint8Array(Ut*Ms),new Uint8Array(Ut*Ms)];let Hu=0;function ko(n){Hu=n}const zr=n=>Math.floor((n-pl)/Yn),Or=n=>Math.floor((n-ml)/Yn),Es=(n,e)=>n>=0&&e>=0&&n<Ut&&e<Ms;function nt(n,e,t,i,a=Hu){const s=qr[a],r=zr(n-t/2+.01),o=zr(n+t/2-.01),c=Or(e-i/2+.01),l=Or(e+i/2-.01);for(let d=c;d<=l;d++)for(let h=r;h<=o;h++)Es(h,d)&&(s[d*Ut+h]=1)}function Bd(n,e){const t=qr[e];for(let i=0;i<Ms;i++)for(let a=0;a<Ut;a++){const s=pl+(a+.5)*Yn,r=ml+(i+.5)*Yn;(s<n.x0||s>n.x1||r<n.z0||r>n.z1)&&(t[i*Ut+a]=1)}}function Uc(n,e,t=0){const i=zr(n),a=Or(e);return!Es(i,a)||qr[t][a*Ut+i]===1}function Hd(n,e,t){const i=zr(e),a=Or(t);if(Es(i,a)&&!n[a*Ut+i])return[i,a];for(let s=1;s<10;s++)for(let r=-s;r<=s;r++)for(let o=-s;o<=s;o++)if(Math.max(Math.abs(o),Math.abs(r))===s&&Es(i+o,a+r)&&!n[(a+r)*Ut+i+o])return[i+o,a+r];return[i,a]}function M_(n,e,t){const i=e.x-n.x,a=e.z-n.z,s=Math.hypot(i,a),r=Math.ceil(s/.2);for(let o=0;o<=r;o++){const c=r===0?0:o/r;if(Uc(n.x+i*c,n.z+a*c,t))return!1}return!0}class E_{constructor(){this.a=[]}push(e){const t=this.a;t.push(e);let i=t.length-1;for(;i>0;){const a=i-1>>1;if(t[a][0]<=t[i][0])break;[t[a],t[i]]=[t[i],t[a]],i=a}}pop(){const e=this.a;if(!e.length)return;const t=e[0],i=e.pop();if(e.length){e[0]=i;let a=0;for(;;){const s=a*2+1,r=s+1;let o=a;if(s<e.length&&e[s][0]<e[o][0]&&(o=s),r<e.length&&e[r][0]<e[o][0]&&(o=r),o===a)break;[e[o],e[a]]=[e[a],e[o]],a=o}}return t}get size(){return this.a.length}}function ns(n,e,t,i,a=0){const s=qr[a],[r,o]=Hd(s,n,e),[c,l]=Hd(s,t,i),d={x:t,z:i};if(r===c&&o===l)return[d];const h=Ut*Ms,u=new Float32Array(h).fill(1/0),f=new Int32Array(h).fill(-1),v=new Uint8Array(h),b=new E_,m=o*Ut+r;u[m]=0,b.push([0,m]);const p=l*Ut+c,E=(j,_)=>{const y=Math.abs(j-c),G=Math.abs(_-l);return(y+G+(Math.SQRT2-2)*Math.min(y,G))*Yn},S=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];let w=!1;for(;b.size;){const[,j]=b.pop();if(v[j])continue;if(v[j]=1,j===p){w=!0;break}const _=j%Ut,y=j/Ut|0;for(const[G,W]of S){const Z=_+G,te=y+W;if(!Es(Z,te))continue;const X=te*Ut+Z;if(v[X]||s[X]||G!==0&&W!==0&&(s[y*Ut+Z]||s[te*Ut+_]))continue;const ne=u[j]+(G!==0&&W!==0?Math.SQRT2:1)*Yn;ne<u[X]&&(u[X]=ne,f[X]=j,b.push([ne+E(Z,te),X]))}}if(!w)return[d];const L=[];for(let j=p;j!==-1&&j!==m;j=f[j])L.push({x:pl+(j%Ut+.5)*Yn,z:ml+((j/Ut|0)+.5)*Yn});L.reverse(),L.push(d);const R=[];let T={x:n,z:e},D=0;for(;D<L.length;){let j=D;for(let _=L.length-1;_>D;_--)if(M_(T,L[_],a)){j=_;break}R.push(L[j]),T=L[j],D=j+1}return R}const is=(n,e)=>n.map(t=>({x:t.x,z:t.z,y:e?pn:0}));function rr(n,e){if(n.lvl===e.lvl)return is(ns(n.x,n.z,e.x,e.z,n.lvl),n.lvl);if(n.lvl===0){const a=is(ns(n.x,n.z,Ke.bottom.x,Ke.bottom.z,0),0),s=is(ns(Ke.top.x,Ke.top.z,e.x,e.z,1),1);return[...a,{x:Ke.top.x,z:Ke.top.z,y:pn},...s]}const t=is(ns(n.x,n.z,Ke.top.x,Ke.top.z,1),1),i=is(ns(Ke.bottom.x,Ke.bottom.z,e.x,e.z,0),0);return[...t,{x:Ke.bottom.x,z:Ke.bottom.z,y:0},...i]}function w_(n){Bd(b_,0),Bd(n,1)}const Fr=new at(1,1,1),A_=new Vn(1,1,1,14),T_=new Wn(1,12,9);new Ia(1,1,9);const zc=new Map;function en(n,e=1){const t=n+":"+e;let i=zc.get(t);return i||(i=new yn({color:n,transparent:e<1,opacity:e}),e<1&&(i.depthWrite=!1),zc.set(t,i)),i}function R_(n){return[...zc.values()].includes(n)&&!n.transparent}function z(n,e,t,i,a,s,r,o,c=1){const l=new pe(Fr,en(a,c));return l.scale.set(e,t,i),l.position.set(s,r+t/2,o),l.castShadow=c===1,l.receiveShadow=!0,n.add(l),l}function Gt(n,e,t,i,a,s,r,o){const c=new pe(A_,en(i));return c.scale.set(e,t,o??e),c.position.set(a,s+t/2,r),c.castShadow=!0,c.receiveShadow=!0,n.add(c),c}function An(n,e,t,i,a,s,r=1,o=1,c=1){const l=new pe(T_,en(t));return l.scale.set(e*o,e*r,e*c),l.position.set(i,a,s),l.castShadow=!0,l.receiveShadow=!0,n.add(l),l}function wt(n,e,t,i,a,s,r,o=0,c=0){const l=new pe(new Ht(e,t),i);return l.position.set(a,s,r),l.rotation.set(c,o,0),l.receiveShadow=!0,n.add(l),l}function Vt(n,e,t,i=0,a=0){const s=new pt;return s.position.set(e,a,t),s.rotation.y=i,n.add(s),s}const Q={white:15988216,desk:16054009,steel:3817287,black:1513243,gold:14263361,wall:15856630,wallTop:16777215,glass:11130606,wood:10844749,woodDark:8084024,walnut:5979432,green:5216853,greenDark:3832386,greenLight:7912811,pot:14196842,sofa:7241620,leather:2303532},un=[2830136,4871528,3817287,5857387,3095114,4212047];function It(n,e,t,i,a,s=!1){const r=Vt(n,e,t,i);z(r,.58,.1,.56,a,0,.46,.02),z(r,.54,s?.82:.58,.09,a,0,.56,-.28),z(r,.05,.28,.05,Q.steel,-.31,.58,.02),z(r,.05,.28,.05,Q.steel,.31,.58,.02),z(r,.08,.04,.38,Q.black,-.31,.84,.05),z(r,.08,.04,.38,Q.black,.31,.84,.05),Gt(r,.045,.34,10133672,0,.12,0);for(let o=0;o<5;o++){const c=o/5*Math.PI*2,l=z(r,.42,.04,.06,Q.steel,Math.cos(c)*.19,.08,Math.sin(c)*.19);l.rotation.y=-c,z(r,.07,.07,.07,Q.black,Math.cos(c)*.38,0,Math.sin(c)*.38)}return r}function Gu(n,e,t){const i=t?Q.walnut:Q.desk;z(n,1.2,.07,e,i,0,.8,0),t&&z(n,1.22,.05,e+.02,Q.gold,0,.78,0);for(const a of[-.52,.52])for(const s of[-e/2+.07,e/2-.07])z(n,.05,.8,.05,Q.steel,a,0,s)}function Gd(n,e,t,i,a){const r=Vt(n,t,i);Gu(r,1.95,!1),z(r,.5,.62,.78,14936044,-.28,.18,-1.95/2+.45),z(r,.02,.1,.66,13225686,-.28+.26,.55,-1.95/2+.45),z(r,.14,.03,.2,Q.black,-.1,.87,0),z(r,.05,.2,.05,Q.black,-.1,.9,0),z(r,.05,.42,.68,Q.black,-.1,1.04,0);const o=new pe(new Ht(.62,.36),new Oe({color:988960}));return o.rotation.y=Math.PI/2,o.position.set(-.1+.03,1.25,0),o.userData.deskId=e,r.add(o),z(r,.2,.02,.46,2764083,.22,.87,0),z(r,.08,.025,.12,2764083,.22,.87,.45),z(r,.22,.025,.3,15787727,.3,.87,-.72),Gt(r,.06,.1,16777215,.33,.87,.78),It(n,t+1.25,i,-Math.PI/2,a),nt(t,i,1.25,1.95+.1),o}function Vd(n,e,t,i,a,s=!0){const o=Vt(n,t,i);Gu(o,2.4,!0),z(o,.5,.7,.9,4862498,.3,.08,2.4/2-.55);for(const c of[-.55,.55])z(o,.14,.03,.2,Q.black,.1,.87,c),z(o,.05,.2,.05,Q.black,.1,.9,c),z(o,.05,.4,.62,Q.black,.1,1.03,c);z(o,.22,.02,.46,2764083,-.22,.87,0),s&&z(o,.05,.1,.55,Q.gold,.45,.87,-.1),Gt(o,.06,.1,16777215,-.35,.87,.95),It(n,t-1.25,i,Math.PI/2,a,!0),nt(t,i,1.25,2.4+.1)}function Ve(n,e,t,i=1,a=!0){const s=Vt(n,e,t);Gt(s,.26*i,.4*i,Q.pot,0,0,0,.2*i),An(s,.38*i,Q.greenDark,0,.75*i,0,1.1),An(s,.3*i,Q.green,.12*i,1*i,.05*i,1.1),An(s,.24*i,Q.greenLight,-.1*i,1.2*i,-.05*i,1.1),a&&nt(e,t,.7*i,.7*i)}function an(n,e,t,i,a,s=Q.wood,r=.82){const o=Vt(n,e,t);z(o,i,.08,a,s,0,r,0);for(const c of[-i/2+.15,i/2-.15])for(const l of[-a/2+.15,a/2-.15])z(o,.1,r,.1,Q.woodDark,c,0,l);return nt(e,t,i,a),o}function qn(n,e,t,i,a,s=Q.sofa){const r=a*1.35+.5,o=Vt(n,e,t,i);z(o,r,.45,1.1,s,0,.12,0),z(o,r,.75,.3,s,0,.45,-.45),z(o,.28,.65,1.1,s,-r/2+.14,.45,0),z(o,.28,.65,1.1,s,r/2-.14,.45,0);for(let c=0;c<a;c++)z(o,1.1,.14,.8,Q.gold,-r/2+.25+.65+c*1.35,.57,.08);return o}function $d(n,e,t,i,a=Q.sofa){const s=Vt(n,e,t,i);z(s,.95,.45,.95,a,0,.12,0),z(s,.95,.7,.22,a,0,.45,-.4),z(s,.2,.55,.95,a,-.37,.45,0),z(s,.2,.55,.95,a,.37,.45,0)}function Ea(n,e,t,i,a=2.2,s=2.6){const r=Vt(n,e,t,i);z(r,a,s,.55,15856630,0,0,0);const o=[3894949,14263361,12999242,5216853,8022965,2894898,14737632];for(let c=0;c<4;c++){const l=.35+c*.62;z(r,a-.12,.04,.5,14015200,0,l-.05,.04);for(let d=0;d<6;d++){const h=.32+(d*7+c*3)%4*.05;z(r,.16,h,.3,o[(d+c*2)%o.length],-a/2+.3+d*(a-.6)/6,l-.03,.12)}}nt(e,t,i===0?a:.6,i===0?.6:a)}function sn(n,e,t,i,a,s){z(n,i,.03,a,s,e,.02,t)}function or(n,e,t){Gt(n,.18,.04,Q.steel,e,0,t),Gt(n,.025,1.5,Q.steel,e,0,t),Gt(n,.22,.28,16771248,e,1.45,t,.14)}function cr(n,e,t,i=0){const a=Vt(n,e,t,i);z(a,1.1,.85,.7,15198958,0,0,0),z(a,1.1,.12,.72,10133931,0,.85,0),z(a,.5,.04,.3,2764083,.2,.97,.1),z(a,.3,.05,.02,5223359,-.3,.7,.36),nt(e,t,i===0?1.2:.8,i===0?.8:1.2)}function as(n,e,t){const i=Vt(n,e,t);z(i,.4,.9,.4,15330801,0,0,0),Gt(i,.17,.42,8308963,0,.9,0),z(i,.1,.05,.1,3833545,.2,.55,0),nt(e,t,.5,.5)}function lr(n,e,t,i,a=1.6){const s=Vt(n,e,t,i);z(s,a,1.1,.55,14672872,0,0,0);for(let r=0;r<3;r++)z(s,a-.1,.02,.02,11186618,0,.28+r*.33,.28);nt(e,t,i===0?a:.6,i===0?.6:a)}function xi(n,e,t,i,a=0){const s=Vt(n,e,i,a,t);Gt(s,.34,.06,1447450,0,-.03,.02).rotation.x=Math.PI/2,Gt(s,.3,.02,16119282,0,-.01,.06).rotation.x=Math.PI/2,z(s,.025,.2,.01,1447450,0,0,.08),z(s,.16,.025,.01,1447450,.06,0,.081)}function C_(n,e,t){Gt(n,.1,3.6,2830134,e,0,t,.08),z(n,.7,.08,.14,2830134,e+.3,3.55,t),z(n,.3,.08,.2,16773570,e+.55,3.46,t)}function Vu(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),a=new Set(Object.keys(n[0].morphAttributes)),s={},r={},o=n[0].morphTargetsRelative,c=new Mn;let l=0;for(let d=0;d<n.length;++d){const h=n[d];let u=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in h.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(h.attributes[f]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in h.morphAttributes){if(!a.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.morphAttributes[f])}if(e){let f;if(t)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,d),l+=f}}if(t){let d=0;const h=[];for(let u=0;u<n.length;++u){const f=n[u].index;for(let v=0;v<f.count;++v)h.push(f.getX(v)+d);d+=n[u].attributes.position.count}c.setIndex(h)}for(const d in s){const h=Wd(s[d]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,h)}for(const d in r){const h=r[d][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let u=0;u<h;++u){const f=[];for(let b=0;b<r[d].length;++b)f.push(r[d][b][u]);const v=Wd(f);if(!v)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(v)}}return c}function Wd(n){let e,t,i,a=-1,s=0;for(let l=0;l<n.length;++l){const d=n[l];if(e===void 0&&(e=d.array.constructor),e!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=d.itemSize),t!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=d.normalized),i!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(a===-1&&(a=d.gpuType),a!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=d.count*t}const r=new e(s),o=new Pn(r,t,i);let c=0;for(let l=0;l<n.length;++l){const d=n[l];if(d.isInterleavedBufferAttribute){const h=c/t;for(let u=0,f=d.count;u<f;u++)for(let v=0;v<t;v++){const b=d.getComponent(u,v);o.setComponent(u+h,v,b)}}else r.set(d.array,c);c+=d.count*t}return a!==void 0&&(o.gpuType=a),o}const Ue={direccion:{nombre:"Dirección",corto:"Dirección",color:"#B9B9C2"},financiera:{nombre:"Área Financiera",corto:"Financiera",color:"#D9A441"},tecnologia:{nombre:"Área de Tecnología",corto:"Tecnología",color:"#4FB3BF"},operaciones:{nombre:"Operaciones y Clientes",corto:"Operaciones",color:"#E2725B"},diseno:{nombre:"Diseño Gráfico",corto:"Diseño",color:"#9B7BD6"},recepcion:{nombre:"Recepción",corto:"Recepción",color:"#6FCF97"},rrhh:{nombre:"Recursos Humanos",corto:"RR. HH.",color:"#E58FB0"}},Xr={por_hacer:"Por hacer",en_curso:"En curso",hecha:"Hecha"},gn=[{id:"metis",nombre:"Metis Nexa Inc.",tipo:"Interna",color:"#D9A441"},{id:"azahar",nombre:"Azahar Coffee",tipo:"Cliente",color:"#4FB3BF"}],P_="Add",I_="Approve",L_="Assign",D_="Calendar",N_="Cancel",U_="Role",z_="Close",O_="Classifying",F_="Client",k_="Complete",B_="Discard",H_="Deployments",G_="Available",V_="Edit",$_="Delete",W_="Company",q_="Team",X_="Status",j_="Reviews",Y_="Date",K_="Figma",Z_="Finance",J_="Duties",Q_="Save",eb="Done",tb="Start",nb="Internal",ib="Command",ab="Monitoring",sb="None",rb="Name",ob="Operations",cb="Pause",lb="Progress",db="Remove",ub="Reopen",hb="Recruiting",fb="Rooms",pb="Board",mb="Working",gb="schedule",vb="high",_b="medium",bb="low",xb="assigned",Sb="late",yb="completed",Mb="available",Eb="example",wb="routes",Ab="done",Tb="free",Rb="busy",Cb="received",Pb="working",Ib="finished",Lb="Agent",Db="Agents",Nb="Request",Ub="Visit",zb="Send",Ob="Reject",Fb="REQUESTS",kb="WELCOME",Bb="FINANCE",Hb="OPERATIONS",Gb="HUMAN",Vb="DONE",$b="DONE",Wb="Backend",qb="CFO",Xb="CTO",jb="CEO",Yb="Accounting",Kb="Frontend",Zb="Taxes",Jb="Sales",Qb="Mark",ex="Today",tx="tasks",nx="AGENTS",ix="TASKS",ax="Elevators",sx="PROJECTS",rx={"+ Agendar reunión o registrar visita":"+ Schedule a meeting or log a visit","+ Asignar tarea":"+ Assign task","+ Nueva solicitud":"+ New request","+ Nueva tarea":"+ New task","+ Solicitud":"+ Request","Abrir tablero":"Open board","Actividad reciente":"Recent activity","Agente asignado":"Assigned agent","Agente actualizado":"Agent updated","Agentes libres":"Free agents",Agregar:P_,"Agregar una función nueva…":"Add a new duty…","Ampliar / reducir":"Expand / collapse","Ampliar o reducir":"Expand or collapse",Aprobar:I_,"Aprobada por Felipe":"Approved by Felipe","Arrastra con el clic izquierdo para girar 360° e inclinar · clic derecho o Mayús + arrastrar para mover · rueda para acercar · clic en un agente para ver su ficha":"Drag with the left button to rotate 360° and tilt · right-click or Shift + drag to pan · wheel to zoom · click an agent to see their profile",Asignar:L_,"Asignar a…":"Assign to…","Asignar a":"Assign to","Asignada por Felipe a":"Assigned by Felipe to","Avance medio del equipo":"Team average progress","Banco de imágenes":"Image bank","Bandeja de entrada":"Inbox","Bandeja vacía":"Empty inbox","Bandeja vacía. Las solicitudes nuevas llegan aquí.":"Empty inbox. New requests arrive here.","Borrar ejemplos":"Delete examples","Buscar por nombre del agente o título…":"Search by agent name or title…",Calendario:D_,"Cambiar tema":"Switch theme","Cambiar tema claro/oscuro":"Switch light/dark theme",Cancelar:N_,Capacitación:"Training",Cargo:U_,"Catálogo de SKILLS":"SKILLS catalog","Centro de mando":"Command center","Cerca del límite":"Near the deadline",Cerrar:z_,"Clasificada por":"Classified by",Clasificando:O_,Cliente:F_,"Cliente asignado (muestra su logo en el cubículo)":"Assigned client (shows its logo in the cubicle)","Cocina-comedor":"Kitchen & dining",Completar:k_,"Conciliación bancaria":"Bank reconciliation","Crea y asigna las tareas":"Creates and assigns the tasks","Crear y asignar":"Create and assign",Descartar:B_,Descripción:"Description","Despacho de Felipe":"Felipe's office","Despacho · CEO":"CEO office",Despliegues:H_,"Dile qué necesitas: recepción lo clasifica y lo envía":"Tell us what you need: reception classifies it and routes it",Dirección:"Management",Disponible:G_,"Disponible en su puesto":"Available at their desk","Disponible · fuera del edificio":"Available · outside the building",Diseño:"Design","Diseño Gráfico":"Graphic Design",Documentación:"Documentation","Edita el nombre, el cargo y las funciones de cada agente":"Edit each agent's name, role and duties",Editar:V_,"Editar agente":"Edit agent","Editar tarea":"Edit task","Ej.: Conciliar extractos del mes":"E.g.: Reconcile the month's statements","Ej.: Error en la web del formulario de contacto":"E.g.: Contact form error on the website","Ej.: Necesito conciliar las cuentas de Azahar antes del viernes…":"E.g.: I need to reconcile Azahar's accounts before Friday…","El cerebro de la oficina":"The brain of the office",Eliminar:$_,Empresa:W_,"En bandeja":"In inbox","En curso":"In progress","En espera":"Waiting","En qué trabaja ahora":"Working on now","En su despacho":"In their office","Entra por recepción: Carolina la clasifica y la envía a quien corresponde":"It enters through reception: Carolina classifies it and sends it to the right person","Enviado a recepción: Carolina lo clasifica":"Sent to reception: Carolina is classifying it","Enviar a recepción":"Send to reception",Equipo:q_,"Equipo de agentes":"Agent team","Equipos en trabajo":"Teams at work","Equipos hoy":"Teams today","Escribe qué necesitas":"Write what you need",Estado:X_,Evaluaciones:j_,"Falta el título o la fecha":"The title or date is missing",Fecha:Y_,"Fecha límite (opcional)":"Due date (optional)",Figma:K_,Financiera:Z_,"Fuera del edificio. Toca uno para asignarle una tarea: entrará y irá a su mesa.":"Outside the building. Tap one to assign a task: they will come in and go to their desk.",Funciones:J_,"Girar a la derecha":"Rotate right","Girar a la derecha (E)":"Rotate right (E)","Girar a la izquierda":"Rotate left","Girar a la izquierda (Q)":"Rotate left (Q)","Girar la oficina":"Rotate the office",Guardar:Q_,"Guardar cambios":"Save changes",Hecha:eb,"Herramientas del equipo":"Team tools","Historial de tareas":"Task history","Hojas de cálculo":"Spreadsheets","Inclinar hacia abajo":"Tilt down","Inclinar hacia abajo (F)":"Tilt down (F)","Inclinar hacia arriba":"Tilt up","Inclinar hacia arriba (R)":"Tilt up (R)",Iniciar:tb,Interna:nb,"Ir al área":"Go to area","Jefe de la oficina · crea y asigna tareas":"Head of the office · creates and assigns tasks","Las asigna Recursos Humanos según la necesidad de cada proyecto:":"Human Resources assigns them according to each project's needs:","Libre · fuera del edificio":"Free · outside the building","Limpiar filtros":"Clear filters","Los cambios se guardan en este navegador. El puesto, el área y el líder no cambian.":"Changes are saved in this browser. The desk, area and leader do not change.",Líder:"Leader","Líder de Diseño Gráfico":"Graphic Design Leader","Líder de Operaciones y Clientes":"Operations & Clients Leader","Líder de Área Financiera":"Finance Area Leader","Líder de Área de Tecnología":"Technology Area Leader",Mando:ib,"Manual de marca":"Brand manual","Marcar como hecha":"Mark as done",Menú:"Menu","Mensaje sin detalle suficiente para saber a quién corresponde.":"Message without enough detail to know who it belongs to.","Mi ficha":"My profile",Monitoreo:ab,"Necesitan tu OK":"Need your OK",Ninguno:sb,Nombre:rb,"Nombre del visitante (opcional)":"Visitor name (optional)","Nueva solicitud":"New request","Nueva tarea":"New task","Oficina Virtual":"Virtual Office",Operaciones:ob,"Operaciones y Clientes":"Operations & Clients","Panel del CEO":"CEO panel",Pausar:cb,"Por área":"By area","Por empresa":"By company","Por hacer":"To do","Por revisar":"To review","Por revisar · decide Felipe":"To review · Felipe decides",Progreso:lb,"Pruebas automáticas":"Automated tests",Quitar:db,"Quitar función":"Remove duty","Qué se necesita, para quién y por qué…":"What is needed, for whom and why…","RR. HH.":"HR",Reabrir:ub,Recepción:"Reception","Recepción disponible":"Reception available","Recibiendo solicitudes":"Receiving requests",Reclutamiento:hb,"Recursos Humanos":"Human Resources","Repositorio de código":"Code repository","Reportes contables":"Accounting reports","Reservar sala y avisar":"Book the room and notify","Resumen del campus":"Campus summary","Resumen del día para Felipe":"Daily summary for Felipe",Reunión:"Meeting","Reunión agendada":"Meeting scheduled","Sala de capacitación":"Training room","Sala de colaboración":"Collaboration room","Sala de reuniones":"Meeting room",Salas:fb,"Salas y áreas":"Rooms & areas",Salón:"Lounge","Salón de descanso":"Break lounge","Seguimiento de clientes":"Client follow-up","Si la tarea queda «En curso», el agente va a su mesa y trabaja. Al completarla, vuelve a descansar.":"If the task is left «In progress», the agent goes to their desk and works. When it is completed, they head out again.","Si no se puede clasificar, queda en la bandeja «Por revisar» del panel de Felipe.":"If it cannot be classified, it stays in the «To review» tray of Felipe's panel.","Sin SKILLS asignadas todavía.":"No SKILLS assigned yet.","Sin reuniones agendadas.":"No meetings scheduled.","Sin tarea en curso. Está disponible para recibir una.":"No task in progress. Available to receive one.","Solicitud asignada":"Request assigned","Solicitud descartada":"Request discarded","Solicitud enviada a recepción":"Request sent to reception","Solicitud recibida en recepción":"Request received at reception","Su propio estado":"Their own status",Tablero:pb,"Tablero de tareas":"Task board","Tarea actual":"Current task","Tarea actualizada":"Task updated","Tarea aprobada":"Task approved","Tarea asignada: el agente va a su mesa":"Task assigned: the agent goes to their desk","Tarea completada":"Task completed","Tarea creada":"Task created","Tarea creada y asignada":"Task created and assigned","Tarea de ejemplo cargada":"Sample task loaded","Tarea eliminada":"Task deleted","Tarea en curso: el agente va a su mesa":"Task in progress: the agent goes to their desk","Tarea pausada":"Task paused","Tareas en seguimiento":"Tasks being followed up",Tecnología:"Technology","Tickets de soporte":"Support tickets","Todas las empresas":"All companies","Todas las áreas":"All areas","Todavía no tiene tareas.":"No tasks yet.","Todavía no se ha clasificado nada hoy.":"Nothing has been classified today yet.","Todos los agentes":"All agents",Trabajando:mb,Título:"Title","Título (ej.: Reunión de seguimiento)":"Title (e.g.: Follow-up meeting)","Valores originales restablecidos":"Original values restored","Ver agente":"View agent","Ver en el campus":"See on campus","Ver tablero del área":"View area board","Ver todos":"See all","Visita de cliente":"Client visit","Vista general":"Overview","⌂ Vista general":"⌂ Overview","Ejemplos borrados":"Examples deleted","Ejemplos cargados":"Examples loaded","Elige a quién asignarla":"Choose who to assign it to","Elige un agente…":"Choose an agent…",agenda:gb,"agentes libres":"free agents","agentes ocupados":"busy agents",alta:vb,media:_b,baja:bb,asignadas:xb,atrasadas:Sb,"clasificadas hoy":"classified today",completadas:yb,disponibles:Mb,ejemplo:Eb,"en bandeja":"in inbox","en curso":"in progress","en seguimiento":"following up",enruta:wb,hechas:Ab,"hechas hoy":"done today",libres:Tb,"necesitan tu OK":"need your OK",ocupados:Rb,"por hacer":"to do","por revisar":"to review",recibidas:Cb,recepción:"reception","tareas en curso":"tasks in progress","tareas hechas":"tasks done",trabajando:Pb,"Área Financiera":"Finance Area","Área de Tecnología":"Technology Area",Áreas:"Areas","Estudio de Diseño Gráfico":"Graphic Design Studio","Oficina Azahar Coffee (piso 2)":"Azahar Coffee office (floor 2)","Entrada y recepción":"Entrance & reception","Cliente asignado":"Assigned client","Escalada al líder":"Escalated to the leader","Recordatorio enviado":"Reminder sent","Recordatorio pendiente":"Reminder pending",terminada:Ib,"sin avanzar":"without progress",más:"more",Agente:Lb,Agentes:Db,Solicitud:Nb,Visita:Ub,Enviar:zb,Rechazar:Ob,"Fuera del edificio":"Outside the building","fuera del edificio":"outside the building","Solicitudes entrantes":"Incoming requests","Aprender · Practicar · Crecer":"Learn · Practice · Grow","Ideas y proyectos":"Ideas and projects","SALA DE CAPACITACIÓN":"TRAINING ROOM",SOLICITUDES:Fb,"ENTRANTES · RECEPCIÓN":"INCOMING · RECEPTION",BIENVENIDOS:kb,DISEÑO:"DESIGN","G R Á F I C O":"G R A P H I C",FINANCIERA:Bb,"Á R E A":"A R E A",OPERACIONES:Hb,"Y   C L I E N T E S":"A N D   C L I E N T S",TECNOLOGÍA:"TECHNOLOGY",RECURSOS:Gb,"H U M A N O S":"R E S O U R C E S","ÁREA DE DISEÑO GRÁFICO":"GRAPHIC DESIGN AREA","OFICINA AZAHAR COFFEE":"AZAHAR COFFEE OFFICE","Piso 2  ↑":"Floor 2  ↑","TABLERO KANBAN":"KANBAN BOARD","POR HACER":"TO DO","EN CURSO":"IN PROGRESS",HECHA:Vb,HECHAS:$b,"Por revisar:":"To review:","Clasificando…":"Classifying…","Escuchando…":"Listening…","En reposo":"Idle",Jardín:"Garden","Ver tablero":"View board","Actualizar guía de capacitación":"Update the training guide","Actualizar manual de marca del cliente":"Update the client's brand manual","Actualizar papelería corporativa":"Update corporate stationery","Armar presentación comercial":"Build the sales presentation","Armar reporte semanal de indicadores":"Build the weekly KPI report","Asignar SKILLS al equipo de Azahar Coffee":"Assign SKILLS to the Azahar Coffee team","Cierre contable del mes":"Month-end accounting close","Conciliar extractos bancarios":"Reconcile bank statements","Conciliación de la cuenta de Azahar del mes pasado":"Reconciliation of Azahar's account for last month","Cuadrar los extractos con el libro. Es urgente para el cierre.":"Match the statements to the ledger. It is urgent for the close.","Definir SKILLS requeridas para los proyectos activos":"Define the SKILLS required for active projects","Detectar brechas de SKILLS en Tecnología":"Detect SKILLS gaps in Technology","Diseñar piezas para redes sociales":"Design social media pieces","Diseñar publicaciones para redes":"Design social posts","Editar video corto de presentación":"Edit short presentation video","Ejecutar pruebas de regresión":"Run regression tests","Enviar facturas pendientes del periodo":"Send the period's pending invoices","Error en la web: el formulario de contacto no envía":"Website error: the contact form does not submit","Los clientes reportan que el botón no responde.":"Customers report that the button does not respond.","Mapear proceso de aprobación interna":"Map the internal approval process","Optimizar consultas del servicio principal":"Optimize the main service's queries","Preparar liquidación de nómina":"Prepare payroll settlement","Preparar seguimiento semanal de cuenta":"Prepare weekly account follow-up","Redactar calendario de contenido":"Write the content calendar","Responder solicitudes de soporte":"Answer support requests","Revisar declaraciones del trimestre":"Review the quarter's tax filings","Revisar integración con servicio externo":"Review the external service integration","Revisar propuesta del nuevo aliado":"Review the new partner's proposal","Revisión semanal con Azahar Coffee":"Weekly review with Azahar Coffee","Carolina no pudo clasificarla: pasa a «Por revisar»":"Carolina could not classify it: moved to «To review»","Analista de procesos":"Process analyst","Asignación de SKILLS":"SKILLS assignment","Automatización de procesos":"Process automation",Backend:Wb,"CEO de Metis Nexa Inc.":"CEO of Metis Nexa Inc.",CFO:qb,CTO:Xb,CEO:jb,"Conciliaciones bancarias":"Bank reconciliations",Contabilidad:Yb,"Coordinadora de operaciones":"Operations coordinator","Cuentas por pagar":"Accounts payable","Datos y reportes":"Data and reports","Desarrollo de negocio":"Business development","Desarrollo y capacitación de agentes":"Agent development and training","Dirección de arte":"Art direction","Diseño editorial y presentaciones":"Editorial design and presentations","Documentación y capacitación":"Documentation and training","Facturación y cartera":"Invoicing and receivables",Frontend:Kb,"Gerente de cuenta Azahar":"Azahar account manager","Identidad de marca":"Brand identity",Impuestos:Zb,"Infraestructura y despliegues":"Infrastructure and deployments","Integraciones API":"API integrations","Líder de Recursos Humanos":"Human Resources leader","Líder de diseño gráfico":"Graphic design leader","Marketing y contenido":"Marketing and content","Motion y video":"Motion and video",Nómina:"Payroll","Piezas digitales y redes":"Digital pieces and social media","QA y pruebas":"QA and testing","Recepcionista de agenda y seguimiento":"Receptionist for scheduling and follow-up","Recepcionista de entrada y enrutamiento":"Receptionist for intake and routing","Soporte a clientes":"Customer support",Ventas:Jb,"Adapta los diseños a cada formato":"Adapts designs to each format","Administra la infraestructura":"Manages the infrastructure","Anima piezas y arma videos cortos":"Animates pieces and builds short videos","Arma reportes e indicadores":"Builds reports and KPIs","Asigna SKILLS a los agentes según la necesidad del proyecto":"Assigns SKILLS to agents according to project needs","Atiende la cuenta de Azahar":"Handles the Azahar account","Atiende los diseños de todos los proyectos":"Handles the designs for all projects","Atiende prospectos":"Handles prospects","Automatiza tareas repetitivas":"Automates repetitive tasks","Capacita al equipo":"Trains the team","Concilia extractos con libros":"Reconciles statements with the books","Conecta sistemas por API":"Connects systems through APIs","Construye interfaces":"Builds interfaces","Coordina a su equipo":"Coordinates their team","Crea y asigna las tareas a los agentes":"Creates and assigns tasks to agents","Crea y mantiene manuales de marca":"Creates and maintains brand manuals","Cuida el rendimiento":"Looks after performance","Cuida la experiencia de uso":"Looks after the user experience","Cuida la imagen de marca":"Looks after the brand image","Da la bienvenida a las visitas, crea su ficha y avisa al responsable":"Welcomes visitors, creates their record and notifies the person in charge","Da seguimiento a entregables":"Follows up on deliverables","Define el estilo visual de cada proyecto":"Defines the visual style of each project","Define la arquitectura":"Defines the architecture","Define la dirección de la empresa":"Sets the company's direction","Define qué SKILLS necesita cada proyecto":"Defines which SKILLS each project needs","Desarrolla servicios y lógica":"Develops services and logic","Detecta brechas de SKILLS en cada equipo":"Detects SKILLS gaps in each team","Detecta y explica diferencias":"Detects and explains differences","Diseña logos y papelería":"Designs logos and stationery","Diseña piezas para redes y web":"Designs pieces for social media and web","Diseña presentaciones y documentos":"Designs presentations and documents","Diseña y ejecuta pruebas":"Designs and runs tests","Documenta los flujos":"Documents the workflows","Edita material audiovisual":"Edits audiovisual material","Emite facturas":"Issues invoices","Envía recordatorios y escala al líder si una tarea sigue bloqueada":"Sends reminders and escalates to the leader if a task stays blocked","Escala casos complejos":"Escalates complex cases","Escribe guías y manuales":"Writes guides and manuals","Gestiona el tablero de tareas":"Manages the task board","Gestiona la agenda de reuniones y visitas y reserva la sala de reuniones":"Manages the schedule of meetings and visits and books the meeting room","Gestiona los despliegues":"Manages deployments","Hace demos de la oficina":"Gives office demos","Hace seguimiento a la cartera":"Follows up on receivables","Identifica la empresa y clasifica la solicitud por área":"Identifies the company and classifies the request by area","Identifica oportunidades":"Identifies opportunities","La convierte en tarea y la asigna al líder o al agente que corresponde":"Turns it into a task and assigns it to the leader or the right agent","Le pone prioridad según palabras clave y fecha límite":"Sets its priority from keywords and due date","Lidera el departamento de Recursos Humanos":"Leads the Human Resources department","Lidera el equipo de diseño gráfico":"Leads the graphic design team","Lidera el área de tecnología":"Leads the technology area","Lidera el área financiera":"Leads the finance area","Lidera operaciones y clientes":"Leads operations and clients","Liquida la nómina":"Runs the payroll","Lleva el calendario tributario":"Keeps the tax calendar","Mantiene el catálogo de SKILLS al día":"Keeps the SKILLS catalog up to date","Mapea procesos":"Maps processes","Maqueta piezas impresas y digitales":"Lays out print and digital pieces","Marca en rojo las tareas que llevan más de 48 horas sin avanzar o cerca de su fecha límite":"Flags in red tasks with no progress for over 48 hours or close to their due date","Monitorea las integraciones":"Monitors the integrations","Planea contenido":"Plans content","Prepara datos":"Prepares data","Prepara declaraciones":"Prepares tax filings","Prepara el cierre del mes":"Prepares the month-end close","Prepara el resumen del día para Felipe":"Prepares the daily summary for Felipe","Prepara propuestas":"Prepares proposals","Prioriza el trabajo de su equipo":"Prioritizes their team's work","Programa los pagos":"Schedules payments","Propone capacitaciones y rotaciones entre proyectos":"Proposes training and rotations between projects","Propone mejoras":"Proposes improvements","Publica y mide resultados":"Publishes and measures results","Recibe todas las solicitudes nuevas que llegan sin asignar":"Receives all new unassigned requests","Registra facturas de proveedores":"Records supplier invoices","Registra movimientos contables":"Records accounting entries","Reporta errores":"Reports errors","Resuelve solicitudes":"Resolves requests","Revisa cierres y estados financieros":"Reviews closes and financial statements","Revisa el avance de cada área":"Reviews each area's progress","Revisa las piezas antes de entregarlas":"Reviews pieces before delivering them","Revisa y aprueba las asignaciones de SKILLS a los agentes":"Reviews and approves SKILLS assignments to agents","Si no puede clasificarla, la deja en «Por revisar» para Felipe":"If it cannot classify it, it leaves it in «To review» for Felipe","Verifica novedades y descuentos":"Checks payroll changes and deductions","La lista de SKILLS aún no está cargada. Cuando se cargue, Recursos Humanos (Paula, Gabriela y Mauricio) las asignará según la necesidad de cada proyecto.":"The SKILLS list is not loaded yet. Once loaded, Human Resources (Paula, Gabriela and Mauricio) will assign them according to each project's needs.","La lista de SKILLS está pendiente de cargar (src/data/skills.json).":"The SKILLS list is pending (src/data/skills.json).","Todos los agentes están trabajando.":"All agents are working.","No hay agentes libres en este momento.":"There are no free agents right now.","Nada por revisar: recepción clasificó todo.":"Nothing to review: reception classified everything.","Nadie del equipo tiene una tarea en curso.":"Nobody on the team has a task in progress.","Ninguna tarea atrasada.":"No late tasks.","Sin herramientas definidas":"No tools defined","Sin funciones definidas.":"No duties defined.","Sin agentes trabajando":"No agents working","Sin tarea en curso":"No task in progress","SKILLS asignadas":"Assigned SKILLS","SKILLS del equipo":"Team SKILLS","Solicitudes clasificadas hoy":"Requests classified today","Reuniones y visitas agendadas":"Scheduled meetings and visits",Marcar:Qb,"Ver equipo":"See team",Hoy:ex,"Mis tareas":"My tasks","Metis Nexa Inc.":"Metis Nexa Inc.",tareas:tx,"CENTRO DE MANDO":"COMMAND CENTER","EN LÍNEA":"ONLINE",AGENTES:nx,TAREAS:ix,"Oficina de proyectos":"Projects office","Sala de innovación":"Innovation room","Sala de clientes":"Clients room","SALA DE CLIENTES":"CLIENTS ROOM",Ascensores:ax,PROYECTOS:sx,"O F I C I N A":"O F F I C E",Facturación:"Billing","Progreso:":"Progress:","elige a quién asignar la tarea. Entrará por la puerta y irá a su mesa.":"choose who to assign the task to. They will come in through the door and go to their desk.","Azahar Coffee":"Azahar Coffee"},ox="Adicionar",cx="Aprovar",lx="Atribuir",dx="Calendário",ux="Cancelar",hx="Cargo",fx="Fechar",px="Classificando",mx="Cliente",gx="Concluir",vx="Descartar",_x="Implantações",bx="Disponível",xx="Editar",Sx="Excluir",yx="Empresa",Mx="Equipe",Ex="Estado",wx="Avaliações",Ax="Data",Tx="Figma",Rx="Financeira",Cx="Funções",Px="Salvar",Ix="Concluída",Lx="Iniciar",Dx="Interna",Nx="Comando",Ux="Monitoramento",zx="Nenhum",Ox="Nome",Fx="Operações",kx="Pausar",Bx="Progresso",Hx="Remover",Gx="Reabrir",Vx="Recrutamento",$x="Salas",Wx="Quadro",qx="Trabalhando",Xx="agenda",jx="alta",Yx="média",Kx="baixa",Zx="atribuídas",Jx="atrasadas",Qx="concluídas",eS="disponíveis",tS="exemplo",nS="encaminha",iS="concluídas",aS="livres",sS="ocupados",rS="recebidas",oS="trabalhando",cS="concluída",lS="Agente",dS="Agentes",uS="Solicitação",hS="Visita",fS="Enviar",pS="Rejeitar",mS="SOLICITAÇÕES",gS="BEM-VINDOS",vS="FINANCEIRA",_S="OPERAÇÕES",bS="RECURSOS",xS="CONCLUÍDA",SS="CONCLUÍDAS",yS="Backend",MS="CFO",ES="CTO",wS="CEO",AS="Contabilidade",TS="Frontend",RS="Impostos",CS="Vendas",PS="Marcar",IS="Hoje",LS="tarefas",DS="AGENTES",NS="TAREFAS",US="Elevadores",zS="PROJETOS",OS={"+ Agendar reunión o registrar visita":"+ Agendar reunião ou registrar visita","+ Asignar tarea":"+ Atribuir tarefa","+ Nueva solicitud":"+ Nova solicitação","+ Nueva tarea":"+ Nova tarefa","+ Solicitud":"+ Solicitação","Abrir tablero":"Abrir quadro","Actividad reciente":"Atividade recente","Agente asignado":"Agente atribuído","Agente actualizado":"Agente atualizado","Agentes libres":"Agentes livres",Agregar:ox,"Agregar una función nueva…":"Adicionar uma nova função…","Ampliar / reducir":"Ampliar / reduzir","Ampliar o reducir":"Ampliar ou reduzir",Aprobar:cx,"Aprobada por Felipe":"Aprovada por Felipe","Arrastra con el clic izquierdo para girar 360° e inclinar · clic derecho o Mayús + arrastrar para mover · rueda para acercar · clic en un agente para ver su ficha":"Arraste com o botão esquerdo para girar 360° e inclinar · botão direito ou Shift + arrastar para mover · roda para aproximar · clique em um agente para ver a ficha",Asignar:lx,"Asignar a…":"Atribuir a…","Asignar a":"Atribuir a","Asignada por Felipe a":"Atribuída por Felipe a","Avance medio del equipo":"Progresso médio da equipe","Banco de imágenes":"Banco de imagens","Bandeja de entrada":"Caixa de entrada","Bandeja vacía":"Caixa vazia","Bandeja vacía. Las solicitudes nuevas llegan aquí.":"Caixa vazia. As novas solicitações chegam aqui.","Borrar ejemplos":"Apagar exemplos","Buscar por nombre del agente o título…":"Buscar por nome do agente ou título…",Calendario:dx,"Cambiar tema":"Mudar tema","Cambiar tema claro/oscuro":"Mudar tema claro/escuro",Cancelar:ux,Capacitación:"Capacitação",Cargo:hx,"Catálogo de SKILLS":"Catálogo de SKILLS","Centro de mando":"Centro de comando","Cerca del límite":"Perto do prazo",Cerrar:fx,"Clasificada por":"Classificada por",Clasificando:px,Cliente:mx,"Cliente asignado (muestra su logo en el cubículo)":"Cliente atribuído (mostra o logo na baia)","Cocina-comedor":"Cozinha e refeitório",Completar:gx,"Conciliación bancaria":"Conciliação bancária","Crea y asigna las tareas":"Cria e atribui as tarefas","Crear y asignar":"Criar e atribuir",Descartar:vx,Descripción:"Descrição","Despacho de Felipe":"Escritório do Felipe","Despacho · CEO":"Escritório · CEO",Despliegues:_x,"Dile qué necesitas: recepción lo clasifica y lo envía":"Diga o que precisa: a recepção classifica e encaminha",Dirección:"Direção",Disponible:bx,"Disponible en su puesto":"Disponível no posto","Disponible · fuera del edificio":"Disponível · fora do prédio",Diseño:"Design","Diseño Gráfico":"Design Gráfico",Documentación:"Documentação","Edita el nombre, el cargo y las funciones de cada agente":"Edite o nome, o cargo e as funções de cada agente",Editar:xx,"Editar agente":"Editar agente","Editar tarea":"Editar tarefa","Ej.: Conciliar extractos del mes":"Ex.: Conciliar os extratos do mês","Ej.: Error en la web del formulario de contacto":"Ex.: Erro no formulário de contato do site","Ej.: Necesito conciliar las cuentas de Azahar antes del viernes…":"Ex.: Preciso conciliar as contas da Azahar antes de sexta…","El cerebro de la oficina":"O cérebro do escritório",Eliminar:Sx,Empresa:yx,"En bandeja":"Na caixa","En curso":"Em andamento","En espera":"Em espera","En qué trabaja ahora":"No que trabalha agora","En su despacho":"No escritório","Entra por recepción: Carolina la clasifica y la envía a quien corresponde":"Entra pela recepção: a Carolina classifica e envia para quem for responsável","Enviado a recepción: Carolina lo clasifica":"Enviado à recepção: a Carolina está classificando","Enviar a recepción":"Enviar à recepção",Equipo:Mx,"Equipo de agentes":"Equipe de agentes","Equipos en trabajo":"Equipes em ação","Equipos hoy":"Equipes hoje","Escribe qué necesitas":"Escreva o que você precisa",Estado:Ex,Evaluaciones:wx,"Falta el título o la fecha":"Falta o título ou a data",Fecha:Ax,"Fecha límite (opcional)":"Prazo (opcional)",Figma:Tx,Financiera:Rx,"Fuera del edificio. Toca uno para asignarle una tarea: entrará y irá a su mesa.":"Fora do prédio. Toque em um para atribuir uma tarefa: ele entra e vai para a mesa.",Funciones:Cx,"Girar a la derecha":"Girar para a direita","Girar a la derecha (E)":"Girar para a direita (E)","Girar a la izquierda":"Girar para a esquerda","Girar a la izquierda (Q)":"Girar para a esquerda (Q)","Girar la oficina":"Girar o escritório",Guardar:Px,"Guardar cambios":"Salvar alterações",Hecha:Ix,"Herramientas del equipo":"Ferramentas da equipe","Historial de tareas":"Histórico de tarefas","Hojas de cálculo":"Planilhas","Inclinar hacia abajo":"Inclinar para baixo","Inclinar hacia abajo (F)":"Inclinar para baixo (F)","Inclinar hacia arriba":"Inclinar para cima","Inclinar hacia arriba (R)":"Inclinar para cima (R)",Iniciar:Lx,Interna:Dx,"Ir al área":"Ir para a área","Jefe de la oficina · crea y asigna tareas":"Chefe do escritório · cria e atribui tarefas","Las asigna Recursos Humanos según la necesidad de cada proyecto:":"Os Recursos Humanos as atribuem conforme a necessidade de cada projeto:","Libre · fuera del edificio":"Livre · fora do prédio","Limpiar filtros":"Limpar filtros","Los cambios se guardan en este navegador. El puesto, el área y el líder no cambian.":"As alterações ficam salvas neste navegador. O posto, a área e o líder não mudam.",Líder:"Líder","Líder de Diseño Gráfico":"Líder de Design Gráfico","Líder de Operaciones y Clientes":"Líder de Operações e Clientes","Líder de Área Financiera":"Líder da Área Financeira","Líder de Área de Tecnología":"Líder da Área de Tecnologia",Mando:Nx,"Manual de marca":"Manual de marca","Marcar como hecha":"Marcar como concluída",Menú:"Menu","Mensaje sin detalle suficiente para saber a quién corresponde.":"Mensagem sem detalhes suficientes para saber a quem cabe.","Mi ficha":"Minha ficha",Monitoreo:Ux,"Necesitan tu OK":"Precisam do seu OK",Ninguno:zx,Nombre:Ox,"Nombre del visitante (opcional)":"Nome do visitante (opcional)","Nueva solicitud":"Nova solicitação","Nueva tarea":"Nova tarefa","Oficina Virtual":"Escritório Virtual",Operaciones:Fx,"Operaciones y Clientes":"Operações e Clientes","Panel del CEO":"Painel do CEO",Pausar:kx,"Por área":"Por área","Por empresa":"Por empresa","Por hacer":"A fazer","Por revisar":"Para revisar","Por revisar · decide Felipe":"Para revisar · Felipe decide",Progreso:Bx,"Pruebas automáticas":"Testes automáticos",Quitar:Hx,"Quitar función":"Remover função","Qué se necesita, para quién y por qué…":"O que é necessário, para quem e por quê…","RR. HH.":"RH",Reabrir:Gx,Recepción:"Recepção","Recepción disponible":"Recepção disponível","Recibiendo solicitudes":"Recebendo solicitações",Reclutamiento:Vx,"Recursos Humanos":"Recursos Humanos","Repositorio de código":"Repositório de código","Reportes contables":"Relatórios contábeis","Reservar sala y avisar":"Reservar a sala e avisar","Resumen del campus":"Resumo do campus","Resumen del día para Felipe":"Resumo do dia para o Felipe",Reunión:"Reunião","Reunión agendada":"Reunião agendada","Sala de capacitación":"Sala de capacitação","Sala de colaboración":"Sala de colaboração","Sala de reuniones":"Sala de reuniões",Salas:$x,"Salas y áreas":"Salas e áreas",Salón:"Salão","Salón de descanso":"Sala de descanso","Seguimiento de clientes":"Acompanhamento de clientes","Si la tarea queda «En curso», el agente va a su mesa y trabaja. Al completarla, vuelve a descansar.":"Se a tarefa ficar «Em andamento», o agente vai para a mesa e trabalha. Ao concluí-la, ele sai novamente.","Si no se puede clasificar, queda en la bandeja «Por revisar» del panel de Felipe.":"Se não for possível classificar, fica na bandeja «Para revisar» do painel do Felipe.","Sin SKILLS asignadas todavía.":"Nenhuma SKILL atribuída ainda.","Sin reuniones agendadas.":"Nenhuma reunião agendada.","Sin tarea en curso. Está disponible para recibir una.":"Sem tarefa em andamento. Disponível para receber uma.","Solicitud asignada":"Solicitação atribuída","Solicitud descartada":"Solicitação descartada","Solicitud enviada a recepción":"Solicitação enviada à recepção","Solicitud recibida en recepción":"Solicitação recebida na recepção","Su propio estado":"O próprio estado",Tablero:Wx,"Tablero de tareas":"Quadro de tarefas","Tarea actual":"Tarefa atual","Tarea actualizada":"Tarefa atualizada","Tarea aprobada":"Tarefa aprovada","Tarea asignada: el agente va a su mesa":"Tarefa atribuída: o agente vai para a mesa","Tarea completada":"Tarefa concluída","Tarea creada":"Tarefa criada","Tarea creada y asignada":"Tarefa criada e atribuída","Tarea de ejemplo cargada":"Tarefa de exemplo carregada","Tarea eliminada":"Tarefa excluída","Tarea en curso: el agente va a su mesa":"Tarefa em andamento: o agente vai para a mesa","Tarea pausada":"Tarefa pausada","Tareas en seguimiento":"Tarefas em acompanhamento",Tecnología:"Tecnologia","Tickets de soporte":"Tickets de suporte","Todas las empresas":"Todas as empresas","Todas las áreas":"Todas as áreas","Todavía no tiene tareas.":"Ainda não tem tarefas.","Todavía no se ha clasificado nada hoy.":"Nada foi classificado hoje ainda.","Todos los agentes":"Todos os agentes",Trabajando:qx,Título:"Título","Título (ej.: Reunión de seguimiento)":"Título (ex.: Reunião de acompanhamento)","Valores originales restablecidos":"Valores originais restaurados","Ver agente":"Ver agente","Ver en el campus":"Ver no campus","Ver tablero del área":"Ver quadro da área","Ver todos":"Ver todos","Visita de cliente":"Visita de cliente","Vista general":"Visão geral","⌂ Vista general":"⌂ Visão geral","Ejemplos borrados":"Exemplos apagados","Ejemplos cargados":"Exemplos carregados","Elige a quién asignarla":"Escolha a quem atribuir","Elige un agente…":"Escolha um agente…",agenda:Xx,"agentes libres":"agentes livres","agentes ocupados":"agentes ocupados",alta:jx,media:Yx,baja:Kx,asignadas:Zx,atrasadas:Jx,"clasificadas hoy":"classificadas hoje",completadas:Qx,disponibles:eS,ejemplo:tS,"en bandeja":"na caixa","en curso":"em andamento","en seguimiento":"em acompanhamento",enruta:nS,hechas:iS,"hechas hoy":"concluídas hoje",libres:aS,"necesitan tu OK":"precisam do seu OK",ocupados:sS,"por hacer":"a fazer","por revisar":"para revisar",recibidas:rS,recepción:"recepção","tareas en curso":"tarefas em andamento","tareas hechas":"tarefas concluídas",trabajando:oS,"Área Financiera":"Área Financeira","Área de Tecnología":"Área de Tecnologia",Áreas:"Áreas","Estudio de Diseño Gráfico":"Estúdio de Design Gráfico","Oficina Azahar Coffee (piso 2)":"Escritório Azahar Coffee (andar 2)","Entrada y recepción":"Entrada e recepção","Cliente asignado":"Cliente atribuído","Escalada al líder":"Escalada ao líder","Recordatorio enviado":"Lembrete enviado","Recordatorio pendiente":"Lembrete pendente",terminada:cS,"sin avanzar":"sem avanço",más:"mais",Agente:lS,Agentes:dS,Solicitud:uS,Visita:hS,Enviar:fS,Rechazar:pS,"Fuera del edificio":"Fora do prédio","fuera del edificio":"fora do prédio","Solicitudes entrantes":"Solicitações recebidas","Aprender · Practicar · Crecer":"Aprender · Praticar · Crescer","Ideas y proyectos":"Ideias e projetos","SALA DE CAPACITACIÓN":"SALA DE CAPACITAÇÃO",SOLICITUDES:mS,"ENTRANTES · RECEPCIÓN":"RECEBIDAS · RECEPÇÃO",BIENVENIDOS:gS,DISEÑO:"DESIGN","G R Á F I C O":"G R Á F I C O",FINANCIERA:vS,"Á R E A":"Á R E A",OPERACIONES:_S,"Y   C L I E N T E S":"E   C L I E N T E S",TECNOLOGÍA:"TECNOLOGIA",RECURSOS:bS,"H U M A N O S":"H U M A N O S","ÁREA DE DISEÑO GRÁFICO":"ÁREA DE DESIGN GRÁFICO","OFICINA AZAHAR COFFEE":"ESCRITÓRIO AZAHAR COFFEE","Piso 2  ↑":"Andar 2  ↑","TABLERO KANBAN":"QUADRO KANBAN","POR HACER":"A FAZER","EN CURSO":"EM ANDAMENTO",HECHA:xS,HECHAS:SS,"Por revisar:":"Para revisar:","Clasificando…":"Classificando…","Escuchando…":"Ouvindo…","En reposo":"Em repouso",Jardín:"Jardim","Ver tablero":"Ver quadro","Actualizar guía de capacitación":"Atualizar o guia de capacitação","Actualizar manual de marca del cliente":"Atualizar o manual de marca do cliente","Actualizar papelería corporativa":"Atualizar a papelaria corporativa","Armar presentación comercial":"Montar a apresentação comercial","Armar reporte semanal de indicadores":"Montar o relatório semanal de indicadores","Asignar SKILLS al equipo de Azahar Coffee":"Atribuir SKILLS à equipe da Azahar Coffee","Cierre contable del mes":"Fechamento contábil do mês","Conciliar extractos bancarios":"Conciliar extratos bancários","Conciliación de la cuenta de Azahar del mes pasado":"Conciliação da conta da Azahar do mês passado","Cuadrar los extractos con el libro. Es urgente para el cierre.":"Conferir os extratos com o razão. É urgente para o fechamento.","Definir SKILLS requeridas para los proyectos activos":"Definir as SKILLS necessárias para os projetos ativos","Detectar brechas de SKILLS en Tecnología":"Detectar lacunas de SKILLS em Tecnologia","Diseñar piezas para redes sociales":"Criar peças para redes sociais","Diseñar publicaciones para redes":"Criar publicações para redes","Editar video corto de presentación":"Editar vídeo curto de apresentação","Ejecutar pruebas de regresión":"Executar testes de regressão","Enviar facturas pendientes del periodo":"Enviar as faturas pendentes do período","Error en la web: el formulario de contacto no envía":"Erro no site: o formulário de contato não envia","Los clientes reportan que el botón no responde.":"Os clientes relatam que o botão não responde.","Mapear proceso de aprobación interna":"Mapear o processo de aprovação interna","Optimizar consultas del servicio principal":"Otimizar as consultas do serviço principal","Preparar liquidación de nómina":"Preparar a folha de pagamento","Preparar seguimiento semanal de cuenta":"Preparar o acompanhamento semanal da conta","Redactar calendario de contenido":"Redigir o calendário de conteúdo","Responder solicitudes de soporte":"Responder solicitações de suporte","Revisar declaraciones del trimestre":"Revisar as declarações do trimestre","Revisar integración con servicio externo":"Revisar a integração com o serviço externo","Revisar propuesta del nuevo aliado":"Revisar a proposta do novo parceiro","Revisión semanal con Azahar Coffee":"Revisão semanal com a Azahar Coffee","Carolina no pudo clasificarla: pasa a «Por revisar»":"A Carolina não conseguiu classificar: passa para «Para revisar»","Analista de procesos":"Analista de processos","Asignación de SKILLS":"Atribuição de SKILLS","Automatización de procesos":"Automação de processos",Backend:yS,"CEO de Metis Nexa Inc.":"CEO da Metis Nexa Inc.",CFO:MS,CTO:ES,CEO:wS,"Conciliaciones bancarias":"Conciliações bancárias",Contabilidad:AS,"Coordinadora de operaciones":"Coordenadora de operações","Cuentas por pagar":"Contas a pagar","Datos y reportes":"Dados e relatórios","Desarrollo de negocio":"Desenvolvimento de negócios","Desarrollo y capacitación de agentes":"Desenvolvimento e capacitação de agentes","Dirección de arte":"Direção de arte","Diseño editorial y presentaciones":"Design editorial e apresentações","Documentación y capacitación":"Documentação e capacitação","Facturación y cartera":"Faturamento e carteira",Frontend:TS,"Gerente de cuenta Azahar":"Gerente de conta Azahar","Identidad de marca":"Identidade de marca",Impuestos:RS,"Infraestructura y despliegues":"Infraestrutura e implantações","Integraciones API":"Integrações de API","Líder de Recursos Humanos":"Líder de Recursos Humanos","Líder de diseño gráfico":"Líder de design gráfico","Marketing y contenido":"Marketing e conteúdo","Motion y video":"Motion e vídeo",Nómina:"Folha de pagamento","Piezas digitales y redes":"Peças digitais e redes","QA y pruebas":"QA e testes","Recepcionista de agenda y seguimiento":"Recepcionista de agenda e acompanhamento","Recepcionista de entrada y enrutamiento":"Recepcionista de entrada e encaminhamento","Soporte a clientes":"Suporte a clientes",Ventas:CS,"Adapta los diseños a cada formato":"Adapta os designs a cada formato","Administra la infraestructura":"Administra a infraestrutura","Anima piezas y arma videos cortos":"Anima peças e monta vídeos curtos","Arma reportes e indicadores":"Monta relatórios e indicadores","Asigna SKILLS a los agentes según la necesidad del proyecto":"Atribui SKILLS aos agentes conforme a necessidade do projeto","Atiende la cuenta de Azahar":"Atende a conta da Azahar","Atiende los diseños de todos los proyectos":"Atende os designs de todos os projetos","Atiende prospectos":"Atende prospects","Automatiza tareas repetitivas":"Automatiza tarefas repetitivas","Capacita al equipo":"Capacita a equipe","Concilia extractos con libros":"Concilia extratos com os livros","Conecta sistemas por API":"Conecta sistemas por API","Construye interfaces":"Constrói interfaces","Coordina a su equipo":"Coordena a equipe","Crea y asigna las tareas a los agentes":"Cria e atribui tarefas aos agentes","Crea y mantiene manuales de marca":"Cria e mantém manuais de marca","Cuida el rendimiento":"Cuida do desempenho","Cuida la experiencia de uso":"Cuida da experiência de uso","Cuida la imagen de marca":"Cuida da imagem da marca","Da la bienvenida a las visitas, crea su ficha y avisa al responsable":"Dá as boas-vindas às visitas, cria a ficha e avisa o responsável","Da seguimiento a entregables":"Acompanha entregáveis","Define el estilo visual de cada proyecto":"Define o estilo visual de cada projeto","Define la arquitectura":"Define a arquitetura","Define la dirección de la empresa":"Define a direção da empresa","Define qué SKILLS necesita cada proyecto":"Define quais SKILLS cada projeto precisa","Desarrolla servicios y lógica":"Desenvolve serviços e lógica","Detecta brechas de SKILLS en cada equipo":"Detecta lacunas de SKILLS em cada equipe","Detecta y explica diferencias":"Detecta e explica diferenças","Diseña logos y papelería":"Cria logos e papelaria","Diseña piezas para redes y web":"Cria peças para redes e web","Diseña presentaciones y documentos":"Cria apresentações e documentos","Diseña y ejecuta pruebas":"Projeta e executa testes","Documenta los flujos":"Documenta os fluxos","Edita material audiovisual":"Edita material audiovisual","Emite facturas":"Emite faturas","Envía recordatorios y escala al líder si una tarea sigue bloqueada":"Envia lembretes e escala ao líder se uma tarefa continuar bloqueada","Escala casos complejos":"Escala casos complexos","Escribe guías y manuales":"Escreve guias e manuais","Gestiona el tablero de tareas":"Gerencia o quadro de tarefas","Gestiona la agenda de reuniones y visitas y reserva la sala de reuniones":"Gerencia a agenda de reuniões e visitas e reserva a sala de reuniões","Gestiona los despliegues":"Gerencia as implantações","Hace demos de la oficina":"Faz demonstrações do escritório","Hace seguimiento a la cartera":"Acompanha a carteira","Identifica la empresa y clasifica la solicitud por área":"Identifica a empresa e classifica a solicitação por área","Identifica oportunidades":"Identifica oportunidades","La convierte en tarea y la asigna al líder o al agente que corresponde":"Transforma em tarefa e atribui ao líder ou ao agente certo","Le pone prioridad según palabras clave y fecha límite":"Define a prioridade por palavras-chave e prazo","Lidera el departamento de Recursos Humanos":"Lidera o departamento de Recursos Humanos","Lidera el equipo de diseño gráfico":"Lidera a equipe de design gráfico","Lidera el área de tecnología":"Lidera a área de tecnologia","Lidera el área financiera":"Lidera a área financeira","Lidera operaciones y clientes":"Lidera operações e clientes","Liquida la nómina":"Processa a folha de pagamento","Lleva el calendario tributario":"Mantém o calendário tributário","Mantiene el catálogo de SKILLS al día":"Mantém o catálogo de SKILLS atualizado","Mapea procesos":"Mapeia processos","Maqueta piezas impresas y digitales":"Diagrama peças impressas e digitais","Marca en rojo las tareas que llevan más de 48 horas sin avanzar o cerca de su fecha límite":"Marca em vermelho as tarefas sem avanço há mais de 48 horas ou perto do prazo","Monitorea las integraciones":"Monitora as integrações","Planea contenido":"Planeja conteúdo","Prepara datos":"Prepara dados","Prepara declaraciones":"Prepara declarações","Prepara el cierre del mes":"Prepara o fechamento do mês","Prepara el resumen del día para Felipe":"Prepara o resumo do dia para o Felipe","Prepara propuestas":"Prepara propostas","Prioriza el trabajo de su equipo":"Prioriza o trabalho da equipe","Programa los pagos":"Programa os pagamentos","Propone capacitaciones y rotaciones entre proyectos":"Propõe capacitações e rodízios entre projetos","Propone mejoras":"Propõe melhorias","Publica y mide resultados":"Publica e mede resultados","Recibe todas las solicitudes nuevas que llegan sin asignar":"Recebe todas as novas solicitações sem atribuição","Registra facturas de proveedores":"Registra faturas de fornecedores","Registra movimientos contables":"Registra lançamentos contábeis","Reporta errores":"Reporta erros","Resuelve solicitudes":"Resolve solicitações","Revisa cierres y estados financieros":"Revisa fechamentos e demonstrações financeiras","Revisa el avance de cada área":"Revisa o progresso de cada área","Revisa las piezas antes de entregarlas":"Revisa as peças antes de entregá-las","Revisa y aprueba las asignaciones de SKILLS a los agentes":"Revisa e aprova as atribuições de SKILLS aos agentes","Si no puede clasificarla, la deja en «Por revisar» para Felipe":"Se não conseguir classificar, deixa em «Para revisar» para o Felipe","Verifica novedades y descuentos":"Verifica novidades e descontos","La lista de SKILLS aún no está cargada. Cuando se cargue, Recursos Humanos (Paula, Gabriela y Mauricio) las asignará según la necesidad de cada proyecto.":"A lista de SKILLS ainda não foi carregada. Quando for, os Recursos Humanos (Paula, Gabriela e Mauricio) as atribuirão conforme a necessidade de cada projeto.","La lista de SKILLS está pendiente de cargar (src/data/skills.json).":"A lista de SKILLS está pendente de carregamento (src/data/skills.json).","Todos los agentes están trabajando.":"Todos os agentes estão trabalhando.","No hay agentes libres en este momento.":"Não há agentes livres no momento.","Nada por revisar: recepción clasificó todo.":"Nada para revisar: a recepção classificou tudo.","Nadie del equipo tiene una tarea en curso.":"Ninguém da equipe tem tarefa em andamento.","Ninguna tarea atrasada.":"Nenhuma tarefa atrasada.","Sin herramientas definidas":"Sem ferramentas definidas","Sin funciones definidas.":"Sem funções definidas.","Sin agentes trabajando":"Nenhum agente trabalhando","Sin tarea en curso":"Sem tarefa em andamento","SKILLS asignadas":"SKILLS atribuídas","SKILLS del equipo":"SKILLS da equipe","Solicitudes clasificadas hoy":"Solicitações classificadas hoje","Reuniones y visitas agendadas":"Reuniões e visitas agendadas",Marcar:PS,"Ver equipo":"Ver equipe",Hoy:IS,"Mis tareas":"Minhas tarefas","Metis Nexa Inc.":"Metis Nexa Inc.",tareas:LS,"CENTRO DE MANDO":"CENTRO DE COMANDO","EN LÍNEA":"ONLINE",AGENTES:DS,TAREAS:NS,"Oficina de proyectos":"Escritório de projetos","Sala de innovación":"Sala de inovação","Sala de clientes":"Sala de clientes","SALA DE CLIENTES":"SALA DE CLIENTES",Ascensores:US,PROYECTOS:zS,"O F I C I N A":"E S C R I T Ó R I O",Facturación:"Faturamento","Progreso:":"Progresso:","elige a quién asignar la tarea. Entrará por la puerta y irá a su mesa.":"escolha a quem atribuir a tarefa. Ele entra pela porta e vai para a mesa.","Azahar Coffee":"Azahar Coffee"},$u="mn.idioma",kr={en:rx,pt:OS};function FS(){try{const n=localStorage.getItem($u);if(n==="es"||n==="en"||n==="pt")return n;const e=(navigator.language||"es").slice(0,2);return e==="en"||e==="pt"?e:"es"}catch{return"es"}}let Ti=FS();const kS=()=>Ti,qd={es:"es-CO",en:"en-US",pt:"pt-BR"};function BS(n){try{localStorage.setItem($u,n)}catch{}location.reload()}const HS=[{re:/^(\d+) agentes?$/,en:"$1 agents",pt:"$1 agentes"},{re:/^(\d+) personas$/,en:"$1 people",pt:"$1 pessoas"},{re:/^(\d+) tareas en curso$/,en:"$1 tasks in progress",pt:"$1 tarefas em andamento"},{re:/^(\d+) funciones$/,en:"$1 duties",pt:"$1 funções"},{re:/^(\d+) disponibles ahora/,en:"$1 available now",pt:"$1 disponíveis agora"},{re:/^(\d+)% completado(.*)$/,en:"$1% complete$2",pt:"$1% concluído$2"},{re:/^\+(\d+) en curso$/,en:"+$1 in progress",pt:"+$1 em andamento"},{re:/^Líder: (.+)$/,en:"Leader: $1",pt:"Líder: $1"},{re:/^Líder de (.+)$/,en:"Leader of $1",pt:"Líder de $1"},{re:/^Avisado: (.+)$/,en:"Notified: $1",pt:"Avisado: $1"},{re:/^Visitante: (.+)$/,en:"Visitor: $1",pt:"Visitante: $1"},{re:/^límite (.+)$/,en:"due $1",pt:"prazo $1"},{re:/^prioridad (alta|media|baja)$/,en:"$1 priority",pt:"prioridade $1"},{re:/^Por revisar: (\d+)$/,en:"To review: $1",pt:"Para revisar: $1"},{re:/^Clasificando: (.+)$/,en:"Classifying: $1",pt:"Classificando: $1"},{re:/^Seguimiento: (.+)$/,en:"Follow-up: $1",pt:"Acompanhamento: $1"},{re:/^Asignada por Felipe a (.+)$/,en:"Assigned by Felipe to $1",pt:"Atribuída por Felipe a $1"},{re:/^(\d+) h sin avanzar$/,en:"$1 h without progress",pt:"$1 h sem avanço"},{re:/^(\d+) d sin avanzar$/,en:"$1 d without progress",pt:"$1 d sem avanço"},{re:/^Ocupado · (.+)$/,en:"Busy · $1",pt:"Ocupado · $1"},{re:/^Progreso al (\d+)%$/,en:"Progress at $1%",pt:"Progresso em $1%"},{re:/^Movida a «(.+)»$/,en:"Moved to «$1»",pt:"Movida para «$1»"},{re:/^Trabajando · (.+)$/,en:"Working · $1",pt:"Trabalhando · $1"},{re:/^Disponible · (.+)$/,en:"Available · $1",pt:"Disponível · $1"},{re:/^(\d+) (agente|agentes) ocupados?$/,en:"$1 busy agents",pt:"$1 agentes ocupados"},{re:/^(.+) no pudo clasificarla: pasa a «Por revisar»$/,en:"$1 could not classify it: moved to «To review»",pt:"$1 não conseguiu classificar: passa para «Para revisar»"},{re:/^Clasificada por (.+?) → (.+)$/,en:"Classified by $1 → $2",pt:"Classificada por $1 → $2"},{re:/^(.+?) — (.+)$/,en:"$1 — $2",pt:"$1 — $2"},{re:/^(\d+) solicitudes?$/,en:"$1 requests",pt:"$1 solicitações"},{re:/^(\d+) asignaciones activas\.$/,en:"$1 active assignments.",pt:"$1 atribuições ativas."},{re:/^(\d+) de (\d+) tareas$/,en:"$1 of $2 tasks",pt:"$1 de $2 tarefas"}];function GS(n,e){const t=kr[e],i=n.match(/^(.+?)( [—-])$/);if(i)return tt(i[1])+i[2];const a=n.match(/^(.+?) \((\d+)\)$/);return a&&a[1]in t?`${t[a[1]]} (${a[2]})`:n.includes(" · ")?n.split(" · ").map(o=>o in t?t[o]:Xd(o,e)??o).join(" · "):Xd(n,e)}function Xd(n,e){for(const t of HS){const i=n.match(t.re);if(i)return t[e].replace(/\$(\d)/g,(a,s)=>{const r=i[Number(s)]??"";return r in kr[e]?kr[e][r]:r})}}function tt(n){if(Ti==="es"||!n)return n;const e=kr[Ti];return n in e?e[n]:GS(n,Ti)??n}const Wu=["placeholder","title","aria-label"];function us(n){var t;if(n.nodeType===Node.TEXT_NODE){const i=n.nodeValue??"",a=i.trim();if(!a)return;const s=tt(a);s!==a&&(n.nodeValue=i.replace(a,s));return}if(n.nodeType!==Node.ELEMENT_NODE)return;const e=n;if(!(e.tagName==="SCRIPT"||e.tagName==="STYLE"||e.tagName==="CANVAS")){for(const i of Wu){const a=(t=e.getAttribute)==null?void 0:t.call(e,i);if(a){const s=tt(a);s!==a&&e.setAttribute(i,s)}}e.tagName==="OPTION"||e.tagName==="BUTTON"||e.tagName,e.childNodes.forEach(us)}}function VS(){if(document.documentElement.lang=Ti,Ti==="es")return;us(document.body);let n=!1;new MutationObserver(e=>{if(!n){n=!0;for(const t of e)t.type==="childList"?t.addedNodes.forEach(us):(t.type==="characterData"||t.type==="attributes")&&us(t.target);n=!1}}).observe(document.body,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:Wu})}function qu(n,e=!1){const t=new Date(n);return isNaN(t.getTime())?"":e?t.toLocaleString(qd[Ti],{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):t.toLocaleDateString(qd[Ti],{day:"2-digit",month:"short",year:"numeric"})}const jd=.05,Kn=.3,Xu=new Map;function Yd(n){const e=()=>{const i=new pt,a=new pt;return n.add(i,a),{walls:i,decor:a}},t={N:e(),W:e()};return Xu.set(n,t),t}function Mt(n){let e=n;for(;e;){const t=Xu.get(e);if(t)return t;e=e.parent}throw new Error("sin capas de pared")}function xt(n,e,t){const i=document.createElement("canvas");i.width=n,i.height=e;const a=i.getContext("2d");t(a);const s=new cl(i);return s.colorSpace=Xt,s.anisotropy=8,{tex:s,canvas:i,ctx:a}}function gl(n,e,t,i,a){for(let s=0;s<i;s++)n.fillStyle=Math.random()>.5?`rgba(255,255,255,${a})`:`rgba(0,0,0,${a})`,n.fillRect(Math.random()*e,Math.random()*t,2,2)}function $S(n,e,t){const{tex:i}=xt(256,256,a=>{a.fillStyle=n,a.fillRect(0,0,256,256),gl(a,256,256,1800,.06),a.fillStyle="rgba(0,0,0,0.22)",a.fillRect(0,0,256,2),a.fillRect(0,0,2,256),a.fillRect(0,128,256,1),a.fillRect(128,0,1,256)});return i.wrapS=i.wrapT=Yi,i.repeat.set(e,t),i}function dr(n,e,t,i){const{tex:a}=xt(128,128,s=>{s.fillStyle=n,s.fillRect(0,0,128,128),s.fillStyle=e,s.fillRect(0,0,64,64),s.fillRect(64,64,64,64),s.fillStyle="rgba(0,0,0,0.12)",s.fillRect(0,0,128,1),s.fillRect(0,0,1,128),s.fillRect(0,64,128,1),s.fillRect(64,0,1,128),gl(s,128,128,120,.04)});return a.wrapS=a.wrapT=Yi,a.repeat.set(t,i),a}function Sr(n,e,t){const{tex:i}=xt(256,256,a=>{a.fillStyle=n,a.fillRect(0,0,256,256),gl(a,256,256,900,.035),a.fillStyle="rgba(0,0,0,0.1)";for(let s=0;s<=256;s+=128)a.fillRect(s,0,2,256),a.fillRect(0,s,256,2)});return i.wrapS=i.wrapT=Yi,i.repeat.set(e,t),i}function ss(n,e){return Sr("#aab4be",n,e)}function Sn(n,e,t,i,a,s,r=16777215,o=0){const c=new pe(new at(i,.05,a),new yn({color:r,map:s??void 0}));return c.position.set(e+i/2,.025+o,t+a/2),c.receiveShadow=!0,n.add(c),c}const WS=xt(64,4,n=>{const e=n.createLinearGradient(0,0,64,0);e.addColorStop(0,"rgba(0,0,0,0.38)"),e.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=e,n.fillRect(0,0,64,4)}).tex,qS=xt(4,64,n=>{const e=n.createLinearGradient(0,0,0,64);e.addColorStop(0,"rgba(0,0,0,0.38)"),e.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=e,n.fillRect(0,0,4,64)}).tex,XS=new Oe({map:WS,transparent:!0,depthWrite:!1}),jS=new Oe({map:qS,transparent:!0,depthWrite:!1});function ju(n,e,t,i,a){e==="w"?wt(n,1.1,a,XS,t+1.1/2+.1,.062,i+a/2,0,-Math.PI/2):wt(n,a,1.1,jS,t+a/2,.062,i+1.1/2+.1,0,-Math.PI/2)}const YS=xt(128,128,n=>{const e=n.createLinearGradient(0,0,0,128);e.addColorStop(0,"#bfe3f7"),e.addColorStop(1,"#8fc2de"),n.fillStyle=e,n.fillRect(0,0,128,128),n.fillStyle="rgba(255,255,255,0.35)",n.beginPath(),n.moveTo(20,128),n.lineTo(60,0),n.lineTo(84,0),n.lineTo(44,128),n.fill(),n.fillStyle="rgba(255,255,255,0.18)",n.beginPath(),n.moveTo(70,128),n.lineTo(100,0),n.lineTo(112,0),n.lineTo(82,128),n.fill()}).tex,vl=new Oe({map:YS});function ur(n,e){const{tex:t,ctx:i}=xt(160,90,o=>{o.fillStyle="#0f1720",o.fillRect(0,0,160,90)});n.material.map=t,n.material.color.set(16777215);let a=-1,s=null;const r=["#D9A441","#4FB3BF","#F5F5F2","#78bd6b","#E2725B"];return{update(o,c){if(!o){s!==!1&&(i.fillStyle="#12161c",i.fillRect(0,0,160,90),i.fillStyle="#2a323c",i.fillRect(60,40,40,4),t.needsUpdate=!0,s=!1,a=-1);return}const l=Math.floor(c*5);if(l!==a){a=l,s=!0,i.fillStyle="#0f1720",i.fillRect(0,0,160,90),i.fillStyle="#1b2733",i.fillRect(0,0,160,10);for(let d=0;d<9;d++){const h=d+l,u=Math.sin(h*12.9898+e)*43758.5453,f=u-Math.floor(u),v=Math.floor(f*3)*10,b=20+Math.floor(f*7%1*90);i.fillStyle=r[Math.floor(f*50)%r.length],i.fillRect(8+v,16+d*8,b,4)}l%2&&(i.fillStyle="#F5F5F2",i.fillRect(8,82,4,5)),t.needsUpdate=!0}}}}function KS(){const{tex:t,ctx:i}=xt(1280,520,()=>{}),a=new pe(new Ht(8.2,3.33),new Oe({map:t}));a.userData.board=!0;const s=[{key:"por_hacer",label:"POR HACER",color:"#9aa3ad"},{key:"en_curso",label:"EN CURSO",color:"#D9A441"},{key:"hecha",label:"HECHAS",color:"#4fb27a"}],r=o=>{var c;return((c=gn.find(l=>l.id===o))==null?void 0:c.color)??"#888"};return{mesh:a,update(o){i.fillStyle="#f7f8fa",i.fillRect(0,0,1280,520),i.fillStyle="#15151a",i.fillRect(0,0,1280,64),i.fillStyle="#D9A441",i.font="bold 34px system-ui, sans-serif",i.fillText(tt("TABLERO KANBAN"),24,44),i.fillStyle="#f5f5f2",i.font="22px system-ui, sans-serif",i.textAlign="right",i.fillText(`${o.length} ${tt("tareas")}`,1256,42),i.textAlign="left";const c=(1280-16*4)/3;s.forEach((l,d)=>{const h=16+d*(c+16),u=o.filter(f=>f.estado===l.key);i.fillStyle="#e8ebef",i.fillRect(h,80,c,424),i.fillStyle=l.color,i.fillRect(h,80,c,8),i.fillStyle="#23252b",i.font="bold 28px system-ui, sans-serif",i.fillText(`${tt(l.label)}  ${u.length}`,h+14,126),u.slice(0,5).forEach((f,v)=>{const b=144+v*70;i.fillStyle="#ffffff",i.fillRect(h+12,b,c-24,58),i.fillStyle=r(f.empresaId),i.fillRect(h+12,b,8,58),i.fillStyle="#23252b",i.font="24px system-ui, sans-serif";const m=tt(f.titulo),p=m.length>30?m.slice(0,29)+"…":m;i.fillText(p,h+32,b+36)}),u.length>5&&(i.fillStyle="#5b606a",i.font="22px system-ui, sans-serif",i.fillText(`+${u.length-5} ${tt("más")}`,h+16,502))}),t.needsUpdate=!0}}}const ZS=xt(512,512,n=>{n.translate(256,256),n.strokeStyle="#59dcff";for(const[e,t,i]of[[250,4,.9],[226,2,.5],[196,10,.55],[160,3,.8],[128,2,.45],[96,6,.5]])n.globalAlpha=i,n.lineWidth=t,n.beginPath(),n.arc(0,0,e,0,Math.PI*2),n.stroke();n.globalAlpha=.85,n.lineWidth=6;for(let e=0;e<4;e++)n.beginPath(),n.arc(0,0,178,e*1.57+.1,e*1.57+1),n.stroke();n.lineWidth=2;for(let e=0;e<72;e++)n.rotate(Math.PI/36),n.beginPath(),n.moveTo(236,0),n.lineTo(e%6?244:252,0),n.stroke()}).tex,JS=new Oe({map:ZS,transparent:!0,depthWrite:!1,blending:vs});function QS(n,e){return xt(256,256,t=>{t.strokeStyle="#59dcff",t.lineWidth=6,t.globalAlpha=.9,t.beginPath(),t.arc(128,128,112,0,Math.PI*2),t.stroke(),t.lineWidth=2,t.beginPath(),t.arc(128,128,100,0,Math.PI*2),t.stroke(),t.globalAlpha=1,Yu(t,n,128,128,120,e)}).tex}function ey(){const{tex:n,ctx:e}=xt(460,540,()=>{}),t=(s,r)=>{for(;e.measureText(s).width>r&&s.length>4;)s=s.slice(0,-2);return s},i=(s,r,o)=>{e.fillStyle="#0b0d11",e.fillRect(0,0,460,540),e.strokeStyle="#D9A441",e.lineWidth=4,e.strokeRect(8,8,444,524),e.fillStyle="#D9A441",e.font='700 26px system-ui, "Segoe UI", sans-serif',e.textAlign="left",e.fillText(tt("SOLICITUDES"),28,52),e.fillStyle="#9aa0aa",e.font='500 20px system-ui, "Segoe UI", sans-serif',e.fillText(tt("ENTRANTES · RECEPCIÓN"),28,78),e.fillStyle=r?"#3ddc84":"#5b616b",e.font='800 64px system-ui, "Segoe UI", sans-serif',e.textAlign="right",e.fillText(String(r),430,66),e.textAlign="left",e.fillStyle="rgba(217,164,65,0.35)",e.fillRect(28,96,404,2),s.length||(e.fillStyle="#6b7280",e.font='500 24px system-ui, "Segoe UI", sans-serif',e.fillText(tt("Bandeja vacía"),28,150)),s.slice(0,5).forEach((c,l)=>{const d=134+l*64;e.fillStyle=c.estado==="clasificando"?"#3ddc84":c.estado==="revisar"?"#e5484d":"#D9A441",e.beginPath(),e.arc(40,d-8,8,0,Math.PI*2),e.fill(),e.fillStyle="#f2f2ee",e.font='600 22px system-ui, "Segoe UI", sans-serif',e.fillText(t(tt(c.titulo),370),62,d),e.fillStyle="#8b919b",e.font='500 17px system-ui, "Segoe UI", sans-serif',e.fillText(tt(c.estado==="clasificando"?"Clasificando…":c.estado==="revisar"?"Por revisar · decide Felipe":"En espera"),62,d+22)}),e.fillStyle="rgba(217,164,65,0.35)",e.fillRect(28,476,404,2),e.fillStyle=o?"#e5484d":"#6b7280",e.font='600 21px system-ui, "Segoe UI", sans-serif',e.fillText(`${tt("Por revisar:")} ${o}`,28,512),n.needsUpdate=!0};i([],0,0);let a="";return{tex:n,update(s,r,o){const c=JSON.stringify([s,r,o]);c!==a&&(a=c,i(s,r,o))}}}function Yu(n,e,t,i,a,s){if(n.save(),n.translate(t,i),e==="palette")n.fillStyle="#f5f5f2",n.beginPath(),n.ellipse(0,0,a*.5,a*.42,0,0,Math.PI*2),n.fill(),n.fillStyle="#0b0b0d",n.beginPath(),n.arc(a*.22,a*.14,a*.09,0,Math.PI*2),n.fill(),["#D9A441","#4FB3BF","#E2725B","#9B7BD6"].forEach((r,o)=>{n.fillStyle=r,n.beginPath(),n.arc(-a*.28+o*a*.17,-a*.12+o%2*a*.22,a*.075,0,Math.PI*2),n.fill()});else if(e==="bars")n.fillStyle=s,[.35,.6,.9,.7].forEach((r,o)=>n.fillRect(-a*.42+o*a*.22,a*.42-a*r,a*.15,a*r));else if(e==="gear"){n.fillStyle=s;for(let r=0;r<8;r++)n.rotate(Math.PI/4),n.fillRect(-a*.07,-a*.46,a*.14,a*.2);n.beginPath(),n.arc(0,0,a*.34,0,Math.PI*2),n.fill(),n.fillStyle="#0b0b0d",n.beginPath(),n.arc(0,0,a*.14,0,Math.PI*2),n.fill()}else if(e==="chip"){n.strokeStyle=s,n.fillStyle=s,n.lineWidth=a*.06,n.strokeRect(-a*.26,-a*.26,a*.52,a*.52),n.fillRect(-a*.1,-a*.1,a*.2,a*.2);for(let r=-1;r<=1;r++)for(const[o,c]of[[0,-1],[0,1],[-1,0],[1,0]])n.fillRect(o*a*.38-(o?a*.05:a*.025)+(c?r*a*.16:0),c*a*.38-(c?a*.05:a*.025)+(o?r*a*.16:0),o?a*.1:a*.05,c?a*.1:a*.05)}else if(e==="people"){n.fillStyle=s;for(const[r,o]of[[-.3,.75],[.3,.75],[0,1]])n.beginPath(),n.arc(r*a,-a*.16*o,a*.13*o,0,Math.PI*2),n.fill(),n.beginPath(),n.ellipse(r*a,a*.22*o,a*.2*o,a*.17*o,0,Math.PI,0),n.fill()}else if(e==="azahar"){for(let r=0;r<5;r++)n.rotate(Math.PI*2/5),n.fillStyle="#ffffff",n.strokeStyle="#c9d8d8",n.lineWidth=a*.03,n.beginPath(),n.ellipse(0,-a*.26,a*.16,a*.26,0,0,Math.PI*2),n.fill(),n.stroke();n.fillStyle="#d9a441",n.beginPath(),n.arc(0,0,a*.12,0,Math.PI*2),n.fill()}n.restore()}function Si(n){const{tex:e,ctx:t}=xt(1536,360,()=>{}),i=s=>{if(t.clearRect(0,0,1536,360),t.fillStyle=n.light?"#f6efe2":"#0b0b0d",t.fillRect(0,0,1536,360),t.strokeStyle=n.accent,t.lineWidth=8,t.strokeRect(14,14,1508,332),t.strokeStyle=n.accent+"88",t.lineWidth=2,t.strokeRect(30,30,1476,300),s&&n.imageUrl){const r=Math.min(1380/s.width,290/s.height);t.drawImage(s,768-s.width*r/2,180-s.height*r/2,s.width*r,s.height*r)}else{n.icon==="owl"?s&&t.drawImage(s,70,50,340,340*(s.height/s.width)):Yu(t,n.icon,240,180,250,n.accent),t.textAlign="left",t.fillStyle=n.light?"#4a2f1d":"#f5f5f2";let r=170;for(t.font=`900 ${r}px system-ui, "Segoe UI", sans-serif`;t.measureText(tt(n.title)).width>1e3&&r>60;)r-=6,t.font=`900 ${r}px system-ui, "Segoe UI", sans-serif`;t.fillText(tt(n.title),470,190),t.fillStyle=n.accent,t.font='600 74px system-ui, "Segoe UI", sans-serif',t.fillText(tt(n.subtitle),480,290),t.fillRect(470,214,900,4)}e.needsUpdate=!0};i();const a=n.imageUrl??(n.icon==="owl"?"./brand/logo-simple.png":void 0);if(a){const s=new Image;s.onload=()=>{s.width>20&&i(s)},s.src=a}return e}function yi(n,e,t,i,a,s){const r=Mt(n).N.decor,o=s*(360/1536),c=qe.wallH-.35-o/2;z(r,s+.3,o+.32,.1,Q.black,t,c-o/2-.16,a+.17),wt(r,s,o,new Oe({map:e}),t,c,a+.27)}function Ku(n,e,t,i,a){a==="z"?z(n,.06,.16,i,3093564,e+Kn/2+.01,0,t):z(n,i,.16,.06,3093564,e,0,t+Kn/2+.01)}function Jt(n,e,t,i,a=!1){const{walls:s,decor:r}=Mt(n).W,o=i-t,c=(t+i)/2,l=qe.wallH;if(a){z(s,Kn,.9,o,Q.wall,e,0,c);const d=new pe(new at(.1,l-.9,o),en(Q.glass,.28));d.position.set(e,.9+(l-.9)/2,c),s.add(d);for(let h=t;h<=i+.01;h+=o/3)z(s,.12,l-.9,.1,2106411,e,.9,h);z(s,.2,.1,o,2106411,e,l-.06,c)}else z(s,Kn,l,o,Q.wall,e,0,c),z(s,Kn+.06,.1,o,Q.wallTop,e,l,c),Ku(s,e,c,o,"z");z(s,.06,.05,o,Q.gold,e+(a?0:Kn/2+.02),1,c),nt(e,c,.6,o+.3),ju(r,"w",e,t,o)}function Qt(n,e,t,i,a=!1,s=[]){const{walls:r,decor:o}=Mt(n).N,c=qe.wallH,l=[];let d=t;for(const[h,u]of[...s].sort((f,v)=>f[0]-v[0]))h>d&&l.push([d,h]),d=u;d<i&&l.push([d,i]);for(const[h,u]of l){const f=u-h,v=(h+u)/2;if(a){z(r,f,.9,Kn,Q.wall,v,0,e);const b=new pe(new at(f,c-.9,.1),en(Q.glass,.28));b.position.set(v,.9+(c-.9)/2,e),r.add(b);const m=f/Math.max(1,Math.round(f/3.5));for(let p=h;p<=u+.01;p+=m)z(r,.12,c-.9,.14,2106411,p,.9,e);z(r,f,.1,.2,2106411,v,c-.06,e)}else z(r,f,c,Kn,Q.wall,v,0,e),z(r,f,.1,Kn+.06,Q.wallTop,v,c,e),Ku(r,v,e,f,"x");z(r,f,.05,.06,Q.gold,v,1,e+(a?0:Kn/2+.02)),nt(v,e,f+.3,.6),ju(o,"n",h,e,f)}}function On(n,e,t,i=2.2,a=1.7,s=1.6){const r=Mt(n).N.decor,o=z(r,i+.2,a+.2,.05,2106411,e,s-.1,t+.17);o.castShadow=!1,wt(r,i,a,vl,e,s+a/2,t+.205),z(r,.06,a,.06,2106411,e,s,t+.23),z(r,i+.3,.06,.22,2106411,e,s-.14,t+.24)}function ty(n,e,t,i=2.2,a=1.7,s=1.6){const r=Mt(n).W.decor,o=z(r,.05,a+.2,i+.2,2106411,e+.17,s-.1,t);o.castShadow=!1,wt(r,i,a,vl,e+.205,s+a/2,t,Math.PI/2),z(r,.06,a,.06,2106411,e+.23,s,t),z(r,.22,.06,i+.3,2106411,e+.24,s-.14,t)}const Bo=(...n)=>{};function Kd(n,e,t,i){const a=t-e,s=(e+t)/2;z(n,a,.5,.2,Q.wall,s,0,i);const r=new pe(new at(a,3.4,.08),en(Q.glass,.2));r.position.set(s,2.2,i),n.add(r);for(let o=e;o<=t+.01;o+=a/Math.max(1,Math.round(a/3.2)))z(n,.1,3.4,.12,2106411,o,.5,i);z(n,a,.1,.16,2106411,s,3.9,i),nt(s,i,a,.5)}function ny(n,e,t,i,a){z(n,i,.9,a,3752267,e,0,t),z(n,i*.9,.3,a*.9,5858159,e,.9,t),nt(e,t,i+.1,a+.1)}function qt(n,e,t,i,a,s=6){const{tex:r}=xt(512,96,c=>{let l=44;for(c.font=`bold ${l}px system-ui, sans-serif`;c.measureText(tt(e).toUpperCase()).width>480&&l>16;)l-=2,c.font=`bold ${l}px system-ui, sans-serif`;c.fillStyle=t,c.globalAlpha=.9,c.textAlign="center",c.fillText(tt(e).toUpperCase(),256,62)}),o=new Oe({map:r,transparent:!0,depthWrite:!1});wt(n,s,s*96/512,o,i,.075,a,0,-Math.PI/2)}function hr(n,e,t,i,a,s,r,o){const{tex:c}=xt(256,192,d=>{d.fillStyle=["#f7f1e3","#ece7f4","#e5f1f0"][o%3],d.fillRect(0,0,256,192);const h=["#D9A441","#4FB3BF","#E2725B","#2a2a2e","#9B7BD6"];for(let u=0;u<5;u++)d.fillStyle=h[(u+o)%h.length],d.beginPath(),(u+o)%2?d.arc(50+u*38,70+(u*37+o*11)%60,26+(u+o)%3*8,0,7):d.rect(30+u*40,40+(u*53+o*7)%80,44,44),d.fill()}),l=Vt(n,e,i,a,t);z(l,s+.14,r+.14,.06,Q.black,0,-r/2-.07,0),wt(l,s,r,new Oe({map:c}),0,0,.04)}function iy(){const n=new pt,e={},t=Yd(n);ko(0);const i=qe.x1-qe.x0,a=qe.z1-qe.z0,s=new pe(new at(i,.9,a),en(2763312));s.position.set(qe.x0+i/2,-.45,qe.z0+a/2),s.receiveShadow=!0,n.add(s);const r=60.1,o=Sn(n,qe.x0,qe.z0,i,r,Sr("#d9d3c6",i/8,r/8));o.position.y=-.005;const c=Sn(n,qe.x0,58.6,i,2.8,Sr("#cfcac0",i/4,1));c.position.y=0,z(n,i,.22,.25,12433580,qe.x0+i/2,-.02,61.5);const l=Sn(n,qe.x0,61.4,i,4.1,Sr("#aeb8c2",i/5,1));l.position.y=-.03,z(n,i+.4,.1,.2,Q.gold,qe.x0+i/2,-.1,qe.z1+.05),z(n,.2,.1,a+.4,Q.gold,qe.x1+.05,-.1,qe.z0+a/2);const d=(g,P,C)=>{const B=H=>Math.round((g>>H&255)*(1-C)+(P>>H&255)*C);return"#"+[16,8,0].map(H=>B(H).toString(16).padStart(2,"0")).join("")},h=(g,P="")=>{const C=g.id?Ue[g.id]:void 0,B=C?parseInt(C.color.slice(1),16):0,H=Sn(n,g.x,g.z,g.w,g.d,dr(C?d(4870234,B,.3):"#4a505a",C?d(5396835,B,.3):"#525963",g.w/4,g.d/4));return C&&(z(n,g.w-.6,.03,.14,B,g.x+g.w/2,.05,g.z+g.d-.35),z(n,.14,.03,g.d-.6,B,g.x+.35,.05,g.z+g.d/2),z(n,.14,.03,g.d-.6,B,g.x+g.w-.35,.05,g.z+g.d/2)),H},u=(g,P)=>Sn(n,g.x,g.z,g.w,g.d,dr("#454b55","#4b525c",g.w/4,g.d/4)),f=Si({title:"METIS",subtitle:"N E X A   I N C.",accent:"#D9A441",icon:"owl"}),v=Si({title:"DISEÑO",subtitle:"G R Á F I C O",accent:Ue.diseno.color,icon:"palette"}),b=Si({title:"AZAHAR",subtitle:"C O F F E E",accent:"#3aa0ad",icon:"azahar",light:!0,imageUrl:"./brand/azahar.jpeg"}),m=Si({title:"TECNOLOGÍA",subtitle:"Á R E A",accent:Ue.tecnologia.color,icon:"chip"}),p=Si({title:"RECURSOS",subtitle:"H U M A N O S",accent:Ue.rrhh.color,icon:"people"}),E=Si({title:"FINANCIERA",subtitle:"Á R E A",accent:Ue.financiera.color,icon:"bars"}),S=Si({title:"OPERACIONES",subtitle:"Y   C L I E N T E S",accent:Ue.operaciones.color,icon:"gear"}),w=xt(1100,230,g=>{g.fillStyle="#16161c",g.beginPath(),g.roundRect(6,6,1088,218,28),g.fill(),g.strokeStyle=Ue.diseno.color,g.lineWidth=10,g.stroke(),g.fillStyle="#f5f5f2",g.textAlign="center",g.font='800 82px system-ui, "Segoe UI", sans-serif',g.fillText(tt("ÁREA DE DISEÑO GRÁFICO"),550,145)}).tex,L=new Oe({map:w,transparent:!0}),R=new Oe({map:b,transparent:!0}),T=new yn({color:2303790}),D=new yn({color:parseInt(Ue.diseno.color.slice(1),16)}),j=new yn({color:3842221});function _(g,P,C){Object.values(ft).filter(B=>B.id.startsWith(P+"-")&&B.id!==P+"-0").forEach((B,H)=>{const J=Gd(g,B.id,B.x,B.z,un[H%un.length]);if(e[B.id]=ur(J,H*3.7+P.length*1.3),C){const ie=Vt(g,B.x-.82,B.z),ye=new pe(Fr,T);ye.scale.set(.08,1.35,2.3),ye.position.y=.675,ye.castShadow=!0,ie.add(ye);const Ce=new pe(Fr,C==="design"?D:j);if(Ce.scale.set(.12,.08,2.34),Ce.position.y=1.36,ie.add(Ce),C==="design"){const me=new pe(new Ht(2.1,.44),L);me.rotation.y=Math.PI/2,me.position.set(.05,.98,0),ie.add(me)}else{const me=new pe(new Ht(1.9,.46),R);me.rotation.y=Math.PI/2,me.position.set(.05,.9,0),ie.add(me)}}})}function y(g,P,C=Q.leather){const B=ft[P];Vd(g,P,B.x,B.z,C)}const G=ey();let W=()=>{};const Z=[];let te,X;{const g=Dt("ceo");u(g),Jt(n,g.x,g.z,g.z+g.d,!0),Qt(n,g.z,g.x,g.x+g.w,!0),sn(n,6,5.6,7,5,3881794);{const C=Vt(n,0,0);z(C,3.4,.07,1.1,Q.walnut,5.5,.8,4.8),z(C,1.1,.07,2.3,Q.walnut,3.95,.8,6.35),z(C,3.4,.05,.05,Q.gold,5.5,.78,5.33);for(const[H,J]of[[3.85,4.35],[7.1,4.35],[7.1,5.2],[3.5,7.4],[4.4,7.4]])z(C,.06,.8,.06,Q.steel,H,0,J);nt(5.5,4.8,3.4,1.1),nt(3.95,6.35,1.1,2.3),z(C,.42,.02,.3,14540253,5.6,.87,4.95),z(C,.42,.28,.02,2236966,5.6,.88,4.82),z(C,.22,.02,.4,2764083,6.5,.87,4.8),z(C,.12,.2,.18,Q.black,3.85,.87,6.4),z(C,.05,.42,.68,Q.black,3.85,1,6.4);const B=new pe(new Ht(.6,.35),new Oe({color:988960}));B.rotation.y=Math.PI/2,B.position.set(3.88,1.2,6.4),C.add(B),X=B,Gt(C,.06,.1,16777215,6.9,.87,4.6),It(n,ft.ceo.seat.x,ft.ceo.seat.z+.1,0,Q.leather,!0),It(n,5.5,6.6,Math.PI,13211962)}or(n,2.2,2.6);{const{tex:C}=xt(512,300,B=>{B.fillStyle="#fff",B.fillRect(0,0,512,300),[60,110,150,120,90,160,200,230].forEach((J,ie)=>{B.fillStyle=ie%3===0?"#D9A441":ie%3===1?"#5d7aa8":"#6fb1b8",B.fillRect(40+ie*56,260-J,36,J)}),B.fillStyle="#cdd2d8",B.fillRect(20,262,470,3),B.fillStyle="#22262c",B.font="bold 26px system-ui",B.fillText(tt("Resumen del campus"),30,38)});wt(n,4.6,2.7,new Oe({map:C}),9.4,2.35,g.z+.28),z(n,4.8,.08,.1,9076586,9.4,3.72,g.z+.3)}Ea(n,g.x+1,9.4,Math.PI/2,2.4),Ve(n,12.6,1.4,1.3),Ve(n,g.x+1.2,1.3,1),qn(n,11.4,9.3,Math.PI,2,3750207),an(n,11.4,7.5,1.6,.9,Q.black,.4);const P=new Oo().load("./brand/logo-simple.png");P.colorSpace=Xt,z(n,.06,1.3,1.9,Q.black,g.x+.2,2.2,8.2),wt(n,1.7,1.12,new Oe({map:P}),g.x+.25,2.85,8.2,Math.PI/2),sn(n,-10,5.8,10,6,2894899),an(n,-10,5.8,6.6,2.2,Q.white,.78),z(n,6.6,.03,.12,Q.gold,-10,.86,5.8);for(let C=0;C<4;C++)It(n,-12.4+C*1.6,3.8,0,un[C%6]),It(n,-12.4+C*1.6,7.8,Math.PI,un[(C+2)%6]);It(n,-14.4,5.8,Math.PI/2,Q.gold),It(n,-5.6,5.8,-Math.PI/2,Q.gold),qn(n,-16.5,10.6,Math.PI,3.2,3750207),qn(n,-2.6,10.6,Math.PI,3.2,3750207),an(n,-16.5,8.8,1.8,.9,Q.black,.4),an(n,-2.6,8.8,1.8,.9,Q.black,.4),Ea(n,-17,.7,0,2.6,2.4),Ea(n,-13.5,.7,0,2.6,2.4),Ea(n,-4.5,.7,0,2.6,2.4),Ve(n,g.x+1.3,10.8,1.3),Ve(n,-.8,1.4,1.3),Ve(n,-.9,11,1.2),or(n,-9.6,10.7),qt(n,"Despacho · CEO","#d9c9a0",7,11.2,5),e.ceo=ur(X,1)}{const g=Dt("tecnologia");h(g,"#575a60"),Jt(n,g.x,g.z,g.z+g.d),Qt(n,g.z,g.x,g.x+g.w),sn(n,26.5,6.2,11.5,10,2894899),yi(n,m,26,3.45,g.z,10),y(n,"tec-0"),_(n,"tec"),z(n,g.w-1,.03,.35,parseInt(Ue.tecnologia.color.slice(1),16),g.x+g.w/2,.04,g.z+g.d-.7),qt(n,"Área de Tecnología",Ue.tecnologia.color,g.x+g.w/2,g.z+g.d-1.5,8),xi(Mt(n).W.decor,16.2,3,8.8,Math.PI/2),cr(n,34.7,3.4,Math.PI/2),as(n,34.9,6.2),lr(n,35.4,9,Math.PI/2),Ve(n,17.4,1.3,1.1),Ve(n,17.4,10.7,1.1),Ve(n,35.2,1.2,1.2)}{const g=Dt("diseno");h(g,"#6a615a"),Jt(n,g.x,g.z,g.z+g.d),Qt(n,g.z,g.x,g.x+g.w),sn(n,45.5,6.2,10,9.5,4867664),yi(n,v,45,3.3,g.z,10),y(n,"dis-0"),_(n,"dis","design");const P=an(n,50.5,8.3,1.3,2.6,Q.white,.85),C=z(P,1.1,.06,2.4,15920610,0,.9,0);C.rotation.z=.18;{const B=Vt(n,50.6,5,-.3);z(B,.08,2.2,.08,Q.wood,-.6,0,0),z(B,.08,2.2,.08,Q.wood,.6,0,0),hr(B,0,1.55,.07,0,1.3,1,2),z(B,1.5,.05,.12,Q.wood,0,.8,.05),nt(50.6,5,1.6,1)}Ea(n,38.7,10,Math.PI/2,2.2,2.2),Ve(n,51,11,1.2),Ve(n,39.2,1.5,1),xi(Mt(n).W.decor,38.2,3,5,Math.PI/2),qt(n,"Diseño Gráfico","#c9b3f0",45,11.3,6),z(n,g.w-1,.03,.35,parseInt(Ue.diseno.color.slice(1),16),g.x+g.w/2,.04,g.z+g.d-.7)}{const g=Dt("financiera");h(g,"#5f5955"),Jt(n,g.x,g.z,g.z+g.d),Qt(n,g.z,g.x,g.x+g.w),sn(n,8.5,21.8,14,11,2894899),yi(n,E,10,3.3,g.z,8),y(n,"fin-0"),_(n,"fin"),z(n,g.w-1,.03,.35,parseInt(Ue.financiera.color.slice(1),16),g.x+g.w/2,.04,g.z+g.d-.7),qt(n,"Área Financiera",Ue.financiera.color,g.x+g.w/2,g.z+g.d-1.5,8),xi(Mt(n).W.decor,.2,3,25.5,Math.PI/2),lr(n,1.2,26.8,Math.PI/2),as(n,18.6,16.4),cr(n,18.4,26.2,Math.PI/2),Ve(n,g.x+g.w-1,g.z+1,1.3),Ve(n,g.x+1,g.z+g.d-1,1),On(n,3.5,g.z,2),On(n,16.5,g.z,2)}const ne=KS();{const g=Dt("reuniones");u(g),Jt(n,g.x,g.z,g.z+g.d),Qt(n,g.z,g.x,g.x+g.w),sn(n,33.5,21.5,12,7,2894899),an(n,33.5,21.5,8.6,2.6,Q.white,.78),z(n,8.6,.03,.12,Q.gold,33.5,.86,21.5);{const B=new pt;B.position.set(-2,0,4.6),B.userData.hub=!0;const H=(k,de=1)=>new Oe({color:k,transparent:de<1,opacity:de,depthWrite:de>=1,blending:de<1?vs:qi}),J=new pe(new Vn(1.7,1.8,.22,36),new yn({color:1316636}));J.position.y=.11;const ie=new pe(new Ta(1.62,.05,6,48),H(14263361));ie.rotation.x=Math.PI/2,ie.position.y=.24;const ye=new pe(new Ta(1.25,.03,6,48),H(5889279,.8));ye.rotation.x=Math.PI/2,ye.position.y=.25;const Ce=new pe(new Vn(.28,.4,.8,16),new yn({color:2106668}));Ce.position.y=.62;const me=new pt;me.position.set(.5,1.05,.5),me.rotation.set(-.35,Math.PI/4,0);const I=new pe(new at(1.5,.07,.95),new yn({color:790034})),De=xt(384,240,k=>{k.fillStyle="#06141b",k.fillRect(0,0,384,240),k.strokeStyle="#59dcff",k.lineWidth=4,k.strokeRect(6,6,372,228),k.fillStyle="#59dcff",k.font="700 30px system-ui, sans-serif",k.fillText(tt("CENTRO DE MANDO"),22,52),k.fillStyle="#d9a441";for(let de=0;de<8;de++)k.fillRect(24+de*42,200-(30+de*53%90),30,30+de*53%90);k.fillStyle="#3ddc84",k.beginPath(),k.arc(350,36,8,0,7),k.fill()}).tex,Te=new pe(new Ht(1.35,.84),new Oe({map:De}));Te.rotation.x=-Math.PI/2,Te.position.y=.045,me.add(I,Te);const ze=new pt;ze.position.y=2.55;const he=new pe(new dl(.85,2),new Oe({color:5889279,wireframe:!0,transparent:!0,opacity:.85})),Ye=new pe(new Wn(.42,20,14),H(10217471,.55)),Ne=new pe(new Wn(1.05,20,14),H(5889279,.12)),A=new pe(new Ta(1.2,.025,6,64),H(14263361));A.rotation.x=Math.PI/2.4;const x=new pe(new Ta(1,.02,6,64),H(5889279));x.rotation.set(Math.PI/2.4,0,1.1),ze.add(he,Ye,Ne,A,x);const V=new pe(new Vn(.18,.55,1.1,20,1,!0),H(5889279,.22));V.position.y=1.15;const ee=[],se=(k,de,ue,Me)=>{const Ze=xt(256,160,ge=>{ge.fillStyle="rgba(6,20,27,0.88)",ge.fillRect(0,0,256,160),ge.strokeStyle="#59dcff",ge.lineWidth=3,ge.strokeRect(3,3,250,154),k(ge)}).tex,re=new pe(new Ht(1.25,.78),new Oe({map:Ze,transparent:!0,side:jn,depthWrite:!1}));return re.position.set(de,ue,Me),re.rotation.y=Math.PI/4,ee.push(re),re};se(k=>{k.fillStyle="#59dcff",k.font="700 20px system-ui",k.fillText(tt("AGENTES"),14,30);for(let de=0;de<7;de++)k.fillStyle=de%2?"#d9a441":"#59dcff",k.fillRect(18+de*32,140-(20+de*37%70),22,20+de*37%70)},-1.9,2.2,.5),se(k=>{k.fillStyle="#59dcff",k.font="700 20px system-ui",k.fillText(tt("TAREAS"),14,30),k.strokeStyle="#3ddc84",k.lineWidth=4,k.beginPath(),[110,90,100,60,75,40,52].forEach((de,ue)=>ue?k.lineTo(18+ue*36,de+10):k.moveTo(18,de+10)),k.stroke()},-1.1,2.75,-1.4),se(k=>{k.fillStyle="#3ddc84",k.beginPath(),k.arc(34,44,10,0,7),k.fill(),k.fillStyle="#f2f2ee",k.font="700 28px system-ui",k.fillText(tt("EN LÍNEA"),56,54),k.fillStyle="#59dcff",k.font="500 18px system-ui",k.fillText("Metis Nexa Inc.",20,110)},.9,2.2,-1.9),B.add(J,ie,ye,Ce,me,V,ze,...ee);for(const k of B.children)k.userData.hub=!0,k.traverse(de=>de.userData.hub=!0);n.add(B),nt(-2,4.6,3.4,3.4),W=k=>{he.rotation.y=k*.5,he.rotation.x=k*.2,A.rotation.z=k*.9,x.rotation.z=1.1-k*.7,Ye.scale.setScalar(1+Math.sin(k*2.4)*.1),ze.position.y=2.55+Math.sin(k*1.4)*.1,ee.forEach((de,ue)=>de.position.y+=Math.sin(k*1.3+ue*2)*.0015),ye.rotation.z=k*.4},te=B}for(let P=0;P<4;P++)It(n,30.4+P*2.2,19.4,0,un[P%6]),It(n,30.4+P*2.2,23.6,Math.PI,un[(P+2)%6]);It(n,28.4,21.5,Math.PI/2,Q.gold),It(n,38.6,21.5,-Math.PI/2,Q.gold),ne.mesh.rotation.y=Math.PI/2,ne.mesh.position.set(g.x+.3,2.35,21),Mt(n).W.decor.add(ne.mesh),z(Mt(n).W.decor,.08,3.5,8.4,2829105,g.x+.17,.65,21),yi(n,f,33,3.3,g.z,7),hr(Mt(n).N.decor,40,2.9,g.z+.2,0,2.2,1.5,4),lr(n,42.6,16.2,0,2.4),Ve(n,42.8,26.6,1.2),Ve(n,23.2,16.2,1),xi(Mt(n).W.decor,43.7,3,21.5,-Math.PI/2),qt(n,"Sala de reuniones","#cfc6b6",33,27,6),On(n,25.5,g.z,1.6),On(n,42,g.z,1.6)}{const g=Dt("operaciones");h(g,"#615a56"),Jt(n,g.x,g.z,g.z+g.d),Qt(n,g.z,g.x,g.x+g.w),sn(n,56,21.5,15,11.5,2894899),yi(n,S,55,3.3,g.z,8),y(n,"ops-0"),_(n,"ops"),z(n,g.w-1,.03,.35,parseInt(Ue.operaciones.color.slice(1),16),g.x+g.w/2,.04,g.z+g.d-.7),qt(n,"Operaciones y Clientes",Ue.operaciones.color,g.x+g.w/2,g.z+g.d-1.5,8),xi(Mt(n).W.decor,46.2,3,25.5,Math.PI/2),as(n,63,16.6),cr(n,62.9,26.7,Math.PI/2),Ve(n,g.x+g.w-1,g.z+1,1.3),Ve(n,g.x+1,g.z+g.d-1,1),On(n,49,g.z,1.8),On(n,61,g.z,1.8)}{const g=Dt("salon");u(g),Jt(n,g.x,g.z,g.z+g.d),Qt(n,g.z,g.x,g.x+g.w),sn(n,9,36,11,6,3100511),sn(n,9,36,10,5,3957365);const P=xt(512,288,C=>{const B=C.createLinearGradient(0,0,512,288);B.addColorStop(0,"#0b0b0d"),B.addColorStop(1,"#1d1d25"),C.fillStyle=B,C.fillRect(0,0,512,288),C.fillStyle="#D9A441",C.font="bold 44px system-ui",C.textAlign="center",C.fillText("METIS NEXA",256,150),C.font="28px system-ui",C.fillStyle="#f5f5f2",C.fillText(tt("Salón de descanso"),256,196)});z(n,4.3,2.5,.12,Q.black,11,1.2,g.z+.3),wt(Mt(n).N.decor,4.1,2.3,new Oe({map:P.tex}),11,2.35,g.z+.37),z(n,4.6,.7,.5,Q.white,11,0,g.z+.5),qn(n,11,37.6,Math.PI,3),an(n,11,34.6,2.4,1.1,Q.black,.42),qn(n,1.2,38,Math.PI/2,3,8022614),an(n,15.7,38,.9,.9,Q.wood,1),an(n,14.4,41.4,.9,.9,Q.wood,1),$d(n,5.6,34,.4,8022614),Ve(n,1.4,32.4,1.4),Ve(n,18.8,32.5,1.3),Ve(n,18.8,43,1.1),Ve(n,1.4,43,1.2),Ea(n,17.4,31.6,0,2.4,2.4),or(n,3.4,33.2),hr(Mt(n).N.decor,5,2.6,g.z+.2,0,1.8,1.3,1),qt(n,"Salón","#e8d6b0",10,42.8,4),On(n,4.5,g.z,2),ty(n,g.x,33.8,1.8)}{const g=Dt("cocina");Sn(n,g.x,g.z,g.w,g.d,dr("#ebe8e0","#d4d0c4",g.w/2.5,g.d/2.5)),Jt(n,g.x,g.z,g.z+g.d),Qt(n,g.z,g.x,g.x+g.w),z(n,11.5,.95,.95,15856630,22.8,0,31.8),z(n,11.6,.07,1.05,Q.wood,28.6,.95,31.8),nt(28.5,31.8,11.8,1),z(n,.7,.85,.55,Q.black,27.1,1.02,31.9),z(n,.7,.1,.55,Q.gold,27.1,1.87,31.9),z(n,.5,.05,.2,5592416,27.1,1.1,32.25),Gt(n,.07,.12,16777215,27.1,1.02,32.3),z(n,1.1,.04,.6,11450047,31.6,1.02,31.8),Gt(n,.03,.35,10134445,31.6,1.02,31.5),z(n,7.5,.08,.35,Q.wood,28.5,2.4,31.5);for(let P=0;P<7;P++)Gt(n,.07,.14,[16777215,14263361,5223359][P%3],25.2+P*1,2.48,31.5);z(n,1.1,2.3,1,15330801,36.2,0,31.8),z(n,.06,.8,.06,9081500,35.6,1,32.3),nt(36.2,31.8,1.2,1.1),an(n,32,38.1,9.6,2,Q.white,.8),z(n,9.6,.03,.1,Q.gold,32,.9,38.1),Ss.filter(P=>P.zone==="cocina"&&P.sit).forEach((P,C)=>It(n,P.x,P.z+(P.heading===0?-.1:.1),P.heading,[15185995,7319992,3817287][C%3]));for(const P of[29.5,32,34.5])Gt(n,.015,1.4,Q.steel,P,2.8,38.1),Gt(n,.4,.3,16771512,P,2.5,38.1,.12);Ve(n,22.9,43,1.3),Ve(n,41,43,1.2),Ve(n,41,32.3,1.2),xi(Mt(n).N.decor,38,3,31.2,0),qt(n,"Cocina-comedor","#8a8579",31,42.8,6),On(n,24,g.z,1.6),On(n,39.5,g.z,1.6)}{const g=Dt("capacitacion");h(g),Jt(n,g.x,g.z,g.z+g.d),Qt(n,g.z,g.x,g.x+g.w);const{tex:P}=xt(1024,360,C=>{C.fillStyle="#0b0d11",C.fillRect(0,0,1024,360),C.strokeStyle="#59dcff",C.lineWidth=6,C.strokeRect(10,10,1004,340),C.fillStyle="#f2f2ee",C.font='800 70px system-ui, "Segoe UI", sans-serif',C.textAlign="center",C.fillText(tt("SALA DE CAPACITACIÓN"),512,150),C.fillStyle="#59dcff",C.font='500 40px system-ui, "Segoe UI", sans-serif',C.fillText(tt("Aprender · Practicar · Crecer"),512,230)});wt(Mt(n).N.decor,9,3.2,new Oe({map:P}),g.x+g.w/2,2.3,g.z+.3);for(let C=0;C<3;C++)for(let B=0;B<4;B++){const H=g.x+4+B*4,J=g.z+5.6+C*2.8;z(n,2.4,.06,.9,Q.desk,H,.74,J),z(n,.05,.74,.05,Q.steel,H-1.1,0,J),z(n,.05,.74,.05,Q.steel,H+1.1,0,J),z(n,.5,.03,.34,2764083,H,.8,J+.05),z(n,.5,.3,.02,2764083,H,.83,J-.12),It(n,H,J+.95,Math.PI,un[(C+B)%6]),nt(H,J+.3,2.5,1.7)}z(n,.6,1,1.9,Q.walnut,g.x+g.w/2,0,g.z+2.4),Ve(n,g.x+1.2,g.z+1.3,1.2),Ve(n,g.x+g.w-1.2,g.z+1.3,1.2),qt(n,"Sala de capacitación","#cfc6b6",g.x+g.w/2,g.z+g.d-.9,7)}{const g=Dt("colaboracion");h(g),Jt(n,g.x,g.z,g.z+g.d),Qt(n,g.z,g.x,g.x+g.w);const{tex:P}=xt(512,300,C=>{C.fillStyle="#f4f6f8",C.fillRect(0,0,512,300),C.fillStyle="#1b1f26",C.font="bold 30px system-ui",C.fillText(tt("Ideas y proyectos"),24,44);const B=["#f6d36b","#8fd3e8","#f2a19a","#b9a5e8","#9ad9a8"];for(let H=0;H<10;H++){C.save(),C.translate(30+H%5*96,80+Math.floor(H/5)*100),C.rotate(H*37%9*.012-.04),C.fillStyle=B[H%5],C.fillRect(0,0,84,84),C.fillStyle="rgba(0,0,0,0.25)";for(let J=0;J<3;J++)C.fillRect(10,18+J*18,56-J*10,4);C.restore()}});wt(Mt(n).N.decor,5.6,3.3,new Oe({map:P}),g.x+g.w/2,2.3,g.z+.3),sn(n,g.x+6,g.z+6.4,10,8.4,2894899);for(const C of[4.6,8.8]){an(n,g.x+6,C,4.2,1.5,Q.white,.78);for(let B=0;B<3;B++)It(n,g.x+4.8+B*1.2,C-1.15,0,un[B%6]),It(n,g.x+4.8+B*1.2,C+1.15,Math.PI,un[(B+3)%6])}qn(n,g.x+10.6,6.6,-Math.PI/2,2.6,3750207),Ve(n,g.x+1.2,1.3,1.2),Ve(n,g.x+10.8,1.3,1.2),qt(n,"Sala de colaboración","#cfc6b6",g.x+g.w/2,g.z+g.d-.9,6)}{const g=Dt("recepcion");Sn(n,g.x,g.z,g.w,g.d+2.6,dr("#e9e7e1","#dedbd2",g.w/3,(g.d+2.6)/3)),Jt(n,g.x,g.z,g.z+g.d),Qt(n,g.z,g.x,g.x+g.w,!0,[[30,34]]),z(n,.18,3.2,.3,16120059,30,0,g.z),z(n,.18,3.2,.3,16120059,34,0,g.z),z(n,4.18,.18,.3,16120059,32,3.2,g.z);const P=g.z+g.d,C=(H,J)=>{const ie=J-H,ye=(H+J)/2;z(n,ie,.5,.2,Q.wall,ye,0,P);const Ce=new pe(new at(ie,3.4,.08),en(Q.glass,.2));Ce.position.set(ye,.5+1.7,P),n.add(Ce);const me=ie/Math.max(1,Math.round(ie/3.2));for(let I=H;I<=J+.01;I+=me)z(n,.1,3.4,.12,16120059,I,.5,P);z(n,ie,.12,.16,16120059,ye,3.9,P),nt(ye,P,ie,.5)};C(g.x,30.5),C(33.5,g.x+g.w);const B=g.x+g.w;{const H=g.d,J=g.z+H/2;z(n,.2,.5,H,Q.wall,B,0,J);const ie=new pe(new at(.08,3.4,H),en(Q.glass,.2));ie.position.set(B,2.2,J),n.add(ie);for(let ye=g.z;ye<=P+.01;ye+=H/4)z(n,.12,3.4,.1,16120059,B,.5,ye);z(n,.16,.12,H,16120059,B,3.9,J),nt(B,J,.5,H)}z(n,.16,3.4,.16,Q.gold,30.5,0,P),z(n,.16,3.4,.16,Q.gold,33.5,0,P),z(n,3.16,.16,.16,Q.gold,32,3.4,P);for(const H of[-.4,.4]){const J=z(n,.05,.9,.05,14342874,32+H,1,P+.06);J.castShadow=!1}{const{tex:H}=xt(256,128,J=>{J.fillStyle="#17171b",J.fillRect(0,0,256,128),J.strokeStyle="#D9A441",J.lineWidth=6,J.strokeRect(6,6,244,116),J.fillStyle="#f5f5f2",J.font="bold 34px system-ui",J.textAlign="center",J.fillText(tt("BIENVENIDOS"),128,76)});wt(n,3.2,1.6,new Oe({map:H}),32,.075,P+.9,0,-Math.PI/2)}{z(n,7.2,1.05,.9,16054009,32,0,51.9),z(n,7.5,.06,1.15,Q.black,32,1.05,51.9),z(n,7.2,.04,.04,Q.gold,32,.72,51.9+.47),z(n,7.2,.04,.04,Q.gold,32,.12,51.9+.47);const J=new Oo().load("./brand/logo-simple.png");J.colorSpace=Xt,wt(n,1,.68,new Oe({map:J,transparent:!0}),32,.4,51.9+.475),nt(32,51.9,7.6,1.3),["rec-1","rec-2"].forEach((me,I)=>{const De=ft[me];z(n,1.9,.06,.7,16054009,De.x,.75,De.z);for(const ze of[-.85,.85])z(n,.05,.75,.6,Q.steel,De.x+ze,0,De.z);z(n,.7,.4,.05,Q.black,De.x,.93,De.z+.12),z(n,.05,.18,.05,Q.black,De.x,.81,De.z+.12),z(n,.5,.02,.18,2764083,De.x,.81,De.z-.12);const Te=new pe(new Ht(.62,.34),new Oe({color:988960}));Te.rotation.y=Math.PI,Te.position.set(De.x,1.13,De.z+.092),Te.userData.deskId=me,n.add(Te),e[me]=ur(Te,9.1+I*2.3),It(n,De.x,De.seat.z,0,un[I],!1)}),nt(32,Dr+.75,4.4,.8);const ie=Mt(n).N;z(ie.walls,9.8,4.2,.2,1316378,32,0,49.1),z(ie.walls,9.8,.06,.24,Q.gold,32,4.2,49.1);const ye=8.6,Ce=ye*(360/1536);z(ie.decor,ye+.3,Ce+.3,.06,Q.gold,32,2.55-Ce/2-.15,49.22),wt(ie.decor,ye,Ce,new Oe({map:f}),32,2.55,49.27),nt(32,49.1,9.9,.4),z(n,.1,1,.1,Q.steel,39.4,0,51.4),z(n,2,2.4,.1,Q.black,39.4,.95,51.4),wt(n,1.84,2.24,new Oe({map:G.tex}),39.4,2.15,51.46),nt(39.4,51.4,2.1,.5)}qn(n,21.6,53.2,Math.PI/2,3,3750207),an(n,24.6,53.2,1,2,Q.black,.42),$d(n,26.6,56.6,Math.PI,3750207),sn(n,24.4,53.2,4.6,5.2,3881794),Ve(n,21.4,48.2,1.4),Ve(n,43.2,48.2,1.4),Ve(n,21.4,57.2,1.2),Ve(n,43.2,57,1.2),an(n,37.8,50.6,.9,.9,Q.wood,1),or(n,27.5,50),xi(Mt(n).W.decor,20.2,3,51,Math.PI/2),hr(Mt(n).W.decor,20.2,2.4,55.2,Math.PI/2,1.8,1.2,3),qt(n,"Recepción","#cfc6b6",40.5,56.8,4);for(const H of[8,14])ny(n,H,52,4.4,.8);Sn(n,-21,46.5,41,12,ss(8,2.4),16777215,.002),Sn(n,44,46.5,2,12,ss(1,2.4),16777215,.002),Sn(n,64,46.5,3.5,12,ss(1,2.4),16777215,.002),[[6,55],[16,55.5],[65.4,52]].forEach(([H,J])=>Bo(n,H,J,1.1));for(const H of[16,48,4,60])C_(n,H,59.4);for(const H of[10,40,58])Bo(n,H,60.2,.7);{const H=Ur;Nr.forEach((J,ie)=>{z(n,3.2,.2,2.5,Q.black,J,0,H);const ye=new pe(new at(3,3.5,.06),en(Q.glass,.3));ye.position.set(J,2,H+1.15),n.add(ye);for(const De of[-1.5,1.5]){const Te=new pe(new at(.06,3.5,2.3),en(Q.glass,.3));Te.position.set(J+De,2,H),n.add(Te);for(const ze of[-1.15,1.15])z(n,.14,3.7,.14,15856630,J+De,.1,H+ze)}z(n,3.3,.28,2.6,15856630,J,3.8,H),z(n,3,.07,.07,5889279,J,3.7,H-1.18),z(n,2.6,.03,1.8,5889279,J,.2,H,.35);const Ce=xt(128,96,De=>{De.fillStyle="#06141b",De.fillRect(0,0,128,96),De.strokeStyle="#59dcff",De.lineWidth=5,De.strokeRect(3,3,122,90),De.fillStyle="#59dcff",De.font="800 64px system-ui, sans-serif",De.textAlign="center",De.fillText(String(ie+1),64,70)}).tex;wt(n,.7,.52,new Oe({map:Ce}),J,3.35,H-1.19,Math.PI);const me=new yn({color:13620957,emissive:1713712}),I=De=>{const Te=new pe(new at(1.1,2.7,.06),me);return Te.position.set(J+De,1.5,H-1.15),Te.castShadow=!0,n.add(Te),Te};Z.push({ex:J,l:I(-.55),r:I(.55)})}),nt(32,H,11.4,2.6),qt(n,"Ascensores","#9be7ff",32,61.7,5)}{const H=Vt(n,0,0);z(H,4.4,1.9,.45,Q.black,40.4,0,59.2),z(H,4.5,.08,.5,Q.gold,40.4,1.9,59.2);const J=new Oo().load("./brand/logo-secundario.png");J.colorSpace=Xt,wt(H,3.9,1.1,new Oe({map:J}),40.4,.95,59.46)}}{const g=Dt("rrhh");h(g,"#454b53"),Jt(n,g.x,g.z,g.z+g.d,!0),Qt(n,g.z,g.x,g.x+g.w),yi(n,p,55,3.4,g.z,9),sn(n,53.5,52.6,10,8,2894899),y(n,"rh-0"),_(n,"rh");const P=g.z+g.d,C=(H,J)=>{const ie=J-H,ye=(H+J)/2;z(n,ie,.5,.2,Q.wall,ye,0,P);const Ce=new pe(new at(ie,3.4,.08),en(Q.glass,.2));Ce.position.set(ye,2.2,P),n.add(Ce);for(let me=H;me<=J+.01;me+=ie/Math.max(1,Math.round(ie/3.2)))z(n,.1,3.4,.12,2106411,me,.5,P);z(n,ie,.1,.16,2106411,ye,3.9,P),nt(ye,P,ie,.5)};C(g.x,52),C(55,g.x+g.w),z(n,.14,3.4,.14,Q.gold,52,0,P),z(n,.14,3.4,.14,Q.gold,55,0,P),z(n,3.14,.14,.14,Q.gold,53.5,3.4,P),z(n,.2,.5,g.d,Q.wall,g.x+g.w,0,g.z+g.d/2);const B=new pe(new at(.08,3.4,g.d),en(Q.glass,.2));B.position.set(g.x+g.w,2.2,g.z+g.d/2),n.add(B),nt(g.x+g.w,g.z+g.d/2,.5,g.d),z(n,4.2,.9,.5,16054009,61.2,0,48.2),z(n,4.3,.04,.54,Q.gold,61.2,.9,48.2);for(let H=0;H<8;H++)z(n,.36,.5,.3,[14263361,15044528,5223359,15988216][H%4],59.6+H*.5,.94,48.2);nt(61.2,48.2,4.3,.6),as(n,47.4,56.6),Ve(n,47.2,48.2,1.2),Ve(n,62.8,56.8,1.3),Ve(n,62.8,48.2,1.1),qt(n,"Recursos Humanos",Ue.rrhh.color,55,57.2,8)}{const g=Dt("proyectos");h(g),Jt(n,g.x,g.z,g.z+g.d),Qt(n,g.z,g.x,g.x+g.w);const P=Si({title:"PROYECTOS",subtitle:"O F I C I N A",accent:"#59dcff",icon:"bars"});yi(n,P,g.x+7,3.3,g.z,7);let C=0;for(const B of[33.4,36.4,39.4,42.2])for(const H of[-17.2,-12.7,-8.2]){const J=Gd(n,`pj-${C}`,H,B,un[C%6]);e[`pj-${C}`]=ur(J,20+C),C++}Ve(n,g.x+1.2,g.z+1.3,1.2),Ve(n,g.x+g.w-1.2,g.z+1.3,1.2),qt(n,"Oficina de proyectos","#cfc6b6",g.x+g.w/2,g.z+g.d-.9,7)}{const g=Dt("innovacion");h(g),Jt(n,g.x,g.z,g.z+g.d),Qt(n,g.z,g.x,g.x+g.w,!0),Kd(n,g.x,g.x+g.w,g.z+g.d),sn(n,g.x+9,g.z+6,12,8,2894899);for(const[P,C]of[[-14.5,51],[-7.5,51],[-11,55]]){an(n,P,C,2.4,2.4,Q.white,.78);for(let B=0;B<4;B++){const H=B/4*Math.PI*2;It(n,P+Math.cos(H)*1.7,C+Math.sin(H)*1.7,-H-Math.PI/2,un[B%6])}}qn(n,g.x+1.4,52,Math.PI/2,3,3750207),Ve(n,g.x+1.2,g.z+1.3,1.2),Ve(n,g.x+g.w-1.2,g.z+1.3,1.2),qt(n,"Sala de innovación","#cfc6b6",g.x+g.w/2,g.z+g.d-.9,7)}{const g=Dt("clientes");h(g),Jt(n,g.x,g.z,g.z+g.d),Qt(n,g.z,g.x,g.x+g.w),Kd(n,g.x,g.x+g.w,g.z+g.d);const P=xt(1024,360,C=>{C.fillStyle="#0b0d11",C.fillRect(0,0,1024,360),C.strokeStyle="#D9A441",C.lineWidth=6,C.strokeRect(10,10,1004,340),C.fillStyle="#f2f2ee",C.textAlign="center",C.font='800 80px system-ui, "Segoe UI", sans-serif',C.fillText(tt("SALA DE CLIENTES"),512,170),C.fillStyle="#D9A441",C.font='500 44px system-ui, "Segoe UI", sans-serif',C.fillText("Metis Nexa Inc.",512,250)});wt(Mt(n).N.decor,7,2.5,new Oe({map:P.tex}),g.x+g.w/2,2.2,g.z+.3),sn(n,g.x+9,g.z+6,12,6.4,2894899),an(n,g.x+9,g.z+5.4,7,2.2,Q.white,.78);for(let C=0;C<4;C++)It(n,g.x+6.6+C*1.6,g.z+3.9,0,un[C%6]),It(n,g.x+6.6+C*1.6,g.z+6.9,Math.PI,un[(C+2)%6]);qn(n,g.x+2.4,g.z+8.4,Math.PI,3,3750207),qn(n,g.x+15.4,g.z+8.4,Math.PI,3,3750207),Ve(n,g.x+1.2,g.z+1.3,1.2),Ve(n,g.x+g.w-1.2,g.z+1.3,1.2),qt(n,"Sala de clientes","#cfc6b6",g.x+g.w/2,g.z+g.d-.9,6)}let Y=null;const le=Dt("azahar");{const g=le.x,P=le.x+le.w,C=le.z,B=le.z+le.d,H=(g+P)/2,J=(C+B)/2;z(n,le.w,4.2,le.d,14867147,H,0,J),z(n,le.w+.2,.25,le.d+.2,13222062,H,4.15,J),z(n,le.w,.12,.2,Q.gold,H,4,B+.05);for(const Ce of[-16.8,-12.4,-8]){const me=z(n,2.8,2.3,.06,16120059,Ce,.9,B+.04);me.castShadow=!1,wt(n,2.6,2.1,vl,Ce,2,B+.08)}z(n,1.6,2.4,.08,3842221,-5.6,0,B+.05),wt(n,8.4,8.4*(360/1536),new Oe({map:b}),-12.2,3.35,B+.09),nt(H,J,le.w,le.d,0);{const me=Ke.z1-Ke.z0,I=me/22;for(let he=0;he<22;he++){const Ye=(he+1)*pn/22,Ne=Ke.z1-(he+.5)*I;z(n,Ke.w,Ye,I+.02,he%2?14275526:14999507,Ke.x,0,Ne)}const De=Math.atan2(pn,me),Te=Math.hypot(pn,me);for(const he of[-1,1]){const Ye=z(n,.06,.06,Te,2830134,Ke.x+he*(Ke.w/2+.03),0,(Ke.z0+Ke.z1)/2);Ye.position.y=pn/2+1,Ye.rotation.x=-De;const Ne=new pe(new at(.04,.9,Te),en(Q.glass,.25));Ne.position.set(Ke.x+he*(Ke.w/2+.03),pn/2+.55,(Ke.z0+Ke.z1)/2),Ne.rotation.x=-De,n.add(Ne)}nt(Ke.x,(Ke.z0+Ke.z1)/2,Ke.w+.5,me+.2,0);const{tex:ze}=xt(512,128,he=>{he.fillStyle="#f6efe2",he.fillRect(0,0,512,128),he.strokeStyle="#3aa0ad",he.lineWidth=8,he.strokeRect(4,4,504,120),he.fillStyle="#4a2f1d",he.font="bold 40px system-ui",he.textAlign="center",he.fillText(tt("OFICINA AZAHAR COFFEE"),256,60),he.fillStyle="#3aa0ad",he.font="34px system-ui",he.fillText(tt("Piso 2  ↑"),256,104)});z(n,.08,1.2,.08,Q.steel,Ke.x+2,0,42.4),wt(n,2.6,.65,new Oe({map:ze}),Ke.x+2,1.5,42.46)}Sn(n,-21.5,-1.5,20,16.4,ss(5,4),16777215,.002),Sn(n,-21.5,29,16.5,17,ss(4,4),16777215,.002),[[-19,4],[-14,8],[-8,2],[-19,12],[-17.5,33],[-9.5,37],[-19,43]].forEach(([Ce,me])=>Bo(n,Ce,me,1.1)),Ve(n,-.9,41.4,1.2),ko(1);const ie=Vt(n,0,0,0,pn);Y=Yd(ie);const ye=Sn(ie,g,C,le.w,le.d,$S("#6a5f55",le.w/3,le.d/3));ye.position.y=.06,Jt(ie,g,C,B),Qt(ie,C,g,P),yi(ie,b,-10,3.4,C,12);{const Ce=(De,Te,ze,he)=>{const Ye=new pe(new at(ze,1.05,he),en(Q.glass,.25));Ye.position.set(De,.55,Te),ie.add(Ye),z(ie,ze+(ze>he?0:.06),.06,he+(he>ze?0:.06),2830134,De,1.05,Te),nt(De,Te,Math.max(ze,.5)+.1,Math.max(he,.5)+.1)},me=Ke.x-Ke.w/2,I=Ke.x+Ke.w/2;Ce((g+me)/2,B-.04,me-g,.08),Ce((I+P)/2,B-.04,P-I,.08),Ce(P-.04,J,.08,le.d)}Vd(ie,"az-0",ft["az-0"].x,ft["az-0"].z,Q.leather),_(ie,"az","azahar"),sn(ie,-9.5,21.5,16,11,3814446),qt(ie,"Azahar Coffee · Piso 2","#3aa0ad",-10,27.2,8),as(ie,-17.6,16.6),cr(ie,-18.4,18.9,Math.PI/2),lr(ie,-18.6,26.8,Math.PI/2),Ve(ie,-18.2,15.9,1.3),Ve(ie,-1.8,15.9,1.3),Ve(ie,-18.2,27.2,1.1),xi(Mt(ie).W.decor,-18.8,3,21.5,Math.PI/2),On(ie,-15.5,C,1.8),On(ie,-4.5,C,1.8),ko(0),w_({x0:g-.2,z0:C-.2,x1:P+.2,z1:B+.7})}n.updateMatrixWorld(!0);for(const g of[t,Y])for(const P of[g.N,g.W])Ho(P.walls),Ho(P.decor);const be=[];for(const[g,P,C]of[[33.5,21.5,6.2],[32,54.6,3.4],[-2,4.6,3.3],[26.5,6.2,5.2],[-11,52,3.6]]){const B=new pt;B.position.set(g,.1,P);const H=new pe(new Ht(C*2,C*2),JS);H.rotation.x=-Math.PI/2,B.add(H),n.add(B),be.push(B)}const we=[];for(const[g,P,C,B,H]of[["chip",Ue.tecnologia.color,33,3,11],["bars",Ue.financiera.color,10,3,26],["gear",Ue.operaciones.color,55,3,26.5],["palette",Ue.diseno.color,45,3,11],["people",Ue.rrhh.color,55,3,57]]){const J=new o_(new zu({map:QS(g,P),transparent:!0,depthWrite:!1,blending:vs,opacity:.9}));J.scale.set(2.3,2.3,1),J.position.set(C,B,H),n.add(J),we.push({s:J,y:B,ph:C})}Ho(n);const Qe=s.material;return{group:n,screens:e,board:ne,queue:G,hub:te,setElevators(g){Z.forEach((P,C)=>{const B=g[C]??0;P.l.position.x=P.ex-.55-B*.9,P.r.position.x=P.ex+.55+B*.9})},animate(g){W(g),be.forEach((P,C)=>P.rotation.y=g*(C%2?-.25:.25)),we.forEach(P=>P.s.position.y=P.y+Math.sin(g*1.6+P.ph)*.14)},setCut(g,P){for(const C of[t,Y])for(const[B,H]of[[C.N,g],[C.W,P]]){const J=1-.8*H;Math.abs(B.walls.scale.y-J)<.002||(B.walls.scale.y=Math.max(.05,J),B.decor.visible=H<.3)}},setTheme(g){Qe.color.set(g==="dark"?2763312:13617595)}}}function Ho(n){var a;n.updateMatrixWorld(!0);const e=n.matrixWorld.clone().invert(),t=new Map,i=[];n.traverse(s=>{const r=s;if(!r.isMesh||!R_(r.material)||r.userData.keep)return;const o=r.geometry.clone();o.applyMatrix4(e.clone().multiply(r.matrixWorld));const c=r.material;(t.get(c)??t.set(c,[]).get(c)).push(o),i.push(r)});for(const s of i)(a=s.parent)==null||a.remove(s);for(const[s,r]of t){const o=Vu(r,!1);if(!o)continue;const c=new pe(o,s);c.castShadow=!0,c.receiveShadow=!0,c.userData.keep=!0,n.add(c),r.forEach(l=>l.dispose())}}const _l=96,ms=-.75,Oi=-.35,si=5889279;let Oc=[];const ws=(n,e=0,t=.22,i=.4)=>{const a=new c_({color:n,emissive:e,roughness:t,metalness:i});return Oc.push(a),a};let Fc=11;const hn=()=>(Fc=Fc*16807%2147483647)/2147483647,jr=(n,e,t)=>{(n.get(e)??n.set(e,[]).get(e)).push(t)};function ht(n,e,t,i,a,s,r,o){const c=new at(t,i,a);c.translate(s,r+i/2,o),jr(n,e,c)}function Ei(n,e,t=0,i=!1,a=!1){for(const[s,r]of e){const o=Vu(r,!1);o&&(n.add(new pe(o,i?new Oe({color:s}):a?ws(s,t):new yn({color:s,emissive:t}))),r.forEach(c=>c.dispose()))}}function Zd(n,e,t){const i=document.createElement("canvas");i.width=n,i.height=e,t(i.getContext("2d"));const a=new cl(i);return a.colorSpace=Xt,a.anisotropy=4,a}function ay(n){const e=new Map,t=12596780,i=-62,a=2.6,s=45,r=36,o=108;ht(e,t,o*2,.9,6.4,0,a-.9,i),ht(e,15260104,o*2,.5,.3,0,a,i-3.1),ht(e,15260104,o*2,.5,.3,0,a,i+3.1);for(const u of[-1,1]){const f=u*s;for(const v of[-2.7,2.7])ht(e,t,2.2,r,2,f,0,i+v);for(const v of[9,17,25,32])ht(e,t,2.2,1.3,7.4,f,v,i);ht(e,t,2.6,1,7.6,f,r,i)}const c=(u,f,v,b,m)=>{const p=Math.hypot(v-u,b-f),E=new at(p,.42,.42);E.rotateZ(Math.atan2(b-f,v-u)),E.translate((u+v)/2,(f+b)/2,m),jr(e,13781558,E)},l=u=>4.2+(r-4.2)*Math.pow(u/s,2),d=u=>a+(r-a)*Math.pow(Math.max(0,(o-u)/(o-s)),1.5);for(const u of[i-2.7,i+2.7]){for(let f=-s;f<s-.1;f+=3)c(f,l(f),f+3,l(f+3),u);for(const f of[-1,1])for(let v=s;v<o-.1;v+=4){const b=Math.min(v+4,o);c(f*v,d(v),f*b,d(b),u)}for(let f=-s+5;f<s-1;f+=5)ht(e,13781558,.16,l(f)-a,.16,f,a,u);for(const f of[-1,1])for(let v=s+6;v<o-4;v+=6)ht(e,13781558,.16,d(v)-a,.16,f*v,a,u)}const h=new pt;Ei(h,e,2755078),h.rotation.y=Math.PI/2,h.scale.setScalar(1.5),h.position.set(-167,0,-260),n.add(h)}function sy(n){const e=(d,h,u,f,v)=>{const b=new pe(new at(d,1.2,h),new yn({color:v}));b.position.set(u,Oi-.6,f),n.add(b)};e(1e3,620,0,210,10135475),e(2e3,360,0,-540,7111794);const t=new Map,i=new Map,a=new Map,s=new Map;for(let d=-480;d<480;d+=9.5)for(let h=-95;h<400;h+=9.5){if(d>-34&&d<80&&h>-14&&h<80)continue;const u=Math.round(d/9.5),f=Math.round(h/9.5);if(u%5===0||f%5===0||hn()<.16)continue;const v=d+hn()*1.5,b=h+hn()*1.5,m=Math.hypot(v-30,b-35),p=Math.min(_l-8,6+hn()*16+Math.max(0,66-m/4.4)*hn()),E=5.2+hn()*2.4,S=5.2+hn()*2.4,w=hn();ht(w<.45?t:w<.8?i:a,w<.45?15660023:w<.8?11124688:2898762,E,p,S,v,Oi,b),p>40&&hn()<.6&&ht(s,si,E-.3,.35,S-.3,v,Oi+p,b)}Ei(n,t,791064,!1,!0),Ei(n,i,662572,!1,!0),Ei(n,a,664118,!1,!0),Ei(n,s,0,!0);const r=new pe(new Ia(3.2,70,4),ws(16185594,1054236));r.rotation.y=Math.PI/4,r.position.set(-58,Oi+35,24);const o=new pe(new Vn(2.2,4.2,84,16),ws(13623534,1323082,.15,.6));o.position.set(100,Oi+42,44);const c=new pe(new Vn(2.3,2.3,.4,16),new Oe({color:si}));c.position.set(100,Oi+84.2,44),n.add(r,o,c);for(let d=0;d<22;d++){const h=new pe(new Ia(45+hn()*40,20+hn()*28,6),new yn({color:[6258028,7310201,8098948][d%3]}));h.position.set(-700+hn()*1400,Oi+6,-440-hn()*160),h.rotation.y=hn()*3,n.add(h)}const l=new Map;for(const[d,h,u]of[[20,-110,1.6],[-70,-200,1.8],[120,-160,1.5],[60,-280,1.7],[-30,-320,1.5],[170,-90,1.6]]){ht(l,2896960,4.2*u,.8*u,1.4*u,d,ms,h),ht(l,16777215,.12*u,5.4*u,.12*u,d,ms+.8*u,h);const f=new Ia(1.4*u,4.6*u,3);f.scale(.25,1,1),f.translate(d+.5*u,ms+3.1*u,h),jr(l,16645627,f)}Ei(n,l)}function ry(n){const e=new Map,t=(o,c,l,d,h,u,f,v=8)=>{const b=new Vn(c,l,d,v);b.translate(h,u+d/2,f),jr(e,o,b)},i=ms;t(9077872,21,28,6,0,i-.5,0,9),t(10722695,20,21,1.4,0,i+5.4,0,9),ht(e,15525849,24,5,7,0,i+6.8,-2),ht(e,16184040,17,3.6,5.2,-1,i+11.8,-2),ht(e,3818320,24.3,.3,7.3,0,i+11.8,-2),ht(e,3818320,17.3,.3,5.5,-1,i+15.4,-2),ht(e,15525849,8,3.6,5.5,-13,i+6.8,7),ht(e,14275523,6,2.8,4.5,13,i+6.8,8),ht(e,7170656,10,.5,3,24,i+.2,9),t(16052712,1.1,1.5,9,11,i+6.8,4,10),t(12728878,1.4,1.4,1.1,11,i+15.8,4,10);for(const[o,c]of[[-1,-1],[1,-1],[-1,1],[1,1]])ht(e,9410722,.3,4.5,.3,-14+o,i+6.8,-9+c);t(14673642,2.4,2.4,3,-14,i+11.3,-9,12),ht(e,15525849,1.8,4.2,1.8,-16,i+6.8,-11),Ei(n,e),new pt;const a=new pe(new Wn(.7,10,8),new Oe({color:si}));a.position.set(11,i+17.2,4),n.children[n.children.length-1].add(a);const s=n.children.slice(-(e.size+0)),r=new pt;for(const o of s)n.remove(o),r.add(o);r.scale.setScalar(1.7),r.position.set(-160,0,-175),n.add(r)}function oy(n){const e=qe.x1-qe.x0-1.4,t=qe.z1-qe.z0-1.4,i=_l-.9,a=(qe.x0+qe.x1)/2,s=(qe.z0+qe.z1)/2,r=p=>{const E=Zd(256,256,w=>{const L=w.createLinearGradient(0,0,0,256);L.addColorStop(0,"#1b2c3d"),L.addColorStop(1,"#13202e"),w.fillStyle=L,w.fillRect(0,0,256,256),w.fillStyle="rgba(120,190,230,0.10)";for(let R=0;R<4;R++)w.fillRect(R*64,0,28,256);w.strokeStyle="#4a6a86",w.lineWidth=3;for(let R=0;R<=256;R+=64)w.beginPath(),w.moveTo(0,R),w.lineTo(256,R),w.stroke();w.strokeStyle="#2a4258",w.lineWidth=2;for(let R=0;R<=256;R+=64)w.beginPath(),w.moveTo(R,0),w.lineTo(R,256),w.stroke();for(let R=0;R<9;R++)w.fillStyle=Math.random()<.5?"rgba(255,214,150,0.85)":"rgba(110,220,255,0.8)",w.fillRect((Math.random()*4|0)*64+8,(Math.random()*4|0)*64+10,48,44)});E.wrapS=E.wrapT=Yi,E.repeat.set(p/12,i/16);const S=ws(16777215,7309989,.16,.55);return S.map=E,S.emissiveMap=E,S},o=r(t),c=r(e),l=new yn({color:1054237}),d=new pe(new at(e,i,t),[o,o,l,l,c,c]);d.position.set(a,-.9-i/2,s),n.add(d);const h=new Map;for(const p of[-1,1])for(const E of[-1,1])ht(h,si,.35,i,.35,a+p*e/2,-.9-i,s+E*t/2);for(let p=8;p<i;p+=24)ht(h,si,e+.2,.22,.22,a,-.9-p,s+t/2),ht(h,si,e+.2,.22,.22,a,-.9-p,s-t/2),ht(h,si,.22,.22,t+.2,a+e/2,-.9-p,s),ht(h,si,.22,.22,t+.2,a-e/2,-.9-p,s);((p,E)=>{ht(h,E,qe.x1-qe.x0+.1,.18,.18,a,p,qe.z1),ht(h,E,.18,.18,qe.z1-qe.z0+.1,qe.x1,p,s)})(-.95,si),Ei(n,h,0,!0);const f=Zd(1024,192,p=>{p.clearRect(0,0,1024,192),p.textAlign="center",p.fillStyle="#ffffff",p.font='800 120px system-ui, "Segoe UI", sans-serif',p.shadowColor="#59dcff",p.shadowBlur=28,p.fillText("E D G E   T O W E R",512,130),p.fillRect(180,152,664,4)}),v=new Oe({map:f,transparent:!0,depthWrite:!1}),b=new pe(new Ht(26,4.9),v);b.position.set(a,-5.2,qe.z1-.65);const m=new pe(new Ht(26,4.9),v);m.rotation.y=Math.PI/2,m.position.set(qe.x1-.65,-5.2,s),n.add(b,m)}function cy(){Fc=11;const n=new pt,e=new pt;e.position.y=-_l,Oc=[];const t=ws(996688,0,.1,.55),i=new pe(new Ht(9e3,9e3),t);i.rotation.x=-Math.PI/2,i.position.set(0,ms,0),e.add(i),ay(e),sy(e),ry(e),n.add(e),oy(n);const a=new ol(659480,230,760);return{group:n,fog:a,setTheme(s){t.color.set(s==="dark"?1329002:5218244)},setEnv(s){for(const r of Oc)r.envMap=s,r.needsUpdate=!0}}}const ly=`varying vec3 vDir;
void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,dy=`varying vec3 vDir;
uniform vec3 top; uniform vec3 mid; uniform vec3 horizon; uniform vec3 below; uniform vec3 sunDir; uniform vec3 sunColor;
uniform vec2 res; uniform float hy; uniform vec2 sunScreen; uniform float sunVis;
void main(){
  #ifdef SCREEN
  // cámara ortográfica: el horizonte se coloca donde termina la bruma del agua y la ciudad
  vec2 s = gl_FragCoord.xy / res;
  float h = (s.y - hy) * 1.9;
  #else
  float h = normalize(vDir).y;
  #endif
  vec3 c = mix(horizon, mid, smoothstep(0.0, 0.22, h));
  c = mix(c, top, smoothstep(0.18, 0.75, h));
  c = mix(c, below, smoothstep(0.0, -0.25, h));
  #ifdef SCREEN
  vec2 q = (s - sunScreen) * vec2(res.x / res.y, 1.0);
  float sd = length(q);
  c += sunColor * sunVis * (smoothstep(0.035, 0.0, sd) * 2.0 + exp(-sd * 9.0) * 0.55 + exp(-sd * 2.5) * 0.2);
  #else
  float sdot = max(dot(normalize(vDir), sunDir), 0.0);
  c += sunColor * (pow(sdot, 900.0) * 2.0 + pow(sdot, 40.0) * 0.55 + pow(sdot, 6.0) * 0.22);
  #endif
  gl_FragColor = vec4(c, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,uy={dark:{top:857651,mid:5914488,horizon:14251087,below:1710128,sun:16757611,fog:14251087},light:{top:6265814,mid:15251366,horizon:16766883,below:13621734,sun:16769712,fog:16766883}},Go=new U(-.55,.11,-.83).normalize();function hy(){const n={top:{value:new We},mid:{value:new We},horizon:{value:new We},below:{value:new We},sunDir:{value:Go.clone()},sunColor:{value:new We}};Object.assign(n,{res:{value:new Be(1,1)},hy:{value:.5},sunScreen:{value:new Be(.5,.5)},sunVis:{value:0}});const e=o=>new hi({uniforms:n,vertexShader:ly,fragmentShader:dy,side:cn,depthWrite:!1,fog:!1,defines:o}),t=e({SCREEN:"1"}),i=new pe(new Wn(3e3,32,20),t);i.frustumCulled=!1,i.renderOrder=-10;const a=new Uu,s=new pe(new Wn(50,32,20),e({}));a.add(s);const r=new We;return{dome:i,envScene:a,fogColor:r,update(o,c,l){n.res.value.set(c,l);const d=o.getWorldDirection(new U),h=o.position.clone().addScaledVector(d,150),u=new U(d.x,0,d.z).normalize(),f=new U(h.x,-97,h.z).addScaledVector(u,2400).project(o);n.hy.value=(f.y+1)/2;const v=h.clone().addScaledVector(Go,2e3).project(o);n.sunScreen.value.set((v.x+1)/2,(v.y+1)/2),n.sunVis.value=d.dot(Go)>.1?1:0},setTheme(o){const c=uy[o];n.top.value.set(c.top),n.mid.value.set(c.mid),n.horizon.value.set(c.horizon),n.below.value.set(c.below),n.sunColor.value.set(c.sun),r.set(c.fog)}}}const fy=[15911333,14724226,13010498,9262372,16111032,11104587],py=[1776411,3877408,5912613,9067051,13214283,7023902,4473924],my=[3099516,4090715,8011326,5593958,9071931,15000804,2763310,4878245],gy=[13063531,5016734,9333685,14722136,4161387,15789542,11553338,6126248],vy=[2829634,3815994,4871528,7035723,2046559],_y=["corto","lado","rizado","rapado"],by=["largo","coleta","mono","bob"];function xy(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}const Fi=(n,e,t)=>n[(e>>>t)%n.length];function fn(n,e,t,i,a,s,r,o){const c=new pe(Fr,en(a));return c.scale.set(e,t,i),c.position.set(s,r,o),c.castShadow=!0,n.add(c),c}class Sy{constructor(e){this.def=e,this.group=new pt,this.body=new pt,this.head=new pt,this.thigh=[],this.shin=[],this.shoulder=[],this.elbow=[],this.pose="stand",this.phase=Math.random()*6,this.cur={th:[0,0],sh:[0,0],so:[0,0],el:[0,0],drop:0,headX:0};const t=xy(e.id+e.genero);this.seed=t%1e3;const i=e.genero==="mujer",a=e.id==="felipe",s=Fi(fy,t,3),r=Fi(py,t,7),o=a?1447450:Fi(i?gy:my,t,11),c=a?1447450:Fi(vy,t,15),l=i?.94:1,d=i?.42:.5;this.group.add(this.body),this.group.scale.setScalar(l),this.group.userData.agentId=e.id;for(const h of[-1,1]){const u=new pt;u.position.set(h*.12,.78,0),fn(u,.18,.4,.2,c,0,-.2,0);const f=new pt;f.position.y=-.39,fn(f,.15,.4,.17,c,0,-.2,0),fn(f,.17,.08,.3,a?789518:2761760,0,-.38,.05),u.add(f),this.body.add(u),this.thigh.push(u),this.shin.push(f)}fn(this.body,d,.6,.28,o,0,1.08,0),a&&(fn(this.body,.14,.4,.02,16053492,0,1.12,.15),fn(this.body,.06,.34,.03,14263361,0,1.12,.165)),fn(this.body,.09,.11,.02,parseInt(Ue[e.area].color.slice(1),16),d/2-.1,1.2,.15),Gt(this.body,.07,.1,s,0,1.36,0),this.head.position.set(0,1.58,0),this.body.add(this.head),An(this.head,.2,s,0,0,0,1.08),An(this.head,.028,1447450,-.07,.02,.185),An(this.head,.028,1447450,.07,.02,.185),fn(this.head,.07,.015,.02,i?11883087:9062970,0,-.08,.19),this.hair(Fi(i?by:_y,t,19),r);for(const h of[-1,1]){const u=new pt;u.position.set(h*(d/2+.07),1.32,0),fn(u,.13,.3,.13,o,0,-.14,0);const f=new pt;f.position.y=-.29,fn(f,.11,.27,.11,a?1447450:s,0,-.13,0),An(f,.07,s,0,-.29,0),u.add(f),this.body.add(u),this.shoulder.push(u),this.elbow.push(f)}}hair(e,t){const i=this.head,a=(s,r,o,c=.9)=>An(i,s,t,0,r,o,c);switch(e){case"rapado":a(.205,.04,-.01,.85);break;case"rizado":a(.25,.07,-.03,.88),An(i,.1,t,.17,.12,0,1),An(i,.1,t,-.17,.12,0,1);break;case"lado":a(.22,.05,-.03),fn(i,.2,.06,.1,t,.06,.2,.12);break;case"largo":a(.225,.05,-.03),fn(i,.4,.62,.12,t,0,-.22,-.15);break;case"coleta":a(.225,.05,-.03),An(i,.09,t,0,.08,-.24),fn(i,.1,.4,.1,t,0,-.14,-.27);break;case"mono":a(.225,.05,-.03),An(i,.13,t,0,.27,-.06);break;case"bob":a(.23,.04,-.03),fn(i,.43,.28,.2,t,0,-.05,-.11);break;default:a(.215,.05,-.03)}}setPose(e){this.pose=e}getPose(){return this.pose}animate(e,t,i=0){const a=1-Math.exp(-t*14),s={th:[0,0],sh:[0,0],so:[0,0],el:[0,0],drop:0,headX:0},r=this.pose;if(r==="walk"){this.phase+=t*(6+i*1.6);const l=Math.sin(this.phase);s.th=[-l*.75,l*.75],s.sh=[Math.max(0,Math.cos(this.phase))*.9,Math.max(0,-Math.cos(this.phase))*.9],s.so=[l*.6,-l*.6],s.el=[-.35,-.35]}else if(r==="sit"||r==="type")s.th=[-1.5,-1.5],s.sh=[.05,.05],s.drop=-.2,r==="sit"?(s.so=[-.35,-.35],s.el=[-1,-1],s.headX=Math.sin(e*.7+this.seed)*.03):(s.so=[-.75,-.75],s.el=[-.95+Math.sin(e*17+this.seed)*.14,-.95+Math.sin(e*15+1+this.seed)*.14],s.headX=.14);else{const l=Math.sin(e*1.6+this.seed);s.so=[l*.04,-l*.04],s.el=[-.12,-.12]}const o=this.cur;for(let l=0;l<2;l++)o.th[l]+=(s.th[l]-o.th[l])*a,o.sh[l]+=(s.sh[l]-o.sh[l])*a,o.so[l]+=(s.so[l]-o.so[l])*a,o.el[l]+=(s.el[l]-o.el[l])*a,this.thigh[l].rotation.x=o.th[l],this.shin[l].rotation.x=o.sh[l],this.shoulder[l].rotation.x=o.so[l],this.elbow[l].rotation.x=o.el[l];o.drop+=(s.drop-o.drop)*a,o.headX+=(s.headX-o.headX)*a;const c=r==="walk"?Math.abs(Math.sin(this.phase))*.05:0;this.body.position.y=o.drop+c,this.head.rotation.x=o.headX}}const bl=[{id:"felipe",nombre:"Felipe",genero:"hombre",cargo:"CEO de Metis Nexa Inc.",area:"direccion",lider:null,puesto:"ceo",funciones:["Define la dirección de la empresa","Crea y asigna las tareas a los agentes","Revisa el avance de cada área"]},{id:"david",nombre:"David",genero:"hombre",cargo:"CFO",area:"financiera",lider:"felipe",puesto:"fin-0",funciones:["Lidera el área financiera","Revisa cierres y estados financieros","Prioriza el trabajo de su equipo"]},{id:"danna",nombre:"Danna",genero:"mujer",cargo:"Contabilidad",area:"financiera",lider:"david",puesto:"fin-1",funciones:["Registra movimientos contables","Prepara el cierre del mes"]},{id:"dora",nombre:"Dora",genero:"mujer",cargo:"Conciliaciones bancarias",area:"financiera",lider:"david",puesto:"fin-2",funciones:["Concilia extractos con libros","Detecta y explica diferencias"]},{id:"martha",nombre:"Martha",genero:"mujer",cargo:"Impuestos",area:"financiera",lider:"david",puesto:"fin-3",funciones:["Prepara declaraciones","Lleva el calendario tributario"]},{id:"patricia",nombre:"Patricia",genero:"mujer",cargo:"Nómina",area:"financiera",lider:"david",puesto:"fin-4",funciones:["Liquida la nómina","Verifica novedades y descuentos"]},{id:"pilar",nombre:"Pilar",genero:"mujer",cargo:"Cuentas por pagar",area:"financiera",lider:"david",puesto:"fin-5",funciones:["Registra facturas de proveedores","Programa los pagos"]},{id:"lorena",nombre:"Lorena",genero:"mujer",cargo:"Facturación y cartera",area:"financiera",lider:"david",puesto:"fin-6",funciones:["Emite facturas","Hace seguimiento a la cartera"]},{id:"diego",nombre:"Diego",genero:"hombre",cargo:"CTO",area:"tecnologia",lider:"felipe",puesto:"tec-0",funciones:["Lidera el área de tecnología","Define la arquitectura","Prioriza el trabajo de su equipo"]},{id:"mateo",nombre:"Mateo",genero:"hombre",cargo:"Integraciones API",area:"tecnologia",lider:"diego",puesto:"tec-1",funciones:["Conecta sistemas por API","Monitorea las integraciones"]},{id:"ivan",nombre:"Ivan",genero:"hombre",cargo:"Backend",area:"tecnologia",lider:"diego",puesto:"tec-2",funciones:["Desarrolla servicios y lógica","Cuida el rendimiento"]},{id:"nelson",nombre:"Nelson",genero:"hombre",cargo:"Automatización de procesos",area:"tecnologia",lider:"diego",puesto:"tec-3",funciones:["Automatiza tareas repetitivas","Documenta los flujos"]},{id:"anderson",nombre:"Anderson",genero:"hombre",cargo:"QA y pruebas",area:"tecnologia",lider:"diego",puesto:"tec-4",funciones:["Diseña y ejecuta pruebas","Reporta errores"]},{id:"sebastian",nombre:"Sebastian",genero:"hombre",cargo:"Frontend",area:"tecnologia",lider:"diego",puesto:"tec-5",funciones:["Construye interfaces","Cuida la experiencia de uso"]},{id:"luis",nombre:"Luis",genero:"hombre",cargo:"Infraestructura y despliegues",area:"tecnologia",lider:"diego",puesto:"tec-6",funciones:["Administra la infraestructura","Gestiona los despliegues"]},{id:"manuel",nombre:"Manuel",genero:"hombre",cargo:"Datos y reportes",area:"tecnologia",lider:"diego",puesto:"tec-7",funciones:["Prepara datos","Arma reportes e indicadores"]},{id:"valentina",nombre:"Valentina",genero:"mujer",cargo:"Coordinadora de operaciones",area:"operaciones",lider:"felipe",puesto:"ops-0",funciones:["Lidera operaciones y clientes","Gestiona el tablero de tareas","Coordina a su equipo"]},{id:"angie",nombre:"Angie",genero:"mujer",cargo:"Desarrollo de negocio",area:"operaciones",lider:"valentina",puesto:"ops-1",funciones:["Identifica oportunidades","Prepara propuestas"]},{id:"alba",nombre:"Alba",genero:"mujer",cargo:"Gerente de cuenta Azahar",area:"operaciones",lider:"valentina",puesto:"ops-2",funciones:["Atiende la cuenta de Azahar","Da seguimiento a entregables"],empresa:"azahar"},{id:"lucia",nombre:"Lucia",genero:"mujer",cargo:"Soporte a clientes",area:"operaciones",lider:"valentina",puesto:"ops-3",funciones:["Resuelve solicitudes","Escala casos complejos"]},{id:"diana",nombre:"Diana",genero:"mujer",cargo:"Ventas",area:"operaciones",lider:"valentina",puesto:"ops-4",funciones:["Atiende prospectos","Hace demos de la oficina"]},{id:"valeria",nombre:"Valeria",genero:"mujer",cargo:"Marketing y contenido",area:"operaciones",lider:"valentina",puesto:"ops-5",funciones:["Planea contenido","Publica y mide resultados"]},{id:"mary",nombre:"Mary",genero:"mujer",cargo:"Líder de diseño gráfico",area:"diseno",lider:"felipe",puesto:"dis-0",funciones:["Lidera el equipo de diseño gráfico","Atiende los diseños de todos los proyectos","Cuida la imagen de marca"]},{id:"camila",nombre:"Camila",genero:"mujer",cargo:"Dirección de arte",area:"diseno",lider:"mary",puesto:"dis-1",funciones:["Define el estilo visual de cada proyecto","Revisa las piezas antes de entregarlas"]},{id:"santiago",nombre:"Santiago",genero:"hombre",cargo:"Identidad de marca",area:"diseno",lider:"mary",puesto:"dis-2",funciones:["Crea y mantiene manuales de marca","Diseña logos y papelería"]},{id:"natalia",nombre:"Natalia",genero:"mujer",cargo:"Piezas digitales y redes",area:"diseno",lider:"mary",puesto:"dis-3",funciones:["Diseña piezas para redes y web","Adapta los diseños a cada formato"]},{id:"juan",nombre:"Juan",genero:"hombre",cargo:"Motion y video",area:"diseno",lider:"mary",puesto:"dis-4",funciones:["Anima piezas y arma videos cortos","Edita material audiovisual"]},{id:"laura",nombre:"Laura",genero:"mujer",cargo:"Diseño editorial y presentaciones",area:"diseno",lider:"mary",puesto:"dis-5",funciones:["Diseña presentaciones y documentos","Maqueta piezas impresas y digitales"]},{id:"jairo",nombre:"Jairo",genero:"hombre",cargo:"Analista de procesos",area:"operaciones",lider:"valentina",puesto:"ops-6",funciones:["Mapea procesos","Propone mejoras"]},{id:"andres",nombre:"Andrés",genero:"hombre",cargo:"Documentación y capacitación",area:"operaciones",lider:"valentina",puesto:"ops-7",funciones:["Escribe guías y manuales","Capacita al equipo"]},{id:"carolina",nombre:"Carolina",genero:"mujer",cargo:"Recepcionista de entrada y enrutamiento",area:"recepcion",lider:"valentina",puesto:"rec-1",funciones:["Recibe todas las solicitudes nuevas que llegan sin asignar","Identifica la empresa y clasifica la solicitud por área","Le pone prioridad según palabras clave y fecha límite","La convierte en tarea y la asigna al líder o al agente que corresponde","Si no puede clasificarla, la deja en «Por revisar» para Felipe"]},{id:"sofia",nombre:"Sofía",genero:"mujer",cargo:"Recepcionista de agenda y seguimiento",area:"recepcion",lider:"valentina",puesto:"rec-2",funciones:["Gestiona la agenda de reuniones y visitas y reserva la sala de reuniones","Da la bienvenida a las visitas, crea su ficha y avisa al responsable","Marca en rojo las tareas que llevan más de 48 horas sin avanzar o cerca de su fecha límite","Envía recordatorios y escala al líder si una tarea sigue bloqueada","Prepara el resumen del día para Felipe"]},{id:"paula",nombre:"Paula",genero:"mujer",cargo:"Líder de Recursos Humanos",area:"rrhh",lider:"felipe",puesto:"rh-0",funciones:["Lidera el departamento de Recursos Humanos","Define qué SKILLS necesita cada proyecto","Revisa y aprueba las asignaciones de SKILLS a los agentes"]},{id:"gabriela",nombre:"Gabriela",genero:"mujer",cargo:"Asignación de SKILLS",area:"rrhh",lider:"paula",puesto:"rh-1",funciones:["Asigna SKILLS a los agentes según la necesidad del proyecto","Mantiene el catálogo de SKILLS al día"]},{id:"mauricio",nombre:"Mauricio",genero:"hombre",cargo:"Desarrollo y capacitación de agentes",area:"rrhh",lider:"paula",puesto:"rh-2",funciones:["Detecta brechas de SKILLS en cada equipo","Propone capacitaciones y rotaciones entre proyectos"]}],Zu="mn.agentes.v1",Yr=bl;let ka=yy();const kc=new Set;function yy(){try{const n=localStorage.getItem(Zu);if(n)return JSON.parse(n)}catch{}return{}}function Ju(){try{localStorage.setItem(Zu,JSON.stringify(ka))}catch{}}function Qu(){kc.forEach(n=>n())}function eh(n){var t,i;const e=ka[n.id];return e?{...n,nombre:((t=e.nombre)==null?void 0:t.trim())||n.nombre,cargo:((i=e.cargo)==null?void 0:i.trim())||n.cargo,funciones:e.funciones?[...e.funciones]:[...n.funciones],empresa:e.empresa!==void 0?e.empresa:n.empresa??null}:{...n,funciones:[...n.funciones]}}function Yt(){return Yr.map(eh)}function mt(n){const e=Yr.find(t=>t.id===n);return e?eh(e):void 0}function th(n){return Yr.find(e=>e.id===n)}function nh(n){return!!ka[n]}function ih(n,e){const t={...ka[n],...e};t.funciones&&(t.funciones=t.funciones.map(i=>i.trim()).filter(Boolean)),ka[n]=t,Ju(),Qu()}function ah(n){delete ka[n],Ju(),Qu()}function Kr(){const n=new Set;return Yr.forEach(e=>{e.lider&&e.lider!=="felipe"&&n.add(e.lider)}),[...n]}function sh(n){return Yt().filter(e=>e.lider===n)}function rh(n){return kc.add(n),()=>kc.delete(n)}const My=Object.freeze(Object.defineProperty({__proto__:null,getAgent:mt,getAgents:Yt,getDefaultAgent:th,getLeaderIds:Kr,getTeamOf:sh,isEdited:nh,resetAgent:ah,subscribeAgents:rh,updateAgent:ih},Symbol.toStringTag,{value:"Module"})),yr="mn.tareas.v1",Jd="mn.tareas.sembradas.v1",Vo="mn.tareas.ejemplos",$o="4",Zr=n=>{var e;return((e=bl.find(t=>t.id===n))==null?void 0:e.area)??(n?"operaciones":"direccion")},Br=new Set;let Tt=Ey();function Ey(){try{const n=localStorage.getItem(yr);if(n){let e=JSON.parse(n).map(t=>({...t,area:Zr(t.agenteId)}));return localStorage.getItem(Vo)!==$o&&(e.some(t=>t.ejemplo)&&(e=[...e.filter(t=>!t.ejemplo),...Mr()]),localStorage.setItem(Vo,$o),localStorage.setItem(yr,JSON.stringify(e))),e}if(!localStorage.getItem(Jd)){const e=Mr();return localStorage.setItem(yr,JSON.stringify(e)),localStorage.setItem(Jd,"1"),localStorage.setItem(Vo,$o),e}}catch{return Mr()}return[]}function wy(){try{localStorage.setItem(yr,JSON.stringify(Tt))}catch{}}function na(){wy(),Br.forEach(n=>n())}function Xi(){return new Date().toISOString()}function Xa(){return"t"+Math.random().toString(36).slice(2,9)}function Mr(){const n=Xi(),e=(t,i,a,s,r)=>({id:Xa(),titulo:i,agenteId:t,area:Zr(t),empresaId:a,estado:s,progreso:r,fecha:n,ejemplo:!0,historial:[{fecha:n,texto:"Tarea de ejemplo cargada"}]});return[e("danna","Cierre contable del mes","metis","en_curso",60),e("dora","Conciliar extractos bancarios","azahar","en_curso",35),e("patricia","Preparar liquidación de nómina","metis","en_curso",80),e("lorena","Enviar facturas pendientes del periodo","azahar","en_curso",45),e("mateo","Revisar integración con servicio externo","azahar","en_curso",70),e("ivan","Optimizar consultas del servicio principal","metis","en_curso",25),e("anderson","Ejecutar pruebas de regresión","metis","en_curso",90),e("manuel","Armar reporte semanal de indicadores","azahar","en_curso",50),e("alba","Preparar seguimiento semanal de cuenta","azahar","en_curso",40),e("lucia","Responder solicitudes de soporte","azahar","en_curso",65),e("valeria","Redactar calendario de contenido","metis","en_curso",30),e("jairo","Mapear proceso de aprobación interna","metis","en_curso",55),e("mary","Diseñar piezas para redes sociales","metis","en_curso",45),e("camila","Actualizar manual de marca del cliente","azahar","en_curso",20),e("santiago","Actualizar papelería corporativa","metis","en_curso",60),e("natalia","Diseñar publicaciones para redes","azahar","en_curso",35),e("juan","Editar video corto de presentación","metis","en_curso",70),e("laura","Armar presentación comercial","azahar","en_curso",50),e("martha","Revisar declaraciones del trimestre","metis","por_hacer",0),e("andres","Actualizar guía de capacitación","metis","hecha",100),e("paula","Definir SKILLS requeridas para los proyectos activos","metis","en_curso",40),e("gabriela","Asignar SKILLS al equipo de Azahar Coffee","azahar","en_curso",25),e("mauricio","Detectar brechas de SKILLS en Tecnología","metis","en_curso",55),...Ay(n)]}function Ay(n){const e=o=>new Date(Date.now()-o*36e5).toISOString(),t=o=>new Date(Date.now()+o*864e5).toISOString().slice(0,10),i=(o,c,l,d)=>({id:Xa(),titulo:o,descripcion:c,agenteId:"",area:"direccion",empresaId:l,estado:"por_hacer",progreso:0,fecha:n,ejemplo:!0,historial:[],origen:"recepcion",entrada:n,limite:d}),a=i("Conciliación de la cuenta de Azahar del mes pasado","Cuadrar los extractos con el libro. Es urgente para el cierre.","azahar",t(2));a.bandeja="entrada",a.historial=[{fecha:n,texto:"Solicitud recibida en recepción"}];const s=i("Error en la web: el formulario de contacto no envía","Los clientes reportan que el botón no responde.","metis",t(1));Object.assign(s,{agenteId:"sebastian",area:"tecnologia",estado:"en_curso",progreso:20,prioridad:"alta",fecha:e(72),entrada:e(72),clasificada:e(71),clasificadaPor:"carolina",historial:[{fecha:e(72),texto:"Solicitud recibida en recepción"},{fecha:e(71),texto:"Clasificada por Carolina → Tecnología · Sebastian · prioridad alta"}]});const r=i("Revisar propuesta del nuevo aliado","Mensaje sin detalle suficiente para saber a quién corresponde.","metis");return r.bandeja="por_revisar",r.prioridad="media",r.historial=[{fecha:n,texto:"Solicitud recibida en recepción"},{fecha:n,texto:"Carolina no pudo clasificarla: pasa a «Por revisar»"}],[a,s,r]}function mn(){return Tt.filter(n=>n.agenteId)}function In(n){return Tt.filter(e=>!e.agenteId&&e.bandeja&&(!n||e.bandeja===n))}function oh(n){return Hc(n)}function Bc(n,e){Tt=Tt.map(t=>t.id===n?{...t,...e}:t),na()}function xl(n){var i;const e=Xi(),t={id:Xa(),titulo:n.titulo.trim(),descripcion:((i=n.descripcion)==null?void 0:i.trim())||void 0,agenteId:"",area:"direccion",empresaId:n.empresaId,estado:"por_hacer",progreso:0,fecha:e,ejemplo:!1,historial:[{fecha:e,texto:"Solicitud recibida en recepción"}],origen:"recepcion",entrada:e,limite:n.limite||void 0,bandeja:"entrada"};return Tt=[...Tt,t],na(),t}function Sl(n,e){if(di(n)){if(!e.agenteId){Ji(n,{bandeja:"por_revisar",prioridad:e.prioridad,clasificadaPor:e.por},e.nota);return}Ji(n,{agenteId:e.agenteId,estado:"en_curso",progreso:0,prioridad:e.prioridad,empresaId:e.empresaId,bandeja:void 0,clasificada:Xi(),clasificadaPor:e.por},e.nota)}}const ch="mn.reuniones.v1";let Ba=Ty();function Ty(){try{const e=localStorage.getItem(ch);if(e)return JSON.parse(e)}catch{}const n=new Date;return n.setHours(15,0,0,0),[{id:Xa(),titulo:"Revisión semanal con Azahar Coffee",cuando:n.toISOString(),empresaId:"azahar",tipo:"reunion"}]}function lh(){try{localStorage.setItem(ch,JSON.stringify(Ba))}catch{}Br.forEach(n=>n())}function dh(){return[...Ba].sort((n,e)=>n.cuando.localeCompare(e.cuando))}function uh(n){const e={...n,id:Xa()};return Ba=[...Ba,e],lh(),e}function hh(n){Ba=Ba.filter(e=>e.id!==n),lh()}function di(n){return Tt.find(e=>e.id===n)}function fh(n){return Tt.filter(e=>e.agenteId===n)}function zt(n){const e=Tt.filter(t=>t.agenteId===n&&t.estado==="en_curso");if(e.length)return e.sort((t,i)=>Hc(i).localeCompare(Hc(t)))[0]}function ph(n){return Tt.filter(e=>e.agenteId===n&&e.estado==="en_curso").length}function Hc(n){return n.historial.length?n.historial[n.historial.length-1].fecha:n.fecha}function mh(n){const e=n.estado??"por_hacer",t={id:Xa(),titulo:n.titulo.trim(),agenteId:n.agenteId,area:Zr(n.agenteId),empresaId:n.empresaId,estado:e,progreso:e==="hecha"?100:xh(n.progreso??0),fecha:n.fecha??Xi(),ejemplo:!1,historial:[{fecha:Xi(),texto:"Tarea creada y asignada"}],origen:"manual",entrada:Xi()};return Tt=[...Tt,t],na(),t}function Ji(n,e,t){Tt=Tt.map(i=>{if(i.id!==n)return i;const a={...i,...e};e.agenteId&&(a.area=Zr(e.agenteId)),"bandeja"in e&&e.bandeja===void 0&&delete a.bandeja,e.progreso!==void 0&&(a.progreso=xh(e.progreso)),a.estado==="hecha"&&(a.progreso=100);const s=t??(e.estado&&e.estado!==i.estado?`Movida a «${Ry(e.estado)}»`:e.agenteId&&e.agenteId!==i.agenteId?"Reasignada":e.progreso!==void 0&&e.progreso!==i.progreso?`Progreso al ${a.progreso}%`:null);return s&&(a.historial=[...i.historial,{fecha:Xi(),texto:s}]),a}),na()}function Ra(n,e){const t=di(n);!t||t.estado===e||Ji(n,{estado:e,progreso:e==="hecha"?100:e==="por_hacer"?0:t.progreso})}function gh(n){Ji(n,{aprobada:!0},"Aprobada por Felipe")}function yl(n){Ra(n,"hecha")}function Ml(n){Tt=Tt.filter(e=>e.id!==n),na()}function vh(){Tt=Tt.filter(n=>!n.ejemplo),na()}function _h(){Tt=[...Tt.filter(n=>!n.ejemplo),...Mr()],na()}function bh(){return Tt.some(n=>n.ejemplo)}function El(n){return Br.add(n),()=>Br.delete(n)}function xh(n){return Math.max(0,Math.min(100,Math.round(n)))}function Ry(n){return n==="por_hacer"?"Por hacer":n==="en_curso"?"En curso":"Hecha"}const Cy=Object.freeze(Object.defineProperty({__proto__:null,addMeeting:uh,addRequest:xl,addTask:mh,applyClassification:Sl,approveTask:gh,clearExamples:vh,completeTask:yl,countInProgress:ph,currentTask:zt,deleteMeeting:hh,deleteTask:Ml,getMeetings:dh,getRequests:In,getTask:di,getTasks:mn,hasExamples:bh,lastActivity:oh,loadExamples:_h,moveTask:Ra,setMeta:Bc,subscribe:El,tasksOfAgent:fh,updateTask:Ji},Symbol.toStringTag,{value:"Module"})),Zn=new URLSearchParams(location.search).get("empresa")==="azahar",Qd=2.5,Py=["salon","cocina","jardin","cancha","recepcion"];class Iy{constructor(e){this.parent=e,this.runtimes=new Map,this.taken=new Map,this.azTaken=new Map,this.time=0,this.proxMision=4,this.misiones=new Map,this.paquetes=new Map,this.onEntrega=()=>{},this.duty=a=>!!zt(a),this.statusText=()=>null;const t=Yt(),i=[];for(const a of t){const s=new Sy(a);e.add(s.group);const r={id:a.id,def:a,char:s,state:a.id==="felipe"?"ceo":"descansando",path:[],spot:null,deskId:a.puesto,heading:0,nextRotate:0,busy:!1,y:0,segStart:{x:0,z:0,y:0},segLen:0,staff:ys.includes(a.area),returnAt:0,nextBreak:0};this.runtimes.set(a.id,r),a.id==="felipe"?this.placeAtDesk(r,"ceo"):r.staff||zt(a.id)?(this.placeAtDesk(r,this.desiredDesk(r)),r.nextBreak=20+Math.random()*30):i.push(r)}for(const a of i)a.state="afuera",a.char.group.visible=!1;this.sync()}freeSpot(e,t){let i=e?[e]:Py.filter(s=>s!==t);const a=s=>{const r=Ss.filter(c=>c.zone===s),o=r.filter(c=>!this.taken.has(c.id)).length;return o===0?-1:o/r.length+Math.random()*.12};i=i.sort((s,r)=>a(r)-a(s));for(const s of i){const r=Ss.filter(o=>o.zone===s&&!this.taken.has(o.id));if(r.length)return r[Math.floor(Math.random()*r.length)]}return null}release(e){e.spot&&this.taken.delete(e.spot.id),e.spot=null}releaseAz(e){for(const[t,i]of this.azTaken)i===e.id&&this.azTaken.delete(t)}azLeader(){var e;return((e=Yt().find(t=>t.empresa==="azahar"))==null?void 0:e.id)??null}desiredDesk(e){var s;const t=mt(e.id)??e.def;if(e.staff)return t.puesto;if(!(t.empresa==="azahar"||((s=zt(e.id))==null?void 0:s.empresaId)==="azahar"))return this.releaseAz(e),t.puesto;if(e.id===this.azLeader()&&!this.azTaken.has("az-0"))return this.azTaken.set("az-0",e.id),"az-0";for(const[r,o]of this.azTaken)if(o===e.id)return r;const a=S_.find(r=>!this.azTaken.has(r));return a?(this.azTaken.set(a,e.id),a):t.puesto}lvlOf(e){return e.y>pn/2?1:0}place(e,t,i,a,s=0){e.y=s,e.char.group.position.set(t,jd+s,i),e.heading=a,e.char.group.rotation.y=a}placeAtDesk(e,t){const i=ft[t];i&&(this.release(e),e.deskId=t,this.place(e,i.seat.x,i.seat.z,i.heading,i.lvl?pn:0),e.state=e.id==="felipe"?"ceo":"trabajando",e.char.setPose("type"))}placeAtSpot(e,t){this.release(e),e.spot=t,this.taken.set(t.id,e.id),this.place(e,t.x,t.z,t.heading,0),e.state="descansando",e.char.setPose(t.sit?"sit":"stand"),e.nextRotate=this.time+20+Math.random()*25}walkTo(e,t,i,a,s){const r=e.char.group.position;e.path=rr({x:r.x,z:r.z,lvl:this.lvlOf(e)},{x:t,z:i,lvl:a}),e.segStart={x:r.x,z:r.z,y:e.y},this.segLen(e),e.state=s,e.char.setPose("walk")}segLen(e){const t=e.path[0];e.segLen=t?Math.hypot(t.x-e.segStart.x,t.z-e.segStart.z):0}elevatorOf(e){return Nr[Math.floor(Math.abs(e.char.seed*7))%Nr.length]}leave(e){this.release(e),this.releaseAz(e),e.deskId=e.def.puesto;const t=e.char.group.position,i=rr({x:t.x,z:t.z,lvl:this.lvlOf(e)},{x:Ma.x,z:Ma.z,lvl:0});e.path=[...i,{x:this.elevatorOf(e),z:Ur-.3,y:0}],e.segStart={x:t.x,z:t.z,y:e.y},this.segLen(e),e.state="saliendo",e.char.setPose("walk")}enter(e,t){const i=ft[t];i&&(e.char.group.visible=!0,this.place(e,this.elevatorOf(e),Ur-.3,Math.PI,0),e.deskId=t,e.path=[{x:Ma.x,z:Ma.z,y:0},...rr({x:Ma.x,z:Ma.z,lvl:0},{x:i.seat.x,z:i.seat.z,lvl:i.lvl})],e.segStart={x:e.char.group.position.x,z:e.char.group.position.z,y:0},this.segLen(e),e.state="yendo_a_mesa",e.char.setPose("walk"))}routeToDesk(e,t){const i=ft[t];return i?rr({x:e.x,z:e.z,lvl:0},{x:i.seat.x,z:i.seat.z,lvl:i.lvl}):[]}deskOf(e){var t;return((t=this.runtimes.get(e))==null?void 0:t.deskId)??null}isOutside(e){var i;const t=(i=this.runtimes.get(e))==null?void 0:i.state;return t==="afuera"||t==="saliendo"}sync(){for(const e of this.runtimes.values()){if(e.id==="felipe")continue;const t=!!zt(e.id);if(e.busy=t,e.staff)continue;const i=e.state==="trabajando"||e.state==="yendo_a_mesa";if(t){const a=this.desiredDesk(e);if(e.state==="afuera")this.enter(e,a);else if(!i||e.deskId!==a){this.release(e),e.deskId=a;const s=ft[a];s&&this.walkTo(e,s.seat.x,s.seat.z,s.lvl,"yendo_a_mesa")}}else this.releaseAz(e),e.deskId=e.def.puesto,e.state!=="afuera"&&e.state!=="saliendo"&&this.leave(e)}}isWorking(e){const t=this.runtimes.get(e);return!!t&&(t.state==="trabajando"||t.state==="yendo_a_mesa"||t.state==="ceo")}zoneOf(e){var t,i;return((i=(t=this.runtimes.get(e))==null?void 0:t.spot)==null?void 0:i.zone)??null}inAzaharOffice(e){var i;const t=(i=this.runtimes.get(e))==null?void 0:i.deskId;return!!t&&t.startsWith("az-")}activeDesks(){const e=new Set;for(const t of this.runtimes.values())(t.state==="trabajando"&&(!t.staff||this.duty(t.id))||t.state==="ceo")&&e.add(t.deskId);return e}soloAzahar(){const e=new Set(mn().filter(t=>t.empresaId==="azahar"&&t.estado==="en_curso").map(t=>t.agenteId));for(const t of this.runtimes.values())t.def.empresa!=="azahar"&&!e.has(t.id)&&(t.char.group.visible=!1)}update(e){this.actualizar(e),Zn&&this.mensajeros()}puntoJunto(e){const t=ft[e];if(!t)return null;for(const[i,a]of[[1.5,0],[1.5,.9],[1.5,-.9],[0,1.4],[0,-1.4],[-1.5,0]])if(!Uc(t.x+i,t.z+a,1))return{x:t.x+i,z:t.z+a};return null}paquete(e){let t=this.paquetes.get(e.id);if(!t){t=new pe(new at(.34,.06,.24),new Oe({color:16777215}));const i=new pe(new at(.36,.03,.26),new Oe({color:5223359}));i.position.y=-.03,t.add(i),t.scale.setScalar(1.7),t.position.set(0,1.05,.38);const a=new pe(new Wn(.13,16,12),new Oe({color:5223359}));a.position.set(0,1,-.38),t.add(a),e.char.group.add(t),this.paquetes.set(e.id,t)}return t}mensajeros(){var c;for(const[l,d]of this.paquetes){const h=(c=this.runtimes.get(l))==null?void 0:c.state;d.visible=h==="mensajero"||h==="entregando"}if(this.time<this.proxMision||this.misiones.size>=3)return;this.proxMision=this.time+2+Math.random()*2.5;const e=[...this.runtimes.values()].filter(l=>l.state==="trabajando"&&l.char.group.visible&&l.deskId.startsWith("az-")),t=e.filter(l=>l.deskId!=="az-0"&&!this.misiones.has(l.id));if(!t.length)return;const i=t[Math.floor(Math.random()*t.length)],a=e.filter(l=>l!==i&&l.deskId!=="az-0"),r=!a.length||Math.random()<.45?"az-0":a[Math.floor(Math.random()*a.length)].deskId,o=this.puntoJunto(r);o&&(this.misiones.set(i.id,r),this.paquete(i).visible=!0,this.walkTo(i,o.x,o.z,1,"mensajero"))}terminarEntrega(e){const t=this.misiones.get(e.id);this.misiones.delete(e.id),t&&this.onEntrega(t);const i=ft[e.deskId];i&&this.walkTo(e,i.seat.x,i.seat.z,i.lvl,"yendo_a_mesa")}actualizar(e){this.time+=e;const t=[...this.runtimes.values()];for(const i of t){const a=i.char.group;if(i.state!=="afuera"){if(i.staff&&this.staffTick(i),i.state==="entregando"&&this.time>i.returnAt&&this.terminarEntrega(i),i.path.length){const s=i.path[0],r=s.x-a.position.x,o=s.z-a.position.z,c=Math.hypot(r,o),l=Qd*e;if(c<=l)a.position.x=s.x,a.position.z=s.z,i.y=s.y,i.segStart={x:s.x,z:s.z,y:s.y},i.path.shift(),this.segLen(i);else{if(a.position.x+=r/c*l,a.position.z+=o/c*l,i.segLen>.01){const f=Math.hypot(a.position.x-i.segStart.x,a.position.z-i.segStart.z),v=Math.min(1,f/i.segLen);i.y=i.segStart.y+(s.y-i.segStart.y)*v}let h=Math.atan2(r,o)-i.heading;h=Math.atan2(Math.sin(h),Math.cos(h)),i.heading+=h*Math.min(1,e*12);const u=this.lvlOf(i);for(const f of t){if(f===i||Math.abs(f.y-i.y)>1)continue;const v=a.position.x-f.char.group.position.x,b=a.position.z-f.char.group.position.z,m=v*v+b*b;if(m<.55&&m>1e-4){const p=Math.sqrt(m),E=(.74-p)*.5*Math.min(1,e*8),S=a.position.x+v/p*E,w=a.position.z+b/p*E;Uc(S,w,u)||(a.position.x=S,a.position.z=w)}}}a.rotation.y=i.heading,i.path.length||this.arrive(i)}if(i.staff&&i.state==="trabajando"){const s=this.duty(i.id)?"type":"sit";i.char.getPose()!==s&&i.char.setPose(s)}a.position.y=jd+i.y,i.char.animate(this.time+i.char.seed,e,Qd)}}}staffTick(e){const t=this.duty(e.id);if(e.state==="trabajando"&&!t&&this.time>e.nextBreak){const i=this.freeSpot("cocina");e.nextBreak=this.time+40+Math.random()*40,i&&(e.spot=i,this.taken.set(i.id,e.id),this.walkTo(e,i.x,i.z,0,"yendo_a_descanso"),e.returnAt=0)}else if(e.state==="descansando"&&e.spot&&(t||e.returnAt&&this.time>e.returnAt)){this.release(e);const i=ft[e.deskId];i&&this.walkTo(e,i.seat.x,i.seat.z,i.lvl,"yendo_a_mesa")}else if(e.state==="yendo_a_descanso"&&t){this.release(e);const i=ft[e.deskId];i&&this.walkTo(e,i.seat.x,i.seat.z,i.lvl,"yendo_a_mesa")}}arrive(e){if(e.state==="saliendo")e.state="afuera",e.char.group.visible=!1,e.char.setPose("stand");else if(e.state==="mensajero"){const t=ft[this.misiones.get(e.id)??""];t&&(e.heading=Math.atan2(t.x-e.char.group.position.x,t.z-e.char.group.position.z),e.char.group.rotation.y=e.heading),e.state="entregando",e.char.setPose("stand"),e.returnAt=this.time+1.4}else if(e.state==="yendo_a_mesa"){const t=ft[e.deskId];e.heading=t.heading,e.char.group.rotation.y=t.heading,e.y=t.lvl?pn:0,e.state="trabajando",e.char.setPose(e.staff&&!this.duty(e.id)?"sit":"type")}else e.state==="yendo_a_descanso"&&e.spot&&(e.heading=e.spot.heading,e.char.group.rotation.y=e.spot.heading,e.y=0,e.state="descansando",e.char.setPose(e.spot.sit?"sit":"stand"),e.nextRotate=this.time+20+Math.random()*25,e.staff&&(e.returnAt=this.time+7+Math.random()*6))}refreshDefs(){for(const e of Yt()){const t=this.runtimes.get(e.id);t&&(t.def=e)}}}const rs=40,wa=Math.PI/4,Ly=new U(0,1,0),hs=Math.atan2(.88,Math.SQRT2),fr=(n,e=hs)=>new U(Math.cos(e)*Math.sin(n),Math.sin(e),Math.cos(e)*Math.cos(n));class Dy{constructor(e){this.el=e,this.cam=new sl(-1,1,1,-1,-3e3,9e3),this.target=new U,this.goalTarget=new U,this.zoom=1,this.az=wa,this.goalAz=wa,this.pitch=hs,this.goalPitch=hs,this.goalZoom=1,this.minZoom=.5,this.maxZoom=6,this.w=1,this.h=1,this.right=new U,this.up=new U,this.overview={target:new U,zoom:1},this.pointers=new Map,this.lastPinch=0,this.lastAngle=null,this.firstFit=!0,this.cam.position.copy(fr(this.az,this.pitch)).multiplyScalar(150),this.cam.lookAt(0,0,0),this.cam.updateMatrixWorld(),this.updateBasis(),e.addEventListener("wheel",i=>{if(Zn)return;i.preventDefault();const a=Math.exp(-i.deltaY*.0014);this.goalZoom=sa.clamp(this.goalZoom*a,this.minZoom,this.maxZoom)},{passive:!1}),e.addEventListener("pointerdown",i=>{this.pointers.set(i.pointerId,{x:i.clientX,y:i.clientY,rot:i.button===0&&!i.shiftKey}),this.lastPinch=0,this.lastAngle=null});const t=i=>{this.pointers.delete(i.pointerId),this.lastPinch=0,this.lastAngle=null};window.addEventListener("pointerup",t),window.addEventListener("pointercancel",t),window.addEventListener("pointermove",i=>{const a=this.pointers.get(i.pointerId);if(!a)return;if(this.pointers.size>=2){const c=(()=>{const[b,m]=[...this.pointers.values()];return{x:(b.x+m.x)/2,y:(b.y+m.y)/2}})();this.pointers.set(i.pointerId,{x:i.clientX,y:i.clientY,rot:!1});const[l,d]=[...this.pointers.values()],h={x:(l.x+d.x)/2,y:(l.y+d.y)/2},u=this.ppu();this.goalTarget.addScaledVector(this.right,-(h.x-c.x)/u).addScaledVector(this.up,(h.y-c.y)/u),this.ground(this.goalTarget),this.target.copy(this.goalTarget);const f=Math.hypot(l.x-d.x,l.y-d.y);this.lastPinch>0&&!Zn&&(this.goalZoom=sa.clamp(this.goalZoom*(f/this.lastPinch),this.minZoom,this.maxZoom),this.zoom=this.goalZoom),this.lastPinch=f;const v=Math.atan2(d.y-l.y,d.x-l.x);if(this.lastAngle!==null){const b=Math.atan2(Math.sin(v-this.lastAngle),Math.cos(v-this.lastAngle));this.goalAz-=b,this.az=this.goalAz}this.lastAngle=v;return}const s=i.clientX-a.x,r=i.clientY-a.y;if(this.pointers.set(i.pointerId,{x:i.clientX,y:i.clientY,rot:a.rot}),a.rot){this.goalAz-=s*.008,this.az=this.goalAz,this.goalPitch=sa.clamp(this.goalPitch+r*.006,.21,1.48),this.pitch=this.goalPitch;return}const o=this.ppu();this.goalTarget.addScaledVector(this.right,-s/o).addScaledVector(this.up,r/o),this.ground(this.goalTarget),this.target.copy(this.goalTarget)}),e.addEventListener("contextmenu",i=>i.preventDefault())}updateBasis(){const e=this.basisFor(this.az,this.pitch);this.right.copy(e.right),this.up.copy(e.up)}basisFor(e,t=this.goalPitch){const i=fr(e,t).negate(),a=new U().crossVectors(i,Ly).normalize(),s=new U().crossVectors(a,i).normalize();return{right:a,up:s}}ground(e,t=this.goalAz,i=this.goalPitch){const a=fr(t,i);return e.addScaledVector(a,-e.y/a.y)}rotateBy(e){this.goalAz+=e}tiltBy(e){this.goalPitch=sa.clamp(this.goalPitch+e,.21,1.48)}get elevationDeg(){return Math.round(this.pitch*180/Math.PI)}get azimuth(){return this.az}get degrees(){return Math.round((this.az-wa)*180/Math.PI%360+360)%360}ppu(){return this.h/rs*this.zoom}getZoomPpu(){return this.ppu()}resize(e,t){this.w=e,this.h=t,this.computeOverview(),this.apply()}fitPoints(e,t,i=this.goalAz,a=this.goalPitch){const{right:s,up:r}=this.basisFor(i,a);let o=1/0,c=-1/0,l=1/0,d=-1/0;for(const v of e){const b=v.dot(s),m=v.dot(r);o=Math.min(o,b),c=Math.max(c,b),l=Math.min(l,m),d=Math.max(d,m)}const h=this.w/this.h,u=Math.min(h*rs/((c-o)*t),rs/((d-l)*t)),f=this.ground(new U().addScaledVector(s,(o+c)/2).addScaledVector(r,(l+d)/2),i,a);return{zoom:u,target:f}}boxPts(e,t,i,a,s,r=-.9){const o=[];for(const c of[e,i])for(const l of[t,a])for(const d of[r,s])o.push(new U(c,d,l));return o}computeOverview(){const e=[...this.boxPts(qe.x0,qe.z0,qe.x1,62.5,qe.wallH+1.2),...this.boxPts(-19,15,-1,28,pn+qe.wallH+.8)],t=this.fitPoints(e,1.05,wa,hs);this.overview={target:t.target,zoom:t.zoom},this.minZoom=t.zoom*.3,this.maxZoom=t.zoom*9,this.firstFit&&(this.firstFit=!1,this.target.copy(t.target),this.goalTarget.copy(t.target),this.zoom=this.goalZoom=t.zoom)}showOverview(){this.goalPitch=hs,this.goalAz=wa+Math.round((this.goalAz-wa)/(Math.PI*2))*Math.PI*2,this.goalTarget.copy(this.overview.target),this.goalZoom=this.overview.zoom}focusRoom(e){const t=fl.find(a=>a.id===e)??Dt(e),i=t.lvl===1;this.focusRect(t.x-1,t.z-1,t.x+t.w+1,t.z+t.d+1,qe.wallH+(i?pn:0),i?pn-.2:-.9)}focusArea(e){this.focusRoom(e)}focusPoint(e,t,i=70){const a=new U(e,1,t),{right:s,up:r}=this.basisFor(this.goalAz);this.goalTarget.set(0,0,0).addScaledVector(s,a.dot(s)).addScaledVector(r,a.dot(r)),this.ground(this.goalTarget),this.goalZoom=sa.clamp(i*rs/this.h,this.minZoom,this.maxZoom)}focusRect(e,t,i,a,s,r=-.9){const o=this.fitPoints(this.boxPts(e,t,i,a,s,r),1.08);this.goalTarget.copy(o.target),this.goalZoom=sa.clamp(o.zoom,this.minZoom,this.maxZoom)}update(e){const t=1-Math.exp(-e*5);this.target.lerp(this.goalTarget,t),this.zoom*=Math.pow(this.goalZoom/this.zoom,t),this.az+=(this.goalAz-this.az)*(1-Math.exp(-e*6)),this.pitch+=(this.goalPitch-this.pitch)*(1-Math.exp(-e*6)),this.updateBasis(),this.apply()}apply(){const e=this.w/this.h,t=rs/2;this.cam.left=-t*e,this.cam.right=t*e,this.cam.top=t,this.cam.bottom=-t,this.cam.zoom=this.zoom,this.cam.position.copy(this.target).addScaledVector(fr(this.az,this.pitch),150),this.cam.lookAt(this.target),this.cam.updateProjectionMatrix(),this.cam.updateMatrixWorld()}}const oe=n=>n.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Le=(n,e=document)=>e.querySelector(n);function As(n){return qu(n)}function Sh(n){return qu(n,!0)}function Ny(n){const e=new Date(n);return isNaN(e.getTime())?new Date().toISOString().slice(0,10):e.toISOString().slice(0,10)}const eu=[{id:"nomina",nombre:"Nómina",grupo:"modulo",detalle:"Pagos, desprendibles, contratos y vacaciones de los empleados."},{id:"trazabilidad",nombre:"Trazabilidad",grupo:"modulo",detalle:"Finca, beneficiado, tueste, empaque y código QR de cada lote."},{id:"pos",nombre:"Sistema POS",grupo:"modulo",detalle:"Caja, cocina e historial de ventas por tienda."},{id:"contable",nombre:"Gestión Contable",grupo:"modulo",detalle:"Comprobantes, conciliación bancaria, terceros y catálogo."},{id:"estrategica",nombre:"Gestión Estratégica",grupo:"modulo",detalle:"Objetivos de la empresa e indicadores de alto nivel."},{id:"comercial",nombre:"Gestión Comercial",grupo:"modulo",detalle:"Ventas por tienda y estado de las tiendas."},{id:"operativa",nombre:"Gestión Operativa",grupo:"modulo",detalle:"Fincas cafeteras y sus certificados."},{id:"informacion",nombre:"Información General",grupo:"modulo",detalle:"Calendario tributario, indicadores y calculadoras."},{id:"pqr",nombre:"PQR",grupo:"modulo",detalle:"Peticiones, quejas y reclamos de empleados y clientes."},{id:"documentos",nombre:"Documentos",grupo:"modulo",detalle:"Documentos y certificados laborales."},{id:"usuarios",nombre:"Usuarios y Cotiza",grupo:"modulo",detalle:"Gestión de usuarios y «Cotiza tu plan»."},{id:"neon",nombre:"Base de datos",grupo:"integracion",detalle:"Postgres (Neon): empleados, solicitudes, nómina y trazabilidad."},{id:"alegra",nombre:"Alegra",grupo:"integracion",detalle:"Contabilidad en Alegra: el portal la consulta en solo lectura desde el servidor (las claves nunca llegan al navegador). Sin claves, los comprobantes se importan por archivo desde Gestión Contable."},{id:"gemini",nombre:"Asistente IA",grupo:"integracion",detalle:"Asistente de Azahar (Gemini)."},{id:"blob",nombre:"Archivos",grupo:"integracion",detalle:"Almacenamiento de documentos y archivos (Vercel Blob)."},{id:"indicadores",nombre:"Indicadores",grupo:"integracion",detalle:"Indicadores económicos externos."},{id:"metis_acceso",nombre:"Acceso desde Metis",grupo:"metis",detalle:"Inicio de sesión desde la landing de Metis Nexa."},{id:"metis_portal",nombre:"Portal del equipo",grupo:"metis",detalle:"Cotizaciones y tickets hacia el portal de Metis Nexa."}],Uy={ok:"#3ecf8e",falla:"#ef5350",config:"#f5a524",sin_datos:"#8a8f98"},zy={ok:"En línea",falla:"Con falla",config:"Sin verificar",sin_datos:"Sin datos"},os=[{sala:"tecnologia",titulo:"Equipo de desarrollo",ids:["neon","blob","gemini","pos","trazabilidad"]},{sala:"financiera",titulo:"Contabilidad, facturación y Alegra",ids:["alegra","contable","nomina","indicadores"]},{sala:"operaciones",titulo:"Operaciones y clientes",ids:["comercial","operativa","pqr","documentos","usuarios"]},{sala:"ceo",titulo:"Dirección",ids:["estrategica","informacion"]},{sala:"reuniones",titulo:"Enlace con Metis Nexa",ids:["metis_acceso","metis_portal"]}];function Oy(n,e){const a=document.createElement("canvas");a.width=1024,a.height=256;const s=a.getContext("2d");s.fillStyle="#0b2545",s.fillRect(0,0,1024,256),s.strokeStyle="#d9a441",s.lineWidth=10,s.strokeRect(12,12,1e3,232),s.fillStyle="#ffffff",s.textAlign="center",s.textBaseline="middle";let r=78;for(s.font=`700 ${r}px system-ui, sans-serif`;s.measureText(n).width>934&&r>30;)r-=4,s.font=`700 ${r}px system-ui, sans-serif`;s.fillText(n,1024/2,256/2);const o=new cl(a);o.colorSpace=Xt,o.anisotropy=4;const c=new pt,l=Math.min(8,e.w-2),d=l*(256/1024),h=(v,b)=>{const m=new pe(new Ht(l,d),new Oe({map:o}));return m.rotation.y=v,m.position.z=b,m},u=new pe(new at(l+.2,d+.2,.08),new Oe({color:1118481})),f=v=>new pe(new at(.12,1.8,.12),new Oe({color:3355443})).translateX(v).translateY(.9);return c.add(u,h(0,.05),h(Math.PI,-.05)),u.position.y=1.8+d/2,c.children[1].position.y=u.position.y,c.children[2].position.y=u.position.y,c.add(f(-l/2+.3),f(l/2-.3)),c.position.set(e.x+e.w/2,0,e.z+1.1),c}const tu={ok:4116366,falla:15684432,config:16098596,sin_datos:9080728},Fy={modulo:14263361,integracion:5223359,metis:16777215},nu={ok:"En línea",falla:"Con falla",config:"Configurado (sin verificar)",sin_datos:"Sin datos"};class ky{constructor(e,t){this.host=t,this.group=new pt,this.nodos=[],this.t=0,this.v=new U,this.onCambio=null,this.abierto=null,this.visibleLabels=!0,this.actualizado=null,this.onVerificar=null,this.salaVerif=null,this.verifTodas=!1,this.verifMsg="",e.add(this.group);for(const a of os)this.group.add(Oy(a.titulo,Dt(a.sala)));const i=eu.length;eu.forEach((a,s)=>{const r=os.find(v=>v.ids.includes(a.id)),o=Dt((r==null?void 0:r.sala)??"azahar"),c=r?r.ids.indexOf(a.id):0,l=r?r.ids.length:1,d=new U(o.x+(c+1)/(l+1)*o.w,2.6,o.z+o.d*(c%2===0?.34:.68)),h=new pe(new Wn(.24,20,14),new Oe({color:tu.sin_datos}));h.position.copy(d);const u=new pe(new Wn(.42,18,12),new Oe({color:Fy[a.grupo],transparent:!0,opacity:.2,depthWrite:!1}));u.position.copy(d),h.visible=!1,u.visible=!1,this.group.add(h,u);const f=document.createElement("button");f.type="button",f.className="cx",f.dataset.grupo=a.grupo,f.innerHTML=`<i class="dot"></i><span>${oe(a.nombre)}</span>`,f.addEventListener("click",v=>{v.stopPropagation(),this.abrir(a.id)}),f.addEventListener("pointerdown",v=>v.stopPropagation()),t.appendChild(f),this.nodos.push({c:a,mesh:h,halo:u,el:f,pos:d,estado:"sin_datos",fase:s/i})}),this.resumen=document.createElement("div"),this.resumen.className="cx-resumen",t.appendChild(this.resumen),this.detalle=document.createElement("div"),this.detalle.className="cx-detalle",this.detalle.hidden=!0,t.appendChild(this.detalle),this.pintarResumen()}setEstados(e){var t;for(const i of this.nodos){const a=e[i.c.id];i.estado=(a==null?void 0:a.estado)??"sin_datos",i.mesh.material.color.setHex(tu[i.estado]),i.el.dataset.estado=i.estado,i.el.title=`${i.c.nombre}: ${nu[i.estado]}${a!=null&&a.detalle?" · "+a.detalle:""}`,i.nota=a==null?void 0:a.detalle,i.verificada=!!(a!=null&&a.verificada)}this.actualizado=new Date,this.pintarResumen(),(t=this.onCambio)==null||t.call(this),this.abierto&&this.abrir(this.abierto),this.salaVerif!==null&&this.pintarVerificacion()}estadoDeSala(e){var a;const t=(a=os.find(s=>s.sala===e))==null?void 0:a.ids,i=this.nodos.filter(s=>!t||t.includes(s.c.id));for(const s of["falla","config","sin_datos"])if(i.some(r=>r.estado===s))return s;return i.length?"ok":"sin_datos"}pintarResumen(){const e=i=>this.nodos.filter(a=>a.estado===i).length,t=this.actualizado?this.actualizado.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"}):"—";this.resumen.innerHTML=`
      <b>Conexiones de Azahar Portal</b>
      <span><i class="dot ok"></i>${e("ok")} en línea</span>
      <span><i class="dot falla"></i>${e("falla")} con falla</span>
      <span><i class="dot config"></i>${e("config")} sin verificar</span>
      <span><i class="dot sin"></i>${e("sin_datos")} sin datos</span>
      <small>Actualizado ${t}</small>`}abrirVerificacion(e){this.abierto=null,this.salaVerif=e??"",this.verifTodas=!os.some(t=>t.sala===e),this.verifMsg="",this.pintarVerificacion()}pintarVerificacion(){const e=os.find(r=>r.sala===this.salaVerif),t=this.nodos.filter(r=>this.verifTodas||(e==null?void 0:e.ids.includes(r.c.id))),i=t.filter(r=>r.estado==="config"),a=t.filter(r=>r.verificada),s=(r,o)=>{const c=r.nota;return`<li><div><b>${oe(r.c.nombre)}</b><small>${oe(c??r.c.detalle)}</small></div>
        <button type="button" class="cx-verif ${o}" data-id="${oe(r.c.id)}" data-accion="${o}">${o==="verificar"?"Verificar":"Quitar"}</button></li>`};this.detalle.hidden=!1,this.detalle.classList.add("verif"),this.detalle.innerHTML=`
      <button type="button" class="cx-x" aria-label="Cerrar">✕</button>
      <small>${e?oe(e.titulo):"Todas las conexiones"}</small>
      <b>Verificación de conexiones</b>
      ${i.length?`<p>Confirma cada conexión que ya revisaste: pasará a <b>en línea</b> y quedará registrado quién la verificó.</p><ul>${i.map(r=>s(r,"verificar")).join("")}</ul>`:'<p class="est ok"><i class="dot ok"></i>No quedan conexiones sin verificar aquí.</p>'}
      ${a.length?`<small>Verificadas a mano</small><ul>${a.map(r=>s(r,"quitar")).join("")}</ul>`:""}
      ${this.verifMsg?`<p class="est falla">${oe(this.verifMsg)}</p>`:""}`,this.detalle.querySelector(".cx-x").addEventListener("click",()=>this.cerrar()),this.detalle.querySelectorAll(".cx-verif").forEach(r=>r.addEventListener("click",async()=>{var c;r.disabled=!0;const o=await((c=this.onVerificar)==null?void 0:c.call(this,r.dataset.id,r.dataset.accion))??!1;this.verifMsg=o?"":"No se pudo guardar la verificación. Inténtalo de nuevo.",o||this.pintarVerificacion()}))}cerrar(){this.abierto=null,this.salaVerif=null,this.detalle.hidden=!0,this.detalle.classList.remove("verif")}abrir(e){const t=this.nodos.find(s=>s.c.id===e);if(!t)return;this.salaVerif=null,this.detalle.classList.remove("verif"),this.abierto=e;const i=t.nota,a={modulo:"Módulo de Azahar Portal",integracion:"Integración externa",metis:"Conexión con Metis Nexa"}[t.c.grupo];this.detalle.hidden=!1,this.detalle.innerHTML=`
      <button type="button" class="cx-x" aria-label="Cerrar">✕</button>
      <small>${a}</small>
      <b>${oe(t.c.nombre)}</b>
      <p>${oe(t.c.detalle)}</p>
      <p class="est ${t.estado}"><i class="dot ${t.estado==="sin_datos"?"sin":t.estado}"></i>${nu[t.estado]}${i?" · "+oe(i):""}</p>`,this.detalle.querySelector(".cx-x").addEventListener("click",()=>{this.abierto=null,this.detalle.hidden=!0})}entrega(e){}update(e,t,i,a){this.t=e,this.nodos.forEach((s,r)=>{const o=s.pos.y+Math.sin(e*1.3+r*1.9)*.22;if(s.mesh.position.y=o,s.halo.position.y=o,s.halo.scale.setScalar(1+Math.sin(e*2.4+r)*.08),!this.visibleLabels)return;this.v.set(s.pos.x,s.mesh.position.y,s.pos.z).applyMatrix4(this.group.matrixWorld).project(t);const c=(this.v.x*.5+.5)*i,l=(-this.v.y*.5+.5)*a,d=this.v.z>1||c<-100||c>i+100||l<-60||l>a+60;if(s.el.style.display=d?"none":"",d)return;const h=r%2===0;s.el.style.transform=`translate(${c.toFixed(1)}px, ${l.toFixed(1)}px) translate(-50%, ${h?"-135%":"35%"})`,s.el.style.zIndex=String(900+Math.round(l))})}}const By=30;class Hy{constructor(e,t,i){this.host=e,this.ctrl=t,this.items=new Map,this.v=new U,this.selectedId=null,this.hoveredId=null,this.lastDetail=!1,this.k=1,this.alerts=new Set,this.texts=new Map,this.estadoOf=null;for(const a of t.runtimes.values()){const s=document.createElement("div");s.className="lbl",s.innerHTML=`
        <div class="lbl-top"><span class="dot"></span><b class="nm"></b></div>
        <div class="lbl-det"><span class="cg"></span><span class="tk"></span><span class="co"></span>
          <div class="bar"><i></i></div></div>`,s.addEventListener("click",r=>{r.stopPropagation(),i(a.id)}),s.addEventListener("pointerdown",r=>r.stopPropagation()),s.addEventListener("wheel",r=>r.stopPropagation(),{passive:!0}),e.appendChild(s),this.items.set(a.id,{id:a.id,el:s,dot:s.querySelector(".dot"),name:s.querySelector(".nm"),cargo:s.querySelector(".cg"),co:s.querySelector(".co"),task:s.querySelector(".tk"),bar:s.querySelector(".bar i"),barWrap:s.querySelector(".bar"),mode:"min",w:70,h:22})}this.refresh()}refresh(){for(const e of this.items.values()){const t=mt(e.id),i=e.id==="felipe",a=i?void 0:zt(e.id),s=i?0:Math.max(0,ph(e.id)-1);if(e.name.textContent=t.nombre,e.cargo.textContent=t.cargo,e.el.classList.toggle("work",!!a),e.el.classList.toggle("ceo",i),e.dot.style.background=i?"#D9A441":a?"#3ddc84":"#8a8a93",this.estadoOf){const r=this.estadoOf(e.id);e.dot.style.background=Uy[r],e.el.title=zy[r]}if(e.el.style.setProperty("--area",Ue[t.area].color),i)e.co.textContent="",e.task.textContent="Crea y asigna las tareas",e.barWrap.style.display="none";else if(a){e.task.innerHTML=oe(a.titulo)+(s?` <em>+${s}</em>`:""),e.barWrap.style.display="";const r=gn.find(o=>o.id===a.empresaId);e.co.textContent=(r==null?void 0:r.nombre)??"",e.co.style.color=(r==null?void 0:r.color)??"",e.bar.style.width=a.progreso+"%",e.el.setAttribute("title",`${a.titulo} · ${a.progreso}%`)}else if(this.ctrl.statusText(e.id)!==null){const r=this.ctrl.statusText(e.id);this.texts.set(e.id,r),e.task.textContent=r,e.co.textContent="",e.barWrap.style.display="none"}else e.co.textContent="",e.task.textContent="Disponible",e.barWrap.style.display="none",e.el.removeAttribute("title");e.w=0}}setAlerts(e){for(const t of this.items.values()){const i=e.has(t.id);i!==this.alerts.has(t.id)&&t.el.classList.toggle("alert",i)}this.alerts=e}update(e,t,i,a){const s=parseFloat(getComputedStyle(document.documentElement).fontSize)/16||1;if(Math.abs(s-this.k)>.01){this.k=s;for(const l of this.items.values())l.w=0}const r=a>=By*s&&!Zn;if(r!==this.lastDetail){this.lastDetail=r,this.host.classList.toggle("detail",r);for(const l of this.items.values())l.w=0}const o=[],c=[...this.items.values()].sort((l,d)=>this.prio(d.id)-this.prio(l.id));for(const l of c){const d=this.ctrl.runtimes.get(l.id);if(!d.char.group.visible){this.setMode(l,"off");continue}const h=this.ctrl.statusText(l.id);h!==null&&this.texts.get(l.id)!==h&&(this.texts.set(l.id,h),l.task.textContent=h,l.barWrap.style.display="none",l.co.textContent="",l.w=0);const u=d.char.group.position,f=d.state==="trabajando"||d.state==="ceo"||d.char.getPose()==="sit";this.v.set(u.x,u.y+(f?1.85:2.05),u.z).project(e);const v=(this.v.x*.5+.5)*t,b=(-this.v.y*.5+.5)*i;if(this.v.z>1||v<-120||v>t+120||b<-80||b>i+80){this.setMode(l,"off");continue}l.w||(l.el.classList.toggle("full",r),l.w=l.el.offsetWidth||70,l.h=l.el.offsetHeight||22);const m=L=>{const R=L==="full"?l.w:L==="min"?Math.min(l.w,92*this.k):16*this.k,T=L==="full"?l.h:L==="min"?22*this.k:16*this.k;return{x0:v-R/2,x1:v+R/2,y0:b-T,y1:b}},p=L=>o.some(R=>L.x0<R.x1&&L.x1>R.x0&&L.y0<R.y1&&L.y1>R.y0),E=this.selectedId===l.id||this.hoveredId===l.id,S=Zn?["dot"]:r?["full","min","dot"]:["min","dot"];let w=S[S.length-1];for(const L of S)if(E||!p(m(L))){w=L;break}this.setMode(l,w),o.push(m(w)),l.el.style.transform=`translate(${v.toFixed(1)}px, ${b.toFixed(1)}px) translate(-50%, -100%)`,l.el.style.zIndex=String(1e3+Math.round(b)+(E?5e3:0)),l.el.classList.toggle("sel",this.selectedId===l.id)}}prio(e){return(this.selectedId===e?3:0)+(this.hoveredId===e?2:0)+(this.ctrl.isWorking(e)?1:0)}setMode(e,t){e.mode!==t&&(e.mode=t,e.el.style.display=t==="off"?"none":"",e.el.classList.toggle("full",t==="full"),e.el.classList.toggle("dotmode",t==="dot"))}}const Gy={enrutamiento:"carolina",seguimiento:"sofia"},Vy={financiera:"david",tecnologia:"diego",operaciones:"valentina",diseno:"mary"},$y=[{palabras:["conciliacion","conciliar","extracto bancario"],agente:"dora"},{palabras:["nomina","liquidacion","prestaciones"],agente:"patricia"},{palabras:["factura","facturacion","cartera","cobro"],agente:"lorena"},{palabras:["cuentas por pagar","pago a proveedor","proveedores"],agente:"pilar"},{palabras:["impuesto","declaracion","iva","retencion"],agente:"martha"},{palabras:["cierre contable","contabilidad","asiento contable"],agente:"danna"},{palabras:["error en la web","error web","pagina web","formulario web","boton no funciona"],agente:"sebastian"},{palabras:["api","integracion"],agente:"mateo"},{palabras:["base de datos","servidor backend","consulta lenta"],agente:"ivan"},{palabras:["automatizar","automatizacion"],agente:"nelson"},{palabras:["prueba","pruebas","bug"],agente:"anderson"},{palabras:["despliegue","infraestructura","servidor caido"],agente:"luis"},{palabras:["reporte","indicadores","dashboard"],agente:"manuel"},{palabras:["soporte","reclamo","queja"],agente:"lucia"},{palabras:["cotizacion","venta","propuesta comercial"],agente:"diana"},{palabras:["redes sociales","calendario de contenido","campana"],agente:"valeria"},{palabras:["logo","manual de marca","identidad"],agente:"santiago"},{palabras:["video","animacion","motion"],agente:"juan"},{palabras:["presentacion","brochure","catalogo"],agente:"laura"}],Wy={financiera:["finanzas","financiero","contable","presupuesto","pago","banco","tesoreria","costos"],tecnologia:["software","sistema","aplicacion","app","codigo","web","datos","automatizacion","tecnologia"],operaciones:["cliente","proceso","operacion","visita","reunion","contrato","seguimiento","entrega"],diseno:["diseno","grafico","imagen","pieza","marca"]},qy={alta:["urgente","critico","caido","bloqueado","hoy","inmediato","error"],baja:["cuando puedas","sin prisa","opcional","mejora","idea"],diasAlta:2,diasBaja:14},Xy={horasSinAvance:48,horasAntesDelLimite:24,horasParaEscalar:96},Tn={recepcionistas:Gy,lideres:Vy,agentes:$y,areas:Wy,prioridad:qy,seguimiento:Xy},Qi=Tn.recepcionistas.enrutamiento,Jr=Tn.recepcionistas.seguimiento,Er=n=>n.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),cs=(n,e)=>new RegExp("(^|[^a-z0-9])"+Er(e).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).test(n);function jy(n){var c,l,d;const e=Er(`${n.titulo} ${n.descripcion??""}`),t=((c=mt(Qi))==null?void 0:c.nombre)??"Recepción",i=cs(e,"azahar")?"azahar":n.empresaId||"metis",a=n.limite?(new Date(n.limite).getTime()-Date.now())/864e5:null;let s="media";Tn.prioridad.alta.some(h=>cs(e,h))||a!==null&&a<=Tn.prioridad.diasAlta?s="alta":(Tn.prioridad.baja.some(h=>cs(e,h))||a!==null&&a>=Tn.prioridad.diasBaja)&&(s="baja");let r=null;for(const h of Tn.agentes)for(const u of h.palabras)cs(e,u)&&(!r||Er(u).length>r.len)&&(r={agente:h.agente,len:Er(u).length,palabra:u});if(r){const h=bl.find(u=>u.id===r.agente);if(h)return{ok:!0,empresaId:i,area:h.area,agenteId:h.id,prioridad:s,motivo:`Clasificada por ${t} → ${Ue[h.area].corto} · ${((l=mt(h.id))==null?void 0:l.nombre)??h.nombre} («${r.palabra}») · prioridad ${s}`}}const o=Object.entries(Tn.areas).map(([h,u])=>({area:h,n:u.filter(f=>cs(e,f)).length})).filter(h=>h.n>0).sort((h,u)=>u.n-h.n);if(o.length&&(o.length===1||o[0].n>o[1].n)){const h=o[0].area,u=Tn.lideres[h];if(u)return{ok:!0,empresaId:i,area:h,agenteId:u,prioridad:s,motivo:`Clasificada por ${t} → ${Ue[h].corto} · líder ${((d=mt(u))==null?void 0:d.nombre)??u} · prioridad ${s}`}}return{ok:!1,empresaId:i,prioridad:s,motivo:`${t} no pudo clasificarla: pasa a «Por revisar»`}}function ea(){const n=[],e=Date.now();for(const t of mn()){if(t.estado==="hecha")continue;const i=(e-new Date(oh(t)).getTime())/36e5,a=t.limite?(new Date(t.limite).getTime()+864e5-e)/36e5:null,s=a!==null&&a<=Tn.seguimiento.horasAntesDelLimite;i>Tn.seguimiento.horasSinAvance?n.push({tarea:t,agenteId:t.agenteId,horasSinAvance:Math.round(i),motivo:"sin_avance"}):s&&n.push({tarea:t,agenteId:t.agenteId,horasSinAvance:Math.round(i),motivo:"cerca_limite"})}return n}function Yy(){const n=new Map;for(const e of ea())n.has(e.agenteId)||n.set(e.agenteId,e);return n}const Hr=class Hr{constructor(){this.actual=null,this.onEnvio=()=>{},this.t=0,this.proximoRepaso=0,this.sig=0,this.cambiaEn=0,El(()=>this.limpiar())}limpiar(){var e;this.actual&&!((e=di(this.actual.id))!=null&&e.bandeja)&&(this.actual=null)}pendientes(){return In("entrada").length}tituloActual(){var e;return this.actual?((e=di(this.actual.id))==null?void 0:e.titulo)??null:null}atrasoActual(){const e=ea();return e.length?e[this.sig%e.length]:null}update(e,t=!0){if(this.t+=e,t)if(this.actual){if(this.actual.resta-=e,this.actual.resta<=0){const i=this.actual.id;this.actual=null;const a=di(i);if(a&&a.bandeja==="entrada"){const s=jy({titulo:a.titulo,descripcion:a.descripcion,empresaId:a.empresaId,limite:a.limite});Sl(i,{agenteId:s.ok?s.agenteId:void 0,prioridad:s.prioridad,empresaId:s.empresaId,nota:s.motivo,por:Qi}),s.ok&&s.agenteId&&this.onEnvio({tareaId:i,agenteId:s.agenteId})}}}else{const i=In("entrada").sort((a,s)=>(a.entrada??"").localeCompare(s.entrada??""))[0];i&&(this.actual={id:i.id,resta:Hr.CLASIFICAR_S})}if(this.t>=this.cambiaEn&&(this.cambiaEn=this.t+8,this.sig++),this.t>=this.proximoRepaso){this.proximoRepaso=this.t+6;for(const i of ea()){const a=i.tarea;(a.recordada?(Date.now()-new Date(a.recordada).getTime())/36e5:1/0)>24&&Bc(a.id,{recordada:new Date().toISOString()}),!a.escalada&&i.horasSinAvance>Tn.seguimiento.horasParaEscalar&&Bc(a.id,{escalada:!0})}}}};Hr.CLASIFICAR_S=4.5;let Gc=Hr;function Ky(n,e){var t;if(n===Qi){const i=e.tituloActual();return i?`Clasificando: ${i}`:e.pendientes()?"Recibiendo solicitudes":"Recepción disponible"}if(n===Jr){const i=e.atrasoActual();return i?`Seguimiento: ${((t=mt(i.agenteId))==null?void 0:t.nombre)??i.agenteId}`:"Recepción disponible"}return null}class Zy{constructor(e,t){this.host=e,this.scene=new Uu,this.envRT=null,this.clock=new v_,this.ray=new __,this.ptr=new Be,this.down=null,this.frames=0,this.mostrador=new Gc,this.envelopes=[],this.envMat={paper:new Oe({color:14263361}),flap:new Oe({color:16777215}),beam:new Oe({color:14263361,transparent:!0,opacity:.55})},this.slow=0,this.elevOpen=[0,0,0],this.onAgent=()=>{},this.onBoard=()=>{},this.onHub=()=>{},this.conexiones=null,this.renderer=new s_({antialias:!0,alpha:Zn,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=su,this.renderer.outputColorSpace=Xt,this.renderer.toneMapping=ru,this.renderer.toneMappingExposure=1.12,e.appendChild(this.renderer.domElement),this.amb=new g_(16777215,.55),this.hemi=new h_(14674687,8022616,.7),this.sun=new m_(16773592,1.35),this.sun.position.set(18,78,66),this.sun.target.position.set(23,0,31),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(4096,4096);const i=this.sun.shadow.camera;i.left=-62,i.right=62,i.top=58,i.bottom=-58,i.near=1,i.far=260,this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.04,this.scene.add(this.amb,this.hemi,this.sun,this.sun.target),this.rig=new Dy(e),this.sky=hy(),this.scene.add(this.sky.dome),this.pmrem=new Lc(this.renderer),this.backdrop=cy(),this.scene.add(this.backdrop.group),this.scene.fog=this.backdrop.fog,this.campus=iy(),this.scene.add(this.campus.group),this.agents=new Iy(this.scene),this.agents.duty=s=>s===Qi?this.mostrador.pendientes()>0:s===Jr?ea().length>0:!!zt(s),this.agents.statusText=s=>Ky(s,this.mostrador),this.mostrador.onEnvio=s=>this.sendEnvelope(s),this.labels=new Hy(t,this.agents,s=>this.onAgent(s)),this.refreshBoard(),Zn&&this.aislarAzahar(t),window.addEventListener("resize",()=>this.resize()),this.resize();const a=this.renderer.domElement;a.addEventListener("pointerdown",s=>this.down={x:s.clientX,y:s.clientY}),a.addEventListener("pointerup",s=>{if(!this.down)return;const r=Math.hypot(s.clientX-this.down.x,s.clientY-this.down.y);this.down=null,r<5&&s.button===0&&this.pick(s)}),a.addEventListener("pointermove",s=>{const r=this.hit(s);a.style.cursor=r?"pointer":"default",this.labels.hoveredId=r&&r!=="board"&&r!=="hub"?r:null}),this.renderer.setAnimationLoop(()=>this.frame())}aislarAzahar(e){this.backdrop.group.visible=!1,this.sky.dome.visible=!1,this.scene.fog=null;const t=document.createElement("div");t.id="conexiones",(e.parentElement??e).appendChild(t),this.conexiones=new ky(this.scene,t),this.agents.onEntrega=i=>{var a;return(a=this.conexiones)==null?void 0:a.entrega(i)},this.labels.estadoOf=i=>{var s;const a=this.agents.deskOf(i);return this.conexiones.estadoDeSala(a?(s=ft[a])==null?void 0:s.room:void 0)},this.conexiones.onCambio=()=>this.labels.refresh(),this.labels.refresh(),this.rig.showOverview()}salaDe(e){var i;const t=this.agents.deskOf(e);return t?(i=ft[t])==null?void 0:i.room:void 0}setTheme(e){var i;const t=e==="dark";this.sky.setTheme(e),this.scene.background=this.sky.fogColor.clone(),Zn&&(this.scene.background=null),this.backdrop.fog.color.copy(this.sky.fogColor),(i=this.envRT)==null||i.dispose(),this.envRT=this.pmrem.fromScene(this.sky.envScene),this.backdrop.setEnv(this.envRT.texture),this.sun.color.set(t?16765600:16770756),this.amb.intensity=t?.55:.62,this.hemi.intensity=t?.7:.75,this.sun.intensity=t?1.3:1.35,this.campus.setTheme(e),this.backdrop.setTheme(e)}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;this.renderer.setSize(e,t),this.rig.resize(e,t)}refreshBoard(){this.campus.board.update(mn())}hit(e){const t=this.renderer.domElement.getBoundingClientRect();this.ptr.set((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),this.ray.setFromCamera(this.ptr,this.rig.cam);const i=[this.campus.board.mesh,this.campus.hub];for(const s of this.agents.runtimes.values())s.char.group.visible&&i.push(s.char.group);const a=this.ray.intersectObjects(i,!0);for(const s of a){let r=s.object;for(;r;){if(r.userData.agentId)return r.userData.agentId;if(r.userData.board)return"board";if(r.userData.hub)return"hub";r=r.parent}}return null}pick(e){const t=this.hit(e);t==="board"?this.onBoard():t==="hub"?this.onHub():t&&this.onAgent(t)}overview(){this.rig.showOverview()}focusRoom(e){this.rig.focusRoom(e)}focusArea(e){this.rig.focusArea(e)}focusAgent(e){const t=this.agents.runtimes.get(e);if(!t)return;const i=t.char.group.position;this.rig.focusPoint(i.x,i.z,80)}sendEnvelope(e){const t=this.agents.deskOf(e.agenteId);if(!t||!ft[t])return;const i={x:ft["rec-1"].x,z:Dr+1.3},a=this.agents.routeToDesk({x:31.5,z:53.6},t),s=ft[t],r=[{x:i.x,z:i.z,y:0},{x:31.5,z:53.6,y:0},...a,{x:s.x,z:s.z,y:s.lvl?4.4:0}],o=new pt,c=new pe(new at(.5,.06,.34),this.envMat.paper),l=new pe(new at(.5,.08,.09),this.envMat.flap);l.position.z=-.1;const d=new pe(new Vn(.025,.025,1.4,6),this.envMat.beam);d.position.y=-.7/2.6*2.6/2.6,d.scale.setScalar(1/2.6),d.position.y=-.27,o.add(c,l,d),o.scale.setScalar(2.6),o.position.set(i.x,1.45,i.z),this.scene.add(o),this.envelopes.push({mesh:o,pts:r,i:1,t0:this.clock.elapsedTime})}tickEnvelopes(e,t){for(const a of this.envelopes){const s=a.mesh,r=a.pts[a.i];if(!r)continue;const o=r.x-s.position.x,c=r.z-s.position.z,l=Math.hypot(o,c),d=6.5*e;l<=d?(s.position.x=r.x,s.position.z=r.z,a.i++):(s.position.x+=o/l*d,s.position.z+=c/l*d,s.rotation.y=Math.atan2(o,c));const h=(r.y??0)+1.55+Math.sin((t-a.t0)*8)*.12;s.position.y+=(h-s.position.y)*Math.min(1,e*8)}const i=this.envelopes.filter(a=>a.i>=a.pts.length);for(const a of i)this.scene.remove(a.mesh);i.length&&(this.envelopes=this.envelopes.filter(a=>a.i<a.pts.length))}refreshQueue(){const e=In("entrada"),t=In("por_revisar"),i=[...e.map(a=>{var s;return{titulo:a.titulo,estado:((s=this.mostrador.actual)==null?void 0:s.id)===a.id?"clasificando":"espera"}}),...t.map(a=>({titulo:a.titulo,estado:"revisar"}))].sort((a,s)=>a.estado==="clasificando"?-1:s.estado==="clasificando"?1:0);this.campus.queue.update(i,e.length,t.length)}frame(){var l,d;const e=Math.min(this.clock.getDelta(),.1),t=this.clock.elapsedTime;this.mostrador.update(e,((l=this.agents.runtimes.get(Qi))==null?void 0:l.state)==="trabajando"),this.agents.update(e),this.tickEnvelopes(e,t),this.campus.animate(t);const i=[0,0,0];for(const h of this.agents.runtimes.values()){if(!h.char.group.visible)continue;const u=h.char.group.position;u.z<Ur-3.2||Nr.forEach((f,v)=>{Math.abs(u.x-f)<1.9&&(i[v]=1)})}this.elevOpen=this.elevOpen.map((h,u)=>h+(i[u]-h)*Math.min(1,e*5)),this.campus.setElevators(this.elevOpen),this.sky.dome.position.copy(this.rig.cam.position);const a=this.renderer.getDrawingBufferSize(new Be);this.sky.update(this.rig.cam,a.x,a.y);const s=this.rig.azimuth,r=h=>Math.max(0,Math.min(1,h));this.campus.setCut(r((-Math.cos(s)+.1)/.5),r((-Math.sin(s)+.1)/.5)),this.slow+=e,this.slow>.6&&(this.slow=0,this.labels.setAlerts(new Set(Yy().keys())),this.refreshQueue());const o=this.agents.activeDesks();for(const[h,u]of Object.entries(this.campus.screens))u.update(o.has(h),t);this.rig.update(e),this.renderer.render(this.scene,this.rig.cam);const c=this.renderer.domElement;this.labels.update(this.rig.cam,c.clientWidth,c.clientHeight,this.rig.getZoomPpu()),(d=this.conexiones)==null||d.update(t,this.rig.cam,c.clientWidth,c.clientHeight),this.frames++}get frameCount(){return this.frames}bounds(){return qe}}const Jy=[{id:"bio-research:instrument-data-to-allotrope",nombre:"Instrument data to allotrope",descripcion:"Convert laboratory instrument output files (PDF, CSV, Excel, TXT) to Allotrope Simple Model (ASM) JSON format or flattened 2D CSV.",categoria:"bio-research"},{id:"bio-research:nextflow-development",nombre:"Nextflow development",descripcion:"Run nf-core bioinformatics pipelines (rnaseq, sarek, atacseq) on sequencing data.",categoria:"bio-research"},{id:"bio-research:scientific-problem-selection",nombre:"Scientific problem selection",descripcion:"This skill should be used when scientists need help with research problem selection, project ideation, troubleshooting stuck projects, or strategic scientific d",categoria:"bio-research"},{id:"bio-research:scvi-tools",nombre:"Scvi tools",descripcion:"Deep learning for single-cell analysis using scvi-tools.",categoria:"bio-research"},{id:"bio-research:single-cell-rna-qc",nombre:"Single cell rna qc",descripcion:"Performs quality control on single-cell RNA-seq data (.h5ad or .h5 files) using scverse best practices with MAD-based filtering and comprehensive visualizations",categoria:"bio-research"},{id:"bio-research:start",nombre:"Start",descripcion:"Set up your bio-research environment and explore available tools.",categoria:"bio-research"},{id:"cowork-plugin-management:cowork-plugin-customizer",nombre:"Cowork plugin customizer",descripcion:"Customize a Claude Code plugin for a specific organization's tools and workflows.",categoria:"cowork-plugin-management"},{id:"cowork-plugin-management:create-cowork-plugin",nombre:"Create cowork plugin",descripcion:"Guide users through creating a new plugin from scratch in a cowork session.",categoria:"cowork-plugin-management"},{id:"customer-support:customer-escalation",nombre:"Customer escalation",descripcion:"Package an escalation for engineering, product, or leadership with full context.",categoria:"customer-support"},{id:"customer-support:customer-research",nombre:"Customer research",descripcion:"Multi-source research on a customer question or topic with source attribution.",categoria:"customer-support"},{id:"customer-support:draft-response",nombre:"Draft response",descripcion:"Draft a professional customer-facing response tailored to the situation and relationship.",categoria:"customer-support"},{id:"customer-support:kb-article",nombre:"Kb article",descripcion:"Draft a knowledge base article from a resolved issue or common question.",categoria:"customer-support"},{id:"customer-support:ticket-triage",nombre:"Ticket triage",descripcion:"Triage and prioritize a support ticket or customer issue.",categoria:"customer-support"},{id:"data:analyze",nombre:"Analyze",descripcion:"Answer data questions -- from quick lookups to full analyses.",categoria:"data"},{id:"data:build-dashboard",nombre:"Build dashboard",descripcion:"Build an interactive HTML dashboard with charts, filters, and tables.",categoria:"data"},{id:"data:create-viz",nombre:"Create viz",descripcion:"Create publication-quality visualizations with Python.",categoria:"data"},{id:"data:data-context-extractor",nombre:"Data context extractor",descripcion:"Generate or improve a company-specific data analysis skill by extracting tribal knowledge from analysts.",categoria:"data"},{id:"data:data-visualization",nombre:"Data visualization",descripcion:"Create effective data visualizations with Python (matplotlib, seaborn, plotly).",categoria:"data"},{id:"data:explore-data",nombre:"Explore data",descripcion:"Profile and explore a dataset to understand its shape, quality, and patterns.",categoria:"data"},{id:"data:sql-queries",nombre:"Sql queries",descripcion:"Write correct, performant SQL across all major data warehouse dialects (Snowflake, BigQuery, Databricks, PostgreSQL, etc.).",categoria:"data"},{id:"data:statistical-analysis",nombre:"Statistical analysis",descripcion:"Apply statistical methods including descriptive stats, trend analysis, outlier detection, and hypothesis testing.",categoria:"data"},{id:"data:validate-data",nombre:"Validate data",descripcion:"QA an analysis before sharing -- methodology, accuracy, and bias checks.",categoria:"data"},{id:"data:write-query",nombre:"Write query",descripcion:"Write optimized SQL for your dialect with best practices.",categoria:"data"},{id:"design:accessibility-review",nombre:"Accessibility review",descripcion:"Run a WCAG 2.1 AA accessibility audit on a design or page.",categoria:"design"},{id:"design:design-critique",nombre:"Design critique",descripcion:"Get structured design feedback on usability, hierarchy, and consistency.",categoria:"design"},{id:"design:design-handoff",nombre:"Design handoff",descripcion:"Generate developer handoff specs from a design.",categoria:"design"},{id:"design:design-system",nombre:"Design system",descripcion:"Audit, document, or extend your design system.",categoria:"design"},{id:"design:research-synthesis",nombre:"Research synthesis",descripcion:"Synthesize user research into themes, insights, and recommendations.",categoria:"design"},{id:"design:user-research",nombre:"User research",descripcion:"Plan, conduct, and synthesize user research.",categoria:"design"},{id:"design:ux-copy",nombre:"Ux copy",descripcion:"Write or review UX copy — microcopy, error messages, empty states, CTAs.",categoria:"design"},{id:"engineering:architecture",nombre:"Architecture",descripcion:"Create or evaluate an architecture decision record (ADR).",categoria:"engineering"},{id:"engineering:code-review",nombre:"Code review",descripcion:"Review code changes for security, performance, and correctness.",categoria:"engineering"},{id:"engineering:debug",nombre:"Debug",descripcion:"Structured debugging session — reproduce, isolate, diagnose, and fix.",categoria:"engineering"},{id:"engineering:deploy-checklist",nombre:"Deploy checklist",descripcion:"Pre-deployment verification checklist.",categoria:"engineering"},{id:"engineering:documentation",nombre:"Documentation",descripcion:"Write and maintain technical documentation.",categoria:"engineering"},{id:"engineering:incident-response",nombre:"Incident response",descripcion:"Run an incident response workflow — triage, communicate, and write postmortem.",categoria:"engineering"},{id:"engineering:standup",nombre:"Standup",descripcion:"Generate a standup update from recent activity.",categoria:"engineering"},{id:"engineering:system-design",nombre:"System design",descripcion:"Design systems, services, and architectures.",categoria:"engineering"},{id:"engineering:tech-debt",nombre:"Tech debt",descripcion:"Identify, categorize, and prioritize technical debt.",categoria:"engineering"},{id:"engineering:testing-strategy",nombre:"Testing strategy",descripcion:"Design test strategies and test plans.",categoria:"engineering"},{id:"enterprise-search:digest",nombre:"Digest",descripcion:"Generate a daily or weekly digest of activity across all connected sources.",categoria:"enterprise-search"},{id:"enterprise-search:knowledge-synthesis",nombre:"Knowledge synthesis",descripcion:"Combines search results from multiple sources into coherent, deduplicated answers with source attribution.",categoria:"enterprise-search"},{id:"enterprise-search:search-strategy",nombre:"Search strategy",descripcion:"Query decomposition and multi-source search orchestration.",categoria:"enterprise-search"},{id:"enterprise-search:search",nombre:"Search",descripcion:"Search across all connected sources in one query.",categoria:"enterprise-search"},{id:"enterprise-search:source-management",nombre:"Source management",descripcion:"Manages connected MCP sources for enterprise search.",categoria:"enterprise-search"},{id:"finance:audit-support",nombre:"Audit support",descripcion:"Support SOX 404 compliance with control testing methodology, sample selection, and documentation standards.",categoria:"finance"},{id:"finance:close-management",nombre:"Close management",descripcion:"Manage the month-end close process with task sequencing, dependencies, and status tracking.",categoria:"finance"},{id:"finance:financial-statements",nombre:"Financial statements",descripcion:"Generate financial statements (income statement, balance sheet, cash flow) with period-over-period comparison and variance analysis.",categoria:"finance"},{id:"finance:journal-entry-prep",nombre:"Journal entry prep",descripcion:"Prepare journal entries with proper debits, credits, and supporting documentation for month-end close.",categoria:"finance"},{id:"finance:journal-entry",nombre:"Journal entry",descripcion:"Prepare journal entries with proper debits, credits, and supporting detail.",categoria:"finance"},{id:"finance:reconciliation",nombre:"Reconciliation",descripcion:"Reconcile accounts by comparing GL balances to subledgers, bank statements, or third-party data.",categoria:"finance"},{id:"finance:sox-testing",nombre:"Sox testing",descripcion:"Generate SOX sample selections, testing workpapers, and control assessments.",categoria:"finance"},{id:"finance:variance-analysis",nombre:"Variance analysis",descripcion:"Decompose financial variances into drivers with narrative explanations and waterfall analysis.",categoria:"finance"},{id:"human-resources:comp-analysis",nombre:"Comp analysis",descripcion:"Analyze compensation — benchmarking, band placement, and equity modeling.",categoria:"human-resources"},{id:"human-resources:draft-offer",nombre:"Draft offer",descripcion:"Draft an offer letter with comp details and terms.",categoria:"human-resources"},{id:"human-resources:interview-prep",nombre:"Interview prep",descripcion:"Create structured interview plans with competency-based questions and scorecards.",categoria:"human-resources"},{id:"human-resources:onboarding",nombre:"Onboarding",descripcion:"Generate an onboarding checklist and first-week plan for a new hire.",categoria:"human-resources"},{id:"human-resources:org-planning",nombre:"Org planning",descripcion:"Headcount planning, org design, and team structure optimization.",categoria:"human-resources"},{id:"human-resources:people-report",nombre:"People report",descripcion:"Generate headcount, attrition, diversity, or org health reports.",categoria:"human-resources"},{id:"human-resources:performance-review",nombre:"Performance review",descripcion:"Structure a performance review with self-assessment, manager template, and calibration prep.",categoria:"human-resources"},{id:"human-resources:policy-lookup",nombre:"Policy lookup",descripcion:"Find and explain company policies in plain language.",categoria:"human-resources"},{id:"human-resources:recruiting-pipeline",nombre:"Recruiting pipeline",descripcion:"Track and manage recruiting pipeline stages.",categoria:"human-resources"},{id:"legal:brief",nombre:"Brief",descripcion:"Generate contextual briefings for legal work — daily summary, topic research, or incident response.",categoria:"legal"},{id:"legal:compliance-check",nombre:"Compliance check",descripcion:"Run a compliance check on a proposed action, product feature, or business initiative, surfacing applicable regulations, required approvals, and risk areas.",categoria:"legal"},{id:"legal:legal-response",nombre:"Legal response",descripcion:"Generate a response to a common legal inquiry using configured templates, with built-in escalation checks for situations that shouldn't use a templated reply.",categoria:"legal"},{id:"legal:legal-risk-assessment",nombre:"Legal risk assessment",descripcion:"Assess and classify legal risks using a severity-by-likelihood framework with escalation criteria.",categoria:"legal"},{id:"legal:meeting-briefing",nombre:"Meeting briefing",descripcion:"Prepare structured briefings for meetings with legal relevance and track resulting action items.",categoria:"legal"},{id:"legal:review-contract",nombre:"Review contract",descripcion:"Review a contract against your organization's negotiation playbook — flag deviations, generate redlines, provide business impact analysis.",categoria:"legal"},{id:"legal:signature-request",nombre:"Signature request",descripcion:"Prepare and route a document for e-signature — run a pre-signature checklist, configure signing order, and send for execution.",categoria:"legal"},{id:"legal:triage-nda",nombre:"Triage nda",descripcion:"Rapidly triage an incoming NDA and classify it as GREEN (standard approval), YELLOW (counsel review), or RED (full legal review).",categoria:"legal"},{id:"legal:vendor-check",nombre:"Vendor check",descripcion:"Check the status of existing agreements with a vendor across all connected systems — CLM, CRM, email, and document storage — with gap analysis and upcoming dead",categoria:"legal"},{id:"marketing:brand-review",nombre:"Brand review",descripcion:"Review content against your brand voice, style guide, and messaging pillars, flagging deviations by severity with specific before/after fixes.",categoria:"marketing"},{id:"marketing:campaign-plan",nombre:"Campaign plan",descripcion:"Generate a full campaign brief with objectives, audience, messaging, channel strategy, content calendar, and success metrics.",categoria:"marketing"},{id:"marketing:competitive-brief",nombre:"Competitive brief",descripcion:"Research competitors and generate a positioning and messaging comparison with content gaps, opportunities, and threats.",categoria:"marketing"},{id:"marketing:content-creation",nombre:"Content creation",descripcion:"Draft marketing content across channels — blog posts, social media, email newsletters, landing pages, press releases, and case studies.",categoria:"marketing"},{id:"marketing:draft-content",nombre:"Draft content",descripcion:"Draft blog posts, social media, email newsletters, landing pages, press releases, and case studies with channel-specific formatting and SEO recommendations.",categoria:"marketing"},{id:"marketing:email-sequence",nombre:"Email sequence",descripcion:"Design and draft multi-email sequences with full copy, timing, branching logic, exit conditions, and performance benchmarks.",categoria:"marketing"},{id:"marketing:performance-report",nombre:"Performance report",descripcion:"Build a marketing performance report with key metrics, trend analysis, wins and misses, and prioritized optimization recommendations.",categoria:"marketing"},{id:"marketing:seo-audit",nombre:"Seo audit",descripcion:"Run a comprehensive SEO audit — keyword research, on-page analysis, content gaps, technical checks, and competitor comparison.",categoria:"marketing"},{id:"operations:capacity-plan",nombre:"Capacity plan",descripcion:"Plan resource capacity — workload analysis and utilization forecasting.",categoria:"operations"},{id:"operations:change-request",nombre:"Change request",descripcion:"Create a change management request with impact analysis and rollback plan.",categoria:"operations"},{id:"operations:compliance-tracking",nombre:"Compliance tracking",descripcion:"Track compliance requirements and audit readiness.",categoria:"operations"},{id:"operations:process-doc",nombre:"Process doc",descripcion:"Document a business process — flowcharts, RACI, and SOPs.",categoria:"operations"},{id:"operations:process-optimization",nombre:"Process optimization",descripcion:"Analyze and improve business processes.",categoria:"operations"},{id:"operations:risk-assessment",nombre:"Risk assessment",descripcion:"Identify, assess, and mitigate operational risks.",categoria:"operations"},{id:"operations:runbook",nombre:"Runbook",descripcion:"Create or update an operational runbook for a recurring task or procedure.",categoria:"operations"},{id:"operations:status-report",nombre:"Status report",descripcion:"Generate a status report with KPIs, risks, and action items.",categoria:"operations"},{id:"operations:vendor-review",nombre:"Vendor review",descripcion:"Evaluate a vendor — cost analysis, risk assessment, and recommendation.",categoria:"operations"},{id:"pdf-viewer:view-pdf",nombre:"View pdf",descripcion:"Interactive PDF viewer.",categoria:"pdf-viewer"},{id:"product-management:competitive-brief",nombre:"Competitive brief",descripcion:"Create a competitive analysis brief for one or more competitors or a feature area.",categoria:"product-management"},{id:"product-management:metrics-review",nombre:"Metrics review",descripcion:"Review and analyze product metrics with trend analysis and actionable insights.",categoria:"product-management"},{id:"product-management:product-brainstorming",nombre:"Product brainstorming",descripcion:"Brainstorm product ideas, explore problem spaces, and challenge assumptions as a thinking partner.",categoria:"product-management"},{id:"product-management:roadmap-update",nombre:"Roadmap update",descripcion:"Update, create, or reprioritize your product roadmap.",categoria:"product-management"},{id:"product-management:sprint-planning",nombre:"Sprint planning",descripcion:"Plan a sprint — scope work, estimate capacity, set goals, and draft a sprint plan.",categoria:"product-management"},{id:"product-management:stakeholder-update",nombre:"Stakeholder update",descripcion:"Generate a stakeholder update tailored to audience and cadence.",categoria:"product-management"},{id:"product-management:synthesize-research",nombre:"Synthesize research",descripcion:"Synthesize user research from interviews, surveys, and feedback into structured insights.",categoria:"product-management"},{id:"product-management:write-spec",nombre:"Write spec",descripcion:"Write a feature spec or PRD from a problem statement or feature idea.",categoria:"product-management"},{id:"productivity:memory-management",nombre:"Memory management",descripcion:"Two-tier memory system that makes Claude a true workplace collaborator.",categoria:"productivity"},{id:"productivity:start",nombre:"Start",descripcion:"Initialize the productivity system and open the dashboard.",categoria:"productivity"},{id:"productivity:task-management",nombre:"Task management",descripcion:"Simple task management using a shared TASKS.md file.",categoria:"productivity"},{id:"productivity:update",nombre:"Update",descripcion:"Sync tasks and refresh memory from your current activity.",categoria:"productivity"},{id:"sales:account-context",nombre:"Account context",descripcion:"360-degree view of an account - CRM data, recent email threads, docs, transcripts, and internal chat chatter, synthesized into one brief.",categoria:"sales"},{id:"sales:account-plan",nombre:"Account plan",descripcion:"Build or refresh a strategic account plan - current state, goals, stakeholder coverage, opportunity map, risks, and the action plan - written to a doc and key f",categoria:"sales"},{id:"sales:account-research",nombre:"Account research",descripcion:"Research a target company and optionally a specific contact - company overview, recent news, likely priorities, and fit against your ICP.",categoria:"sales"},{id:"sales:account-tiering",nombre:"Account tiering",descripcion:"Score and tier a list of accounts (or your full book) against ICP fit and engagement signals to prioritize where to spend time.",categoria:"sales"},{id:"sales:call-prep",nombre:"Call prep",descripcion:"Pre-call brief for an upcoming meeting - attendees, account history, prior call context from transcripts, open opportunity status, and suggested discovery quest",categoria:"sales"},{id:"sales:call-summary",nombre:"Call summary",descripcion:"Turn a call transcript or call notes into a customer follow-up email draft, an internal chat summary, and proposed CRM updates.",categoria:"sales"},{id:"sales:close-plan",nombre:"Close plan",descripcion:"Build the business case and mutual action plan for a deal - the why-buy/why-now story, the ROI framing, and the dated step-by-step path to signature shared with",categoria:"sales"},{id:"sales:competitive-intelligence",nombre:"Competitive intelligence",descripcion:"Competitive analysis two ways - the in-deal play against a named competitor, and win/loss patterns, competitor mentions, and battlecards across the book.",categoria:"sales"},{id:"sales:create-an-asset",nombre:"Create an asset",descripcion:"Build a customer deck, one-pager or leave-behind from your account data, call notes and approved materials, with no made-up numbers.",categoria:"sales"},{id:"sales:crm-hygiene-check",nombre:"Crm hygiene check",descripcion:"Read-only audit of your CRM opportunities for missing fields, stale dates, and stage mismatches - outputs a fix checklist to apply by hand or through update-opp",categoria:"sales"},{id:"sales:customer-health",nombre:"Customer health",descripcion:"Health check on a customer account and QBR-ready prep - relationship strength, engagement trend, risk signals, value delivered, and the agenda that makes the re",categoria:"sales"},{id:"sales:customer-voice",nombre:"Customer voice",descripcion:"Surface what customers are actually saying - direct attributed quotes on a topic across call transcripts and email, across your accounts.",categoria:"sales"},{id:"sales:daily-briefing",nombre:"Daily briefing",descripcion:"Morning rundown - today's meetings with account context, opps closing soon with stale flags, waiting customer emails, and the day's top actions.",categoria:"sales"},{id:"sales:deal-advance-gap",nombre:"Deal advance gap",descripcion:"Forward-looking gap check on one opportunity - exactly what is missing to advance it to the next stage and to close, with who does what by when.",categoria:"sales"},{id:"sales:deal-review",nombre:"Deal review",descripcion:"Deep-dive on a single opportunity - signal-adjusted health score, risks, gaps in qualification, and recommended next actions.",categoria:"sales"},{id:"sales:deal-signals",nombre:"Deal signals",descripcion:"Proactive watch over your book - deals gone quiet, close dates slipping into view, champion changes, renewal windows opening, competitor mentions - surfaced as ",categoria:"sales"},{id:"sales:deal-slip-scenario",nombre:"Deal slip scenario",descripcion:"Model what happens to your number if a deal slips, shrinks, or dies - quota impact, coverage ratio change, and the substitute pipeline needed to stay on plan.",categoria:"sales"},{id:"sales:draft-outreach",nombre:"Draft outreach",descripcion:"Draft a personalized outreach email or multi-touch sequence to a prospect, create it as an email draft for review, and add the contact to a sequence in your sal",categoria:"sales"},{id:"sales:end-of-day",nombre:"End of day",descripcion:"The closing beat of the day - every call processed or explicitly skipped, the CRM brought current, commitments captured, and tomorrow's top three teed up.",categoria:"sales"},{id:"sales:expansion-whitespace",nombre:"Expansion whitespace",descripcion:"Find the expansion whitespace in an account or a book - what they own vs.",categoria:"sales"},{id:"sales:forecast",nombre:"Forecast",descripcion:"Generate the commit / best-case / pipeline narrative for a forecast call or a 1:1 with your manager - what's closing, what's at risk, what changed since last ti",categoria:"sales"},{id:"sales:handle-objection",nombre:"Handle objection",descripcion:"Work through a live objection or competitive threat - what's really being said, the response that has worked before, and the proof points to use, grounded in yo",categoria:"sales"},{id:"sales:inbox-sweep",nombre:"Inbox sweep",descripcion:"Batch-process unread customer emails - classify, prioritize, and draft replies.",categoria:"sales"},{id:"sales:lead-triage",nombre:"Lead triage",descripcion:"Score and route an inbound lead, or rank a backlog of leads, against your ICP and qualification framework, then recommend a priority and next action.",categoria:"sales"},{id:"sales:log-activity",nombre:"Log activity",descripcion:"Log a call, meeting, or email exchange to the CRM after the fact as a completed activity on the right account, opportunity, and contact - drafted from your desc",categoria:"sales"},{id:"sales:pipeline-review",nombre:"Pipeline review",descripcion:"Stage-by-stage pipeline health check - coverage, aging, conversion, and at-risk deals - from CRM opportunity data.",categoria:"sales"},{id:"sales:renewal-radar",nombre:"Renewal radar",descripcion:"Upcoming renewals with timing, risk, and uplift potential - and the renewal opportunity records to keep them honest.",categoria:"sales"},{id:"sales:rep-context",nombre:"Rep context",descripcion:"Leader's prep on a single rep before a 1:1 - their pipeline, recent activity, what they've been working on per chat and calendar, and where they might need help",categoria:"sales"},{id:"sales:route-lead",nombre:"Route lead",descripcion:"Decide who owns an unrouted lead or opportunity and manage the handoff - deterministic routing by the org's own rules, a routing card the human router accepts o",categoria:"sales"},{id:"sales:schedule-meeting",nombre:"Schedule meeting",descripcion:"Find a time, draft the invite, and book the meeting on Google Calendar or Outlook - then log it to the CRM as an event on the right account and opportunity.",categoria:"sales"},{id:"sales:setup",nombre:"Setup",descripcion:"First-run setup - checks which tools are connected, shows what's connected and what each one unlocks, learns how you write from your sent email, and renders a s",categoria:"sales"},{id:"sales:stakeholder-map",nombre:"Stakeholder map",descripcion:"Map the people in a deal or account - roles, influence, sentiment, who's missing, and your best access path to the people you haven't reached.",categoria:"sales"},{id:"sales:team-pipeline",nombre:"Team pipeline",descripcion:"Leader view - roll up a team's pipeline by rep and stage, flag at-risk deals, and surface coaching moments.",categoria:"sales"},{id:"sales:update-opportunity",nombre:"Update opportunity",descripcion:"Guided updates to an opportunity - push the stage, move the close date, set next steps, fix amount or forecast category.",categoria:"sales"},{id:"sales:weekly-wrap",nombre:"Weekly wrap",descripcion:"End-of-week summary for a rep or leader - what closed, what moved, what slipped, and what's on deck Monday.",categoria:"sales"},{id:"sales:win-loss-review",nombre:"Win loss review",descripcion:"Analyze recently closed opportunities to find patterns in what wins and what loses - stage of loss, common objections from transcripts, deal characteristics.",categoria:"sales"},{id:"small-business:ad-manager",nombre:"Ad manager",descripcion:"The ads consultant that becomes an ads agent.",categoria:"small-business"},{id:"small-business:ap-processor",nombre:"Ap processor",descripcion:"Works the bill pile end to end: reads bills and vendor statements out of the AP inbox or from uploaded PDFs and phone photos, pulls out vendor, amount, due date",categoria:"small-business"},{id:"small-business:brand-style",nombre:"Brand style",descripcion:"Sets and updates the owner's brand look and output preferences, which every page and document the plugin produces then follows automatically.",categoria:"small-business"},{id:"small-business:build-agent",nombre:"Build agent",descripcion:"Turns a task the owner keeps doing by hand into a named, reusable skill they can trigger by name or put on a schedule.",categoria:"small-business"},{id:"small-business:build-connector",nombre:"Build connector",descripcion:"Gets Claude talking to a tool nobody built an official connector for.",categoria:"small-business"},{id:"small-business:business-pulse",nombre:"Business pulse",descripcion:"Produces a one-page cross-functional business snapshot for SMB owners — cash position (the ledger: MYOB, NetSuite, QuickBooks, Xero, or Zoho Books), sales trend",categoria:"small-business"},{id:"small-business:call-list",nombre:"Call list",descripcion:"Builds today's call list.",categoria:"small-business"},{id:"small-business:canva-creator",nombre:"Canva creator",descripcion:"Takes an approved content brief and executes a campaign end-to-end: builds the posting calendar, generates Canva designs for social posts, drafts caption and em",categoria:"small-business"},{id:"small-business:cash-flow-snapshot",nombre:"Cash flow snapshot",descripcion:"Reads AR/AP, historical cash timing, and known fixed costs from the ledger (MYOB, NetSuite, QuickBooks, Xero, or Zoho Books) or from PayPal, Square, or Stripe —",categoria:"small-business"},{id:"small-business:close-month",nombre:"Close month",descripcion:"Closes the books and turns them into a decision as a three-link chain — month-end-prep reconciles the ledger against every connected payment processor and write",categoria:"small-business"},{id:"small-business:content-strategy",nombre:"Content strategy",descripcion:"Analyzes sales data from PayPal and QuickBooks to find top performers and slow movers, layers in seasonality, and produces a prioritized 30-day content brief: w",categoria:"small-business"},{id:"small-business:contract-review",nombre:"Contract review",descripcion:"Lightweight NDA, MSA, and vendor contract review for SMBs without legal on staff.",categoria:"small-business"},{id:"small-business:crm-autopilot",nombre:"Crm autopilot",descripcion:"Keeps the CRM current without the owner ever opening it.",categoria:"small-business"},{id:"small-business:grant-rfp-writer",nombre:"Grant rfp writer",descripcion:"Finds grant and solicitation opportunities the organization actually qualifies for, runs a hard go/no-go before anyone starts writing, drafts the application or",categoria:"small-business"},{id:"small-business:grow-pipeline",nombre:"Grow pipeline",descripcion:"Fills the funnel end to end without the owner babysitting it — reads the market and the competition for context, builds a ranked list of named prospects with a ",categoria:"small-business"},{id:"small-business:growth-pulse",nombre:"Growth pulse",descripcion:"Answers one question for an SMB owner — is the growth engine actually working?",categoria:"small-business"},{id:"small-business:hiring-screener",nombre:"Hiring screener",descripcion:"Takes a pile of applications and turns it into a ranked shortlist, scored only against the job's stated rubric, with drafted replies to every candidate, schedul",categoria:"small-business"},{id:"small-business:inbox-manager",nombre:"Inbox manager",descripcion:"Turns a full inbox into a short, ranked list of what actually needs the owner.",categoria:"small-business"},{id:"small-business:inventory-planner",nombre:"Inventory planner",descripcion:"Works out what to reorder and when, from what is actually selling: pulls sales history and stock on hand from Shopify, Square, NetSuite, or an uploaded CSV, com",categoria:"small-business"},{id:"small-business:invoice-chase",nombre:"Invoice chase",descripcion:"Drafts overdue-invoice reminder emails from the ledger (MYOB, NetSuite, QuickBooks, Xero, or Zoho Books) plus PayPal, Stripe, and Airwallex data, matched to eac",categoria:"small-business"},{id:"small-business:job-post-builder",nombre:"Job post builder",descripcion:"Builds end-to-end hiring packets — job post, structured interview guide with scoring rubric, and offer letter template — from a hiring brief.",categoria:"small-business"},{id:"small-business:lead-finder",nombre:"Lead finder",descripcion:"Builds a ranked list of prospects worth contacting.",categoria:"small-business"},{id:"small-business:lead-triage",nombre:"Lead triage",descripcion:"Scores inbound HubSpot leads by engagement signals, company fit, and urgency markers, ranks the ones worth a call today with talking points, drafts the follow-u",categoria:"small-business"},{id:"small-business:marketing-monday",nombre:"Marketing monday",descripcion:"Delivers the weekly growth briefing as one merged read — whether the growth engine is working, what customers are saying in public and private, what competitors",categoria:"small-business"},{id:"small-business:monday-brief",nombre:"Monday brief",descripcion:"Runs the owner's Monday morning briefing as a two-link chain — business-pulse for the cross-connector snapshot of cash, sales, and pipeline, and report-builder ",categoria:"small-business"},{id:"small-business:month-end-prep",nombre:"Month end prep",descripcion:"Reconciles the accounting ledger (MYOB, NetSuite, QuickBooks, Xero, or Zoho Books) against PayPal, Shopify, Square, and Stripe settlements, flags transactions t",categoria:"small-business"},{id:"small-business:outreach-composer",nombre:"Outreach composer",descripcion:"Writes prospect outreach and follow-up sequences that sound like the owner wrote them, not like an AI did.",categoria:"small-business"},{id:"small-business:pay-the-bills",nombre:"Pay the bills",descripcion:"Works the bill pile from the AP inbox all the way to a staged payment run — reads and codes every bill, then checks the cash position before a dollar is committ",categoria:"small-business"},{id:"small-business:payroll-prep",nombre:"Payroll prep",descripcion:"Gets payroll ready to run without anyone getting shorted: pulls timesheets from Gusto, QuickBooks Payroll, or an uploaded spreadsheet, totals regular, overtime,",categoria:"small-business"},{id:"small-business:plan-payroll",nombre:"Plan payroll",descripcion:"Runs the payroll-confidence chain end to end — forecasts cash across the payroll window with cash-flow-snapshot, ranks and drafts overdue-invoice reminders with",categoria:"small-business"},{id:"small-business:proposal-builder",nombre:"Proposal builder",descripcion:"Turns whatever came out of a discovery conversation — a call transcript, a voice memo, jobsite photos, an RFP document, a set of drawings, or scrappy notes — in",categoria:"small-business"},{id:"small-business:reactivate",nombre:"Reactivate",descripcion:"Wins back customers who have quietly stopped buying — finds the ones whose gap has stretched past their own normal rhythm or who are showing churn signals, rank",categoria:"small-business"},{id:"small-business:report-builder",nombre:"Report builder",descripcion:"Turns a plain-English description of a recurring report into a real, repeatable report — defines the metrics, pulls them from whatever data sources are connecte",categoria:"small-business"},{id:"small-business:report-pack",nombre:"Report pack",descripcion:"Delivers the owner's custom recurring report pack on a set cadence — runs the saved report definition from report-builder, wraps it in a business-pulse snapshot",categoria:"small-business"},{id:"small-business:restock",nombre:"Restock",descripcion:"Turns what is actually selling into a reorder decision and gets it all the way into the books — computes sales velocity and conservative stockout dates per item",categoria:"small-business"},{id:"small-business:review-reputation",nombre:"Review reputation",descripcion:"Watches what customers are saying in public and in private, then does something about it.",categoria:"small-business"},{id:"small-business:seo-ai-visibility",nombre:"Seo ai visibility",descripcion:"Audits and fixes both halves of being found — classic search and AI answers.",categoria:"small-business"},{id:"small-business:smb-onboard",nombre:"Smb onboard",descripcion:"Claude as the trainer.",categoria:"small-business"},{id:"small-business:smb-router",nombre:"Smb router",descripcion:"The front door to the Small Business plugin.",categoria:"small-business"},{id:"small-business:social-content-engine",nombre:"Social content engine",descripcion:"Runs the owner's content operation as a standing thing rather than a one-off: keeps a rolling posting calendar, learns the owner's voice, generates on-brand Can",categoria:"small-business"},{id:"small-business:speed-to-lead",nombre:"Speed to lead",descripcion:"Makes sure no inbound lead goes unanswered.",categoria:"small-business"},{id:"small-business:tax-prep",nombre:"Tax prep",descripcion:"Prepares tax materials as a two-link chain — month-end-prep confirms the books are closed and reconciled first, then tax-season-organizer calculates the quarter",categoria:"small-business"},{id:"small-business:tax-season-organizer",nombre:"Tax season organizer",descripcion:"Prepares tax-season materials for the owner's accountant, not tax advice.",categoria:"small-business"},{id:"small-business:ticket-deflector",nombre:"Ticket deflector",descripcion:"Reads a forwarded customer email or ticket, pulls order and refund status from a payments connector (PayPal, Square, or Stripe) or Shopify, account history from",categoria:"small-business"}],yh="mn.skills.asignadas.v1";let Ha=e1();const Qy=new Set;function e1(){try{const n=localStorage.getItem(yh);if(n)return JSON.parse(n)}catch{}return{}}function Mh(){try{localStorage.setItem(yh,JSON.stringify(Ha))}catch{}Qy.forEach(n=>n())}function wl(){return Jy}function Eh(n){return wl().find(e=>e.id===n)}function Ga(n){return Ha[n]??[]}function t1(n,e,t,i){Ga(n).some(a=>a.skillId===e)||(Ha={...Ha,[n]:[...Ga(n),{skillId:e,por:t,fecha:new Date().toISOString(),proyecto:i}]},Mh())}function n1(n,e){Ha={...Ha,[n]:Ga(n).filter(t=>t.skillId!==e)},Mh()}const i1="Herramientas que usa cada equipo (solo etiquetas informativas; edítalas libremente). Clave = id del área.",a1=["Hojas de cálculo","Conciliación bancaria","Facturación","Nómina","Reportes contables"],s1=["Repositorio de código","Pruebas automáticas","Despliegues","Integraciones API","Monitoreo"],r1=["CRM","Tickets de soporte","Calendario","Seguimiento de clientes","Documentación"],o1=["Canva","CapCut","Figma","Manual de marca","Banco de imágenes"],c1=["Catálogo de SKILLS","Evaluaciones","Reclutamiento","Capacitación"],l1=["Bandeja de entrada","Agenda de reuniones","Reglas de enrutamiento","Seguimiento"],d1={_ayuda:i1,financiera:a1,tecnologia:s1,operaciones:r1,diseno:o1,rrhh:c1,recepcion:l1};let dt,St,Nt=null;const ji=n=>{var e;return((e=gn.find(t=>t.id===n))==null?void 0:e.nombre)??n},u1=n=>{var e;return((e=gn.find(t=>t.id===n))==null?void 0:e.color)??"#888"};function h1(n){dt=n,St=Le("#panel"),St.addEventListener("click",E1),St.addEventListener("focusin",e=>{var i;if(e.target.id!=="cmd-text")return;(i=St.querySelector("#orb"))==null||i.classList.add("listening");const t=St.querySelector("#orb-label");t&&(t.textContent="Escuchando…")}),St.addEventListener("focusout",e=>{var i;if(e.target.id!=="cmd-text")return;(i=St.querySelector("#orb"))==null||i.classList.remove("listening");const t=St.querySelector("#orb-label");t&&(t.textContent="En reposo")})}function wh(){Nt=null,St.classList.remove("open"),document.body.classList.remove("panel-open"),dt.world.labels.selectedId=null}function Ah(){var n,e;!Nt||Nt.kind==="editar"||Nt.kind==="recep"&&(((n=St.querySelector("#m-titulo"))==null?void 0:n.value)??"")||Nt.kind==="cerebro"&&(((e=St.querySelector("#cmd-text"))==null?void 0:e.value)??"")||Nt.kind==="ceo"&&St.querySelector(".rev-sel:focus")||Vi()}function Ls(n){if(n==="felipe")return ci({kind:"ceo"});if(n===Qi||n===Jr)return ci({kind:"recep",id:n});if(Kr().includes(n))return ci({kind:"lider",id:n});ci({kind:"ficha",id:n})}const wr=n=>ci(n==="felipe"?{kind:"ceo"}:n===Qi||n===Jr?{kind:"recep",id:n}:{kind:"ficha",id:n}),Th=()=>ci({kind:"cerebro"}),Rh=n=>ci({kind:"editar",id:n});function ci(n){Nt=n,dt.world.labels.selectedId=n.kind==="ceo"?"felipe":n.kind==="cerebro"?null:n.id,Vi(),St.classList.add("open"),document.body.classList.add("panel-open")}function Ds(n,e="var(--gold)"){return`<div class="pbar"><i style="width:${n}%;background:${e}"></i></div>`}function Ch(n){return`<div class="avatar" style="background:${Ue[n.area].color}">${oe(n.nombre.charAt(0).toUpperCase())}</div>`}function Ph(n){if(n.id==="felipe")return{text:"En su despacho",cls:"ceo",zone:""};if(!!zt(n.id))return{text:dt.world.agents.inAzaharOffice(n.id)?"Trabajando · Oficina Azahar Coffee (piso 2)":"Trabajando",cls:"work",zone:""};const t=dt.world.agents.zoneOf(n.id),i=dt.world.agents.isOutside(n.id);return{text:"Disponible",cls:"free",zone:t?y_[t]:i?"fuera del edificio":""}}function iu(n){const e=zt(n.id),t=Ph(n);return`<button class="row" data-act="ficha" data-id="${n.id}">
    <span class="dot ${t.cls}"></span>
    <span class="row-main"><b>${oe(n.nombre)}</b><small>${oe(n.cargo)}</small>
      ${e?`<small class="tk">${oe(e.titulo)}</small>${Ds(e.progreso)}`:`<small class="muted">Disponible${t.zone?" · "+t.zone:""}</small>`}
    </span>
    ${e?`<span class="pct">${e.progreso}%</span>`:""}
  </button>`}function f1(n){return`<span class="chip" style="--c:${u1(n.empresaId)}">${oe(ji(n.empresaId))}</span>`}function Lt(n,e){return`<div class="stat"><b>${n}</b><small>${e}</small></div>`}function Al(n){return n.funciones.length?`<ul class="funcs">${n.funciones.map(e=>`<li>${oe(e)}</li>`).join("")}</ul>`:'<p class="muted">Sin funciones definidas.</p>'}function Qr(n,e){return`<div class="p-head">${Ch(n)}
    <div class="p-title"><h2>${oe(n.nombre)}</h2><p>${oe(n.cargo)}</p><small>${oe(e)}</small></div>
    <button class="icon" data-act="close" title="Cerrar" aria-label="Cerrar">✕</button></div>`}function Vi(){Nt&&(Nt.kind==="ceo"?St.innerHTML=p1():Nt.kind==="cerebro"?St.innerHTML=m1():Nt.kind==="lider"?St.innerHTML=b1(Nt.id):Nt.kind==="ficha"?St.innerHTML=x1(Nt.id):Nt.kind==="recep"?St.innerHTML=v1(Nt.id):St.innerHTML=y1(Nt.id),Nt.kind==="editar"&&M1(Nt.id))}function p1(){const n=mt("felipe"),e=Yt().filter(o=>o.id!=="felipe"),t=mn(),i=e.filter(o=>zt(o.id)).length,a=o=>t.filter(c=>c.estado===o).length,s=["financiera","tecnologia","operaciones","diseno","rrhh"].map(o=>{const c=e.filter(f=>f.area===o),l=c.filter(f=>zt(f.id)).length,d=t.filter(f=>f.area===o),h=Kr().find(f=>{var v;return((v=mt(f))==null?void 0:v.area)===o}),u=mt(h);return`<button class="card-btn" data-act="lider" data-id="${h}" style="--c:${Ue[o].color}">
        <div class="cb-top"><b>${Ue[o].nombre}</b><small>Líder: ${oe(u.nombre)} · ${oe(u.cargo)}</small></div>
        ${Ds(c.length?l/c.length*100:0,Ue[o].color)}
        <div class="mini-stats">
          <span><b>${l}</b> ocupados</span><span><b>${c.length-l}</b> libres</span>
          <span><b>${d.filter(f=>f.estado==="en_curso").length}</b> en curso</span>
          <span><b>${d.filter(f=>f.estado==="hecha").length}</b> hechas</span>
        </div></button>`}).join(""),r=gn.map(o=>{const c=t.filter(d=>d.empresaId===o.id),l=new Set(c.filter(d=>d.estado==="en_curso").map(d=>d.agenteId));return`<button class="card-btn" data-act="board-empresa" data-id="${o.id}" style="--c:${o.color}">
        <div class="cb-top"><b>${oe(o.nombre)}</b><small>${oe(o.tipo)}</small></div>
        <div class="mini-stats">
          <span><b>${l.size}</b> agentes ocupados</span>
          <span><b>${c.filter(d=>d.estado==="por_hacer").length}</b> por hacer</span>
          <span><b>${c.filter(d=>d.estado==="en_curso").length}</b> en curso</span>
          <span><b>${c.filter(d=>d.estado==="hecha").length}</b> hechas</span>
        </div></button>`}).join("");return`${Qr(n,"Jefe de la oficina · crea y asigna tareas")}
  <div class="p-body">
    <div class="stats">
      ${Lt(i,"agentes ocupados")}${Lt(e.length-i,"agentes libres")}
      ${Lt(a("en_curso"),"tareas en curso")}${Lt(a("hecha"),"tareas hechas")}
    </div>
    <div class="actions">
      <button class="btn gold" data-act="board">Abrir tablero</button>
      <button class="btn" data-act="nueva">+ Asignar tarea</button>
      <button class="btn" data-act="solicitud">+ Nueva solicitud</button>
      <button class="btn ghost" data-act="editar" data-id="felipe">Editar</button>
    </div>
    ${Ih()}
    <h3>Por área</h3>${s}
    <h3>Por empresa</h3>${r}
    <h3>Funciones</h3>${Al(n)}
  </div>`}function Ih(){const n=In("por_revisar"),e=Yt().filter(t=>t.id!=="felipe").map(t=>`<option value="${t.id}">${oe(t.nombre)} — ${oe(t.cargo)}</option>`).join("");return`<h3 class="rev-h">Por revisar <span class="count ${n.length?"bad":""}">${n.length}</span></h3>
  ${n.length?n.map(t=>`<div class="rev" data-rev="${t.id}">
        <b>${oe(t.titulo)}</b>
        <small>${oe(ji(t.empresaId))}${t.limite?" · límite "+As(t.limite):""}${t.prioridad?" · prioridad "+t.prioridad:""}</small>
        ${t.descripcion?`<small class="muted">${oe(t.descripcion)}</small>`:""}
        <div class="rev-act"><select class="rev-sel" aria-label="Asignar a"><option value="">Asignar a…</option>${e}</select>
          <button class="btn small gold" data-act="asignar-revision" data-id="${t.id}">Asignar</button>
          <button class="btn small ghost" data-act="descartar" data-id="${t.id}">Descartar</button></div></div>`).join(""):'<p class="muted">Nada por revisar: recepción clasificó todo.</p>'}`}function m1(){const n=mn(),e=n.filter(o=>o.estado==="hecha"&&!o.aprobada),t=In("por_revisar"),i=n.filter(o=>o.estado==="en_curso").length,a=n.filter(o=>o.estado==="hecha"&&o.historial.length&&Ar(o.historial[o.historial.length-1].fecha)).length,s=ea().length,r=e.length+t.length;return`<div class="p-head"><div class="avatar cerebro-av">◉</div>
    <div class="p-title"><h2>Centro de mando</h2><p>El cerebro de la oficina</p><small>Dile qué necesitas: recepción lo clasifica y lo envía</small></div>
    <button class="icon" data-act="close" title="Cerrar" aria-label="Cerrar">✕</button></div>
  <div class="p-body">
    <div class="orb-wrap"><div class="orb" id="orb"></div><small id="orb-label">En reposo</small></div>
    <div class="cmd">
      <textarea id="cmd-text" rows="2" maxlength="300" placeholder="Ej.: Necesito conciliar las cuentas de Azahar antes del viernes…"></textarea>
      <div class="cmd-row">
        <select id="cmd-empresa">${gn.map(o=>`<option value="${o.id}">${oe(o.nombre)}</option>`).join("")}</select>
        <button class="btn gold" data-act="enviar-comando">Enviar a recepción</button>
      </div>
    </div>
    <div class="stats">
      ${Lt(i,"en curso")}${Lt(a,"hechas hoy")}${Lt(r,"necesitan tu OK")}${Lt(s,"atrasadas")}
    </div>
    <h3>Necesitan tu OK <span class="count ${r?"bad":""}">${r}</span></h3>
    ${e.length?e.map(o=>{const c=mt(o.agenteId);return`<div class="rev ok"><b>${oe(o.titulo)}</b><small>${oe((c==null?void 0:c.nombre)??"—")} · ${oe(ji(o.empresaId))} · terminada</small>
              <div class="rev-act"><button class="btn small gold" data-act="aprobar" data-id="${o.id}">Aprobar</button>
              <button class="btn small ghost" data-act="ficha" data-id="${o.agenteId}">Ver agente</button></div></div>`}).join(""):""}
    ${Ih()}
    <h3>Equipos hoy</h3>
    ${["financiera","tecnologia","operaciones","diseno","rrhh"].map(o=>{const c=Yt().filter(d=>d.area===o),l=c.filter(d=>zt(d.id)).length;return`<div class="team-line" style="--c:${Ue[o].color}"><i></i><b>${Ue[o].corto}</b>${Ds(c.length?l/c.length*100:0,Ue[o].color)}<small>${l}/${c.length}</small></div>`}).join("")}
  </div>`}function Ar(n){return!!n&&new Date(n).toDateString()===new Date().toDateString()}function g1(n){return n?`<span class="prio ${n}">${n}</span>`:""}function v1(n){var h;const e=mt(n);if(!e)return"";const t=In("entrada"),i=mn().filter(u=>Ar(u.clasificada)),a=dh(),s=ea(),r=(h=dt.world.mostrador.actual)==null?void 0:h.id,o=[...In(),...mn()].filter(u=>u.origen==="recepcion"&&Ar(u.entrada)).length,c=mn().filter(u=>u.estado==="hecha"&&u.historial.length&&Ar(u.historial[u.historial.length-1].fecha)).length,l=u=>{var f;return u==="azahar"?(f=Yt().find(v=>v.empresa==="azahar"))==null?void 0:f.id:"valentina"},d=u=>u>=48?`${Math.round(u/24)} d`:`${u} h`;return`${Qr(e,Ue.recepcion.nombre+" · Líder: Valentina")}
  <div class="p-body">
    <div class="state ${dt.world.agents.statusText(n)?"work":"free"}"><span class="dot work"></span>${oe(dt.world.agents.statusText(n)??"Recepción disponible")}</div>
    <div class="stats">
      ${Lt(t.length,"en bandeja")}${Lt(i.length,"clasificadas hoy")}
      ${Lt(In("por_revisar").length,"por revisar")}${Lt(s.length,"en seguimiento")}
    </div>
    <div class="actions">
      <button class="btn gold" data-act="solicitud">+ Nueva solicitud</button>
      <button class="btn" data-act="ir" data-id="${n}">Ver en el campus</button>
      <button class="btn ghost" data-act="editar" data-id="${n}">Editar agente</button>
    </div>
    <h3>Bandeja de entrada (${t.length})</h3>
    ${t.length?`<div class="hist">${t.map(u=>`<div class="hrow"><span class="badge ${r===u.id?"en_curso":"por_hacer"}">${r===u.id?"Clasificando":"En espera"}</span>
              <span class="hmain"><b>${oe(u.titulo)}</b><small>${oe(ji(u.empresaId))}${u.limite?" · límite "+As(u.limite):""}</small></span></div>`).join("")}</div>`:'<p class="muted">Bandeja vacía. Las solicitudes nuevas llegan aquí.</p>'}
    <h3>Solicitudes clasificadas hoy (${i.length})</h3>
    ${i.length?`<div class="hist">${i.map(u=>{const f=mt(u.agenteId);return`<button class="hrow" data-act="ficha" data-id="${u.agenteId}">
              <span class="badge ${u.estado}">${Xr[u.estado]}</span>
              <span class="hmain"><b>${oe(u.titulo)}</b><small>→ ${oe((f==null?void 0:f.nombre)??"—")} · ${oe(Ue[u.area].corto)} · ${oe(ji(u.empresaId))}</small></span>
              ${g1(u.prioridad)}</button>`}).join("")}</div>`:'<p class="muted">Todavía no se ha clasificado nada hoy.</p>'}
    <h3>Reuniones y visitas agendadas (${a.length})</h3>
    ${a.length?`<div class="hist">${a.map(u=>{const f=u.avisadoA?mt(u.avisadoA):null;return`<div class="hrow"><span class="badge ${u.tipo==="visita"?"en_curso":"por_hacer"}">${u.tipo==="visita"?"Visita":"Reunión"}</span>
              <span class="hmain"><b>${oe(u.titulo)}</b><small>${Sh(u.cuando)} · Sala de reuniones · ${oe(ji(u.empresaId))}${u.visitante?" · Visitante: "+oe(u.visitante):""}${f?" · Avisado: "+oe(f.nombre):""}</small></span>
              <button class="icon small" data-act="del-meeting" data-id="${u.id}" title="Quitar" aria-label="Quitar">✕</button></div>`}).join("")}</div>`:'<p class="muted">Sin reuniones agendadas.</p>'}
    <details class="mform"><summary>+ Agendar reunión o registrar visita</summary>
      <div class="form-mini">
        <input id="m-titulo" placeholder="Título (ej.: Reunión de seguimiento)" maxlength="80" />
        <div class="two"><input id="m-cuando" type="datetime-local" />
          <select id="m-empresa">${gn.map(u=>`<option value="${u.id}">${oe(u.nombre)}</option>`).join("")}</select></div>
        <div class="two"><select id="m-tipo"><option value="reunion">Reunión</option><option value="visita">Visita de cliente</option></select>
          <input id="m-visitante" placeholder="Nombre del visitante (opcional)" maxlength="60" /></div>
        <button class="btn gold small" data-act="add-meeting" data-id="${l("metis")}">Reservar sala y avisar</button>
      </div></details>
    <h3>Tareas en seguimiento (${s.length})</h3>
    ${s.length?`<div class="hist">${s.map(u=>{const f=mt(u.agenteId);return`<button class="hrow alert" data-act="ficha" data-id="${u.agenteId}">
              <span class="badge bad">${u.motivo==="cerca_limite"?"Cerca del límite":d(u.horasSinAvance)+" sin avanzar"}</span>
              <span class="hmain"><b>${oe(u.tarea.titulo)}</b><small>${oe((f==null?void 0:f.nombre)??"—")} · ${u.tarea.recordada?"Recordatorio enviado":"Recordatorio pendiente"}${u.tarea.escalada?" · Escalada al líder":""}</small></span></button>`}).join("")}</div>`:'<p class="muted">Ninguna tarea atrasada.</p>'}
    <h3>Resumen del día para Felipe</h3>
    <div class="stats">
      ${Lt(o,"recibidas")}${Lt(i.length,"asignadas")}${Lt(c,"completadas")}${Lt(s.length,"atrasadas")}
    </div>
    <h3>Funciones</h3>${Al(e)}
  </div>`}function _1(n,e){const t=Ue[n].color,i=new Set(e.map(d=>d.id)),a=mn().filter(d=>i.has(d.agenteId)&&d.estado==="en_curso"),s=a.length?Math.round(a.reduce((d,h)=>d+h.progreso,0)/a.length):0,r=(d1[n]??[]).map(d=>`<span class="skill tool">${oe(d)}</span>`).join(""),o=new Map;for(const d of e)for(const h of Ga(d.id))o.set(h.skillId,(o.get(h.skillId)??0)+1);const c=[...o.entries()].map(([d,h])=>{var u;return`<span class="skill">${oe(((u=Eh(d))==null?void 0:u.nombre)??d)}<small>×${h}</small></span>`}).join(""),l=a.sort((d,h)=>h.progreso-d.progreso).slice(0,6).map(d=>{var h;return`<button class="agent-task" data-act="ficha" data-id="${d.agenteId}"><b>${oe(((h=mt(d.agenteId))==null?void 0:h.nombre)??"")}</b>
      <span>${oe(d.titulo)}</span>${Ds(d.progreso,t)}<small>${d.progreso}%</small></button>`}).join("");return`<div class="team-card" style="--c:${t}">
    <div class="tc-ring"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5" class="bg"/><circle cx="18" cy="18" r="15.5" class="fg" stroke-dasharray="${s/100*97.4} 97.4"/></svg><b>${s}%</b></div>
    <div><b>Avance medio del equipo</b><small>${a.length} tareas en curso · ${e.length} personas</small></div></div>
    <h3>Herramientas del equipo</h3><div class="skill-chips">${r||'<span class="muted">Sin herramientas definidas</span>'}</div>
    ${c?`<h3>SKILLS del equipo</h3><div class="skill-chips">${c}</div>`:""}
    <h3>En qué trabaja ahora</h3>${l||'<p class="muted">Nadie del equipo tiene una tarea en curso.</p>'}`}function b1(n){const e=mt(n);if(!e)return"";const t=sh(n),i=[e,...t],a=i.filter(r=>zt(r.id)).length,s=mn().filter(r=>r.area===e.area);return`${Qr(e,"Líder de "+Ue[e.area].nombre)}
  <div class="p-body">
    <div class="stats">
      ${Lt(a,"ocupados")}${Lt(i.length-a,"libres")}
      ${Lt(s.filter(r=>r.estado==="en_curso").length,"en curso")}${Lt(s.filter(r=>r.estado==="hecha").length,"hechas")}
    </div>
    ${_1(e.area,i)}
    <div class="actions">
      <button class="btn gold" data-act="board-area" data-id="${e.area}">Ver tablero del área</button>
      <button class="btn" data-act="area-cam" data-id="${e.area}">Ir al área</button>
      <button class="btn ghost" data-act="ficha" data-id="${e.id}">Mi ficha</button>
    </div>
    <h3>Equipo (${t.length})</h3>
    <div class="rows">${t.map(iu).join("")}</div>
    <h3>Su propio estado</h3>
    <div class="rows">${iu(e)}</div>
  </div>`}function x1(n){const e=mt(n);if(!e)return"";const t=Ph(e),i=zt(n),a=fh(n),s=e.lider?mt(e.lider):null,r=a.filter(l=>l.estado==="en_curso"&&l.id!==(i==null?void 0:i.id)),o=a.flatMap(l=>l.historial.map(d=>({...d,titulo:l.titulo}))).sort((l,d)=>d.fecha.localeCompare(l.fecha)).slice(0,8),c=[...a].sort((l,d)=>d.fecha.localeCompare(l.fecha));return`${Qr(e,Ue[e.area].nombre+(s?" · Líder: "+s.nombre:""))}
  <div class="p-body">
    <div class="state ${t.cls}"><span class="dot ${t.cls}"></span>${t.text}${t.zone?(t.zone.startsWith("fuera")?" · ":" · en ")+t.zone:""}
      ${Kr().includes(n)?`<button class="link" data-act="lider" data-id="${n}">Ver equipo</button>`:""}</div>
    <h3>Tarea actual</h3>
    ${i?`<div class="task-now"><b>${oe(i.titulo)}</b><div>${f1(i)}<small>${As(i.fecha)}</small></div>
            ${Ds(i.progreso)}<small>${i.progreso}% completado${r.length?` · +${r.length} en curso`:""}</small>
            <button class="btn small gold" data-act="completar" data-id="${i.id}">Marcar como hecha</button></div>`:'<p class="muted">Sin tarea en curso. Está disponible para recibir una.</p>'}
    <div class="actions">
      <button class="btn" data-act="nueva" data-id="${e.id}">+ Asignar tarea</button>
      <button class="btn" data-act="ir" data-id="${e.id}">Ver en el campus</button>
      <button class="btn ghost" data-act="editar" data-id="${e.id}">Editar agente</button>
    </div>
    <h3>Funciones</h3>${Al(e)}
    ${S1(e)}
    <h3>Historial de tareas (${c.length})</h3>
    ${c.length?`<div class="hist">${c.map(l=>`<button class="hrow" data-act="edit-task" data-id="${l.id}">
          <span class="badge ${l.estado}">${Xr[l.estado]}</span>
          <span class="hmain"><b>${oe(l.titulo)}</b><small>${oe(ji(l.empresaId))} · ${As(l.fecha)}${l.ejemplo?" · ejemplo":""}</small></span>
          <span class="pct">${l.progreso}%</span></button>`).join("")}</div>`:'<p class="muted">Todavía no tiene tareas.</p>'}
    ${o.length?`<h3>Actividad reciente</h3><ul class="log">${o.map(l=>`<li><small>${Sh(l.fecha)}</small> ${oe(l.texto)} — <i>${oe(l.titulo)}</i></li>`).join("")}</ul>`:""}
  </div>`}function S1(n){const e=Ga(n.id),t=wl(),i=t.filter(a=>!e.some(s=>s.skillId===a.id));return`<h3>SKILLS asignadas (${e.length})</h3>
  ${e.length?`<div class="skill-chips">${e.map(a=>{var s,r;return`<span class="skill">${oe(((s=Eh(a.skillId))==null?void 0:s.nombre)??a.skillId)}<small>${oe(((r=mt(a.por))==null?void 0:r.nombre)??"")}</small><button data-act="quitar-skill" data-id="${n.id}" data-skill="${a.skillId}" aria-label="Quitar">✕</button></span>`}).join("")}</div>`:'<p class="muted">Sin SKILLS asignadas todavía.</p>'}
  ${t.length?`<div class="add-row"><select id="skill-sel">${i.map(a=>`<option value="${a.id}">${oe(a.nombre)}</option>`).join("")}</select>
         <button class="btn small" data-act="asignar-skill" data-id="${n.id}" ${i.length?"":"disabled"}>Asignar</button></div>`:'<p class="muted small">La lista de SKILLS aún no está cargada. Cuando se cargue, Recursos Humanos (Paula, Gabriela y Mauricio) las asignará según la necesidad de cada proyecto.</p>'}`}function y1(n){const e=mt(n);if(!e)return"";const t=th(n);return`<div class="p-head">${Ch(e)}
    <div class="p-title"><h2>Editar agente</h2><p>${oe(t.nombre)} · ${oe(Ue[e.area].nombre)}</p></div>
    <button class="icon" data-act="close" aria-label="Cerrar">✕</button></div>
  <form class="p-body form" id="agent-form" autocomplete="off">
    <label>Nombre<input name="nombre" value="${oe(e.nombre)}" maxlength="40" required /></label>
    <label>Cargo<input name="cargo" value="${oe(e.cargo)}" maxlength="70" required /></label>
    <label>Cliente asignado (muestra su logo en el cubículo)<select name="empresa"><option value="">Ninguno</option>${gn.filter(i=>i.tipo==="Cliente").map(i=>`<option value="${i.id}" ${e.empresa===i.id?"selected":""}>${oe(i.nombre)}</option>`).join("")}</select></label>
    <fieldset><legend>Funciones</legend>
      <div id="func-list">${e.funciones.map((i,a)=>Lh(i,a)).join("")}</div>
      <div class="add-row"><input id="new-func" placeholder="Agregar una función nueva…" maxlength="120" />
        <button type="button" class="btn small gold" id="add-func">Agregar</button></div>
    </fieldset>
    <p class="hint">Los cambios se guardan en este navegador. El puesto, el área y el líder no cambian.</p>
    <div class="actions">
      <button class="btn gold" type="submit">Guardar cambios</button>
      <button class="btn ghost" type="button" data-act="cancel-edit" data-id="${n}">Cancelar</button>
      ${nh(n)?`<button class="btn danger" type="button" data-act="reset-agent" data-id="${n}">Restablecer original</button>`:""}
    </div>
  </form>`}function Lh(n,e){return`<div class="func-row"><input name="f" value="${oe(n)}" maxlength="120" data-i="${e}" />
    <button type="button" class="icon" data-act="del-func" title="Quitar función" aria-label="Quitar función">✕</button></div>`}function M1(n){const e=Le("#agent-form"),t=Le("#func-list"),i=()=>{const a=Le("#new-func"),s=a.value.trim();s&&(t.insertAdjacentHTML("beforeend",Lh(s,t.children.length)),a.value="",a.focus())};Le("#add-func").addEventListener("click",i),Le("#new-func").addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),i())}),e.addEventListener("submit",a=>{a.preventDefault();const s=new FormData(e),r=[...t.querySelectorAll("input[name=f]")].map(c=>c.value),o=Le("#new-func").value.trim();o&&r.push(o),ih(n,{nombre:String(s.get("nombre")),cargo:String(s.get("cargo")),funciones:r,empresa:String(s.get("empresa")||"")||null}),dt.toast("Agente actualizado"),wr(n)})}function E1(n){var a,s,r,o,c,l,d,h;const e=n.target.closest("[data-act]");if(!e)return;const t=e.dataset.act,i=e.dataset.id??"";switch(t){case"close":return wh();case"ficha":return wr(i);case"lider":return ci({kind:"lider",id:i});case"editar":return Rh(i);case"cancel-edit":return i==="felipe"?ci({kind:"ceo"}):wr(i);case"reset-agent":return ah(i),dt.toast("Valores originales restablecidos"),wr(i);case"del-func":(a=e.closest(".func-row"))==null||a.remove();return;case"board":return dt.openBoard();case"board-area":return dt.openBoard({area:i});case"board-empresa":return dt.openBoard({empresaId:i});case"nueva":return i?dt.openTaskForm({agenteId:i}):dt.openFreeAgents();case"solicitud":return dt.openRequestForm();case"enviar-comando":{const u=((s=St.querySelector("#cmd-text"))==null?void 0:s.value.trim())??"";if(!u)return dt.toast("Escribe qué necesitas");const f=((r=St.querySelector("#cmd-empresa"))==null?void 0:r.value)||"metis";return xl({titulo:u.length>80?u.slice(0,77)+"…":u,descripcion:u.length>80?u:void 0,empresaId:f}),dt.toast("Enviado a recepción: Carolina lo clasifica"),St.querySelector("#cmd-text").value="",Vi()}case"aprobar":gh(i),dt.toast("Tarea aprobada");return;case"asignar-revision":{const u=(o=e.closest(".rev"))==null?void 0:o.querySelector(".rev-sel"),f=u==null?void 0:u.value,v=di(i);if(!f||!v)return dt.toast("Elige a quién asignarla");Sl(i,{agenteId:f,prioridad:v.prioridad??"media",empresaId:v.empresaId,nota:`Asignada por Felipe a ${((c=mt(f))==null?void 0:c.nombre)??f}`,por:"felipe"}),dt.toast("Solicitud asignada");return}case"descartar":Ml(i),dt.toast("Solicitud descartada");return;case"del-meeting":return hh(i),Vi();case"add-meeting":{const u=E=>{var S;return((S=St.querySelector(E))==null?void 0:S.value)??""},f=u("#m-titulo").trim(),v=u("#m-cuando");if(!f||!v)return dt.toast("Falta el título o la fecha");const b=u("#m-empresa")||"metis",m=u("#m-tipo")||"reunion",p=b==="azahar"?((l=Yt().find(E=>E.empresa==="azahar"))==null?void 0:l.id)??"valentina":"valentina";return uh({titulo:f,cuando:new Date(v).toISOString(),empresaId:b,tipo:m,visitante:u("#m-visitante").trim()||void 0,avisadoA:p}),dt.toast(`${m==="visita"?"Visita registrada":"Reunión agendada"} · aviso a ${((d=mt(p))==null?void 0:d.nombre)??""}`),Vi()}case"asignar-skill":{const u=(h=St.querySelector("#skill-sel"))==null?void 0:h.value;return u&&t1(i,u,"gabriela"),Vi()}case"quitar-skill":return n1(i,e.dataset.skill),Vi();case"edit-task":return dt.openTaskForm({taskId:i});case"ir":return dt.world.focusAgent(i);case"area-cam":return dt.world.focusArea(i);case"completar":yl(i),dt.toast("Tarea completada");return}}let Wo;function w1(n){Wo=n,Le("#teams").addEventListener("click",t=>{const i=t.target,a=i.closest("[data-agent]");if(a)return Wo.openAgent(a.dataset.agent);const s=i.closest("[data-empresa]");s&&Wo.openBoard({empresaId:s.dataset.empresa})}),Tl()}function Tl(){const n=mn().filter(t=>t.estado==="en_curso"),e=new Set(n.map(t=>t.agenteId)).size;Le("#teams summary").innerHTML=`Equipos en trabajo <b>${e}</b>`,Le("#teams-body").innerHTML=gn.map(t=>{const i=n.filter(r=>r.empresaId===t.id),a=[...new Set(i.map(r=>r.agenteId))],s=a.map(r=>{const o=mt(r);if(!o)return"";const c=i.find(l=>l.agenteId===r);return`<button class="tpill" data-agent="${r}" style="--c:${Ue[o.area].color}" title="${oe(c.titulo)} · ${c.progreso}%">
            <i></i>${oe(o.nombre)}<small>${c.progreso}%</small></button>`}).join("");return`<section class="tco" style="--c:${t.color}">
        <button class="tco-head" data-empresa="${t.id}">
          <span><b>${oe(t.nombre)}</b><small>${oe(t.tipo)}</small></span>
          <em>${a.length} ${a.length===1?"agente":"agentes"}</em></button>
        <div class="tpills">${s||'<span class="muted">Sin agentes trabajando</span>'}</div></section>`}).join("")}let Hn,vt,Rl=!1,Tr=!1,jt={area:"",empresa:"",agente:"",q:""};const Dh=["por_hacer","en_curso","hecha"],qo=n=>n.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),A1=n=>{var e;return((e=gn.find(t=>t.id===n))==null?void 0:e.nombre)??n},T1=n=>{var e;return((e=gn.find(t=>t.id===n))==null?void 0:e.color)??"#888"};function R1(n){Hn=n,vt=Le("#modal-root")}function eo(n){jt={area:(n==null?void 0:n.area)??"",empresa:(n==null?void 0:n.empresaId)??"",agente:(n==null?void 0:n.agenteId)??"",q:""},Rl=!0,gs()}function Vc(){var n;Rl=!1,(n=Le("#board-modal",vt))==null||n.remove()}function Nh(){Rl&&gs()}function C1(){const n=qo(jt.q.trim());return mn().filter(e=>{if(jt.area&&e.area!==jt.area||jt.empresa&&e.empresaId!==jt.empresa||jt.agente&&e.agenteId!==jt.agente)return!1;if(n){const t=mt(e.agenteId);if(!qo((t==null?void 0:t.nombre)??"").includes(n)&&!qo(e.titulo).includes(n))return!1}return!0})}function Uh(n,e){const t=["financiera","tecnologia","operaciones","diseno","rrhh","recepcion"].map(i=>{const a=Yt().filter(s=>s.area===i).map(s=>`<option value="${s.id}" ${s.id===n?"selected":""}>${oe(s.nombre)} — ${oe(s.cargo)}</option>`).join("");return`<optgroup label="${Ue[i].nombre}">${a}</optgroup>`}).join("");return(e?'<option value="">Todos los agentes</option>':"")+t}function gs(){var o;const n=Le("#board-modal",vt),e=((o=n==null?void 0:n.querySelector(".cols"))==null?void 0:o.scrollTop)??0,t=C1(),i=mn().length,a=`<div class="overlay" id="board-modal">
    <div class="board ${Tr?"max":""}" role="dialog" aria-label="Tablero de tareas">
      <div class="b-head">
        <div><h2>Tablero de tareas</h2><small>${t.length} de ${i} tareas</small></div>
        <div class="b-actions">
          <button class="btn gold" data-b="nueva">+ Nueva tarea</button>
          ${bh()?'<button class="btn" data-b="borrar-ej">Borrar ejemplos</button>':'<button class="btn ghost" data-b="cargar-ej">Cargar ejemplos</button>'}
          <button class="icon" data-b="ampliar" title="Ampliar / reducir" aria-label="Ampliar o reducir">⤢</button>
          <button class="icon" data-b="cerrar" aria-label="Cerrar">✕</button>
        </div>
      </div>
      <div class="b-filters">
        <input id="f-q" type="search" placeholder="Buscar por nombre del agente o título…" value="${oe(jt.q)}" />
        <select id="f-area"><option value="">Todas las áreas</option>${["financiera","tecnologia","operaciones","diseno"].map(c=>`<option value="${c}" ${jt.area===c?"selected":""}>${Ue[c].nombre}</option>`).join("")}</select>
        <select id="f-emp"><option value="">Todas las empresas</option>${gn.map(c=>`<option value="${c.id}" ${jt.empresa===c.id?"selected":""}>${oe(c.nombre)}</option>`).join("")}</select>
        <select id="f-ag">${Uh(jt.agente,!0)}</select>
        <button class="btn ghost small" data-b="limpiar">Limpiar filtros</button>
      </div>
      <div class="cols">
        ${Dh.map(c=>`<section class="col ${c}" data-col="${c}">
          <h3>${Xr[c]} <span>${t.filter(l=>l.estado===c).length}</span></h3>
          <div class="cards">${t.filter(l=>l.estado===c).map(l=>P1(l.id)).join("")||'<p class="empty">Sin tareas</p>'}</div></section>`).join("")}
      </div>
    </div></div>`;n==null||n.remove(),vt.insertAdjacentHTML("beforeend",a);const s=Le("#board-modal",vt),r=s.querySelector(".cols");r&&(r.scrollTop=e),I1(s)}function P1(n){const e=di(n),t=mt(e.agenteId),i=Ue[e.area].color;return`<article class="tcard" draggable="true" data-id="${e.id}" style="--c:${i}">
    <div class="tc-top"><b>${oe(e.titulo)}</b>${e.ejemplo?'<span class="ej">ejemplo</span>':""}</div>
    <div class="tc-meta">
      <span class="chip" style="--c:${T1(e.empresaId)}">${oe(A1(e.empresaId))}</span>
      <span class="who" style="--c:${i}"><i></i>${oe((t==null?void 0:t.nombre)??"—")}</span>
      ${e.prioridad?`<span class="prio ${e.prioridad}">${e.prioridad}</span>`:""}
      ${e.origen==="recepcion"?'<span class="orig">recepción</span>':""}
      <small>${As(e.fecha)}</small>
    </div>
    <div class="tc-prog">
      <input type="range" min="0" max="100" step="5" value="${e.progreso}" data-prog="${e.id}" ${e.estado==="hecha"?"disabled":""} aria-label="Progreso" />
      <output>${e.progreso}%</output>
    </div>
    <div class="tc-btns">
      ${e.estado==="por_hacer"?`<button class="btn small gold" data-b="iniciar" data-id="${e.id}">Iniciar</button>`:""}
      ${e.estado==="en_curso"?`<button class="btn small gold" data-b="completar" data-id="${e.id}">Completar</button><button class="btn small ghost" data-b="pausar" data-id="${e.id}">Pausar</button>`:""}
      ${e.estado==="hecha"?`<button class="btn small" data-b="reabrir" data-id="${e.id}">Reabrir</button>`:""}
      <button class="btn small ghost" data-b="editar" data-id="${e.id}">Editar</button>
    </div></article>`}function I1(n){n.addEventListener("click",i=>{const a=i.target.closest("[data-b]");if(!a){i.target.id==="board-modal"&&Vc();return}const s=a.dataset.id??"";switch(a.dataset.b){case"cerrar":return Vc();case"ampliar":return Tr=!Tr,n.querySelector(".board").classList.toggle("max",Tr);case"nueva":return jt.agente?Ts({agenteId:jt.agente}):to();case"editar":return Ts({taskId:s});case"iniciar":return Ra(s,"en_curso"),Hn.toast("Tarea en curso: el agente va a su mesa");case"pausar":return Ra(s,"por_hacer"),Hn.toast("Tarea pausada");case"reabrir":Ra(s,"en_curso");return;case"completar":return yl(s),Hn.toast("Tarea completada");case"borrar-ej":return vh(),Hn.toast("Ejemplos borrados");case"cargar-ej":return _h(),Hn.toast("Ejemplos cargados");case"limpiar":return jt={area:"",empresa:"",agente:"",q:""},gs()}});const e=(i,a)=>n.querySelector(i).addEventListener("change",s=>{jt[a]=s.target.value,gs()});e("#f-area","area"),e("#f-emp","empresa"),e("#f-ag","agente");const t=n.querySelector("#f-q");t.addEventListener("input",()=>{jt.q=t.value;const i=t.selectionStart;gs();const a=Le("#f-q",vt);a.focus(),a.setSelectionRange(i,i)}),n.querySelectorAll("input[data-prog]").forEach(i=>{i.addEventListener("input",()=>i.nextElementSibling.textContent=i.value+"%"),i.addEventListener("change",()=>Ji(i.dataset.prog,{progreso:Number(i.value)}))}),n.querySelectorAll(".tcard").forEach(i=>{i.addEventListener("dragstart",a=>{var s;(s=a.dataTransfer)==null||s.setData("text/plain",i.dataset.id),i.classList.add("drag")}),i.addEventListener("dragend",()=>i.classList.remove("drag"))}),n.querySelectorAll(".col").forEach(i=>{i.addEventListener("dragover",a=>{a.preventDefault(),i.classList.add("over")}),i.addEventListener("dragleave",()=>i.classList.remove("over")),i.addEventListener("drop",a=>{var r;a.preventDefault(),i.classList.remove("over");const s=(r=a.dataTransfer)==null?void 0:r.getData("text/plain");s&&Ra(s,i.dataset.col)})})}function Ts(n){var c,l;(c=Le("#task-modal",vt))==null||c.remove();const e=n.taskId?di(n.taskId):void 0,t=(e==null?void 0:e.agenteId)??n.agenteId??"",i=`<div class="overlay top" id="task-modal"><form class="dialog form" id="task-form">
    <div class="b-head"><h2>${e?"Editar tarea":"Nueva tarea"}</h2><button type="button" class="icon" data-x aria-label="Cerrar">✕</button></div>
    <label>Título<input name="titulo" required maxlength="90" value="${oe((e==null?void 0:e.titulo)??"")}" placeholder="Ej.: Conciliar extractos del mes" /></label>
    <div class="two">
      <label>Agente asignado<select name="agente" required>${t?"":'<option value="" selected disabled>Elige un agente…</option>'}${Uh(t,!1)}</select></label>
      <label>Empresa<select name="empresa">${gn.map(d=>`<option value="${d.id}" ${(e==null?void 0:e.empresaId)===d.id?"selected":""}>${oe(d.nombre)}</option>`).join("")}</select></label>
    </div>
    <div class="two">
      <label>Estado<select name="estado">${Dh.map(d=>`<option value="${d}" ${((e==null?void 0:e.estado)??"en_curso")===d?"selected":""}>${Xr[d]}</option>`).join("")}</select></label>
      <label>Fecha<input type="date" name="fecha" value="${Ny((e==null?void 0:e.fecha)??new Date().toISOString())}" /></label>
    </div>
    <label>Progreso: <output id="pv">${(e==null?void 0:e.progreso)??0}%</output>
      <input type="range" name="progreso" min="0" max="100" step="5" value="${(e==null?void 0:e.progreso)??0}" /></label>
    <p class="hint">Si la tarea queda «En curso», el agente va a su mesa y trabaja. Al completarla, vuelve a descansar.</p>
    <div class="actions">
      <button class="btn gold" type="submit">${e?"Guardar":"Crear y asignar"}</button>
      <button class="btn ghost" type="button" data-x>Cancelar</button>
      ${e?'<button class="btn danger" type="button" id="del-task">Eliminar</button>':""}
    </div></form></div>`;vt.insertAdjacentHTML("beforeend",i);const a=Le("#task-modal",vt),s=Le("#task-form",vt),r=()=>a.remove();a.addEventListener("mousedown",d=>{d.target===a&&r()}),a.querySelectorAll("[data-x]").forEach(d=>d.addEventListener("click",r));const o=s.elements.namedItem("progreso");o.addEventListener("input",()=>Le("#pv",vt).textContent=o.value+"%"),(l=Le("#del-task",vt))==null||l.addEventListener("click",()=>{e&&Ml(e.id),Hn.toast("Tarea eliminada"),r()}),s.addEventListener("submit",d=>{d.preventDefault();const h=new FormData(s),u=String(h.get("estado")),f={titulo:String(h.get("titulo")),agenteId:String(h.get("agente")),empresaId:String(h.get("empresa")),progreso:Number(h.get("progreso")),fecha:new Date(String(h.get("fecha"))+"T12:00:00").toISOString()};f.agenteId&&(e?(Ji(e.id,{...f,estado:u,titulo:f.titulo.trim()}),Hn.toast("Tarea actualizada")):(mh({...f,estado:u}),Hn.toast(u==="en_curso"?"Tarea asignada: el agente va a su mesa":"Tarea creada")),r())}),s.elements.namedItem("titulo").focus()}function L1(){var t;(t=Le("#team-modal",vt))==null||t.remove();const n=["direccion","financiera","tecnologia","operaciones","diseno","recepcion","rrhh"].map(i=>{const a=Yt().filter(s=>s.area===i);return`<h3 style="color:${Ue[i].color}">${Ue[i].nombre} <span>${a.length}</span></h3>
      <div class="team-grid">${a.map(s=>`<div class="team-row"><div><b>${oe(s.nombre)}</b><small>${oe(s.cargo)}</small>
          <small class="muted">${s.funciones.length} funciones</small></div>
          <button class="btn small" data-edit="${s.id}">Editar</button></div>`).join("")}</div>`}).join("");vt.insertAdjacentHTML("beforeend",`<div class="overlay" id="team-modal"><div class="dialog wide">
      <div class="b-head"><div><h2>Equipo de agentes</h2><small>Edita el nombre, el cargo y las funciones de cada agente</small></div>
      <button class="icon" data-x aria-label="Cerrar">✕</button></div>
      <div class="team-body">${n}</div></div></div>`);const e=Le("#team-modal",vt);e.addEventListener("click",i=>{const a=i.target;if(a===e||a.closest("[data-x]"))return e.remove();const s=a.closest("[data-edit]");s&&(e.remove(),Hn.openEditor(s.dataset.edit))})}function D1(){var n,e,t,i;Vc(),(n=Le("#task-modal",vt))==null||n.remove(),(e=Le("#team-modal",vt))==null||e.remove(),(t=Le("#free-modal",vt))==null||t.remove(),(i=Le("#req-modal",vt))==null||i.remove()}function to(n=!0){var s;(s=Le("#free-modal",vt))==null||s.remove();const e=Yt().filter(r=>r.id!=="felipe"),t=n?e.filter(r=>!zt(r.id)&&!ys.includes(r.area)):e,i=["financiera","tecnologia","operaciones","diseno","rrhh","recepcion"].map(r=>{const o=t.filter(c=>c.area===r);return o.length?`<h3 style="color:${Ue[r].color}">${Ue[r].nombre} <span>${o.length}</span></h3>
        <div class="team-grid">${o.map(c=>{const l=zt(c.id);return`<button class="team-row free-row" data-pick="${c.id}"><div><b>${oe(c.nombre)}</b><small>${oe(c.cargo)}</small>
              <small class="muted">${l?"Ocupado · "+oe(l.titulo):ys.includes(c.area)?"Disponible en su puesto":"Libre · fuera del edificio"}</small></div>
              <span class="btn small gold">Asignar</span></button>`}).join("")}</div>`:""}).join("");vt.insertAdjacentHTML("beforeend",`<div class="overlay" id="free-modal"><div class="dialog wide">
      <div class="b-head"><div><h2>${n?"Agentes libres":"Todos los agentes"}</h2>
        <small>${t.length} ${n?"disponibles ahora · elige a quién asignar la tarea. Entrará por la puerta y irá a su mesa.":"agentes"}</small></div>
        <div class="actions"><button class="btn small ghost" data-toggle>${n?"Ver todos":"Solo libres"}</button>
        <button class="icon" data-x aria-label="Cerrar">✕</button></div></div>
      <div class="team-body">${i||'<p class="muted">No hay agentes libres en este momento.</p>'}</div></div></div>`);const a=Le("#free-modal",vt);a.addEventListener("click",r=>{const o=r.target;if(o===a||o.closest("[data-x]"))return a.remove();if(o.closest("[data-toggle]"))return to(!n);const c=o.closest("[data-pick]");c&&(a.remove(),Ts({agenteId:c.dataset.pick}))})}function zh(){var i;(i=Le("#req-modal",vt))==null||i.remove(),vt.insertAdjacentHTML("beforeend",`<div class="overlay top" id="req-modal"><form class="dialog form" id="req-form">
      <div class="b-head"><div><h2>Nueva solicitud</h2><small>Entra por recepción: Carolina la clasifica y la envía a quien corresponde</small></div>
        <button type="button" class="icon" data-x aria-label="Cerrar">✕</button></div>
      <label>Título<input name="titulo" required maxlength="90" placeholder="Ej.: Error en la web del formulario de contacto" /></label>
      <label>Descripción<textarea name="descripcion" rows="3" maxlength="400" placeholder="Qué se necesita, para quién y por qué…"></textarea></label>
      <div class="two">
        <label>Empresa<select name="empresa">${gn.map(a=>`<option value="${a.id}">${oe(a.nombre)}</option>`).join("")}</select></label>
        <label>Fecha límite (opcional)<input type="date" name="limite" /></label>
      </div>
      <p class="hint">Si no se puede clasificar, queda en la bandeja «Por revisar» del panel de Felipe.</p>
      <div class="actions"><button class="btn gold" type="submit">Enviar a recepción</button><button class="btn ghost" type="button" data-x>Cancelar</button></div>
    </form></div>`);const n=Le("#req-modal",vt),e=Le("#req-form",vt),t=()=>n.remove();n.addEventListener("mousedown",a=>{a.target===n&&t()}),n.querySelectorAll("[data-x]").forEach(a=>a.addEventListener("click",t)),e.addEventListener("submit",a=>{a.preventDefault();const s=new FormData(e);xl({titulo:String(s.get("titulo")),descripcion:String(s.get("descripcion")??""),empresaId:String(s.get("empresa")),limite:String(s.get("limite")??"")||void 0}),Hn.toast("Solicitud enviada a recepción"),t()}),e.elements.namedItem("titulo").focus()}let ls;function N1(n){ls=n,Le("#lists").addEventListener("click",e=>{var r;const t=e.target,i=t.closest("[data-free]");if(i)return ls.openTaskForm({agenteId:i.dataset.free});const a=t.closest("[data-agent]");if(a)return ls.openAgent(a.dataset.agent);const s=(r=t.closest("[data-list-act]"))==null?void 0:r.dataset.listAct;s==="asignar"?ls.openFreeAgents():s==="solicitud"&&ls.openRequestForm()}),Cl()}function Cl(){const n=Yt().filter(o=>o.id!=="felipe"&&!ys.includes(o.area)&&!zt(o.id));Le("#free summary").innerHTML=`Agentes libres <b>${n.length}</b>`,Le("#free-body").innerHTML=n.length?`<p class="muted small">Fuera del edificio. Toca uno para asignarle una tarea: entrará y irá a su mesa.</p>
       <div class="tpills">${n.map(o=>`<button class="tpill" data-free="${o.id}" style="--c:${Ue[o.area].color}" title="${oe(o.cargo)}"><i></i>${oe(o.nombre)}</button>`).join("")}</div>`:'<p class="muted small">Todos los agentes están trabajando.</p>';const e=In("entrada").length,t=In("por_revisar").length,i=ea().length;Le("#recep summary").innerHTML=`Recepción <b class="${e||t||i?"":"zero"}">${e+t}</b>`,Le("#recep-body").innerHTML=`
    <div class="mini-grid">
      <span><b>${e}</b>en bandeja</span><span><b>${t}</b>por revisar</span><span><b class="${i?"bad":""}">${i}</b>en seguimiento</span>
    </div>
    <div class="tpills">
      <button class="tpill" data-agent="carolina" style="--c:${Ue.recepcion.color}"><i></i>Carolina<small>enruta</small></button>
      <button class="tpill" data-agent="sofia" style="--c:${Ue.recepcion.color}"><i></i>Sofía<small>agenda</small></button>
    </div>
    <button class="btn small gold wide" data-list-act="solicitud">+ Nueva solicitud</button>`;const a=wl(),s=Yt().filter(o=>o.area==="rrhh"),r=Yt().reduce((o,c)=>o+Ga(c.id).length,0);Le("#skills summary").innerHTML=`SKILLS <b class="${a.length?"":"zero"}">${a.length}</b>`,Le("#skills-body").innerHTML=`
    ${a.length?`<div class="skill-chips">${a.map(o=>`<span class="skill" title="${oe(o.descripcion??"")}">${oe(o.nombre)}</span>`).join("")}</div>
           <p class="muted small">${r} asignaciones activas.</p>`:'<p class="muted small">La lista de SKILLS está pendiente de cargar (src/data/skills.json).</p>'}
    <p class="muted small">Las asigna Recursos Humanos según la necesidad de cada proyecto:</p>
    <div class="tpills">${s.map(o=>{var c;return`<button class="tpill" data-agent="${o.id}" style="--c:${Ue.rrhh.color}"><i></i>${oe(((c=mt(o.id))==null?void 0:c.nombre)??o.nombre)}</button>`}).join("")}</div>`}const Oh="mn.tema";function U1(){try{const n=localStorage.getItem(Oh);if(n==="light"||n==="dark")return n}catch{}return"dark"}let La=U1();const Pl=()=>{document.documentElement.dataset.theme=La,ct.setTheme(La);try{localStorage.setItem(Oh,La)}catch{}},ct=new Zy(Le("#stage"),Le("#labels"));function Fh(n){const e=document.createElement("div");e.className="toast",e.textContent=n,Le("#toasts").appendChild(e),setTimeout(()=>e.classList.add("out"),2600),setTimeout(()=>e.remove(),3100)}h1({world:ct,openBoard:eo,openTaskForm:Ts,openFreeAgents:to,openRequestForm:zh,toast:Fh});R1({toast:Fh,openEditor:Rh});w1({openAgent:Ls,openBoard:eo});N1({openAgent:Ls,openTaskForm:Ts,openFreeAgents:to,openRequestForm:zh});ct.onAgent=Ls;Zn&&(ct.onAgent=n=>{var t;const e=ct.salaDe(n);((t=ct.conexiones)==null?void 0:t.estadoDeSala(e))==="config"?ct.conexiones.abrirVerificacion(e):Ls(n)});ct.onBoard=()=>eo();ct.onHub=()=>Th();const kh=Le("#cams-body");window.matchMedia("(max-width: 860px)").matches&&(Le("#cams").open=!0);const z1=x_.map(n=>fl.find(e=>e.id===n));kh.innerHTML=`
  <button class="cam primary" data-cam="all">⌂ Vista general</button>
  <h4>Salas</h4>
  ${z1.map(n=>`<button class="cam" data-room="${n.id}">${n.nombre}</button>`).join("")}
  <h4>Áreas</h4>
  ${["financiera","tecnologia","operaciones","diseno","rrhh"].map(n=>`<button class="cam" data-area="${n}"><i style="background:${Ue[n].color}"></i>${Ue[n].nombre}</button>`).join("")}`;kh.addEventListener("click",n=>{const e=n.target.closest("button");e&&(e.dataset.cam?ct.overview():e.dataset.room?ct.focusRoom(e.dataset.room):e.dataset.area&&ct.focusArea(e.dataset.area))});Le("#btn-board").addEventListener("click",()=>eo());Le("#btn-ceo").addEventListener("click",()=>Ls("felipe"));Le("#btn-cerebro").addEventListener("click",()=>Th());Le("#btn-team").addEventListener("click",()=>L1());Le("#btn-menu").addEventListener("click",()=>document.body.classList.toggle("lists-open"));Le("#rot").addEventListener("click",n=>{const e=n.target,t=e.closest("[data-rot]");t&&ct.rig.rotateBy(Number(t.dataset.rot)*Math.PI/6);const i=e.closest("[data-tilt]");i&&ct.rig.tiltBy(Number(i.dataset.tilt)*Math.PI/18)});setInterval(()=>{Le("#rot-deg").textContent=ct.rig.degrees+"° · "+ct.rig.elevationDeg+"°"},150);Le("#btn-theme").addEventListener("click",()=>{La=La==="dark"?"light":"dark",Pl()});window.addEventListener("keydown",n=>{const e=n.target.tagName;if((n.key==="q"||n.key==="Q"||n.key==="e"||n.key==="E")&&e!=="INPUT"&&e!=="TEXTAREA"&&e!=="SELECT"){ct.rig.rotateBy((n.key.toLowerCase()==="q"?-1:1)*Math.PI/12);return}if((n.key==="r"||n.key==="R"||n.key==="f"||n.key==="F")&&e!=="INPUT"&&e!=="TEXTAREA"&&e!=="SELECT"){ct.rig.tiltBy((n.key.toLowerCase()==="r"?1:-1)*Math.PI/36);return}if(n.key!=="Escape")return;document.body.classList.remove("lists-open");const t=document.querySelector("#task-modal, #team-modal, #free-modal, #req-modal");if(t)return t.remove();if(document.querySelector("#board-modal"))return D1();wh()});function Il(){const n=Yt().filter(i=>i.id!=="felipe"),e=n.filter(i=>zt(i.id)).length,t=n.filter(i=>!zt(i.id)&&!ys.includes(i.area)).length;Le("#stats").innerHTML=`
    <span class="chip-stat"><i class="dot work"></i><b>${e}</b> trabajando</span>
    <span class="chip-stat"><i class="dot free"></i><b>${t}</b> disponibles</span>`}El(()=>{ct.agents.sync(),ct.labels.refresh(),ct.refreshBoard(),Il(),Tl(),Cl(),Ah(),Nh()});rh(()=>{ct.agents.refreshDefs(),ct.labels.refresh(),Il(),Tl(),Cl(),Ah(),Nh()});Il();Pl();Zn?O1():ct.overview();function O1(){document.body.classList.add("modo-azahar"),ct.resize(),document.title="Oficina Virtual · Azahar Coffee",ct.overview();const n=new URLSearchParams(location.search).get("tema");(n==="claro"||n==="oscuro")&&(La=n==="claro"?"light":"dark",Pl());const e=new URL("../api/azahar/estado",location.href).toString(),t=async()=>{var i,a;try{const s=await fetch(e,{credentials:"same-origin",cache:"no-store"}),r=await s.json();(i=ct.conexiones)==null||i.setEstados(s.ok&&r.ok&&r.conexiones?r.conexiones:{})}catch{(a=ct.conexiones)==null||a.setEstados({})}};ct.conexiones.onVerificar=async(i,a)=>{try{return(await fetch(new URL("../api/azahar/verificar",location.href).toString(),{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:i,accion:a})})).ok?(await t(),!0):!1}catch{return!1}},t(),setInterval(()=>void t(),3e4)}const $c=Le("#lang");$c.value=kS();$c.addEventListener("change",()=>BS($c.value));VS();window.oficina=ct;window.oficinaStore={tareas:Cy,agentes:My};

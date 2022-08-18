if(!t)var t={map:function(t,n){var r={};return n?t.map(function(t,o){return r.index=o,n.call(r,t)}):t.slice()},naturalOrder:function(t,n){return t<n?-1:t>n?1:0},sum:function(t,n){var r={};return t.reduce(n?function(t,o,e){return r.index=e,t+n.call(r,o)}:function(t,n){return t+n},0)},max:function(n,r){return Math.max.apply(null,r?t.map(n,r):n)}};var n=function(){function n(t,n,r){return(t<<10)+(n<<5)+r}function r(t){var n=[],r=!1;function o(){n.sort(t),r=!0}return{push:function(t){n.push(t),r=!1},peek:function(t){return r||o(),void 0===t&&(t=n.length-1),n[t]},pop:function(){return r||o(),n.pop()},size:function(){return n.length},map:function(t){return n.map(t)},debug:function(){return r||o(),n}}}function o(t,n,r,o,e,u,i){var a=this;a.r1=t,a.r2=n,a.g1=r,a.g2=o,a.b1=e,a.b2=u,a.histo=i}function e(){this.vboxes=new r(function(n,r){return t.naturalOrder(n.vbox.count()*n.vbox.volume(),r.vbox.count()*r.vbox.volume())})}function u(r,o){if(o.count()){var e=o.r2-o.r1+1,u=o.g2-o.g1+1,i=t.max([e,u,o.b2-o.b1+1]);if(1==o.count())return[o.copy()];var a,c,s,f,l=0,h=[],v=[];if(i==e)for(a=o.r1;a<=o.r2;a++){for(f=0,c=o.g1;c<=o.g2;c++)for(s=o.b1;s<=o.b2;s++)f+=r[n(a,c,s)]||0;h[a]=l+=f}else if(i==u)for(a=o.g1;a<=o.g2;a++){for(f=0,c=o.r1;c<=o.r2;c++)for(s=o.b1;s<=o.b2;s++)f+=r[n(c,a,s)]||0;h[a]=l+=f}else for(a=o.b1;a<=o.b2;a++){for(f=0,c=o.r1;c<=o.r2;c++)for(s=o.g1;s<=o.g2;s++)f+=r[n(c,s,a)]||0;h[a]=l+=f}return h.forEach(function(t,n){v[n]=l-t}),function(t){var n,r,e,u,i,c=t+"1",s=t+"2",f=0;for(a=o[c];a<=o[s];a++)if(h[a]>l/2){for(e=o.copy(),u=o.copy(),i=(n=a-o[c])<=(r=o[s]-a)?Math.min(o[s]-1,~~(a+r/2)):Math.max(o[c],~~(a-1-n/2));!h[i];)i++;for(f=v[i];!f&&h[i-1];)f=v[--i];return e[s]=i,u[c]=e[s]+1,[e,u]}}(i==e?"r":i==u?"g":"b")}}return o.prototype={volume:function(t){var n=this;return n._volume&&!t||(n._volume=(n.r2-n.r1+1)*(n.g2-n.g1+1)*(n.b2-n.b1+1)),n._volume},count:function(t){var r=this,o=r.histo;if(!r._count_set||t){var e,u,i,a=0;for(e=r.r1;e<=r.r2;e++)for(u=r.g1;u<=r.g2;u++)for(i=r.b1;i<=r.b2;i++)a+=o[n(e,u,i)]||0;r._count=a,r._count_set=!0}return r._count},copy:function(){var t=this;return new o(t.r1,t.r2,t.g1,t.g2,t.b1,t.b2,t.histo)},avg:function(t){var r=this,o=r.histo;if(!r._avg||t){var e,u,i,a,c=0,s=0,f=0,l=0;for(u=r.r1;u<=r.r2;u++)for(i=r.g1;i<=r.g2;i++)for(a=r.b1;a<=r.b2;a++)c+=e=o[n(u,i,a)]||0,s+=e*(u+.5)*8,f+=e*(i+.5)*8,l+=e*(a+.5)*8;r._avg=c?[~~(s/c),~~(f/c),~~(l/c)]:[~~(8*(r.r1+r.r2+1)/2),~~(8*(r.g1+r.g2+1)/2),~~(8*(r.b1+r.b2+1)/2)]}return r._avg},contains:function(t){var n=this,r=t[0]>>3;return gval=t[1]>>3,bval=t[2]>>3,r>=n.r1&&r<=n.r2&&gval>=n.g1&&gval<=n.g2&&bval>=n.b1&&bval<=n.b2}},e.prototype={push:function(t){this.vboxes.push({vbox:t,color:t.avg()})},palette:function(){return this.vboxes.map(function(t){return t.color})},size:function(){return this.vboxes.size()},map:function(t){for(var n=this.vboxes,r=0;r<n.size();r++)if(n.peek(r).vbox.contains(t))return n.peek(r).color;return this.nearest(t)},nearest:function(t){for(var n,r,o,e=this.vboxes,u=0;u<e.size();u++)((r=Math.sqrt(Math.pow(t[0]-e.peek(u).color[0],2)+Math.pow(t[1]-e.peek(u).color[1],2)+Math.pow(t[2]-e.peek(u).color[2],2)))<n||void 0===n)&&(n=r,o=e.peek(u).color);return o},forcebw:function(){var n=this.vboxes;n.sort(function(n,r){return t.naturalOrder(t.sum(n.color),t.sum(r.color))});var r=n[0].color;r[0]<5&&r[1]<5&&r[2]<5&&(n[0].color=[0,0,0]);var o=n.length-1,e=n[o].color;e[0]>251&&e[1]>251&&e[2]>251&&(n[o].color=[255,255,255])}},{quantize:function(i,a){if(!i.length||a<2||a>256)return!1;var c=function(t){var r,o=new Array(32768);return t.forEach(function(t){r=n(t[0]>>3,t[1]>>3,t[2]>>3),o[r]=(o[r]||0)+1}),o}(i);c.forEach(function(){});var s=function(t,n){var r,e,u,i=1e6,a=0,c=1e6,s=0,f=1e6,l=0;return t.forEach(function(t){(r=t[0]>>3)<i?i=r:r>a&&(a=r),(e=t[1]>>3)<c?c=e:e>s&&(s=e),(u=t[2]>>3)<f?f=u:u>l&&(l=u)}),new o(i,a,c,s,f,l,n)}(i,c),f=new r(function(n,r){return t.naturalOrder(n.count(),r.count())});function l(t,n){for(var r,o=t.size(),e=0;e<1e3;){if(o>=n)return;if(e++>1e3)return;if((r=t.pop()).count()){var i=u(c,r),a=i[0],s=i[1];if(!a)return;t.push(a),s&&(t.push(s),o++)}else t.push(r),e++}}f.push(s),l(f,.75*a);for(var h=new r(function(n,r){return t.naturalOrder(n.count()*n.volume(),r.count()*r.volume())});f.size();)h.push(f.pop());l(h,a);for(var v=new e;h.size();)v.push(h.pop());return v}}}().quantize;const r=function(t){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.width=this.canvas.width=t.naturalWidth,this.height=this.canvas.height=t.naturalHeight,this.context.drawImage(t,0,0,this.width,this.height)};r.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)};var o=function(){};o.prototype.getColor=function(t,n=10){return this.getPalette(t,5,n)[0]},o.prototype.getPalette=function(t,o,e){const u=function(t){let{colorCount:n,quality:r}=t;if(void 0!==n&&Number.isInteger(n)){if(1===n)throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");n=Math.max(n,2),n=Math.min(n,20)}else n=10;return(void 0===r||!Number.isInteger(r)||r<1)&&(r=10),{colorCount:n,quality:r}}({colorCount:o,quality:e}),i=new r(t),a=function(t,n,r){const o=t,e=[];for(let t,u,i,a,c,s=0;s<n;s+=r)t=4*s,u=o[t+0],i=o[t+1],a=o[t+2],c=o[t+3],(void 0===c||c>=125)&&(u>250&&i>250&&a>250||e.push([u,i,a]));return e}(i.getImageData().data,i.width*i.height,u.quality),c=n(a,u.colorCount);return c?c.palette():null},o.prototype.getColorFromUrl=function(t,n,r){const o=document.createElement("img");o.addEventListener("load",()=>{const e=this.getPalette(o,5,r);n(e[0],t)}),o.src=t},o.prototype.getImageData=function(t,n){let r=new XMLHttpRequest;r.open("GET",t,!0),r.responseType="arraybuffer",r.onload=function(){if(200==this.status){let t=new Uint8Array(this.response);i=t.length;let r=new Array(i);for(let n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);let o=r.join(""),e=window.btoa(o);n("data:image/png;base64,"+e)}},r.send()},o.prototype.getColorAsync=function(t,n,r){const o=this;this.getImageData(t,function(t){const e=document.createElement("img");e.addEventListener("load",function(){const t=o.getPalette(e,5,r);n(t[0],this)}),e.src=t})};export{o as default};

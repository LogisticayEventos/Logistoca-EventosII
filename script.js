/*
QRCode.js — MIT License
Copyright (c) 2012 davidshimjs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to inclusion of this notice.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT.
*/
/* eslint-disable @typescript-eslint/no-unused-expressions, @typescript-eslint/no-this-alias */
var QRCode;!function(){function a(a){this.mode=c.MODE_8BIT_BYTE,this.data=a,this.parsedData=[];for(var b=[],d=0,e=this.data.length;e>d;d++){var f=this.data.charCodeAt(d);f>65536?(b[0]=240|(1835008&f)>>>18,b[1]=128|(258048&f)>>>12,b[2]=128|(4032&f)>>>6,b[3]=128|63&f):f>2048?(b[0]=224|(61440&f)>>>12,b[1]=128|(4032&f)>>>6,b[2]=128|63&f):f>128?(b[0]=192|(1984&f)>>>6,b[1]=128|63&f):b[0]=f,this.parsedData=this.parsedData.concat(b)}this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function b(a,b){this.typeNumber=a,this.errorCorrectLevel=b,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function i(a,b){if(void 0==a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0==a[c];)c++;this.num=new Array(a.length-c+b);for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}function j(a,b){this.totalCount=a,this.dataCount=b}function k(){this.buffer=[],this.length=0}function m(){return"undefined"!=typeof CanvasRenderingContext2D}function n(){var a=!1,b=navigator.userAgent;return/android/i.test(b)&&(a=!0,aMat=b.toString().match(/android ([0-9]\.[0-9])/i),aMat&&aMat[1]&&(a=parseFloat(aMat[1]))),a}function r(a,b){for(var c=1,e=s(a),f=0,g=l.length;g>=f;f++){var h=0;switch(b){case d.L:h=l[f][0];break;case d.M:h=l[f][1];break;case d.Q:h=l[f][2];break;case d.H:h=l[f][3]}if(h>=e)break;c++}if(c>l.length)throw new Error("Too long data");return c}function s(a){var b=encodeURI(a).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return b.length+(b.length!=a?3:0)}a.prototype={getLength:function(){return this.parsedData.length},write:function(a){for(var b=0,c=this.parsedData.length;c>b;b++)a.put(this.parsedData[b],8)}},b.prototype={addData:function(b){var c=new a(b);this.dataList.push(c),this.dataCache=null},isDark:function(a,b){if(0>a||this.moduleCount<=a||0>b||this.moduleCount<=b)throw new Error(a+","+b);return this.modules[a][b]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[d][e]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,c),this.typeNumber>=7&&this.setupTypeNumber(a),null==this.dataCache&&(this.dataCache=b.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,b){for(var c=-1;7>=c;c++)if(!(-1>=a+c||this.moduleCount<=a+c))for(var d=-1;7>=d;d++)-1>=b+d||this.moduleCount<=b+d||(this.modules[a+c][b+d]=c>=0&&6>=c&&(0==d||6==d)||d>=0&&6>=d&&(0==c||6==c)||c>=2&&4>=c&&d>=2&&4>=d?!0:!1)},getBestMaskPattern:function(){for(var a=0,b=0,c=0;8>c;c++){this.makeImpl(!0,c);var d=f.getLostPoint(this);(0==c||a>d)&&(a=d,b=c)}return b},createMovieClip:function(a,b,c){var d=a.createEmptyMovieClip(b,c),e=1;this.make();for(var f=0;f<this.modules.length;f++)for(var g=f*e,h=0;h<this.modules[f].length;h++){var i=h*e,j=this.modules[f][h];j&&(d.beginFill(0,100),d.moveTo(i,g),d.lineTo(i+e,g),d.lineTo(i+e,g+e),d.lineTo(i,g+e),d.endFill())}return d},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(var b=8;b<this.moduleCount-8;b++)null==this.modules[6][b]&&(this.modules[6][b]=0==b%2)},setupPositionAdjustPattern:function(){for(var a=f.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var g=-2;2>=g;g++)for(var h=-2;2>=h;h++)this.modules[d+g][e+h]=-2==g||2==g||-2==h||2==h||0==g&&0==h?!0:!1}},setupTypeNumber:function(a){for(var b=f.getBCHTypeNumber(this.typeNumber),c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d}for(var c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d}},setupTypeInfo:function(a,b){for(var c=this.errorCorrectLevel<<3|b,d=f.getBCHTypeInfo(c),e=0;15>e;e++){var g=!a&&1==(1&d>>e);6>e?this.modules[e][8]=g:8>e?this.modules[e+1][8]=g:this.modules[this.moduleCount-15+e][8]=g}for(var e=0;15>e;e++){var g=!a&&1==(1&d>>e);8>e?this.modules[8][this.moduleCount-e-1]=g:9>e?this.modules[8][15-e-1+1]=g:this.modules[8][15-e-1]=g}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,g=0,h=this.moduleCount-1;h>0;h-=2)for(6==h&&h--;;){for(var i=0;2>i;i++)if(null==this.modules[d][h-i]){var j=!1;g<a.length&&(j=1==(1&a[g]>>>e));var k=f.getMask(b,d,h-i);k&&(j=!j),this.modules[d][h-i]=j,e--,-1==e&&(g++,e=7)}if(d+=c,0>d||this.moduleCount<=d){d-=c,c=-c;break}}}},b.PAD0=236,b.PAD1=17,b.createData=function(a,c,d){for(var e=j.getRSBlocks(a,c),g=new k,h=0;h<d.length;h++){var i=d[h];g.put(i.mode,4),g.put(i.getLength(),f.getLengthInBits(i.mode,a)),i.write(g)}for(var l=0,h=0;h<e.length;h++)l+=e[h].dataCount;if(g.getLengthInBits()>8*l)throw new Error("code length overflow. ("+g.getLengthInBits()+">"+8*l+")");for(g.getLengthInBits()+4<=8*l&&g.put(0,4);0!=g.getLengthInBits()%8;)g.putBit(!1);for(;;){if(g.getLengthInBits()>=8*l)break;if(g.put(b.PAD0,8),g.getLengthInBits()>=8*l)break;g.put(b.PAD1,8)}return b.createBytes(g,e)},b.createBytes=function(a,b){for(var c=0,d=0,e=0,g=new Array(b.length),h=new Array(b.length),j=0;j<b.length;j++){var k=b[j].dataCount,l=b[j].totalCount-k;d=Math.max(d,k),e=Math.max(e,l),g[j]=new Array(k);for(var m=0;m<g[j].length;m++)g[j][m]=255&a.buffer[m+c];c+=k;var n=f.getErrorCorrectPolynomial(l),o=new i(g[j],n.getLength()-1),p=o.mod(n);h[j]=new Array(n.getLength()-1);for(var m=0;m<h[j].length;m++){var q=m+p.getLength()-h[j].length;h[j][m]=q>=0?p.get(q):0}}for(var r=0,m=0;m<b.length;m++)r+=b[m].totalCount;for(var s=new Array(r),t=0,m=0;d>m;m++)for(var j=0;j<b.length;j++)m<g[j].length&&(s[t++]=g[j][m]);for(var m=0;e>m;m++)for(var j=0;j<b.length;j++)m<h[j].length&&(s[t++]=h[j][m]);return s};for(var c={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},d={L:1,M:0,Q:3,H:2},e={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var b=a<<10;f.getBCHDigit(b)-f.getBCHDigit(f.G15)>=0;)b^=f.G15<<f.getBCHDigit(b)-f.getBCHDigit(f.G15);return(a<<10|b)^f.G15_MASK},getBCHTypeNumber:function(a){for(var b=a<<12;f.getBCHDigit(b)-f.getBCHDigit(f.G18)>=0;)b^=f.G18<<f.getBCHDigit(b)-f.getBCHDigit(f.G18);return a<<12|b},getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return f.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,b,c){switch(a){case e.PATTERN000:return 0==(b+c)%2;case e.PATTERN001:return 0==b%2;case e.PATTERN010:return 0==c%3;case e.PATTERN011:return 0==(b+c)%3;case e.PATTERN100:return 0==(Math.floor(b/2)+Math.floor(c/3))%2;case e.PATTERN101:return 0==b*c%2+b*c%3;case e.PATTERN110:return 0==(b*c%2+b*c%3)%2;case e.PATTERN111:return 0==(b*c%3+(b+c)%2)%2;default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var b=new i([1],0),c=0;a>c;c++)b=b.multiply(new i([1,g.gexp(c)],0));return b},getLengthInBits:function(a,b){if(b>=1&&10>b)switch(a){case c.MODE_NUMBER:return 10;case c.MODE_ALPHA_NUM:return 9;case c.MODE_8BIT_BYTE:return 8;case c.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(27>b)switch(a){case c.MODE_NUMBER:return 12;case c.MODE_ALPHA_NUM:return 11;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else{if(!(41>b))throw new Error("type:"+b);switch(a){case c.MODE_NUMBER:return 14;case c.MODE_ALPHA_NUM:return 13;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 12;default:throw new Error("mode:"+a)}}},getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0;b>d;d++)for(var e=0;b>e;e++){for(var f=0,g=a.isDark(d,e),h=-1;1>=h;h++)if(!(0>d+h||d+h>=b))for(var i=-1;1>=i;i++)0>e+i||e+i>=b||(0!=h||0!=i)&&g==a.isDark(d+h,e+i)&&f++;f>5&&(c+=3+f-5)}for(var d=0;b-1>d;d++)for(var e=0;b-1>e;e++){var j=0;a.isDark(d,e)&&j++,a.isDark(d+1,e)&&j++,a.isDark(d,e+1)&&j++,a.isDark(d+1,e+1)&&j++,(0==j||4==j)&&(c+=3)}for(var d=0;b>d;d++)for(var e=0;b-6>e;e++)a.isDark(d,e)&&!a.isDark(d,e+1)&&a.isDark(d,e+2)&&a.isDark(d,e+3)&&a.isDark(d,e+4)&&!a.isDark(d,e+5)&&a.isDark(d,e+6)&&(c+=40);for(var e=0;b>e;e++)for(var d=0;b-6>d;d++)a.isDark(d,e)&&!a.isDark(d+1,e)&&a.isDark(d+2,e)&&a.isDark(d+3,e)&&a.isDark(d+4,e)&&!a.isDark(d+5,e)&&a.isDark(d+6,e)&&(c+=40);for(var k=0,e=0;b>e;e++)for(var d=0;b>d;d++)a.isDark(d,e)&&k++;var l=Math.abs(100*k/b/b-50)/5;return c+=10*l}},g={glog:function(a){if(1>a)throw new Error("glog("+a+")");return g.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;a>=256;)a-=255;return g.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},h=0;8>h;h++)g.EXP_TABLE[h]=1<<h;for(var h=8;256>h;h++)g.EXP_TABLE[h]=g.EXP_TABLE[h-4]^g.EXP_TABLE[h-5]^g.EXP_TABLE[h-6]^g.EXP_TABLE[h-8];for(var h=0;255>h;h++)g.LOG_TABLE[g.EXP_TABLE[h]]=h;i.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),c=0;c<this.getLength();c++)for(var d=0;d<a.getLength();d++)b[c+d]^=g.gexp(g.glog(this.get(c))+g.glog(a.get(d)));return new i(b,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var b=g.glog(this.get(0))-g.glog(a.get(0)),c=new Array(this.getLength()),d=0;d<this.getLength();d++)c[d]=this.get(d);for(var d=0;d<a.getLength();d++)c[d]^=g.gexp(g.glog(a.get(d))+b);return new i(c,0).mod(a)}},j.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],j.getRSBlocks=function(a,b){var c=j.getRsBlockTable(a,b);if(void 0==c)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+b);for(var d=c.length/3,e=[],f=0;d>f;f++)for(var g=c[3*f+0],h=c[3*f+1],i=c[3*f+2],k=0;g>k;k++)e.push(new j(h,i));return e},j.getRsBlockTable=function(a,b){switch(b){case d.L:return j.RS_BLOCK_TABLE[4*(a-1)+0];case d.M:return j.RS_BLOCK_TABLE[4*(a-1)+1];case d.Q:return j.RS_BLOCK_TABLE[4*(a-1)+2];case d.H:return j.RS_BLOCK_TABLE[4*(a-1)+3];default:return void 0}},k.prototype={get:function(a){var b=Math.floor(a/8);return 1==(1&this.buffer[b]>>>7-a%8)},put:function(a,b){for(var c=0;b>c;c++)this.putBit(1==(1&a>>>b-c-1))},getLengthInBits:function(){return this.length},putBit:function(a){var b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}};var l=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],o=function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){function g(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg",a);for(var d in b)b.hasOwnProperty(d)&&c.setAttribute(d,b[d]);return c}var b=this._htOption,c=this._el,d=a.getModuleCount();Math.floor(b.width/d),Math.floor(b.height/d),this.clear();var h=g("svg",{viewBox:"0 0 "+String(d)+" "+String(d),width:"100%",height:"100%",fill:b.colorLight});h.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),c.appendChild(h),h.appendChild(g("rect",{fill:b.colorDark,width:"1",height:"1",id:"template"}));for(var i=0;d>i;i++)for(var j=0;d>j;j++)if(a.isDark(i,j)){var k=g("use",{x:String(i),y:String(j)});k.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),h.appendChild(k)}},a.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},a}(),p="svg"===document.documentElement.tagName.toLowerCase(),q=p?o:m()?function(){function a(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}function d(a,b){var c=this;if(c._fFail=b,c._fSuccess=a,null===c._bSupportDataURI){var d=document.createElement("img"),e=function(){c._bSupportDataURI=!1,c._fFail&&_fFail.call(c)},f=function(){c._bSupportDataURI=!0,c._fSuccess&&c._fSuccess.call(c)};return d.onabort=e,d.onerror=e,d.onload=f,d.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",void 0}c._bSupportDataURI===!0&&c._fSuccess?c._fSuccess.call(c):c._bSupportDataURI===!1&&c._fFail&&c._fFail.call(c)}if(this._android&&this._android<=2.1){var b=1/window.devicePixelRatio,c=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(a,d,e,f,g,h,i,j){if("nodeName"in a&&/img/i.test(a.nodeName))for(var l=arguments.length-1;l>=1;l--)arguments[l]=arguments[l]*b;else"undefined"==typeof j&&(arguments[1]*=b,arguments[2]*=b,arguments[3]*=b,arguments[4]*=b);c.apply(this,arguments)}}var e=function(a,b){this._bIsPainted=!1,this._android=n(),this._htOption=b,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=b.width,this._elCanvas.height=b.height,a.appendChild(this._elCanvas),this._el=a,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return e.prototype.draw=function(a){var b=this._elImage,c=this._oContext,d=this._htOption,e=a.getModuleCount(),f=d.width/e,g=d.height/e,h=Math.round(f),i=Math.round(g);b.style.display="none",this.clear();for(var j=0;e>j;j++)for(var k=0;e>k;k++){var l=a.isDark(j,k),m=k*f,n=j*g;c.strokeStyle=l?d.colorDark:d.colorLight,c.lineWidth=1,c.fillStyle=l?d.colorDark:d.colorLight,c.fillRect(m,n,f,g),c.strokeRect(Math.floor(m)+.5,Math.floor(n)+.5,h,i),c.strokeRect(Math.ceil(m)-.5,Math.ceil(n)-.5,h,i)}this._bIsPainted=!0},e.prototype.makeImage=function(){this._bIsPainted&&d.call(this,a)},e.prototype.isPainted=function(){return this._bIsPainted},e.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},e.prototype.round=function(a){return a?Math.floor(1e3*a)/1e3:a},e}():function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){for(var b=this._htOption,c=this._el,d=a.getModuleCount(),e=Math.floor(b.width/d),f=Math.floor(b.height/d),g=['<table style="border:0;border-collapse:collapse;">'],h=0;d>h;h++){g.push("<tr>");for(var i=0;d>i;i++)g.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+e+"px;height:"+f+"px;background-color:"+(a.isDark(h,i)?b.colorDark:b.colorLight)+';"></td>');g.push("</tr>")}g.push("</table>"),c.innerHTML=g.join("");var j=c.childNodes[0],k=(b.width-j.offsetWidth)/2,l=(b.height-j.offsetHeight)/2;k>0&&l>0&&(j.style.margin=l+"px "+k+"px")},a.prototype.clear=function(){this._el.innerHTML=""},a}();QRCode=function(a,b){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:d.H},"string"==typeof b&&(b={text:b}),b)for(var c in b)this._htOption[c]=b[c];"string"==typeof a&&(a=document.getElementById(a)),this._android=n(),this._el=a,this._oQRCode=null,this._oDrawing=new q(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},QRCode.prototype.makeCode=function(a){this._oQRCode=new b(r(a,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(a),this._oQRCode.make(),this._el.title=a,this._oDrawing.draw(this._oQRCode),this.makeImage()},QRCode.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},QRCode.prototype.clear=function(){this._oDrawing.clear()},QRCode.CorrectLevel=d}();
/* eslint-enable @typescript-eslint/no-unused-expressions, @typescript-eslint/no-this-alias */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCZeH_9OisAUxfLOexqCRqLMH6wKHJvbrM",
  authDomain: "logistica-y-eventos-ii.firebaseapp.com",
  projectId: "logistica-y-eventos-ii",
  storageBucket: "logistica-y-eventos-ii.firebasestorage.app",
  messagingSenderId: "260991887567",
  appId: "1:260991887567:web:7eaf6aafd51030d686afba",
};

const ADMIN_EMAIL = "franboy1221@gmail.com";
const TEAM_NAME = "Verde";
const COMPANY_WHATSAPP = "573224343263";
const TOTAL_STEPS = 4;
const PAGE_PARAMS = new URLSearchParams(location.search);
const IS_DEMO = location.hostname === "terminal.local" && PAGE_PARAMS.get("demo") === "1";
const linkedRecordParam = PAGE_PARAMS.get("registro") || "";
const LINKED_RECORD_ID = /^[A-Za-z0-9_-]{4,120}$/.test(linkedRecordParam) ? linkedRecordParam : "";
const SHOW_DEMO_CREDENTIAL = IS_DEMO && PAGE_PARAMS.get("credential") === "1";
const MEETING = { dateShort: "22 AGO 2026", time: "10:00 A. M." };

const ADVISORS = [
  "Fran Santamaria", "Vanessa Barragan", "Fernanda", "Sofia Lopez", "Karol Leon",
  "Julieth Sánchez", "Cristian Zuñiga", "Kevin Urbano", "Julian Villalba",
  "Alejandro Cardona", "Luis Maya", "Nefer Zambrano", "Brandon De la rosa",
  "Juan Arevalo", "Cristian Amorocho", "Carlos Zuñiga", "Jesús Nieves", "Laura Silva",
];

const DEFAULT_QUESTIONS = [
  { id: "advisor", label: "Asesor(a)", type: "select", options: ADVISORS, required: true, step: 1, locked: true, full: true },
  { id: "firstName", label: "Nombre", type: "text", required: true, step: 1, locked: true, autocomplete: "given-name", maxLength: 45, placeholder: "Ej. Andrea" },
  { id: "lastName", label: "Apellido", type: "text", required: true, step: 1, locked: true, autocomplete: "family-name", maxLength: 45, placeholder: "Ej. Rodríguez" },
  { id: "phone", label: "Número de teléfono para llamadas", type: "tel", required: true, step: 1, locked: true, pattern: "[0-9]{10}", maxLength: 10, placeholder: "3001234567", help: "10 dígitos, sin espacios." },
  { id: "whatsapp", label: "Número de WhatsApp", type: "tel", required: true, step: 1, locked: true, pattern: "[0-9]{10}", maxLength: 10, placeholder: "3001234567" },
  { id: "document", label: "Número de documento", type: "text", required: true, step: 1, locked: true, pattern: "[0-9]{6,12}", maxLength: 12, placeholder: "Sin puntos ni espacios", digits: true },
  { id: "age", label: "Edad", type: "select", options: ["15","16","17","18","19","20","21","22","23","24","25"], required: true, step: 1, locked: true },
  { id: "gender", label: "Género", type: "radio", options: ["Masculino","Femenino","Otro"], required: true, step: 1, locked: true, full: true },
  { id: "address", label: "Dirección", type: "text", required: true, step: 1, maxLength: 120, placeholder: "Dirección y barrio", full: true },

  { id: "events", label: "¿En qué eventos quieres trabajar?", type: "checkbox", options: ["Recreación","Turismo","Fiestas infantiles","Seguridad","Logística","Conciertos","15 años","Bodas","Bautizos","Meseros","DJ's","Payasos","Títeres","Pintucaritas","Globoflexia","Decoración","Operadores de ruta","Buffet","Checking","Maquillaje","Animadores"], required: true, step: 2, help: "Puedes elegir varias opciones." },
  { id: "places", label: "Sitios en los que puedes trabajar", type: "checkbox", options: ["Bogotá","Soacha","Melgar","Mesitas"], required: true, step: 2 },
  { id: "shirtSize", label: "Talla de camiseta", type: "select", options: ["S","M","L","X","XL"], required: true, step: 2 },
  { id: "pantsSize", label: "Talla de pantalón", type: "text", required: true, step: 2, maxLength: 8, placeholder: "Ej. 30" },
  { id: "payment", label: "Método de pago", type: "checkbox", options: ["Efectivo","Nequi","Daviplata"], required: true, step: 2 },
  { id: "schedules", label: "Horarios en los que puedes trabajar", type: "checkbox", options: ["08:00 am - 01:00 pm","10:00 am - 03:00 pm","02:00 pm - 07:00 pm","07:00 pm - 03:00 am"], required: true, step: 2 },
  { id: "peopleAges", label: "Puedes trabajar con personas de las siguientes edades", type: "checkbox", options: ["5 - 10 años","10 - 15 años","15 - 20 años","20 en adelante"], required: true, step: 2 },

  { id: "experience", label: "¿Tienes experiencia laboral? Explica en qué", type: "textarea", required: true, step: 3, maxLength: 500, placeholder: "Si no tienes experiencia, escríbelo aquí" },
  { id: "nextWeek", label: "¿Tienes disponibilidad para trabajar la próxima semana?", type: "radio", options: ["Sí","No"], required: true, step: 3 },
  { id: "days", label: "¿Qué días puedes trabajar?", type: "checkbox", options: ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"], required: true, step: 3 },
  { id: "disease", label: "¿Tienes alguna enfermedad?", type: "radio", options: ["Sí","No"], required: true, step: 3 },
  { id: "swim", label: "¿Sabes nadar?", type: "radio", options: ["Sí","No"], required: true, step: 3 },
  { id: "sport", label: "¿Practicas algún deporte?", type: "radio", options: ["Sí","No"], required: true, step: 3 },
  { id: "understands", label: "¿Entiendes que al finalizar este formulario la empresa empezará a contar contigo para asistir a eventos desde la próxima semana?", type: "radio", options: ["Sí","No"], required: true, step: 3 },

  { id: "representativeName", label: "Nombre de tu representante", type: "text", required: true, step: 4, locked: true, minorOnly: true, maxLength: 45 },
  { id: "representativeLastName", label: "Apellido de tu representante", type: "text", required: true, step: 4, locked: true, minorOnly: true, maxLength: 45 },
  { id: "representativeWhatsapp", label: "WhatsApp de tu representante", type: "tel", required: true, step: 4, locked: true, minorOnly: true, pattern: "[0-9]{10}", maxLength: 10, placeholder: "3001234567", full: true },
];

const TYPE_NAMES = { text: "Texto corto", textarea: "Texto largo", select: "Lista", radio: "Una opción", checkbox: "Varias opciones", tel: "Teléfono", number: "Número" };

const $ = (id) => document.getElementById(id);
const form = $("registrationForm");
const steps = [...document.querySelectorAll(".form-step")];
const stepIndicators = [...document.querySelectorAll("[data-step-indicator]")];
const photoCanvas = $("photoCanvas");
const photoContext = photoCanvas.getContext("2d");
const credentialCanvas = $("credentialCanvas");
const credentialContext = credentialCanvas.getContext("2d");
const credentialLogo = new Image();
let credentialLogoPromise = null;

let questions = clone(DEFAULT_QUESTIONS);
let currentStep = 1;
let isSubmitting = false;
let registrationId = "";
let generatedFileName = "carne-logistica-eventos.png";
let toastTimer = 0;
let db = null;
let auth = null;
let firebaseReady = false;
let publicUser = null;
let questionUnsubscribe = null;
let recordsUnsubscribe = null;
let records = [];
let filteredRecords = [];
let demoAdmin = false;
let linkedRecordOpened = false;
let confirmResolver = null;
let photoState = { image: null, zoom: 1, panX: 0, panY: 0, dragging: false, pointerX: 0, pointerY: 0 };

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function escapeHTML(value) { return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" }[char])); }
function titleCase(value) { return String(value || "").trim().toLocaleLowerCase("es").replace(/(^|[\s'-])\p{L}/gu, (part) => part.toLocaleUpperCase("es")); }
function normalizeText(value) { return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }
function safeImage(value) { return /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(value || "") ? value : ""; }
function timestampToDate(value) { if (!value) return null; if (typeof value.toDate === "function") return value.toDate(); const date = value instanceof Date ? value : new Date(value); return Number.isNaN(date.getTime()) ? null : date; }
function formatDate(value, withTime = false) { const date = timestampToDate(value); if (!date) return "Pendiente"; return new Intl.DateTimeFormat("es-CO", withTime ? { dateStyle:"medium", timeStyle:"short" } : { dateStyle:"medium" }).format(date); }

function showToast(message) {
  clearTimeout(toastTimer);
  $("toast").textContent = message;
  $("toast").classList.add("is-visible");
  toastTimer = setTimeout(() => $("toast").classList.remove("is-visible"), 3300);
}

function setLoading(show, message = "Cargando…") {
  $("loadingText").textContent = message;
  $("loadingOverlay").hidden = !show;
}

function showConnection(message, error = false) {
  $("connectionMessage").textContent = message;
  $("connectionBanner").hidden = false;
  $("connectionBanner").classList.toggle("is-error", error);
}

function hideConnection() { $("connectionBanner").hidden = true; }

function normalizeQuestion(question, index = 0) {
  const allowed = ["text","textarea","select","radio","checkbox","tel","number"];
  return {
    id: String(question.id || `custom-${Date.now()}-${index}`).replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 80),
    label: String(question.label || "Pregunta sin título").slice(0, 160),
    type: allowed.includes(question.type) ? question.type : "text",
    options: Array.isArray(question.options) ? question.options.map((item) => String(item).slice(0, 100)).filter(Boolean).slice(0, 40) : [],
    required: Boolean(question.required), step: Math.min(4, Math.max(1, Number(question.step) || 1)),
    locked: Boolean(question.locked), minorOnly: Boolean(question.minorOnly), full: Boolean(question.full),
    autocomplete: String(question.autocomplete || ""), pattern: String(question.pattern || ""),
    maxLength: Number(question.maxLength) || 0, placeholder: String(question.placeholder || "").slice(0, 120),
    help: String(question.help || "").slice(0, 180), digits: Boolean(question.digits),
  };
}

function renderAllQuestions(preserveValues = false) {
  const values = preserveValues ? collectAnswers() : {};
  for (let step = 1; step <= TOTAL_STEPS; step += 1) {
    const container = $(`questionsStep${step}`);
    container.replaceChildren();
    questions.filter((question) => question.step === step).forEach((question) => container.append(renderQuestion(question)));
  }
  if (preserveValues) restoreAnswers(values);
  updateMinorQuestions();
}

function requiredMark(question) { return question.required ? " *" : ""; }

function renderQuestion(question) {
  const isChoice = ["radio","checkbox"].includes(question.type);
  if (isChoice) return renderChoiceQuestion(question);

  const label = document.createElement("label");
  label.className = `field question-block${question.full ? " field-full" : ""}${question.minorOnly ? " conditional-question" : ""}`;
  label.dataset.questionWrapper = question.id;
  if (question.minorOnly) label.dataset.minorOnly = "true";
  const title = document.createElement("span");
  title.textContent = question.label + requiredMark(question);
  label.append(title);

  let input;
  if (question.type === "select") {
    input = document.createElement("select");
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Selecciona una opción";
    input.append(placeholder);
    question.options.forEach((option) => {
      const node = document.createElement("option");
      node.value = option; node.textContent = option; input.append(node);
    });
  } else if (question.type === "textarea") {
    input = document.createElement("textarea"); input.rows = 4;
  } else {
    input = document.createElement("input"); input.type = question.type === "number" ? "number" : question.type;
  }
  input.id = `q-${question.id}`;
  input.name = `answer-${question.id}`;
  input.dataset.questionId = question.id;
  input.required = question.required;
  if (question.autocomplete) input.autocomplete = question.autocomplete;
  if (question.pattern) input.pattern = question.pattern;
  if (question.maxLength > 0) input.maxLength = question.maxLength;
  if (question.placeholder) input.placeholder = question.placeholder;
  if (question.type === "tel" || question.digits) input.inputMode = "numeric";
  label.append(input);
  if (question.help) { const help = document.createElement("small"); help.textContent = question.help; label.append(help); }
  return label;
}

function renderChoiceQuestion(question) {
  const fieldset = document.createElement("fieldset");
  fieldset.className = `choice-field question-block${question.full ? " field-full" : ""}${question.minorOnly ? " conditional-question" : ""}`;
  fieldset.dataset.questionWrapper = question.id;
  if (question.minorOnly) fieldset.dataset.minorOnly = "true";
  if (question.type === "checkbox" && question.required) fieldset.dataset.requiredGroup = question.id;
  const legend = document.createElement("legend"); legend.textContent = question.label + requiredMark(question); fieldset.append(legend);
  if (question.help) { const help = document.createElement("p"); help.className = "field-help"; help.textContent = question.help; fieldset.append(help); }
  const choices = document.createElement("div");
  choices.className = question.type === "checkbox" && question.options.length > 4 ? "chip-grid" : "choice-row compact";
  question.options.forEach((option, index) => {
    const label = document.createElement("label");
    if (choices.classList.contains("choice-row")) label.className = "choice-card";
    const input = document.createElement("input"); input.type = question.type; input.name = `answer-${question.id}`; input.value = option; input.dataset.questionId = question.id;
    if (question.type === "radio" && question.required && index === 0) input.required = true;
    const text = document.createElement("span"); text.textContent = option; label.append(input, text); choices.append(label);
  });
  fieldset.append(choices);
  const error = document.createElement("p"); error.className = "group-error"; error.textContent = "Selecciona al menos una opción."; fieldset.append(error);
  return fieldset;
}

function questionValue(question) {
  if (question.type === "checkbox") return [...form.querySelectorAll(`[name="answer-${question.id}"]:checked`)].map((input) => input.value);
  if (question.type === "radio") return form.querySelector(`[name="answer-${question.id}"]:checked`)?.value || "";
  return $(`q-${question.id}`)?.value.trim() || "";
}

function collectAnswers() {
  return Object.fromEntries(questions.map((question) => [question.id, questionValue(question)]));
}

function answer(id) {
  const question = questions.find((item) => item.id === id);
  return question ? questionValue(question) : "";
}

function restoreAnswers(values) {
  questions.forEach((question) => {
    const value = values[question.id];
    if (value === undefined) return;
    if (["radio","checkbox"].includes(question.type)) {
      const selected = Array.isArray(value) ? value : [value];
      form.querySelectorAll(`[name="answer-${question.id}"]`).forEach((input) => { input.checked = selected.includes(input.value); });
    } else if ($(`q-${question.id}`)) $(`q-${question.id}`).value = value;
  });
}

function updateMinorQuestions() {
  const isMinor = Number(answer("age")) > 0 && Number(answer("age")) < 18;
  document.querySelectorAll("[data-minor-only]").forEach((wrapper) => {
    wrapper.hidden = !isMinor;
    wrapper.querySelectorAll("input,select,textarea").forEach((input) => {
      input.disabled = !isMinor;
      if (!isMinor) { input.required = false; input.checked = false; if (input.type !== "radio" && input.type !== "checkbox") input.value = ""; }
      else {
        const question = questions.find((item) => item.id === input.dataset.questionId);
        input.required = Boolean(question?.required && (question.type !== "radio" || input === wrapper.querySelector("input")));
      }
    });
  });
}

function clearInvalid(target) {
  target?.classList?.remove("is-invalid");
  target?.closest?.(".choice-field")?.classList.remove("is-invalid");
  target?.setAttribute?.("aria-invalid", "false");
}

function validateStep(stepNumber) {
  const step = steps.find((item) => Number(item.dataset.step) === stepNumber);
  if (!step) return true;
  updateMinorQuestions();
  let valid = true;
  let firstInvalid = null;
  step.querySelectorAll("input,select,textarea").forEach((input) => {
    if (input.disabled || input.closest("[hidden]") || input.type === "file") return;
    clearInvalid(input);
    if (!input.checkValidity()) {
      valid = false; input.classList.add("is-invalid"); input.setAttribute("aria-invalid", "true"); input.closest(".choice-field")?.classList.add("is-invalid"); firstInvalid ||= input;
    }
  });
  step.querySelectorAll("[data-required-group]").forEach((group) => {
    const selected = group.querySelectorAll('input[type="checkbox"]:checked').length > 0;
    group.classList.toggle("is-invalid", !selected);
    if (!selected) { valid = false; firstInvalid ||= group.querySelector("input"); }
  });
  if (stepNumber === 4 && !photoState.image) { valid = false; $("photoError").classList.add("is-visible"); firstInvalid ||= $("photoInput"); }
  else if (stepNumber === 4) $("photoError").classList.remove("is-visible");
  if (!valid) {
    showToast("Revisa los campos marcados antes de continuar.");
    firstInvalid?.focus({ preventScroll: true });
    firstInvalid?.closest(".field,.choice-field,.subsection")?.scrollIntoView({ behavior:"smooth", block:"center" });
  }
  return valid;
}

function showStep(number, scroll = true) {
  currentStep = Math.min(TOTAL_STEPS, Math.max(1, number));
  steps.forEach((step) => { const active = Number(step.dataset.step) === currentStep; step.hidden = !active; step.classList.toggle("is-active", active); });
  stepIndicators.forEach((indicator) => {
    const value = Number(indicator.dataset.stepIndicator); indicator.classList.toggle("is-active", value === currentStep); indicator.classList.toggle("is-complete", value < currentStep);
    indicator.querySelector("span").textContent = value < currentStep ? "✓" : String(value);
  });
  const percent = Math.round((currentStep / TOTAL_STEPS) * 100);
  $("progressBar").style.width = `${percent}%`; $("progressPercent").textContent = `${percent}%`; $("stepLabel").textContent = `Paso ${currentStep} de ${TOTAL_STEPS}`;
  if (currentStep === 4) { updateMinorQuestions(); updateReview(); }
  if (scroll) window.scrollTo({ top: $("formView").getBoundingClientRect().top + scrollY - 14, behavior:"smooth" });
}

function addReviewItem(label, value) {
  const wrapper = document.createElement("div"); wrapper.className = "review-item";
  const dt = document.createElement("dt"); const dd = document.createElement("dd"); dt.textContent = label; dd.textContent = value || "Sin responder"; wrapper.append(dt,dd); $("reviewSummary").append(wrapper);
}

function updateReview() {
  $("reviewSummary").replaceChildren();
  addReviewItem("Nombre", titleCase(answer("firstName"))); addReviewItem("Apellido", titleCase(answer("lastName")));
  addReviewItem("Edad", answer("age") ? `${answer("age")} años` : ""); addReviewItem("Género", answer("gender"));
  addReviewItem("Asesor(a)", answer("advisor")); addReviewItem("Equipo", TEAM_NAME);
}

function drawPhotoPlaceholder() {
  const ctx = photoContext; const width = photoCanvas.width; const height = photoCanvas.height;
  const gradient = ctx.createLinearGradient(0,0,0,height); gradient.addColorStop(0,"#edf8f3"); gradient.addColorStop(1,"#d9e9e1"); ctx.fillStyle = gradient; ctx.fillRect(0,0,width,height);
  ctx.fillStyle = "#afc8bc"; ctx.beginPath(); ctx.arc(width/2,height*.36,width*.16,0,Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.ellipse(width/2,height*.76,width*.29,height*.23,0,Math.PI,0); ctx.fill();
  ctx.fillStyle = "#5d786c"; ctx.font = "700 26px Arial"; ctx.textAlign = "center"; ctx.fillText("TU FOTO",width/2,height*.94);
}

function photoMetrics(width, height) {
  if (!photoState.image) return null;
  const sourceWidth=photoState.image.naturalWidth||photoState.image.width;const sourceHeight=photoState.image.naturalHeight||photoState.image.height;
  const base = Math.max(width/sourceWidth,height/sourceHeight); const scale = base*photoState.zoom;
  const drawWidth = sourceWidth*scale; const drawHeight = sourceHeight*scale;
  const ratioX = width/photoCanvas.width; const ratioY = height/photoCanvas.height;
  const panX = Math.min(Math.max(photoState.panX,-Math.max(0,(drawWidth-width)/(2*ratioX))),Math.max(0,(drawWidth-width)/(2*ratioX)))*ratioX;
  const panY = Math.min(Math.max(photoState.panY,-Math.max(0,(drawHeight-height)/(2*ratioY))),Math.max(0,(drawHeight-height)/(2*ratioY)))*ratioY;
  return { drawWidth, drawHeight, x:(width-drawWidth)/2+panX, y:(height-drawHeight)/2+panY };
}

function drawRawPhoto(context, width, height) {
  context.clearRect(0,0,width,height);
  if (!photoState.image) {
    const gradient=context.createLinearGradient(0,0,0,height);gradient.addColorStop(0,"#e9f5ef");gradient.addColorStop(1,"#c8ded4");context.fillStyle=gradient;context.fillRect(0,0,width,height);
    context.fillStyle="#91b0a2";context.beginPath();context.arc(width/2,height*.36,width*.16,0,Math.PI*2);context.fill();context.beginPath();context.ellipse(width/2,height*.78,width*.32,height*.25,0,Math.PI,0);context.fill();return;
  }
  const metrics = photoMetrics(width,height); context.drawImage(photoState.image,metrics.x,metrics.y,metrics.drawWidth,metrics.drawHeight);
}

function drawPhotoEditor() {
  if (!photoState.image) return drawPhotoPlaceholder();
  drawRawPhoto(photoContext,photoCanvas.width,photoCanvas.height);
  photoContext.save(); photoContext.strokeStyle = "rgba(255,255,255,.82)"; photoContext.lineWidth = 4; photoContext.setLineDash([13,12]); photoContext.beginPath(); photoContext.ellipse(photoCanvas.width/2,photoCanvas.height*.39,photoCanvas.width*.26,photoCanvas.height*.27,0,0,Math.PI*2); photoContext.stroke(); photoContext.restore();
}

function cleanPhotoCanvas(width = 600, height = 750) {
  const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height; drawRawPhoto(canvas.getContext("2d"),width,height); return canvas;
}

function roundedRect(context,x,y,width,height,radius) {
  const r = Math.min(radius,width/2,height/2); context.beginPath(); context.moveTo(x+r,y); context.arcTo(x+width,y,x+width,y+height,r); context.arcTo(x+width,y+height,x,y+height,r); context.arcTo(x,y+height,x,y,r); context.arcTo(x,y,x+width,y,r); context.closePath();
}

function fitText(context,text,maxWidth,start,min,weight=800) {
  let size=start; while(size>min){ context.font=`${weight} ${size}px Arial`; if(context.measureText(text).width<=maxWidth) return size; size-=2; } context.font=`${weight} ${min}px Arial`; return min;
}

function formatWhatsapp(value) {
  const digits=String(value||"").replace(/\D/g,"");
  if(digits.length===10)return`+57 ${digits.slice(0,3)} ${digits.slice(3,6)} ${digits.slice(6)}`;
  return digits||"NO REGISTRADO";
}

function recordAccessUrl(id=registrationId) {
  if(!id||String(id).startsWith("LOCAL-"))return"";
  const url=new URL(location.href);url.search="";url.hash="";
  if(IS_DEMO)url.searchParams.set("demo","1");
  url.searchParams.set("registro",String(id));return url.toString();
}

function qrCanvas(text) {
  if(!text||typeof QRCode!=="function")return null;
  try {
    const holder=document.createElement("div");
    new QRCode(holder,{text,width:512,height:512,colorDark:"#073c2b",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M});
    return holder.querySelector("canvas");
  } catch(error) { console.error("QR generation",error);return null; }
}

function drawCenteredField(context,label,value,labelY,valueY,maxWidth,start=31,min=19) {
  context.textAlign="center";context.fillStyle="#9eeaca";context.font="800 12px Arial";context.fillText(label,360,labelY);
  context.fillStyle="#ffffff";fitText(context,String(value||"NO REGISTRADO"),maxWidth,start,min,900);context.fillText(String(value||"NO REGISTRADO"),360,valueY);
}

function loadCredentialLogo() {
  if(credentialLogo.complete&&credentialLogo.naturalWidth)return Promise.resolve(credentialLogo);
  if(!credentialLogoPromise)credentialLogoPromise=new Promise((resolve)=>{credentialLogo.onload=()=>resolve(credentialLogo);credentialLogo.onerror=()=>resolve(null);credentialLogo.src="logo.png";});
  return credentialLogoPromise;
}

async function drawCredential() {
  const logo=await loadCredentialLogo();
  const ctx=credentialContext,w=credentialCanvas.width,h=credentialCanvas.height;
  const first=titleCase(answer("firstName")).toLocaleUpperCase("es");const last=titleCase(answer("lastName")).toLocaleUpperCase("es");const age=answer("age");const gender=String(answer("gender")).toLocaleUpperCase("es");const advisor=String(answer("advisor")).toLocaleUpperCase("es");const whatsapp=formatWhatsapp(answer("whatsapp"));
  const code=`LE-${(registrationId||answer("document")||Date.now()).replace(/[^a-z0-9]/gi,"").slice(-8).toUpperCase()}`;const date=new Intl.DateTimeFormat("es-CO").format(new Date());const accessUrl=recordAccessUrl();const qr=qrCanvas(accessUrl);

  ctx.clearRect(0,0,w,h);ctx.textBaseline="alphabetic";
  const gradient=ctx.createLinearGradient(0,0,w,h);gradient.addColorStop(0,"#032f22");gradient.addColorStop(.52,"#076647");gradient.addColorStop(1,"#0a9463");ctx.fillStyle=gradient;ctx.fillRect(0,0,w,h);
  ctx.save();ctx.globalAlpha=.1;ctx.strokeStyle="#b6f4d5";ctx.lineWidth=2;for(let r=120;r<420;r+=52){ctx.beginPath();ctx.arc(665,80,r,0,Math.PI*2);ctx.stroke();}for(let r=100;r<310;r+=52){ctx.beginPath();ctx.arc(32,1370,r,0,Math.PI*2);ctx.stroke();}ctx.restore();
  ctx.fillStyle="rgba(255,255,255,.07)";roundedRect(ctx,28,28,w-56,h-56,34);ctx.fill();ctx.strokeStyle="rgba(255,255,255,.22)";ctx.lineWidth=2;ctx.stroke();

  ctx.textAlign="center";
  if(logo){ctx.save();ctx.shadowColor="rgba(0,18,12,.35)";ctx.shadowBlur=18;ctx.drawImage(logo,314,32,92,92);ctx.restore();}
  else{ctx.fillStyle="#ffffff";ctx.beginPath();ctx.arc(w/2,76,29,0,Math.PI*2);ctx.fill();ctx.fillStyle="#08734e";ctx.font="900 18px Arial";ctx.textBaseline="middle";ctx.fillText("LE",w/2,77);}
  ctx.textBaseline="alphabetic";ctx.fillStyle="#ffffff";ctx.font="900 27px Arial";ctx.fillText("LOGÍSTICA & EVENTOS",w/2,154);ctx.fillStyle="#a8efd0";ctx.font="800 12px Arial";ctx.fillText("CARNÉ DE PRE-REGISTRO",w/2,178);
  ctx.fillStyle="rgba(255,255,255,.12)";roundedRect(ctx,270,184,180,40,20);ctx.fill();ctx.fillStyle="#ffffff";ctx.font="800 13px Arial";ctx.fillText(code,w/2,210);

  const clean=cleanPhotoCanvas(600,750);ctx.save();ctx.shadowColor="rgba(0,24,17,.3)";ctx.shadowBlur=26;roundedRect(ctx,198,240,324,405,26);ctx.fillStyle="rgba(1,36,25,.25)";ctx.fill();ctx.restore();ctx.save();roundedRect(ctx,200,238,320,400,24);ctx.clip();ctx.drawImage(clean,200,238,320,400);ctx.restore();ctx.strokeStyle="rgba(255,255,255,.85)";ctx.lineWidth=4;roundedRect(ctx,200,238,320,400,24);ctx.stroke();

  ctx.fillStyle="#9bf0c5";roundedRect(ctx,220,661,280,50,25);ctx.fill();ctx.fillStyle="#073c2b";ctx.font="900 18px Arial";ctx.textAlign="center";ctx.fillText("●  EQUIPO VERDE",w/2,693);
  drawCenteredField(ctx,"NOMBRE",first,750,787,580,33,23);drawCenteredField(ctx,"APELLIDO",last,827,864,580,33,23);
  ctx.strokeStyle="rgba(255,255,255,.16)";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(104,895);ctx.lineTo(616,895);ctx.stroke();
  ctx.fillStyle="#9eeaca";ctx.font="800 12px Arial";ctx.textAlign="center";ctx.fillText("EDAD",218,926);ctx.fillText("GÉNERO",502,926);ctx.fillStyle="#ffffff";ctx.font="900 24px Arial";ctx.fillText(`${age} AÑOS`,218,961);fitText(ctx,gender,245,24,17,900);ctx.fillText(gender,502,961);
  ctx.strokeStyle="rgba(255,255,255,.16)";ctx.beginPath();ctx.moveTo(104,985);ctx.lineTo(616,985);ctx.stroke();
  drawCenteredField(ctx,"ASESOR(A)",advisor,1015,1049,570,23,17);drawCenteredField(ctx,"WHATSAPP",whatsapp,1083,1117,570,24,18);

  ctx.fillStyle="#ffffff";roundedRect(ctx,232,1136,256,224,24);ctx.fill();ctx.strokeStyle="rgba(158,234,202,.55)";ctx.lineWidth=2;ctx.stroke();
  if(qr){ctx.save();ctx.imageSmoothingEnabled=false;ctx.drawImage(qr,275,1148,170,170);ctx.restore();ctx.fillStyle="#073c2b";ctx.font="900 10px Arial";ctx.textAlign="center";ctx.fillText("ESCANEA · ACCESO PROTEGIDO",w/2,1343);}
  else{ctx.fillStyle="#dceee6";roundedRect(ctx,275,1148,170,170,16);ctx.fill();ctx.fillStyle="#3d6655";ctx.font="900 31px Arial";ctx.textAlign="center";ctx.fillText("QR",w/2,1227);ctx.font="800 11px Arial";ctx.fillText("NO DISPONIBLE",w/2,1255);ctx.fillStyle="#073c2b";ctx.font="900 10px Arial";ctx.fillText("REGISTRO SIN CONEXIÓN",w/2,1343);}

  ctx.fillStyle="rgba(255,255,255,.72)";ctx.font="700 10px Arial";ctx.textAlign="left";ctx.fillText(`EMITIDO ${date}`,70,1382);ctx.textAlign="right";ctx.fillText(`${MEETING.dateShort} · ${MEETING.time}`,650,1382);ctx.textAlign="center";ctx.font="700 8px Arial";ctx.fillText("PRE-REGISTRO · NO ACREDITA VÍNCULO LABORAL",w/2,1402);
  $("qrPrivacyNote").textContent=accessUrl?"🔒 El QR abre el registro completo y solicita acceso de administrador antes de mostrar los datos.":"⚠ El QR no está disponible porque el registro no pudo guardarse en línea.";
  generatedFileName=`carne-${titleCase(answer("firstName")).toLowerCase().replace(/[^a-záéíóúñ0-9]+/gi,"-")}-${titleCase(answer("lastName")).toLowerCase().replace(/[^a-záéíóúñ0-9]+/gi,"-")}.png`;
}

function compressedPhotoData() {
  const canvas=cleanPhotoCanvas(360,450); let quality=.78; let data=canvas.toDataURL("image/jpeg",quality); while(data.length>250000&&quality>.45){quality-=.08;data=canvas.toDataURL("image/jpeg",quality);} return data;
}

function credentialBlob() { return new Promise((resolve,reject)=>credentialCanvas.toBlob((blob)=>blob?resolve(blob):reject(new Error("No se pudo crear el archivo")),"image/png",1)); }

async function downloadCredential() {
  try { const blob=await credentialBlob();const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download=generatedFileName;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);showToast("Carné descargado correctamente."); }
  catch { showToast("No se pudo descargar el carné."); }
}

async function shareCredential() {
  try { const blob=await credentialBlob();const file=new File([blob],generatedFileName,{type:"image/png"});if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){await navigator.share({title:"Carné Logística & Eventos",text:`Pre-registro ${registrationId}`,files:[file]});}else{await downloadCredential();showToast("El carné se descargó para que puedas compartirlo.");} }
  catch(error){if(error?.name!=="AbortError")showToast("No fue posible compartir el carné.");}
}

function updateWhatsappLink() {
  const message=["Hola, ya completé mi inscripción en Logística & Eventos.",`Nombre: ${titleCase(answer("firstName"))} ${titleCase(answer("lastName"))}`,`Asesor(a): ${answer("advisor")}`,`Equipo: ${TEAM_NAME}`,`Código: ${registrationId||"pendiente"}`,"Adjunto mi carné digital."].join("\n");
  $("whatsappButton").href=`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

async function initializeBackend() {
  if (IS_DEMO) { firebaseReady=true; publicUser={uid:"demo-public",isAnonymous:true}; records=demoRecords(); hideConnection(); return; }
  if (!window.firebase) { showConnection("No fue posible cargar la conexión. Revisa internet e inténtalo nuevamente.",true); return; }
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    db=firebase.firestore();auth=firebase.auth();
    try { db.settings({experimentalAutoDetectLongPolling:true}); } catch {}
    const initialUser=await new Promise((resolve)=>{const stop=auth.onAuthStateChanged((user)=>{stop();resolve(user);});});
    publicUser=initialUser;
    if (!publicUser) publicUser=(await auth.signInAnonymously()).user;
    firebaseReady=true; subscribeQuestionConfig(); hideConnection();
  } catch(error) {
    console.error("Firebase initialization",error);
    showConnection("El sistema de registros todavía no está activado. Comunícate con tu asesor.",true);
  }
}

function subscribeQuestionConfig() {
  questionUnsubscribe?.();
  questionUnsubscribe=db.collection("configuracion").doc("formulario_inscripcion").onSnapshot((snapshot)=>{
    if (snapshot.exists&&Array.isArray(snapshot.data().questions)&&snapshot.data().questions.length) {
      questions=snapshot.data().questions.map(normalizeQuestion);renderAllQuestions(true);
    }
  },(error)=>console.warn("No se pudo cargar la configuración",error));
}

async function saveRegistration() {
  const values=collectAnswers();
  values.meetingConsent=$("meetingConsent").checked;values.privacyConsent=$("privacyConsent").checked;
  const payload={
    firstName:titleCase(values.firstName),lastName:titleCase(values.lastName),age:Number(values.age),gender:String(values.gender),advisor:String(values.advisor),team:TEAM_NAME,
    document:String(values.document),whatsapp:String(values.whatsapp),phone:String(values.phone),photoData:compressedPhotoData(),answersJson:JSON.stringify(values),status:"Nuevo",source:"Formulario web",
  };
  if (IS_DEMO) { const id=`DEMO${Date.now().toString().slice(-6)}`; records.unshift({...payload,id,createdAt:new Date(),createdByUid:"demo-public"});return id; }
  if (!firebaseReady||!db||!auth?.currentUser) throw new Error("El sistema de registros no está conectado.");
  payload.createdAt=firebase.firestore.FieldValue.serverTimestamp();payload.createdByUid=auth.currentUser.uid;
  const reference=await db.collection("inscripciones_personal").add(payload);return reference.id;
}

function demoRecords() {
  const now=Date.now();
  const andreaAnswers={advisor:"Fran Santamaria",firstName:"Andrea",lastName:"Rojas",phone:"3001112233",whatsapp:"3001112233",document:"1023456789",age:"19",gender:"Femenino",address:"Bogotá, barrio Restrepo",events:["Logística","Conciertos"],places:["Bogotá","Soacha"],shirtSize:"M",pantsSize:"30",payment:["Nequi"],schedules:["02:00 pm - 07:00 pm"],peopleAges:["15 - 20 años","20 en adelante"],experience:"Apoyo logístico en eventos familiares.",nextWeek:"Sí",days:["Viernes","Sábado","Domingo"],disease:"No",swim:"Sí",sport:"Sí",understands:"Sí",meetingConsent:true,privacyConsent:true};
  return [
    {id:"DEMO-001",firstName:"Andrea",lastName:"Rojas",age:19,gender:"Femenino",advisor:"Fran Santamaria",team:"Verde",document:"1023456789",whatsapp:"3001112233",phone:"3001112233",photoData:"",answersJson:JSON.stringify(andreaAnswers),status:"Nuevo",createdAt:new Date(now-45*60000)},
    {id:"DEMO-002",firstName:"Daniel",lastName:"Gómez",age:21,gender:"Masculino",advisor:"Vanessa Barragan",team:"Verde",document:"1023456790",whatsapp:"3002223344",phone:"3002223344",photoData:"",answersJson:"{}",status:"Nuevo",createdAt:new Date(now-24*3600000)},
    {id:"DEMO-003",firstName:"Laura",lastName:"Martínez",age:18,gender:"Femenino",advisor:"Fran Santamaria",team:"Verde",document:"1023456791",whatsapp:"3003334455",phone:"3003334455",photoData:"",answersJson:"{}",status:"Nuevo",createdAt:new Date(now-3*86400000)},
  ];
}

async function showDemoCredential() {
  if(!SHOW_DEMO_CREDENTIAL)return;
  const record=records.find((item)=>item.id==="DEMO-001")||demoRecords()[0];let values={};try{values=JSON.parse(record.answersJson||"{}");}catch{}
  restoreAnswers(values);const portrait=document.createElement("canvas");portrait.width=600;portrait.height=750;const ctx=portrait.getContext("2d");const gradient=ctx.createLinearGradient(0,0,0,750);gradient.addColorStop(0,"#e7f5ef");gradient.addColorStop(1,"#bdd8cc");ctx.fillStyle=gradient;ctx.fillRect(0,0,600,750);ctx.fillStyle="#6f9e8a";ctx.beginPath();ctx.arc(300,270,105,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(300,675,210,230,0,Math.PI,0);ctx.fill();ctx.fillStyle="#ffffff";ctx.font="900 56px Arial";ctx.textAlign="center";ctx.fillText("AR",300,700);
  photoState={image:portrait,zoom:1,panX:0,panY:0,dragging:false,pointerX:0,pointerY:0};registrationId="DEMO-001";await drawCredential();updateWhatsappLink();$("formView").hidden=true;$("resultView").hidden=false;$("sendNotice").className="notice notice-success";$("sendNotice").querySelector("p").textContent="Vista de demostración: carné vertical con WhatsApp, logo y QR protegido.";
}

async function submitRegistration(event) {
  event.preventDefault(); if(isSubmitting||!validateStep(4))return;
  isSubmitting=true;$("submitButton").disabled=true;$("submitButton").classList.add("is-loading");$("submitStatus").className="submit-status is-info";$("submitStatus").textContent="Guardando la inscripción y creando el carné…";
  let saved=true;
  try { registrationId=await saveRegistration(); }
  catch(error){ saved=false;console.error(error);registrationId=`LOCAL-${String(Date.now()).slice(-7)}`; }
  await drawCredential();updateWhatsappLink();
  const notice=$("sendNotice");
  if(saved){notice.className="notice notice-success";notice.querySelector("p").textContent="Tu inscripción quedó guardada correctamente en el sistema.";}
  else{notice.className="notice notice-warning";notice.querySelector("p").textContent="El carné fue creado, pero el registro no pudo guardarse. Descárgalo y envíalo por WhatsApp para completar la inscripción.";}
  $("formView").hidden=true;$("resultView").hidden=false;$("resultView").scrollIntoView({behavior:"smooth",block:"start"});isSubmitting=false;$("submitButton").disabled=false;$("submitButton").classList.remove("is-loading");
}

function isAdminUser(user=auth?.currentUser) { return Boolean(user?.email&&user.email.toLowerCase()===ADMIN_EMAIL.toLowerCase()); }

function openModal(id) { $(id).hidden=false;document.body.classList.add("modal-open"); }
function closeModal(id) { $(id).hidden=true;if(!document.querySelector(".modal-backdrop:not([hidden])"))document.body.classList.remove("modal-open"); }

async function openAdminAccess() {
  const linked=Boolean(LINKED_RECORD_ID);$("loginTitle").textContent=linked?"Ver registro del carné":"Control administrativo";$("loginIntro").textContent=linked?"Este QR está protegido. Ingresa como administrador para ver todos los datos del formulario.":"Ingresa con tu cuenta de administrador de Logística & Eventos.";$("adminLoginButton").textContent=linked?"Abrir registro protegido":"Ingresar al control";
  if (IS_DEMO&&demoAdmin) return showAdminView("admin@demo.local");
  if (!IS_DEMO&&isAdminUser()) return showAdminView(auth.currentUser.email);
  $("loginError").textContent="";$("adminPassword").value="";openModal("adminLoginModal");setTimeout(()=>$("adminEmail").focus(),100);
}

async function loginAdmin(event) {
  event.preventDefault();const email=$("adminEmail").value.trim();const password=$("adminPassword").value;$("loginError").textContent="";$("adminLoginButton").disabled=true;
  try {
    if(IS_DEMO){if(!email||!password)throw new Error("Ingresa correo y contraseña.");demoAdmin=true;closeModal("adminLoginModal");showAdminView(email);return;}
    if(!auth)throw new Error("El acceso administrativo no está disponible.");
    if(auth.currentUser?.isAnonymous)await auth.signOut();
    const result=await auth.signInWithEmailAndPassword(email,password);
    if(!isAdminUser(result.user)){await auth.signOut();throw new Error("Esta cuenta no tiene permiso de administrador.");}
    publicUser=result.user;closeModal("adminLoginModal");showAdminView(result.user.email);
  } catch(error) { console.error(error);$("loginError").textContent=adminErrorMessage(error); }
  finally { $("adminLoginButton").disabled=false; }
}

function adminErrorMessage(error) {
  const code=error?.code||"";
  if(["auth/wrong-password","auth/invalid-login-credentials","auth/user-not-found"].includes(code))return"Correo o contraseña incorrectos.";
  if(code==="auth/too-many-requests")return"Demasiados intentos. Espera unos minutos.";
  return error?.message||"No fue posible iniciar sesión.";
}

async function showAdminView(email) {
  $("publicHeader").hidden=true;$("publicFooter").hidden=true;$("formView").hidden=true;$("resultView").hidden=true;$("adminView").hidden=false;$("adminUserEmail").textContent=email||ADMIN_EMAIL;window.scrollTo({top:0,behavior:"smooth"});
  setLoading(true,"Cargando control de inscripciones…");
  try { if(!IS_DEMO)await ensureQuestionConfig();await loadAdminRecords();renderQuestionEditor();if(LINKED_RECORD_ID)await openLinkedRecord();else showAdminTab("dashboard"); }
  catch(error){console.error(error);showToast("No se pudo cargar el control administrativo.");}
  finally{setLoading(false);}
}

function closeAdminView() {
  recordsUnsubscribe?.();recordsUnsubscribe=null;$("adminView").hidden=true;$("publicHeader").hidden=false;$("publicFooter").hidden=false;$("formView").hidden=false;$("resultView").hidden=true;showStep(1,false);window.scrollTo({top:0,behavior:"smooth"});
}

async function logoutAdmin() {
  recordsUnsubscribe?.();recordsUnsubscribe=null;
  if(IS_DEMO){demoAdmin=false;closeAdminView();return;}
  try{await auth.signOut();publicUser=(await auth.signInAnonymously()).user;}catch(error){console.warn(error);}closeAdminView();showToast("Sesión administrativa cerrada.");
}

async function ensureQuestionConfig() {
  const ref=db.collection("configuracion").doc("formulario_inscripcion");const snapshot=await ref.get();
  if(!snapshot.exists)await ref.set({questions:questions.map(questionForStorage),updatedAt:firebase.firestore.FieldValue.serverTimestamp(),updatedBy:ADMIN_EMAIL});
  else if(Array.isArray(snapshot.data().questions))questions=snapshot.data().questions.map(normalizeQuestion);
  renderAllQuestions(true);
}

function questionForStorage(question) {
  const clean=normalizeQuestion(question);return Object.fromEntries(Object.entries(clean).filter(([,value])=>value!==""&&value!==0&&value!==false&&!(Array.isArray(value)&&!value.length)));
}

function loadAdminRecords() {
  if(IS_DEMO){renderAdminData();return Promise.resolve();}
  return new Promise((resolve,reject)=>{
    recordsUnsubscribe?.();let first=true;
    recordsUnsubscribe=db.collection("inscripciones_personal").orderBy("createdAt","desc").limit(1000).onSnapshot((snapshot)=>{
      records=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}));renderAdminData();if(first){first=false;resolve();}
    },(error)=>{if(first)reject(error);else showToast("Se perdió la actualización en tiempo real.");});
  });
}

async function openLinkedRecord() {
  if(!LINKED_RECORD_ID||linkedRecordOpened)return;
  let record=records.find((item)=>item.id===LINKED_RECORD_ID);
  if(!record&&!IS_DEMO&&db){
    const snapshot=await db.collection("inscripciones_personal").doc(LINKED_RECORD_ID).get();
    if(snapshot.exists){record={id:snapshot.id,...snapshot.data()};records.unshift(record);renderAdminData();}
  }
  linkedRecordOpened=true;showAdminTab("records");
  if(!record){showToast("No encontramos el registro asociado a este QR.");return;}
  showRecord(record.id);
}

function renderAdminData() { renderDashboard();renderAdvisorFilter();renderRecords(); }

function renderDashboard() {
  const now=new Date();const startToday=new Date(now.getFullYear(),now.getMonth(),now.getDate());const weekAgo=new Date(now.getTime()-7*86400000);const counts={};
  records.forEach((record)=>{const advisor=record.advisor||"Sin asesor";counts[advisor]=(counts[advisor]||0)+1;});
  $("statTotal").textContent=records.length;$("statToday").textContent=records.filter((r)=>timestampToDate(r.createdAt)>=startToday).length;$("statWeek").textContent=records.filter((r)=>timestampToDate(r.createdAt)>=weekAgo).length;$("statAdvisors").textContent=Object.keys(counts).length;
  const entries=Object.entries(counts).sort((a,b)=>b[1]-a[1]);const max=Math.max(1,...entries.map(([,count])=>count));
  $("advisorBreakdown").innerHTML=entries.length?entries.map(([name,count])=>`<div class="advisor-row"><span title="${escapeHTML(name)}">${escapeHTML(name)}</span><div class="advisor-bar"><span style="width:${Math.max(4,(count/max)*100)}%"></span></div><strong>${count}</strong></div>`).join(""):`<div class="empty-state"><p>Aún no hay registros.</p></div>`;
  $("recentRecords").innerHTML=records.slice(0,5).map((record)=>`<button class="recent-item" type="button" data-view-record="${escapeHTML(record.id)}">${recordPhoto(record)}<span><strong>${escapeHTML(record.firstName)} ${escapeHTML(record.lastName)}</strong><small>${escapeHTML(record.advisor||"Sin asesor")}</small></span><time>${escapeHTML(formatDate(record.createdAt))}</time></button>`).join("")||`<div class="empty-state"><p>Aún no hay registros.</p></div>`;
}

function recordPhoto(record,className="") {
  const photo=safeImage(record.photoData);if(photo)return`<img class="${className}" src="${photo}" alt="">`;
  const initials=`${String(record.firstName||"").charAt(0)}${String(record.lastName||"").charAt(0)}`.toUpperCase();return`<span class="avatar-placeholder ${className}" aria-hidden="true">${escapeHTML(initials||"LE")}</span>`;
}

function renderAdvisorFilter() {
  const current=$("advisorFilter").value;const advisors=[...new Set(records.map((record)=>record.advisor).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"es"));
  $("advisorFilter").innerHTML=`<option value="">Todos los asesores</option>${advisors.map((name)=>`<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`).join("")}`;if(advisors.includes(current))$("advisorFilter").value=current;
}

function renderRecords() {
  const search=normalizeText($("recordSearch").value);const advisor=$("advisorFilter").value;
  filteredRecords=records.filter((record)=>{const haystack=normalizeText(`${record.firstName} ${record.lastName} ${record.document} ${record.advisor}`);return(!search||haystack.includes(search))&&(!advisor||record.advisor===advisor);});
  $("recordCountBadge").textContent=`${filteredRecords.length} ${filteredRecords.length===1?"registro":"registros"}`;$("recordsEmpty").hidden=filteredRecords.length>0;
  $("recordsTableBody").innerHTML=filteredRecords.map((record)=>`<tr><td><div class="person-cell">${recordPhoto(record)}<span><strong>${escapeHTML(record.firstName)} ${escapeHTML(record.lastName)}</strong><small>${escapeHTML(record.document)}</small></span></div></td><td>${escapeHTML(record.age)}</td><td>${escapeHTML(record.gender)}</td><td>${escapeHTML(record.advisor)}</td><td><span class="team-badge">${escapeHTML(record.team||TEAM_NAME)}</span></td><td>${escapeHTML(formatDate(record.createdAt,true))}</td><td><button class="table-action" type="button" data-view-record="${escapeHTML(record.id)}">Ver</button></td></tr>`).join("");
  $("recordsMobile").innerHTML=filteredRecords.map((record)=>`<button class="mobile-record" type="button" data-view-record="${escapeHTML(record.id)}">${recordPhoto(record)}<span><strong>${escapeHTML(record.firstName)} ${escapeHTML(record.lastName)}</strong><small>${escapeHTML(record.advisor)} · ${escapeHTML(formatDate(record.createdAt))}</small></span><span>›</span></button>`).join("");
}

function recordAnswerItems(record) {
  let stored={};try{stored=JSON.parse(record.answersJson||"{}");}catch{}
  const values={advisor:record.advisor,firstName:record.firstName,lastName:record.lastName,phone:record.phone,whatsapp:record.whatsapp,document:record.document,age:record.age,gender:record.gender,...stored};
  const used=new Set();const items=[];
  const hasValue=(value)=>value!==undefined&&value!==null&&value!==""&&(!Array.isArray(value)||value.length>0);
  questions.forEach((question)=>{const value=values[question.id];used.add(question.id);if(hasValue(value))items.push({label:question.label,value});});
  const labels={meetingConsent:"Asistencia a la reunión confirmada",privacyConsent:"Tratamiento de datos autorizado"};
  Object.entries(values).forEach(([key,value])=>{if(used.has(key)||!hasValue(value))return;items.push({label:labels[key]||titleCase(key.replace(/[-_]+/g," ")),value});});
  return items;
}

function displayRecordValue(value) {
  if(Array.isArray(value))return value.join(", ");
  if(typeof value==="boolean")return value?"Sí":"No";
  return String(value);
}

function showRecord(id) {
  const record=records.find((item)=>item.id===id);if(!record)return;
  const answerItems=recordAnswerItems(record);
  const photo=safeImage(record.photoData);$("recordDetail").innerHTML=`<div class="record-profile">${photo?`<img src="${photo}" alt="Foto de ${escapeHTML(record.firstName)}">`:`<span class="avatar-placeholder">${escapeHTML(String(record.firstName||"L").charAt(0)+String(record.lastName||"E").charAt(0))}</span>`}<div><span class="eyebrow green-text">Registro ${escapeHTML(id.slice(0,8).toUpperCase())}</span><h2 id="recordModalTitle">${escapeHTML(record.firstName)} ${escapeHTML(record.lastName)}</h2><div class="record-meta"><span>${escapeHTML(record.age)} años</span><span>${escapeHTML(record.gender)}</span><span>Asesor: ${escapeHTML(record.advisor)}</span><span>Equipo ${escapeHTML(record.team||TEAM_NAME)}</span></div><p>Registrado: ${escapeHTML(formatDate(record.createdAt,true))}</p></div></div><dl class="record-answer-grid">${answerItems.map((item)=>`<div class="record-answer"><dt>${escapeHTML(item.label)}</dt><dd>${escapeHTML(displayRecordValue(item.value))}</dd></div>`).join("")}</dl><div class="record-delete"><button class="button button-danger" type="button" data-delete-record="${escapeHTML(record.id)}">Eliminar registro</button></div>`;
  openModal("recordModal");
}

async function deleteRecord(id) {
  const record=records.find((item)=>item.id===id);if(!record)return;
  const accepted=await confirmDialog(`¿Eliminar el registro de ${record.firstName} ${record.lastName}? Esta acción no se puede deshacer.`);if(!accepted)return;
  setLoading(true,"Eliminando registro…");
  try{if(IS_DEMO){records=records.filter((item)=>item.id!==id);renderAdminData();}else await db.collection("inscripciones_personal").doc(id).delete();closeModal("recordModal");showToast("Registro eliminado.");}
  catch(error){console.error(error);showToast("No se pudo eliminar el registro.");}finally{setLoading(false);}
}

function confirmDialog(message) {
  $("confirmMessage").textContent=message;openModal("confirmModal");return new Promise((resolve)=>{confirmResolver=resolve;});
}

function resolveConfirm(value) { closeModal("confirmModal");confirmResolver?.(value);confirmResolver=null; }

function showAdminTab(name) {
  document.querySelectorAll("[data-admin-tab]").forEach((button)=>button.classList.toggle("is-active",button.dataset.adminTab===name));
  document.querySelectorAll("[data-admin-panel]").forEach((panel)=>{const active=panel.dataset.adminPanel===name;panel.hidden=!active;panel.classList.toggle("is-active",active);});
  if(name==="records")renderRecords();if(name==="questions")renderQuestionEditor();
}

function renderQuestionEditor() {
  $("questionEditorList").innerHTML=questions.map((question,index)=>`<article class="question-editor-row"><span class="question-order">${String(index+1).padStart(2,"0")}</span><div class="question-info"><strong title="${escapeHTML(question.label)}">${escapeHTML(question.label)}</strong><small>${escapeHTML(TYPE_NAMES[question.type])} · Sección ${question.step}</small></div><div class="question-tags">${question.required?"<span>Obligatoria</span>":"<span>Opcional</span>"}${question.locked?"<span>Esencial</span>":""}</div><div class="question-actions"><button type="button" data-move-question="up" data-question-id="${escapeHTML(question.id)}" title="Subir" ${isFirstInStep(question)?"disabled":""}>↑</button><button type="button" data-move-question="down" data-question-id="${escapeHTML(question.id)}" title="Bajar" ${isLastInStep(question)?"disabled":""}>↓</button><button type="button" data-edit-question="${escapeHTML(question.id)}" title="Editar">✎</button><button class="delete" type="button" data-delete-question="${escapeHTML(question.id)}" title="Eliminar" ${question.locked?"disabled":""}>⌫</button></div></article>`).join("");
}

function stepQuestions(step) { return questions.filter((question)=>question.step===step); }
function isFirstInStep(question) { return stepQuestions(question.step)[0]?.id===question.id; }
function isLastInStep(question) { const items=stepQuestions(question.step);return items[items.length-1]?.id===question.id; }

function openQuestionEditor(id="") {
  const question=questions.find((item)=>item.id===id);$("questionForm").reset();$("questionFormError").textContent="";$("questionEditId").value=question?.id||"";$("questionModalTitle").textContent=question?"Editar pregunta":"Agregar pregunta";
  $("questionLabel").value=question?.label||"";$("questionType").value=question?.type||"text";$("questionStep").value=String(question?.step||1);$("questionOptions").value=(question?.options||[]).join("\n");$("questionRequired").checked=Boolean(question?.required);
  $("questionType").disabled=Boolean(question?.locked);$("questionStep").disabled=Boolean(question?.locked);toggleQuestionOptions();openModal("questionModal");setTimeout(()=>$("questionLabel").focus(),100);
}

function toggleQuestionOptions() { $("questionOptionsField").hidden=!["select","radio","checkbox"].includes($("questionType").value); }

async function saveQuestion(event) {
  event.preventDefault();const id=$("questionEditId").value;const existing=questions.find((item)=>item.id===id);const type=existing?.locked?existing.type:$("questionType").value;const step=existing?.locked?existing.step:Number($("questionStep").value);const options=$("questionOptions").value.split(/\r?\n/).map((item)=>item.trim()).filter(Boolean);
  if(!$("questionLabel").value.trim()){$("questionFormError").textContent="Escribe el texto de la pregunta.";return;}
  if(["select","radio","checkbox"].includes(type)&&options.length<2){$("questionFormError").textContent="Agrega al menos dos opciones.";return;}
  const updated=normalizeQuestion({...existing,id:existing?.id||`custom-${Date.now()}`,label:$("questionLabel").value.trim(),type,step,options,required:$("questionRequired").checked,locked:Boolean(existing?.locked),minorOnly:Boolean(existing?.minorOnly),full:Boolean(existing?.full)});
  if(existing){const index=questions.findIndex((item)=>item.id===id);questions[index]=updated;}else questions.push(updated);
  closeModal("questionModal");await persistQuestions("Pregunta guardada.");
}

async function moveQuestion(id,direction) {
  const question=questions.find((item)=>item.id===id);if(!question)return;const inStep=stepQuestions(question.step);const position=inStep.findIndex((item)=>item.id===id);const target=inStep[position+(direction==="up"?-1:1)];if(!target)return;
  const a=questions.findIndex((item)=>item.id===question.id);const b=questions.findIndex((item)=>item.id===target.id);[questions[a],questions[b]]=[questions[b],questions[a]];await persistQuestions();
}

async function deleteQuestion(id) {
  const question=questions.find((item)=>item.id===id);if(!question||question.locked)return;
  if(!await confirmDialog(`¿Eliminar la pregunta “${question.label}”? Los registros anteriores conservarán su respuesta.`))return;
  questions=questions.filter((item)=>item.id!==id);await persistQuestions("Pregunta eliminada.");
}

async function persistQuestions(message="Orden actualizado.") {
  renderQuestionEditor();renderAllQuestions(true);
  if(IS_DEMO){showToast(message);return;}
  setLoading(true,"Guardando preguntas…");
  try{await db.collection("configuracion").doc("formulario_inscripcion").set({questions:questions.map(questionForStorage),updatedAt:firebase.firestore.FieldValue.serverTimestamp(),updatedBy:auth.currentUser.email},{merge:true});showToast(message);}
  catch(error){console.error(error);showToast("No se pudieron guardar los cambios.");}
  finally{setLoading(false);}
}

function attachEvents() {
  document.querySelectorAll("[data-next]").forEach((button)=>button.addEventListener("click",()=>{if(validateStep(currentStep))showStep(currentStep+1);}));
  document.querySelectorAll("[data-prev]").forEach((button)=>button.addEventListener("click",()=>showStep(currentStep-1)));
  form.addEventListener("submit",submitRegistration);
  form.addEventListener("input",(event)=>{clearInvalid(event.target);event.target.closest("[data-required-group]")?.classList.remove("is-invalid");if(event.target.matches('input[type="tel"],input[data-question-id="document"]'))event.target.value=event.target.value.replace(/\D/g,"");});
  form.addEventListener("change",(event)=>{clearInvalid(event.target);event.target.closest("[data-required-group]")?.classList.remove("is-invalid");if(event.target.dataset.questionId==="age")updateMinorQuestions();});
  $("editPersonalButton").addEventListener("click",()=>showStep(1));$("downloadCredential").addEventListener("click",downloadCredential);$("shareCredential").addEventListener("click",shareCredential);$("restartButton").addEventListener("click",()=>location.reload());
  $("adminAccessButton").addEventListener("click",openAdminAccess);$("adminLoginForm").addEventListener("submit",loginAdmin);$("closeAdminButton").addEventListener("click",closeAdminView);$("logoutAdminButton").addEventListener("click",logoutAdmin);$("refreshAdminButton").addEventListener("click",()=>{if(IS_DEMO)renderAdminData();else loadAdminRecords();showToast("Información actualizada.");});
  document.querySelectorAll("[data-admin-tab]").forEach((button)=>button.addEventListener("click",()=>showAdminTab(button.dataset.adminTab)));document.querySelectorAll("[data-go-records]").forEach((button)=>button.addEventListener("click",()=>showAdminTab("records")));
  $("recordSearch").addEventListener("input",renderRecords);$("advisorFilter").addEventListener("change",renderRecords);$("addQuestionButton").addEventListener("click",()=>openQuestionEditor());$("questionType").addEventListener("change",toggleQuestionOptions);$("questionForm").addEventListener("submit",saveQuestion);
  document.addEventListener("click",(event)=>{
    const close=event.target.closest("[data-close-modal]");if(close)closeModal(close.dataset.closeModal);
    const view=event.target.closest("[data-view-record]");if(view)showRecord(view.dataset.viewRecord);
    const removeRecord=event.target.closest("[data-delete-record]");if(removeRecord)deleteRecord(removeRecord.dataset.deleteRecord);
    const edit=event.target.closest("[data-edit-question]");if(edit)openQuestionEditor(edit.dataset.editQuestion);
    const move=event.target.closest("[data-move-question]");if(move)moveQuestion(move.dataset.questionId,move.dataset.moveQuestion);
    const removeQuestion=event.target.closest("[data-delete-question]");if(removeQuestion)deleteQuestion(removeQuestion.dataset.deleteQuestion);
  });
  document.querySelectorAll(".modal-backdrop").forEach((backdrop)=>backdrop.addEventListener("click",(event)=>{if(event.target===backdrop&&backdrop.id!=="confirmModal")closeModal(backdrop.id);}));
  $("cancelConfirmButton").addEventListener("click",()=>resolveConfirm(false));$("acceptConfirmButton").addEventListener("click",()=>resolveConfirm(true));
  document.addEventListener("keydown",(event)=>{if(event.key==="Escape"){const open=document.querySelector(".modal-backdrop:not([hidden])");if(open&&open.id!=="confirmModal")closeModal(open.id);}if(event.ctrlKey&&event.altKey&&event.key.toLowerCase()==="a"){event.preventDefault();openAdminAccess();}});
}

function attachPhotoEvents() {
  $("photoInput").addEventListener("change",()=>{
    const file=$("photoInput").files?.[0];$("photoError").classList.remove("is-visible");if(!file)return;
    if(!file.type.startsWith("image/")||file.size>8*1024*1024){$("photoInput").value="";$("photoError").textContent="Usa una imagen JPG, PNG o WEBP de máximo 8 MB.";$("photoError").classList.add("is-visible");return showToast("La foto no es válida o supera los 8 MB.");}
    const image=new Image();const url=URL.createObjectURL(file);
    image.onload=()=>{URL.revokeObjectURL(url);photoState={image,zoom:1,panX:0,panY:0,dragging:false,pointerX:0,pointerY:0};$("photoZoom").disabled=false;$("photoZoom").value="1";$("zoomOutput").textContent="100%";$("photoFileName").textContent=file.name;drawPhotoEditor();showToast("Foto cargada. Arrástrala para centrarla.");};
    image.onerror=()=>{URL.revokeObjectURL(url);$("photoInput").value="";$("photoError").textContent="No pudimos abrir esa imagen.";$("photoError").classList.add("is-visible");};image.src=url;
  });
  $("photoZoom").addEventListener("input",()=>{photoState.zoom=Number($("photoZoom").value);$("zoomOutput").textContent=`${Math.round(photoState.zoom*100)}%`;drawPhotoEditor();});
  photoCanvas.addEventListener("pointerdown",(event)=>{if(!photoState.image)return;photoState.dragging=true;photoState.pointerX=event.clientX;photoState.pointerY=event.clientY;photoCanvas.setPointerCapture(event.pointerId);});
  photoCanvas.addEventListener("pointermove",(event)=>{if(!photoState.dragging||!photoState.image)return;const rect=photoCanvas.getBoundingClientRect();photoState.panX+=(event.clientX-photoState.pointerX)*(photoCanvas.width/rect.width);photoState.panY+=(event.clientY-photoState.pointerY)*(photoCanvas.height/rect.height);photoState.pointerX=event.clientX;photoState.pointerY=event.clientY;drawPhotoEditor();});
  const end=(event)=>{if(photoState.dragging&&photoCanvas.hasPointerCapture(event.pointerId))photoCanvas.releasePointerCapture(event.pointerId);photoState.dragging=false;};photoCanvas.addEventListener("pointerup",end);photoCanvas.addEventListener("pointercancel",end);
}

async function init() {
  renderAllQuestions();drawPhotoPlaceholder();attachEvents();attachPhotoEvents();showStep(1,false);showConnection("Conectando con el sistema de inscripciones…");await initializeBackend();await loadCredentialLogo();
  if(LINKED_RECORD_ID)await openAdminAccess();else await showDemoCredential();
}

init();

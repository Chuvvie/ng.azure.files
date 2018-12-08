!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){!function(){"use strict";var t=n(1),r=n(2);angular.module("ng.azure.files",[]).service("uploadService",t).service("downloadService",r).directive("browseFile",function(){return{scope:{fileListCallback:"&"},link:function(e,t,n){t.bind("change",function(t){var n=[],r=t.target.files;if(r.length>0)for(var o=0;o<r.length;o++)n.push(r[o]);e.fileListCallback({files:n})})}}}).directive("dropFile",function(){return{scope:{fileListCallback:"&"},link:function(e,t,n){t.bind("dragover",function(e){e.stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="copy"}),t.bind("drop",function(t){t.stopPropagation(),t.preventDefault();var n=[],r=t.dataTransfer?t.dataTransfer.files:t.target.files;if(r.length>0)for(var o=0;o<r.length;o++)n.push(r[o]);e.fileListCallback({files:n})})}}}),e.exports="ng.azure.files"}()},function(e,t){!function(){"use strict";function t(e){var t=function(t){return e.get(t.getSasLink+encodeURIComponent(t.file.name)).then(function(e){var n=256e4,r=t.file,o=r.size;return o<256e4&&(n=o),{maxBlockSize:n,numberOfBlocks:o%n==0?o/n:parseInt(o/n,10)+1,totalBytesRemaining:o,currentFilePointer:0,blockIds:new Array,blockIdPrefix:"block-",bytesUploaded:0,submitUri:null,file:r,fileUrl:e.data.data.blob.data.blobBase+e.data.data.blob.data.blobUrl+e.data.data.blob.data.blobSASToken,progress:t.progress,complete:t.complete,error:t.error,cancelled:!1}},function(e){})},n=function(e,t){if(!t.cancelled)if(t.totalBytesRemaining>0){var n=t.file.slice(t.currentFilePointer,t.currentFilePointer+t.maxBlockSize),a=t.blockIdPrefix+o(t.blockIds.length,6);t.blockIds.push(btoa(a)),e.readAsArrayBuffer(n),t.currentFilePointer+=t.maxBlockSize,t.totalBytesRemaining-=t.maxBlockSize,t.totalBytesRemaining<t.maxBlockSize&&(t.maxBlockSize=t.totalBytesRemaining)}else r(t)},r=function(t){for(var n=t.fileUrl+"&comp=blocklist",r='<?xml version="1.0" encoding="utf-8"?><BlockList>',o=0;o<t.blockIds.length;o++)r+="<Latest>"+t.blockIds[o]+"</Latest>";r+="</BlockList>",e.put(n,r,{headers:{"x-ms-blob-content-type":t.file.type},requestComingFromUploaderService:!0}).then(function(e){t.complete&&t.complete(e.data,e.status,e.headers,e.config)},function(e){t.error&&t.error(e.data,e.status,e.headers,e.config)})},o=function(e,t){for(var n=""+e;n.length<t;)n="0"+n;return n};return{upload:function(r){t(r).then(function(t){var r=new FileReader;return r.onloadend=function(o){if(o.target.readyState===FileReader.DONE&&!t.cancelled){var a=t.fileUrl+"&comp=block&blockid="+t.blockIds[t.blockIds.length-1],i=new Uint8Array(o.target.result);e.put(a,i,{headers:{"x-ms-blob-type":"BlockBlob","Content-Type":t.file.type},requestComingFromUploaderService:!0,transformRequest:[]}).then(function(e){if(!t.cancelled){t.bytesUploaded+=i.length;var o=(parseFloat(t.bytesUploaded)/parseFloat(t.file.size)*100).toFixed(2);t.progress&&t.progress(o,e.data,e.status,e.headers,e.config),n(r,t)}},function(e){t.error&&t.error(e.data,e.status,e.headers,e.config)})}},n(r,t),{cancel:function(){t.cancelled=!0}}})}}}t.$inject=["$http"],e.exports=t}()},function(e,t){!function(){"use strict";function t(e,t){var n=e.defer();return{downloadAsFile:function(e){return t.get(e.sasUrl).then(function(r){t.get(r.data.data,{cache:!1,responseType:"arraybuffer",eventHandlers:{progress:function(t){e.progress(t.loaded/t.total*100)}},headers:{"Content-Type":"application/octet-stream; charset=utf-8"},requestComingFromUploaderService:!0}).then(function(t){var r=t.headers["content-type"]||"application/octet-stream",o=new Blob([t.data],{type:r});FileSaver.saveAs(o,e.filename),n.resolve()},function(e){n.reject(e)})},function(e){n.reject(e)}),n.promise}}}t.$inject=["$q","$http"],e.exports=t}()}]);
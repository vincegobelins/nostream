angular.module('starter')
.factory('uploadFactory', function(config) {
    return {
      uploadFile : function(mediaFile){
        console.log("uploading ...");

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = mediaFile.substr(mediaFile.lastIndexOf('/') + 1)+'.mp4';
        options.mimeType = "video/mp4";
        var params = {};
        params.userId = "user1";
        params.value2 = "param";

        options.params = params;

        var win = function (r) {
          console.log("Code = " + r.responseCode);
          console.log("Response = " + r.response);
          console.log("Sent = " + r.bytesSent);
        }

        var fail = function (error) {
          alert("An error has occurred: Code = " + error.code);
          console.log("upload error source " + error.source);
          console.log("upload error target " + error.target);
        }

        var ft = new FileTransfer();
        ft.upload(mediaFile, encodeURI(config.FTP), win, fail, options);
      }
    }
});

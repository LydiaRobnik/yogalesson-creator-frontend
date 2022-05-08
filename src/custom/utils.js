const calendarColors = [
  'rgb(34, 182, 34)',
  'rgb(206, 137, 9)',
  'rgb(67, 67, 196)',
  'rgb(250, 57, 57)',
  'rgb(141, 23, 141)'
];

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);

    // reader.readAsArrayBuffer(file);
  });

  // var reader = new FileReader();
  // reader.readAsDataURL(file);
  // reader.onload = function () {
  //   console.log(reader.result);
  //   return reader.result;
  // };
  // reader.onerror = function (error) {
  //   console.log('Error: ', error);
  //   return false;
  // };
}

export { calendarColors, dataURItoBlob, getBase64 };

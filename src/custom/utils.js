const calendarColors = [
  'rgb(34, 182, 34)',
  'rgb(206, 137, 9)',
  'rgb(67, 67, 196)',
  'rgb(250, 57, 57)',
  'rgb(141, 23, 141)'
];

const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

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
}

function formatDate(date) {
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  // console.log('date en-us', date.toLocaleDateString('en-US', options));
  // console.log('date', date.toLocaleDateString('de-DE', options));

  return date.toLocaleDateString('en-US', options);
}

export { calendarColors, dataURItoBlob, getBase64, formatDate, deepClone };

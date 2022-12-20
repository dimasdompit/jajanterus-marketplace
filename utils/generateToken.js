export const generateToken = (length) => {
  var alphanumerics = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var arr = [];  
  for (var i=0; i<length; i++) {
      var j = (Math.random() * (alphanumerics.length-1)).toFixed(0);
      arr[i] = alphanumerics[j];
  }
  return arr.join("");
}
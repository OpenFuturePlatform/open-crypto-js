var CryptoJS = require("crypto-js");

var iterations = 1000;
var salt = "NaCl";
var iv = "IIIIIIIIIIIIIIII";

function encrypt(msg, pass) {

  var key = CryptoJS.PBKDF2(pass, CryptoJS.enc.Utf8.parse(salt), {
    keySize: 256 / 32,
    hasher: CryptoJS.algo.SHA256,
    iterations: iterations
  });

  var encrypted = CryptoJS.AES.encrypt(msg, key, {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

function decrypt(encryptedText, pass) {

  var key = CryptoJS.PBKDF2(pass, CryptoJS.enc.Utf8.parse(salt), {
    keySize: 256 / 32,
    hasher: CryptoJS.algo.SHA256,
    iterations: iterations
  });

  var cipherParams = CryptoJS.lib.CipherParams.create(
    { ciphertext: CryptoJS.enc.Hex.parse(encryptedText) }
  );

  var decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding

  })

  return decrypted.toString(CryptoJS.enc.Utf8);
}

exports.openEncrypt = encrypt
exports.openDecrypt = decrypt
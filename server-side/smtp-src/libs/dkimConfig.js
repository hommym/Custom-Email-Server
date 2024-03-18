const crypto = require("crypto");

// DKIM signing function
function signDKIM(privateKey, domain, selector, headers, mailObject) {
  // Prepare DKIM header
  const header = headers.map((header) => `${header}: ${header === "body" ? mailObject.emailMessage : mailObject[`${header}`]}`).join("\r\n");

  // Canonicalize header
  const canonicalizedHeader = header.replace(/\r?\n/g, "\r\n");

  // Hash canonicalized header
  const hash = crypto.createHash("sha256").update(canonicalizedHeader).digest("base64");

  // Prepare DKIM signature
  const signature = `DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/simple; d=${domain}; s=${selector}; bh=${hash}; h=${headers.join(":")}; b=`;

  // Sign the hash
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(hash);
  const signedHash = signer.sign(privateKey, "base64");

  return `${signature}${signedHash}`;
}

// // Example usage
// const privateKey = "YOUR_PRIVATE_KEY";
// const domain = "example.com";
// const selector = "default";
// const headers = ["from", "to", "subject", "date", "body"]; // Headers to include in the DKIM signature
// const body = "This is the email body";

// const dkimSignature = signDKIM(privateKey, domain, selector, headers, body);
// console.log(dkimSignature);

module.exports = {
  signDKIM,
};

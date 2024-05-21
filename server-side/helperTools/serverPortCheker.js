// Purpose of this method is to return true if the  server is listening on the port provided
const { Telnet } = require("telnet-client");

const portChecker = async (domainName, portNumber) => {
  try {
    const connector = new Telnet();

    await connector.connect({ host: domainName, port: portNumber, timeout: 10000 });

    return true;
  } catch (error) {
    
      console.log(error);
    // having Socket ends error means the connection was a success but you did not do anything that is why the connection was ended
    if (String(error).includes("Socket ends")) {
      console.log("Private mail server is on 25");
      return true;
    }
    console.log("Private mail server not on port 25");
    return false;
  }
};

module.exports = portChecker;

const hasRoTLDTopLevelDomain = require("./hasRoTLDTopLevelDomain");
const getRoTLDWhoisDomainLabels = require("./getRoTLDWhoisDomainLabels");
const net = require("net");
const { toASCII } = require("./convertPunycode");

const queryRoTLDWhoisServer = domainName =>
  new Promise((resolve, reject) => {
    let whoisResult = "";

    if (!hasRoTLDTopLevelDomain(domainName)) {
      reject(
        new Error(
          "Can't query a domain name that doesn't contain a Romanian top level domain."
        )
      );
    }

    if (getRoTLDWhoisDomainLabels(domainName).subdomain) {
      reject(new Error("Can't query a domain name that contains a subdomain."));
    }

    const connection = net.connect(43, "whois.rotld.ro", () => {
      connection.write(`${toASCII(domainName)}\r\n`);
    });

    connection.on("data", data => {
      whoisResult += data.toString();
    });

    connection.on("close", () => {
      resolve(whoisResult);
    });

    connection.on("error", connectionError => {
      reject(connectionError);
    });
  });

module.exports = queryRoTLDWhoisServer;

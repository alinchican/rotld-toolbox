const isRoTLDDomain = require(`./isRoTLDDomain`);
const net = require(`net`);
const { toASCII } = require(`./convertPunycode`);

const queryRoTLDWhois = domainName =>
  new Promise((resolve, reject) => {
    let whoisResult = ``;

    if (!isRoTLDDomain(domainName)) {
      reject(new Error(`Can't query a domain name that doesn't contain a romanian top level domain.`));
    }

    const whoisPort = 43;
    const connection = net.connect(whoisPort, `whois.rotld.ro`, () => {
      connection.write(`${toASCII(domainName)}\r\n`);
    });

    connection.on(`data`, chunk => {
      whoisResult = chunk.toString();
      connection.end();
    });

    connection.on(`close`, () => resolve(whoisResult));

    connection.on(`timeout`, () => {
      connection.end();
      reject(new Error(`Whois server connection timeout.`));
    });

    connection.on(`error`, whoisError => {
      connection.destroy();
      reject(new Error(whoisError))
    });
  });

module.exports = queryRoTLDWhois;

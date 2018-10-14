const queryRoTLDWhoisServer = require("../queryRoTLDWhoisServer");

test("should reject without argument", () => {
  expect.assertions(1);
  return expect(queryRoTLDWhoisServer()).rejects.toBeInstanceOf(TypeError);
});

test("should reject with empty argument", () => {
  expect.assertions(1);
  return expect(queryRoTLDWhoisServer("")).rejects.toBeInstanceOf(TypeError);
});

test("should reject on domain name without Romanian tld", () => {
  expect.assertions(1);
  return expect(queryRoTLDWhoisServer("ș.com")).rejects.toBeInstanceOf(Error);
});

test("should reject on domain name with subdomain that has a Romanian tld", () => {
  expect.assertions(1);
  return expect(
    queryRoTLDWhoisServer("subdomeniu.ș.ro")
  ).rejects.toBeInstanceOf(Error);
});

test("should reject with domain name with subdomain that has a Romanian tld and reserved RoTLD second level domain", () => {
  expect.assertions(1);
  return expect(
    queryRoTLDWhoisServer("subdomeniu.ș.www.ro")
  ).rejects.toBeInstanceOf(Error);
});

test(
  "should resolve with whois data on domain name with Romanian tld and reserved RoTLD second level domain",
  () => {
    return expect(queryRoTLDWhoisServer("ș.www.ro")).resolves.toMatch(
      /The WHOIS service offered by ROTLD/
    );
  },
  10000
);

test(
  "should resolve with whois data on domain name with Romanian tld",
  () => {
    return expect(queryRoTLDWhoisServer("ș.ro")).resolves.toMatch(
      /The WHOIS service offered by ROTLD/
    );
  },
  10000
);

// eslint-disable-next-line jest/no-disabled-tests
test.skip("should reject on connection error", () => {
  expect.assertions(1);
  return expect(queryRoTLDWhoisServer("ș.ro")).rejects.toBeInstanceOf(Error);
});

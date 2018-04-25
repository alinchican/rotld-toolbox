const isRoTLDReservedDomain = require(`../isRoTLDReservedDomain`);
jest.mock('../RoTLDReservedDomains')

test(`should throw without argument`, () => {
  expect(() => isRoTLDReservedDomain()).toThrow();
});

test(`should throw on empty argument`, () => {
  expect(() => isRoTLDReservedDomain(``)).toThrow();
});

test(`should return false on domain name without romanian tld`, () => {
  expect(isRoTLDReservedDomain(`example.com`)).toBe(false);
});

test(`should return true on domain name that is a RoTLD reserved domain`, () => {
  expect(isRoTLDReservedDomain(`ș.ro`)).toBe(true);
});

test(`should return true on domain name that is a RoTLD reserved domain with RoTLD subdomain`, () => {
  expect(isRoTLDReservedDomain(`ș.www.ro`)).toBe(true);
});

test(`should return false on domain name that isn't a RoTLD reserved domain`, () => {
  expect(isRoTLDReservedDomain(`s.ro`)).toBe(false);
});

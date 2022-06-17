const mut = require('../src/crcCalc');

const data1 = '12345678901234567890123456789012345678901234567890';
const data2 = '1234567890abcdefghijABCDEFGHIJ12345678901234567890';

describe('crc basic tests', () => {
  test('correct discrete parameters', () => {
    try {
      const c = new mut.Crc(16, 0x8005, 0, 0, false, false);
      expect(c).not.toBeFalsy();
      expect(c.compute(data1))
        .toBe('F233');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  test('correct model parameter', () => {
    try {
      const m = mut.modelFind('CRC16_BUYPASS');
      expect(m).not.toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).not.toBeFalsy();
      expect(c.compute(data1))
        .toBe('F233');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  test('TableReversed', () => {
    try {
      const m = mut.modelFind('CRC16_BUYPASS');
      expect(m).not.toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).not.toBeFalsy();
      c.calcCrcTableReversed();
      expect(c.compute(data1))
        .toBe('1A81');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  test('accented characters', () => {
    try {
      const c = new mut.Crc(16, 0x8005, 0, 0, false, false);
      expect(c).not.toBeFalsy();
      expect(c.compute('aá'))
        .toBe('4440');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  test('LookupTable', () => {
    try {
      const c = new mut.Crc(16, 0x8005, 0, 0, false, false);
      expect(c).not.toBeFalsy();
      const t = c.getLookupTable();
      expect(t[0]).toBe(0x0000);
      expect(t[1]).toBe(0x8005);
      expect(t[2]).toBe(0x800F);
      expect(t[255]).toBe(0x0202);
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  test('incorrect discrete parameters ', () => {
    try {
      const c = new mut.Crc(10, 0x8005, 0, 0, false, false);
      expect(c).toBeFalsy();
    } catch (e) {
      expect(e.message).toEqual('Invalid CRC width');
    }
  });

  test('invalid polynomial parameter ', () => {
    try {
      const c = new mut.Crc(16);
      expect(c).toBeFalsy();
    } catch (e) {
      expect(e.message).toEqual('Invalid CRC polynomial');
    }
  });

  test('incorrect model parameter ', () => {
    try {
      const m = mut.modelFind('CRC16_foo');
      expect(m).toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).toBeFalsy();
    } catch (e) {
      expect(e.message).toEqual('Invalid CRC params');
    }
  });
});

describe('CRC8 some more tests', () => {
  test('test model CRC8 ', () => {
    try {
      const m = mut.modelFind('CRC8');
      expect(m).not.toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).not.toBeFalsy();
      expect(c.compute(data2))
        .toBe('A4');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  test('test model CRC8_SAE_J1850 ', () => {
    try {
      const m = mut.modelFind('CRC8_SAE_J1850');
      expect(m).not.toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).not.toBeFalsy();
      expect(c.compute(data2))
        .toBe('34');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  test('test model CRC8_8H2F ', () => {
    try {
      const m = mut.modelFind('CRC8_8H2F');
      expect(m).not.toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).not.toBeFalsy();
      expect(c.compute(data2))
        .toBe('19');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  test('test model CRC8_WCDMA ', () => {
    try {
      const m = mut.modelFind('CRC8_WCDMA');
      expect(m).not.toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).not.toBeFalsy();
      expect(c.compute(data2))
        .toBe('D3');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });
});

describe('CRC16 some more tests', () => {
  test('test model CRC16_CCIT_ZERO ', () => {
    try {
      const m = mut.modelFind('CRC16_CCIT_ZERO');
      expect(m).not.toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).not.toBeFalsy();
      expect(c.compute(data2))
        .toBe('8906');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  test('test model CRC16_GENIBUS ', () => {
    try {
      const m = mut.modelFind('CRC16_GENIBUS');
      expect(m).not.toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).not.toBeFalsy();
      expect(c.compute(data2))
        .toBe('21F4');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  test('test model CRC16_KERMIT ', () => {
    try {
      const m = mut.modelFind('CRC16_KERMIT');
      expect(m).not.toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).not.toBeFalsy();
      expect(c.compute(data2))
        .toBe('A94C');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  test('test model CRC16_USB ', () => {
    try {
      const m = mut.modelFind('CRC16_USB');
      expect(m).not.toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).not.toBeFalsy();
      expect(c.compute(data2))
        .toBe('BF2D');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });
});

describe('CRC32 some more tests', () => {
  test('test model CRC32 ', () => {
    try {
      const m = mut.modelFind('CRC32');
      expect(m).not.toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).not.toBeFalsy();
      expect(c.compute(data2))
        .toBe('5D5095BA');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  test('test model CRC32_BZIP2 ', () => {
    try {
      const m = mut.modelFind('CRC32_BZIP2');
      expect(m).not.toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).not.toBeFalsy();
      expect(c.compute(data2))
        .toBe('8289EF32');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  test('test model CRC32_POSIX ', () => {
    try {
      const m = mut.modelFind('CRC32_POSIX');
      expect(m).not.toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).not.toBeFalsy();
      expect(c.compute(data2))
        .toBe('0548F135');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  test('test model CRC32_XFER ', () => {
    try {
      const m = mut.modelFind('CRC32_XFER');
      expect(m).not.toBeFalsy();

      const c = new mut.Crc(m);
      expect(c).not.toBeFalsy();
      expect(c.compute(data2))
        .toBe('37FE2B2A');
    } catch (e) {
      expect(true).toEqual(false);
    }
  });
});

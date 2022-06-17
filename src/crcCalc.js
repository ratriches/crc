/* eslint-disable no-bitwise */
/**
 * NOTE: codigo baseado em trechos de:
 * http://www.sunshine2k.de/coding/javascript/crc/crc_js.html (MIT license)
 */

const toHex8 = (v) => `${v.toString(16).padStart(2, '0')}`.toUpperCase();

const toHex16 = (v) => `${v.toString(16).padStart(4, '0')}`.toUpperCase();

const toHex32 = (v) => {
  const vH = v >>> 16;
  const vL = v & 0xFFFF;
  return `${vH.toString(16).padStart(4, '0')}${vL.toString(16).padStart(4, '0')}`.toUpperCase();
};

const Reflect8 = (val) => {
  let resByte = 0;
  for (let i = 0; i < 8; i += 1) {
    if ((val & (0x01 << i)) !== 0) {
      resByte |= (0x01 << (7 - i)) & 0xff;
    }
  }
  return resByte;
};

const ReflectGeneric = (val, width) => {
  let resByte = 0;
  for (let i = 0; i < width; i += 1) {
    if ((val & (1 << i)) !== 0) {
      resByte |= 1 << (width - 1 - i);
    }
  }
  return resByte;
};

const procInR = (v) => Reflect8(v & 0xff);

const procInN = (v) => (v & 0xff);

const CrcModel = (width, name, polynomial, initial, finalXor, inputReflected, resultReflected) => ({
  width,
  name: name.toUpperCase(),

  polynomial,
  initialVal: initial,
  finalXorVal: finalXor,

  inputReflected,
  resultReflected,
});

// exported
const modelCrcDatabase = [
  CrcModel(8, 'CRC8', 0x07, 0x00, 0x00, false, false),
  CrcModel(8, 'CRC8_SAE_J1850', 0x1d, 0xff, 0xff, false, false),
  CrcModel(8, 'CRC8_SAE_J1850_ZERO', 0x1d, 0x00, 0x00, false, false),
  CrcModel(8, 'CRC8_8H2F', 0x2f, 0xff, 0xff, false, false),
  CrcModel(8, 'CRC8_CDMA2000', 0x9b, 0xff, 0x00, false, false),
  CrcModel(8, 'CRC8_DARC', 0x39, 0x00, 0x00, true, true),
  CrcModel(8, 'CRC8_DVB_S2', 0xd5, 0x00, 0x00, false, false),
  CrcModel(8, 'CRC8_EBU', 0x1d, 0xff, 0x00, true, true),
  CrcModel(8, 'CRC8_ICODE', 0x1d, 0xfd, 0x00, false, false),
  CrcModel(8, 'CRC8_ITU', 0x07, 0x00, 0x55, false, false),
  CrcModel(8, 'CRC8_MAXIM', 0x31, 0x00, 0x00, true, true),
  CrcModel(8, 'CRC8_ROHC', 0x07, 0xff, 0x00, true, true),
  CrcModel(8, 'CRC8_WCDMA', 0x9b, 0x00, 0x00, true, true),

  CrcModel(16, 'CRC16_CCIT_ZERO', 0x1021, 0x0000, 0x0000, false, false),
  CrcModel(16, 'CRC16_ARC', 0x8005, 0x0000, 0x0000, true, true),
  CrcModel(16, 'CRC16_AUG_CCITT', 0x1021, 0x1d0f, 0x0000, false, false),
  CrcModel(16, 'CRC16_BUYPASS', 0x8005, 0x0000, 0x0000, false, false),
  CrcModel(16, 'CRC16_CCITT_FALSE', 0x1021, 0xffff, 0x0000, false, false),
  CrcModel(16, 'CRC16_CDMA2000', 0xc867, 0xffff, 0x0000, false, false),
  CrcModel(16, 'CRC16_DDS_110', 0x8005, 0x800d, 0x0000, false, false),
  CrcModel(16, 'CRC16_DECT_R', 0x0589, 0x0000, 0x0001, false, false),
  CrcModel(16, 'CRC16_DECT_X', 0x0589, 0x0000, 0x0000, false, false),
  CrcModel(16, 'CRC16_DNP', 0x3d65, 0x0000, 0xffff, true, true),
  CrcModel(16, 'CRC16_EN_13757', 0x3d65, 0x0000, 0xffff, false, false),
  CrcModel(16, 'CRC16_GENIBUS', 0x1021, 0xffff, 0xffff, false, false),
  CrcModel(16, 'CRC16_MAXIM', 0x8005, 0x0000, 0xffff, true, true),
  CrcModel(16, 'CRC16_MCRF4XX', 0x1021, 0xffff, 0x0000, true, true),
  CrcModel(16, 'CRC16_RIELLO', 0x1021, 0xb2aa, 0x0000, true, true),
  CrcModel(16, 'CRC16_T10_DIF', 0x8bb7, 0x0000, 0x0000, false, false),
  CrcModel(16, 'CRC16_TELEDISK', 0xa097, 0x0000, 0x0000, false, false),
  CrcModel(16, 'CRC16_TMS37157', 0x1021, 0x89ec, 0x0000, true, true),
  CrcModel(16, 'CRC16_USB', 0x8005, 0xffff, 0xffff, true, true),
  CrcModel(16, 'CRC16_A', 0x1021, 0xc6c6, 0x0000, true, true),
  CrcModel(16, 'CRC16_KERMIT', 0x1021, 0x0000, 0x0000, true, true),
  CrcModel(16, 'CRC16_MODBUS', 0x8005, 0xffff, 0x0000, true, true),
  CrcModel(16, 'CRC16_X_25', 0x1021, 0xffff, 0xffff, true, true),
  CrcModel(16, 'CRC16_XMODEM', 0x1021, 0x0000, 0x0000, false, false),

  CrcModel(32, 'CRC32', 0x04c11db7, 0xffffffff, 0xffffffff, true, true),
  CrcModel(32, 'CRC32_BZIP2', 0x04c11db7, 0xffffffff, 0xffffffff, false, false),
  CrcModel(32, 'CRC32_C', 0x1edc6f41, 0xffffffff, 0xffffffff, true, true),
  CrcModel(32, 'CRC32_D', 0xa833982b, 0xffffffff, 0xffffffff, true, true),
  CrcModel(32, 'CRC32_MPEG2', 0x04c11db7, 0xffffffff, 0x00000000, false, false),
  CrcModel(32, 'CRC32_POSIX', 0x04c11db7, 0x00000000, 0xffffffff, false, false),
  CrcModel(32, 'CRC32_Q', 0x814141ab, 0x00000000, 0x00000000, false, false),
  CrcModel(32, 'CRC32_JAMCRC', 0x04c11db7, 0xffffffff, 0x00000000, true, true),
  CrcModel(32, 'CRC32_XFER', 0x000000af, 0x00000000, 0x00000000, false, false),
];

const modelFind = (name) => modelCrcDatabase.find((e) => e.name === name.toUpperCase());

class Crc {
  constructor(widthOrModel, polynomial, initialVal, finalXorVal, inputReflected, resultReflected) {
    if (!widthOrModel) {
      throw new Error('Invalid CRC params');
    }

    if (typeof widthOrModel === 'object') {
      const m = widthOrModel;
      this.polynomial = m?.polynomial;
      this.initialVal = m?.initialVal || 0;
      this.finalXorVal = m?.finalXorVal || 0;
      this.inputReflected = !!m?.inputReflected || false;
      this.resultReflected = !!m?.resultReflected || false;
      this.width = m?.width;
    } else {
      this.polynomial = polynomial;
      this.initialVal = initialVal || 0;
      this.finalXorVal = finalXorVal || 0;
      this.inputReflected = !!inputReflected || false;
      this.resultReflected = !!resultReflected || false;
      this.width = widthOrModel;
    }

    if (!this.polynomial) {
      throw new Error('Invalid CRC polynomial');
    }

    this.msbMask = 0x01 << (this.width - 1);
    switch (this.width) {
      case 8:
        this.castMask = 0xff;
        this.procOut = toHex8;
        break;
      case 16:
        this.castMask = 0xffff;
        this.procOut = toHex16;
        break;
      case 32:
        this.castMask = 0xffffffff;
        this.procOut = toHex32;
        break;
      default:
        throw new Error('Invalid CRC width');
    }

    if (!this.crcTable) {
      this.calcCrcTable();
    }
  }

  calcCrcTable() { // lookup table
    this.crcTable = Array.from(
      { length: 256 },
      (_v, divident) => {
        let currByte = (divident << (this.width - 8)) & this.castMask;
        for (let bit = 0; bit < 8; bit += 1) {
          if ((currByte & this.msbMask) !== 0) {
            currByte <<= 1;
            currByte ^= this.polynomial;
          } else {
            currByte <<= 1;
          }
        }
        return (currByte & this.castMask);
      },
    );
  }

  calcCrcTableReversed() { // reverse lookup table
    this.crcTable = Array.from(
      { length: 256 },
      (_v, divident) => {
        const reflectedDivident = Reflect8(divident);
        let currByte = (reflectedDivident << (this.width - 8)) & this.castMask;

        for (let bit = 0; bit < 8; bit += 1) {
          if ((currByte & this.msbMask) !== 0) {
            currByte <<= 1;
            currByte ^= this.polynomial;
          } else {
            currByte <<= 1;
          }
        }
        return (ReflectGeneric(currByte, this.width) & this.castMask);
      },
    );
  }

  compute(bytes_) {
    const procIn = this.inputReflected ? procInR : procInN;
    let crc = this.initialVal & this.castMask;

    for (let i = 0; i < bytes_.length; i += 1) {
      /* update the MSB of crc value with next input byte */
      crc = (crc ^ (procIn(bytes_.charCodeAt(i)) << (this.width - 8))) & this.castMask;
      /* this MSB byte value is the index into the lookup table */
      const pos = (crc >> (this.width - 8)) & 0xff;
      /* shift out this index */
      crc = (crc << 8) & this.castMask;
      /* XOR-in remainder from lookup table using the calculated index */
      crc = (crc ^ this.crcTable[pos]) & this.castMask;
    }

    if (this.resultReflected) {
      crc = ReflectGeneric(crc, this.width);
    }
    return this.procOut((crc ^ this.finalXorVal) & this.castMask);
  }

  getLookupTable() {
    return this.crcTable;
  }
}

module.exports = {
  Crc,
  modelCrcDatabase,
  modelFind,
};

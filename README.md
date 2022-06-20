# crc calculate (8, 16, 32 bits witdh)

Implementation of CRC algorithm in JS (for nodejs).
Supports 8, 16 and 32 bits witdh

## Installation

```bash
$ npm i @ratriches/crc
or,
$ npm i https://github.com/ratriches/crc
```

## Usage

Code example:

```js
const { Crc, modelFind } = require('@ratriches/crc');

// predefined model
const m = modelFind('CRC16_KERMIT');
const c1 = new Crc(m);
console.log('tests 1');
console.log('1234567890', c1.compute('1234567890')); // 286B

// user defined model
const c2 = new Crc(16, 0x8005, 0x0102, 0xf00f, false, true);
console.log('tests 2');
console.log('1234567890', c2.compute('1234567890')); // 3E6F
```

CRC8 predefined models:
- CRC8, CRC8_SAE_J1850, CRC8_SAE_J1850_ZERO, CRC8_8H2F, CRC8_CDMA2000, CRC8_DARC, CRC8_DVB_S2, CRC8_EBU, CRC8_ICODE, CRC8_ITU, CRC8_MAXIM, CRC8_ROHC, CRC8_WCDMA

CRC16 predefined models:
- CRC16_CCIT_ZERO, CRC16_ARC, CRC16_AUG_CCITT, CRC16_BUYPASS, CRC16_CCITT_FALSE,
CRC16_CDMA2000, CRC16_DDS_110, CRC16_DECT_R, CRC16_DECT_X, CRC16_DNP, CRC16_EN_13757, CRC16_GENIBUS, CRC16_MAXIM, CRC16_MCRF4XX, CRC16_RIELLO, CRC16_T10_DIF, CRC16_TELEDISK, CRC16_TMS37157, CRC16_USB, CRC16_A, CRC16_KERMIT, CRC16_MODBUS, CRC16_X_25, CRC16_XMODEM, 

CRC32 predefined models:
- CRC32, CRC32_BZIP2, CRC32_C, CRC32_D, CRC32_MPEG2, CRC32_POSIX, CRC32_Q, CRC32_JAMCRC, CRC32_XFER, 

## License

Please consult the attached LICENSE file for details. 

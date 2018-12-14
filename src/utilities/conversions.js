import { BigNumber } from 'bignumber.js';

BigNumber.config({ ERRORS: false });

export const fromRawLsk = (value) => {
  const bgValue = new BigNumber(value || 0);
  const factor = new BigNumber(10).pow(8);
  const result = bgValue.dividedBy(factor).toFixed();
  return result;
};

export const toRawLsk = (value) => {
  const factor = new BigNumber(10).pow(8);
  const rawValue = new BigNumber(value);
  const bgRaw = rawValue.multipliedBy(factor);
  return bgRaw.toFixed(0);
};

export const includeFee = (value, fee) => {
  const factor = new BigNumber(10).pow(8);
  const rawValue = new BigNumber(value * factor);
  const bigFee = new BigNumber(fee);
  return fromRawLsk(rawValue.plus(bigFee));
};

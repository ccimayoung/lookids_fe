/* eslint-disable indent */

/**
 *
 * @param {number} price
 */

export default function withCommas(p) {
  if (!p) return '0';
  const price = p.toString()?.replace(',', '');
  return Math.round(price)
    .toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

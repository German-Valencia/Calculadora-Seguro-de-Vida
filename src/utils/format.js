export const formatCurrency = (value, currency = 'COP') => {
  if (value === undefined || value === null || value === '') return '$0';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value);
};

export const parseNumber = (value) => {
  if (typeof value === 'number') return value;
  if (!value) return '';
  // Remove non-numeric chars except dot/comma if needed, but usually we use input type number
  return parseFloat(value) || 0;
};

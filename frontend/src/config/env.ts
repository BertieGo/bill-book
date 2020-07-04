const isProduction = process.env.NODE_ENV === 'production';

export const HOST = isProduction ? '' : 'http://localhost:8800';


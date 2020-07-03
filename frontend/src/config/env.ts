const isProduction = process.env.NODE_ENV === 'production';

console.log(process.env.NODE_ENV)
export const HOST = isProduction ? '' : 'http://localhost:8800';


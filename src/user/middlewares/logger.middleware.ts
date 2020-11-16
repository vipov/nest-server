
export function logger(req, res, next) {
  // console.log(`Request: `, req.url);
  next();
}

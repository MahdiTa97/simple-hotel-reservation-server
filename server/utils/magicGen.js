function magicGen(cond, params) {
  let query = Object.keys(params)
    .filter((k) => params[k] !== undefined)
    .map((k) => {
      if (params[k]) return k + "=" + `'${params[k]}'`;
      else return;
    })
    .join(",");
  if (query) return `${cond} ${query}`;
  else return "";
}
exports.magicGen = magicGen;

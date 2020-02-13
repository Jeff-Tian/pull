export const promisify = (fn: (...args: any) => any) => async (...args: any): Promise<any> =>
  new Promise((resolve, reject) =>
    fn(...args, (err: any, res: any) => (err ? reject(err) : resolve(res)))
  );

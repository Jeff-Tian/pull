export const promisify = (fn: Function) => async (...args: any): Promise<any> =>
  new Promise((resolve, reject) =>
    fn(...args, (err: any, res: any) => (err ? reject(err) : resolve(res)))
  );

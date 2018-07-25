import { ncp } from 'ncp';

function copy (src, dest) {
  return new Promise((resolve, reject) => {
    ncp(src, dest, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export default copy

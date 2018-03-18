const queryStringify = (data) =>
  Object.keys(data).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&');
/**
 * This is a wrapper over react native fetch Api
 * Which returns a promise to be easily used in actions and middlewares
 * Any normalization of data transfer, error code or headers shall be
 * implemented in this method.
 *
 * @param {String} path - relative path of the endpoint
 *  This method adds http://localhost:5000 to the beginning
 * @param {Object} data - A key-value pair of payload data
 * @param {String?} method - GET/POST/UPDATE/DELETE
 * 
 * @returns {Promise} The HTTP call promise
 */
function Http (path, data, method='GET') {
  let url;
  let options = {};
  let payload;
  if (typeof method === 'string' && method !== 'GET') {
    url = `http://localhost:5000${path}`;
    payload = JSON.stringify(data);
    return fetch(
      url, {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: payload
    }).then(res => res.json());
  } else {
    const params = queryStringify(data);
    url = `http://localhost:5000${path}?${params}`;
    payload = JSON.stringify({});
    return fetch(
      url, {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
    }).then(res => res.json());
  }
}

/**
 * Returns a promise to fetch the details of a
 * given Lisk ID (address)
 *
 * @param {String} address - Lisk ID
 * @returns {Promise} The HTTP call promise
 */
export const getAccount = (address) =>
  Http('/getAccount', { address });

/**
 * Returns a promise to fetch the address from given passphrase
 * or publicKey
 *
 * @todo This is temporary and must be removed after Lisk elements
 * is injected to this project
 *
 * @param {String} key - A valid Passphrase or PublicKey
 * @returns {Promise} The HTTP call promise
 */
export const extractAddress = (key) =>
  // Http('/address', { key });
  '6307319849853921018L';

/**
 * Gets the list of transactions for a given filtering config
 *
 * @param {Object} data
 * @param {String?} data.senderId - A valid Lisk ID to filter the senderID
 * @param {String?} data.recipientId - A valid Lisk ID to filter the recipientId
 * @param {Number?} limit - defaults on 25
 * @param {Number?} offset - defaults on 0
 * @param {String?} orderBy - defaults on timestamp:desc
 *
 * @returns {Promise} The HTTP call promise
 */
export const getTransactions = (data) => {
  const params = Object.assign({
    limit: 25,
    offset: 0,
    orderBy: 'timestamp:desc'
  }, data);
  if (!params.senderId) {
    delete params.senderId
  }

  if (!params.recipientId) {
    delete params.recipientId
  }

  return Http('/transactions', params);
}
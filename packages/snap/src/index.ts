import { OnRpcRequestHandler } from '@metamask/snap-types';
import cryptico from "cryptico-ts-fix"

/**
 * Get a message from the origin. For demonstration purposes only.
 *
 * @param originString - The origin string.
 * @returns A message based on the origin.
 */
export const getMessage = (originString: string): string =>
  `Hello, ${originString}!`;

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns `null` if the request succeeded.
 * @throws If the request method is not valid for this snap.
 * @throws If the `snap_confirm` call failed.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  switch (request.method) {
    case 'getUserKeys': {
      const PRIVATE_KEY = await wallet.request({
        method: 'snap_getAppKey',
      }) 

      const rsaKey = cryptico.generateRSAKey(PRIVATE_KEY, 1028);
      const publicKey = cryptico.publicKeyString(rsaKey);

      return {publicKey, privateKey: PRIVATE_KEY};
    }
    default:
      throw new Error('Method not found.');
  }
};
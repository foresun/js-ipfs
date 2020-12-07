'use strict'

const first = require('it-first')
const bidiToDuplex = require('./bidi-to-duplex')

/**
 * @param {object} grpc - an @improbable-eng/grpc-web instance
 * @param {object} service - an @improbable-eng/grpc-web service
 * @param {object} request - a request object
 * @param {object} options - RPC options
 * @param {string} options.host - The remote host
 * @param {boolean} [options.debug] - Whether to print debug messages
 * @param {object} [options.metadata] - Metadata sent as headers
 * @returns {Promise<Object>} - A promise that resolves to a response object
 **/
module.exports = function unaryToPromise (grpc, service, request, options) {
  const {
    source, sink
  } = bidiToDuplex(grpc, service, options)

  source.push(request)

  return first(sink)
}
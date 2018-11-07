const run = async () => {

  const ipfsAPI = require('ipfs-api')

  // Upload direct to IPFS API port 5001
  const settingsObject = {
    host: 'ipfs',
    port: 5001,
    protocol: 'http'
  }

  const ipfs = ipfsAPI(settingsObject)
  console.log("-----------------")
  console.log("Uploading direct to IPFS API port 5001...")
  const hashes3 = await ipfs.util.addFromFs('./upload', { recursive: true })
  console.log("Success")
  console.log("hashes:" + JSON.stringify(hashes3))


  //Upload via nginx proxy to IPFS API
  const proxySettingsObject = {
    host: 'nginx',
    port: 80,
    protocol: 'http'
  }

  const ipfsProxy = ipfsAPI(proxySettingsObject)
  console.log("-----------------")
  console.log("Uploading via nginx proxy to IPFS API. This should stall and eventually timeout...")
  const hashes3_proxy = await ipfsProxy.util.addFromFs('./upload', { recursive: true})
  console.log("Success")
  console.log("hashes:" + JSON.stringify(hashes3_proxy))
}

run()

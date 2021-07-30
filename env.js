// Structure:
// [environmentVariable, default, required?]
const ENV_VARS = {
  INFURA_URL : [
    process.env.INFURA_URL,
    'YOUR_INFURA_URL',
    true,
  ],
  MNEMONIC: [
    process.env.MNEOMIC,
    'YOUR_MNEMONIC_PHRASE',
    true,
  ],
  ETHERSCAN_API_KEY: [
    process.env.ETHERSCAN_API_KEY,
    'YOUR_ETHERSCAN_API_KEY',
    true,
  ]
}

function environment(name) {
  const envVar = ENV_VARS[name]
  if (!envVar) {
    return null
  }
  // If the environment variable is required and has not been properly set,
  // throw an error.
  if (envVar === ENV_VARS[name][1] && ENV_VARS[name][2]) {
    throw new EnvironmentError(
      `The environment variable with name ${name} has not been set properly. Please edit it on the heroku config vars.`,
    )
  }

  return envVar[0] === undefined ? envVar[1] : envVar[0].trim()
}

module.exports = { environment }

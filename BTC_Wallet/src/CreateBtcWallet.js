//Importando dependencias
const bip32 = require("bip32")
const bip39 = require("bip39")
const bitcoin = require("bitcoinjs-lib")

//Definindo a rede:
//Rede principal - mainnet
//Rede de testes - testnet
const network = bitcoin.networks.mainnet //Caso queira criar na rede teste, troque por testnet

const path = `m/49'/0'/0'/0` //Caso seja na testnet, troque por `m/49'/1'/0'/0`

let mnemonic = bip39.generateMnemonic() //Gerando conjunto de palavras
const seed = bip39.mnemonicToSeedSync(mnemonic)//Criando a SEED

let root = bip32.fromSeed(seed, network) //Raiz da wallet HD

let account = root.derivePath(path) //Criando par de cahves públicas e privadas
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("---------------------------------------------------------")
console.log("Carteira gerada com secesso!")

console.log(`Endereço: ${btcAddress}`)
console.log("Chave privada:", node.toWIF())
console.log(`Seed: ${mnemonic}`)
console.log()
console.log("---------------------------------------------------------")

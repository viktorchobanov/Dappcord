const { expect } = require("chai")

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
}

const NAME = "Dappcord"
const SYMBOL = "DC"

let Dappcord
let dappcord
let result
let deployer, user
let transaction

describe("Dappcord", function () {

    beforeEach(async () => {
        [deployer, user] = await ethers.getSigners()

        Dappcord = await ethers.getContractFactory(NAME)
        dappcord = await Dappcord.deploy(NAME, SYMBOL)

        transaction = await dappcord.connect(deployer).createChannel("general", tokens(1))
        await transaction.wait()
    })

    describe("Deployment", function () {
        it("Sets the name", async () => {
            result = await dappcord.name()
            expect(result).to.equal(NAME)
        })

        it("Sets the symbol", async () => {
            result = await dappcord.symbol()
            expect(result).to.equal(SYMBOL)
        })

        it("Sets the owner", async () => {
            result = await dappcord.owner()
            expect(result).to.equal(deployer.address)
        })
    })

    describe("Create channel", function () {
        it("Returns total channels", async () => {
            result = await dappcord.totalChannels()
            expect(result).to.equal(1)
        })

        it("Returns channel attributes", async () => {
            const channel = await dappcord.getChannel(1)
            expect(channel.id).to.be.equal(1)
            expect(channel.name).to.be.equal("general")
            expect(channel.cost).to.be.equal(tokens(1))
        })
    })

    describe("Joining channels", function () {
        const ID = 1
        const AMOUNT = tokens(1)

        this.beforeEach(async () => {
            const transaction = await dappcord.connect(user).mint(ID, { value: AMOUNT })
            await transaction.wait()
        })

        it("Joins channels", async () => {
            result = await dappcord.hasJoined(ID, user.address)
            expect(result).to.equal(true)
        })

        it("Increases total supply", async () => {
            result = await dappcord.totalSupply()
            expect(result).to.equal(ID)
        })

        it("Updates the contract balance", async () => {
            result = await ethers.provider.getBalance(dappcord.address)
            expect(result).to.equal(AMOUNT)
        })
    })
})
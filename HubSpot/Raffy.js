/**
 * `BankingSystem` interface.
 */
class BankingSystemInterface {
  constructor() {
    this.accounts = {}
  }

  /**
   * Should create a new account with the given identifier if it
   * does not already exist.
   * Returns `true` if the account was successfully created or
   * `false` if an account with `accountId` already exists.
   *
   * @param {number} timestamp
   * @param {string} accountId
   * @returns {boolean}
   */
  createAccount(timestamp, accountId) {
    // default implementation

    if (this.accounts[accountId]) {
      return false;
    } else {this.accounts[accountId] = { balance: 0, transaction: 0}


    }

    return true
  }

  /**
   * Should deposit the given `amount` of money to the specified
   * `accountId`.
   * Returns the total amount of money in the account after the
   * query has been processed.
   * If the specified account does not exist, should return
   * `null`.
   *
   * @param {number} timestamp
   * @param {string} accountId
   * @param {number} amount
   * @returns {number | null}
   */
  deposit(timestamp, accountId, amount) {
    if (!this.accounts[accountId]) return null // if it doesn't exist
    if (typeof amount !== 'number' || amount < 0) return null

    this.accounts[accountId].balance += amount
    // default implementatiion
    return this.accounts[accountId].balance
  }

  /**
   * Should transfer the given amount of money from account
   * `sourceAccountId` to account `targetAccountId`.
   * Returns the balance of `sourceAccountId` if the transfer was
   * successful or `null` otherwise.
   *   * Returns `null` if `sourceAccountId` or `targetAccountId`
   *   doesn't exist.
   *   * Returns `null` if `sourceAccountId` and `targetAccountId`
   *   are the same.
   *   * Returns `null` if account `sourceAccountId` has
   *   insufficient funds to perform the transfer.
   *
   * @param {number} timestamp
   * @param {string} sourceAccountId
   * @param {string} targetAccountId
   * @param {number} amount
   * @returns {number | null}
   */
  transfer(timestamp, sourceAccountId, targetAccountId, amount) {
    // return null if either accountId doesn't not exist
    if (!this.accounts[sourceAccountId] || !this.accounts[targetAccountId]) return null
    // return null if accounts is same
    if (sourceAccountId === targetAccountId) return null
    // return null if sourceAccountId has insufficent funds
    if (typeof amount !== "number" || amount <= 0) return null

    if (this.accounts[sourceAccountId].balance < amount) return null

    // if transfer completed, 
    this.accounts[targetAccountId].balance += amount
    this.accounts[targetAccountId].transaction += amount
    this.accounts[sourceAccountId].balance -= amount
    this.accounts[sourceAccountId].transaction += amount
        // return balance of source
        return this.accounts[sourceAccountId].balance
    // else return null - don't think I'll need, guardrails

    // default implementation
    // return null;
  }

  /**
   * Should return identifiers of the top `n` accounts with the
   * highest amount of outgoing transactions - the total amount
   * of money either transferred out of or paid/withdrawn (via
   * the **schedulePayment** operation which will be introduced
   * in level 3) - sorted in descending order, or in case of a
   * tie, sorted alphabetically by `accountId` in ascending
   * order.
   * The output should be a list of strings in the following
   * format: `["<accountId1>(<totalOutgoing1>)", "<accountId2>(<t
   * otalOutgoing2>)", ..., "<accountIdN>(<totalOutgoingN>)"]`.
   *   * If less than `n` accounts exist in the system, then return
   *   all their identifiers (in the described format).
   *
   * @param {number} timestamp
   * @param {number} n
   * @returns {string[]}
   */
  topSpenders(timestamp, n) {
    // return top n accounts with highest amount (money transferred out, or paid, withdrawn operation), 
    const entries = Object.entries(this.accounts)

    const sorted = entries.sort((a,b) => {
        const [idA, dataA] = a
        const [idB, dataB] = b

        if (dataA.transaction !== dataB.transaction) {
            return dataB.transaction - dataA.transaction;
        }

        // Tie-Breaker
        if (idA < idB) return -1 // goes in front - alpha
        if (idA > idB) return 1 // goes back - alpha
        return 0 // normal - prevents infinite loop
    })

    return sorted.slice(0,n).map(([id, data]) => `${id}(${data.transaction})`)
  }

  /**
   * Should schedule a payment which will be performed at
   * `timestamp + delay`.
   * Returns a string with a unique identifier for the scheduled
   * payment in the following format: `"payment[ordinal number of
   *  the scheduled payment across all accounts]"` - e.g.,
   * `"payment1"`, `"payment2"`, etc.
   * If `accountId` doesn't exist, should return `null`.
   * The payment is skipped if the specified account has
   * insufficient funds when the payment is performed.
   * Additional conditions:
   *   * Successful payments should be considered outgoing
   *   transactions and included when ranking accounts using the
   *   `topSpenders` operation.
   *   * Scheduled payments should be processed **before** any
   *   other transactions at the given timestamp.
   *   * If an account needs to perform several scheduled payments
   *   simultaneously, they should be processed in order of
   *   creation - e.g., `"payment1"` should be processed before
   *   `"payment2"`.
   *
   * @param {number} timestamp
   * @param {string} accountId
   * @param {number} amount
   * @param {number} delay
   * @returns {string | null}
   */
  schedulePayment(timestamp, accountId, amount, delay) {
    // if accountId does not exist, return null

    // maybe is skipped if insuffient funds when payment is performed

    // successful pmts included in topSpenders
    // schedule payment performed before other transaction at given timestamp


    // schedule pmt at timestamp + dealy

    // return string with unique identifer for sched pmt. 

    // default implementation
    return null;
  }

  /**
   * Should cancel the scheduled payment with `paymentId`.
   * Returns `true` if the scheduled payment is successfully
   * canceled.
   * If `paymentId` does not exist or was already canceled, or if
   * `accountId` is different from the source account for the
   * scheduled payment, returns `false`.
   * Note that scheduled payments must be performed before any
   * `cancelPayment` operations at the given timestamp.
   *
   * @param {number} timestamp
   * @param {string} accountId
   * @param {string} paymentId
   * @returns {boolean}
   */
  cancelPayment(timestamp, accountId, paymentId) {
    // default implementation
    return false;
  }
}

module.exports = BankingSystemInterface;




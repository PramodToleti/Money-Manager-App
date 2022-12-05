import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const initialMoneyDetailsList = [
  {
    id: 1,
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    type: 'Balance',
    heading: 'Your Wallet',
    money: 0,
    className: 'balance-card',
    testId: 'balanceAmount',
  },
  {
    id: 2,
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    type: 'Income',
    heading: 'Your Income',
    money: 0,
    className: 'income-card',
    testId: 'incomeAmount',
  },
  {
    id: 3,
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    type: 'Expenses',
    heading: 'Your Expenses',
    money: 0,
    className: 'expenses-card',
    testId: 'expensesAmount',
  },
]

class MoneyManager extends Component {
  state = {
    moneyDetailsList: initialMoneyDetailsList,
    title: '',
    amount: '',
    type: 'Income',
    transactionHistory: [],
  }

  onRemoveTransaction = (id, amount, type) => {
    const {transactionHistory} = this.state
    console.log(amount, type)
    const filteredTransactions = transactionHistory.filter(
      each => each.id !== id,
    )
    this.setState(prevState => ({
      transactionHistory: filteredTransactions,
      moneyDetailsList: prevState.moneyDetailsList.map(each => {
        if (each.type === 'Income' && type === 'Income') {
          return {...each, money: each.money - amount}
        }
        if (each.type === 'Balance' && type === 'Income') {
          return {...each, money: each.money - amount}
        }
        if (each.type === 'Expenses' && type === 'Expenses') {
          return {...each, money: each.money - amount}
        }
        if (each.type === 'Balance' && type === 'Expenses') {
          return {...each, money: each.money + parseInt(amount)}
        }
        return each
      }),
    }))
  }

  onChangeType = event => {
    this.setState({
      type: event.target.value,
    })
  }

  onChangeAmount = event => {
    this.setState({
      amount: event.target.value,
    })
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type,
    }
    if (type === 'Income') {
      this.setState(prevState => ({
        title: '',
        amount: '',
        type: 'Income',
        transactionHistory: [...prevState.transactionHistory, newTransaction],
        moneyDetailsList: prevState.moneyDetailsList.map(each => {
          if (each.type === 'Income') {
            return {...each, money: each.money + parseInt(amount)}
          }
          if (each.type === 'Balance') {
            return {...each, money: each.money + parseInt(amount)}
          }

          return each
        }),
      }))
    } else {
      this.setState(prevState => ({
        title: '',
        amount: '',
        type: 'Income',
        transactionHistory: [...prevState.transactionHistory, newTransaction],
        moneyDetailsList: prevState.moneyDetailsList.map(each => {
          if (each.type === 'Expenses') {
            return {...each, money: each.money + parseInt(amount)}
          }
          if (each.type === 'Balance') {
            return {...each, money: each.money - parseInt(amount)}
          }
          return each
        }),
      }))
    }
  }

  render() {
    const {
      moneyDetailsList,
      title,
      amount,
      type,
      transactionHistory,
    } = this.state

    return (
      <div className="bg-container">
        <div className="header">
          <img
            src="https://res.cloudinary.com/dlpgowt5s/image/upload/v1669731195/pablo-211_hzynu5.png"
            alt="pullImage"
            className="pull-image"
          />
          {/* Monet Manager Card */}
          <div className="money-manager-card">
            <h1 className="username">
              Hi, <span className="username-text">Pramod</span>
            </h1>
            <p className="welcome-text">
              Welcome back to your
              <span className="money-manager-text"> Money Manager</span>
            </p>
          </div>
        </div>

        {/* Monet Details Container */}
        <div className="money-details-container">
          {moneyDetailsList.map(each => (
            <MoneyDetails moneyDetails={each} key={each.id} />
          ))}
        </div>

        <div className="transaction-history-container">
          {/* Transaction Container */}
          <div className="transaction-container">
            <form className="transaction-form" onSubmit={this.onAddTransaction}>
              <h1 className="add-transaction-heading">Add Transaction</h1>
              <label htmlFor="titleInput" className="label-text">
                TITLE
              </label>
              <br />
              <input
                type="text"
                id="titleInput"
                placeholder="TITLE"
                value={title}
                className="input-bar"
                onChange={this.onChangeTitle}
              />
              <label htmlFor="amountInput" className="label-text">
                AMOUNT
              </label>
              <br />
              <input
                type="text"
                id="amountInput"
                placeholder="AMOUNT"
                value={amount}
                className="input-bar"
                onChange={this.onChangeAmount}
              />
              <label htmlFor="typeInput" className="label-text">
                TITLE
              </label>
              <br />
              <select
                id="typeInput"
                onChange={this.onChangeType}
                className="input-bar"
                value={type}
              >
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
              </select>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
          </div>

          {/* History Container */}
          <div className="history-container">
            <div className="history-body">
              <h1 className="history-heading">History</h1>
              <div className="history-details-header-container">
                <div className="header-titles">
                  <h1 className="history-header-title">Title</h1>
                  <h1 className="history-header-title">Amount</h1>
                  <h1 className="history-header-title">Type</h1>
                </div>
              </div>
              <ul className="Transaction-item-container">
                {transactionHistory.length === 0 ? (
                  <div className="empty-container">
                    <img
                      src="https://res.cloudinary.com/dlpgowt5s/image/upload/v1669735134/pluto-137_awssvo.png"
                      alt="moneyIcon"
                      className="money-icon"
                    />
                    <div className="empty-body">
                      <img
                        src="https://res.cloudinary.com/dlpgowt5s/image/upload/v1669717330/sammy-thoughtful-man-with-empty-list_zcrw8d.png"
                        alt="empty"
                        className="empty-image"
                      />
                      <p className="empty-text">It's Empty Here...</p>
                    </div>
                  </div>
                ) : (
                  transactionHistory.map(each => (
                    <TransactionItem
                      transactionDetails={each}
                      key={each.id}
                      onRemoveTransaction={this.onRemoveTransaction}
                    />
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

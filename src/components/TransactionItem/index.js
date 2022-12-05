import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onRemoveTransaction} = props
  const {title, amount, type, id} = transactionDetails
  const transactionType = type === 'Income' ? 'income-style' : 'expenses-style'
  const onDeleteTransaction = () => {
    onRemoveTransaction(id, amount, type)
  }
  return (
    <div className="transaction-details">
      <p className="transaction-details-body">{title}</p>
      <p className={`transaction-details-body ${transactionType}`}>
        {'Rs '.concat(amount)}
      </p>
      <p className="transaction-details-body">{type}</p>
      <button
        type="button"
        className="delete-button"
        onClick={onDeleteTransaction}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </div>
  )
}

export default TransactionItem

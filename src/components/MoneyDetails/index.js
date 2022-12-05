import './index.css'

const MoneyDetails = props => {
  const {moneyDetails} = props
  const {imgUrl, type, heading, money, className, testId} = moneyDetails
  return (
    <div className={`money-details-card ${className}`}>
      <img src={imgUrl} alt={type} className="money-details-icon" />
      <div className="money-details">
        <p className="money-details-heading">{heading}</p>
        <p className="user-money">{'Rs '.concat(money)}</p>
      </div>
    </div>
  )
}

export default MoneyDetails

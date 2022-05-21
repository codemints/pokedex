const Toast = ({ message }) => {
  console.log(toast.show)
  return (
    <div className="toast__wrapper">
      <h2>{ message }</h2>
    </div>
  )
}

export default Toast
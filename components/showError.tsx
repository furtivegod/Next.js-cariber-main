interface ShowErrorProps {
  message: string
}

export default function ShowError({ message }: ShowErrorProps) {
  return (
    <div className="auth-message alert alert-danger">
      {message}
    </div>
  )
}

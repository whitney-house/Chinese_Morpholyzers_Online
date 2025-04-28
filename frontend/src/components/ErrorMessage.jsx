const ErrorMessage = ({ message }) => {
	return message ? <p className="text-red-500 text-center mt-2">{message}</p> : null;
  };
  
  export default ErrorMessage;
  
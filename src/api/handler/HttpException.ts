class HttpException extends Error {
  status?: number;
  message: string;
  constructor(message: string, status?: number) {
    super(message);
    if (status) {
      this.status = status;
    }
    this.message = message;
  }
}

export default HttpException;
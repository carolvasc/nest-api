export class FluntValidator {
  constructor(public errors: any[] = []) {}

  isRequired(value: string, message: string) {
    if (!value || value.length <= 0) {
      this.errors.push(message);
    }
  }

  hasMinLen(value: string, min: number, message: string) {
    if (!value || value.length < min) {
      this.errors.push(message);
    }
  }

  hasMaxLen(value: string, max: number, message: string) {
    if (!value || value.length > max) {
      this.errors.push(message);
    }
  }

  isFixedLen(value: string, len: number, message: string) {
    if (value.length !== len) {
      this.errors.push(message);
    }
  }

  isEmail(value: string, message: string) {
    const reg = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!reg.test(value)) {
      this.errors.push(message);
    }
  }

  clear() {
    this.errors = [];
  }

  isValid() {
    return this.errors.length === 0;
  }
}

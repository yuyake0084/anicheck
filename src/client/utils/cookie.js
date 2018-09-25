/* @flow */

import cookie from 'js-cookie';

class Cookie {
  constructor() {
    this.cookie = cookie;
    this.keys = {
      favorites: '__favorites__',
    };
  }

  setValue(value: string) {
    this.cookie.set(this.keys.favorites, value, this.options);
  }

  getValue(): string {
    return this.cookie.getJSON(this.keys.favorites);
  }
}

export default new Cookie();

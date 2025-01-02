class Api {
    constructor({ address, token, groupId }) {
      // стандартная реализация -- объект options
      this._token = token;
      this._groupId = groupId;
      this._address = address;
  
      this.BASE_URL = 'https://auth.nomoreparties.co';
      // Запросы в примере работы выполняются к старому Api, в новом URL изменены.
    }
  
    getUserInfo() {
      return fetch(`${this._address}/${this._groupId}/users/me`, {
        headers: {
          authorization: this._token,
        },
      })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }
  
    setUserInfo({ name, about }) {
      return fetch(`${this._address}/${this._groupId}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          about,
        }),
      })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }
  
    setUserAvatar({ avatar }) {
      return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar,
        }),
      })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }


    getResponse (res)  {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    register  (email, password)  {
      return fetch(`${this.BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      .then(this.getResponse)
    };
    login (email, password)  {
      return fetch(`${this.BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      .then(this.getResponse)
      .then((data) => {
        localStorage.setItem('jwt', data.token)
        return data;
      })
    };

  }
  
  const api = new Api({
    address: 'https://nomoreparties.co',
    groupId: `cohort0`,
    token: `80a75492-21c5-4330-a02f-308029e94b63`,
  });
  
  export default api;
  
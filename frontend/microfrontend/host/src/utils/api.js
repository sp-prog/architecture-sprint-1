class Api {
    constructor({address, token, groupId}) {
        // стандартная реализация -- объект options
        this._token = token;
        this._groupId = groupId;
        this._address = address;

        // Запросы в примере работы выполняются к старому Api, в новом URL изменены.
    }

    getResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    checkToken(token) {
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(this.getResponse)
    }
}

const api = new Api({
    address: 'https://nomoreparties.co',
    groupId: `cohort0`,
    token: `80a75492-21c5-4330-a02f-308029e94b63`,
});

export default api;

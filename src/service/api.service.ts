export class ApiService {
  url = 'http://localhost/api'
  async get(uri: string): Promise<any> {
    const response = await fetch(`${this.url}/` + uri, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    const responseJson = response.json();
    if (response.status !== 200) {
      throw new Error('Erro')
    }
    return responseJson
  }
  async post(uri: string, data: object):  Promise<any> {
    const response = await fetch(`${this.url}/` + uri, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })

    const responseJson = response.json();
    if (response.status !== 201) {
      throw new Error('Erro')
    }
    return responseJson
  }
  async put(uri: string, data: object):  Promise<any> {
    const response = await fetch(`${this.url}/` + uri, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(data)
    })

    const responseJson = response.json();
    if (response.status !== 200) {
      throw new Error('Erro')
    }
    return responseJson
  }
  async delete(uri: string):  Promise<any> {
    const response = await fetch(`${this.url}/` + uri, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })

    const responseJson = response.json();
    if (response.status !== 200) {
      throw new Error('Erro')
    }
    return responseJson
  }
}

import requests

API_URL = "http://localhost:3000/api/"
ACCOUNT_URL = API_URL + "accounts/"
PERMISSION_URL = API_URL + "permissions/"
GROUP_URL = API_URL + "groups/"


def make_post(url, data):
    response = requests.post(url, json=data)
    print(response.content)
    return response.json()


def make_account(firstName, lastName, email):
    return make_post(
        ACCOUNT_URL,
        {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
        }
    )


def make_permission(account_id, name):
    return make_post(
        PERMISSION_URL,
        {
            "account": account_id,
            "name": name
        }
    )


def make_group(name):
    return make_post(
        GROUP_URL,
        {
            "name": name
        }
    )


# account = make_account("Kevin", "Schoonover", "ksyh3@mst.edu")
# print(account)
account = {"id": "a64aae0a-ae2b-411b-afd0-8c2c77dd640a"}
permission = make_permission(account.get("id"), "test")
print(permission)
group = make_group("test")
print(group)

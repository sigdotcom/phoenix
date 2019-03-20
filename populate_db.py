import requests

USER_ID = "74a65c12-86ad-4ffd-a463-27ec8ccefd27"
BEARER_TOKEN = "08e7768e-0ef8-477a-9ff9-f35fe25a1fb8"

API_BASE_URL = "http://localhost/api/v1/"
PRODUCT_URL = API_BASE_URL + "products/"
APPLICATION_URL = API_BASE_URL + "accounts/" + USER_ID + "/applications/"


def make_request(type, url, json=None):
    request = getattr(requests, type)
    if json:
        return request(
            url, json, headers={"Authorization": "Bearer " + BEARER_TOKEN})
    else:
        return request(
            url, headers={"Authorization": "Bearer " + BEARER_TOKEN})


def create_application(name):
    return make_request("post", APPLICATION_URL, json={"name": name})


def create_product(name, description, price):
    return make_request(
        "post",
        PRODUCT_URL,
        json={
            "name": name,
            "description": description,
            "price": price
        })


def create_transaction():
    response = create_product("test", "test", 10.10)
    product_id = response.json().get("id")
    transaction_url = PRODUCT_URL + product_id + "/transactions/"

    return make_request("post", transaction_url, json={"token": "tok_visa"})


# Creating an application
# response = create_application("test")
# print(response.json())

# Creating a product
# response = create_product(
#   "ACM Semesterly Membership",
#   "ACM Semesterly Membership",
#   20.20
# )
# print(response.json())

# Creating a transaction
response = create_transaction()
print(response.json())

# **_Flashcards API with Node.js_**

# **Stack** 💻

-   _Express_
-   _MySQL_
-   _Sequelize_
-   _Bcrypt_
-   _JWT_
-   _Joi_

---

# **Routes**

## BaseURL: **`http://localhost:5000/`**

## **Authentication** 🔐

        REGISTER - POST
        ENDPOINT: /api/auth/register
        BODY: name, email, password

        LOGIN - POST
        /auth/login
        BODY: email, password

## **Collections** 🗃️

        CREATE - POST
        ENDPOINT: /api/collection/create
        BODY: name, category, description, public

        GET ALL - GET
        ENDPOINT: /api/collection

        GET FULL (WITH QUESTIONS) - GET
        ENDPOINT: /api/collection/:collectionId

        DELETE - DELETE
        ENDPOINT: /api/collection/:collectionId

        UPDATE - PUT
        ENDPOINT: /api/collection/:collectionId

## **Questions** 🙋

        CREATE - POST
        ENDPOINT: /api/question/create/:collectionId
        BODY: question, answer

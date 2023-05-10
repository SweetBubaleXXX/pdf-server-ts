## Configuration

Example of `.env` file:

```bash
AUTH_SECRET=  # Required!
TOKEN_EXPIRE_TIME=  # Seconds, default 36000
DB_HOST=  # Default "localhost"
DB_NAME=
DB_ROOT_PASS=
DB_USER=
DB_PASS=
PORT=
```

## API

* `POST /admin/signup`

* `POST /admin/signin`

* `POST /users` *to create user*

* `GET /users/all`

* `GET /users/:id`

* `PATCH /users/:id`

* `DELETE /users/:id`

* `POST /users/:id/image`

* `GET /users/:id/pdf`

* `POST /users/pdf` *to generate pdf*

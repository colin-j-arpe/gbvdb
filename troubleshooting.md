## Database access

### `role does not exist` error

If attempting to access the docker DB via a DB client you get this error:
```
FATAL: role "colin" does not exist
```
you need to create the user.
1. Log in to the DB via the command line using the username `postgres`:
```bash
$ psql -h <local ip> -U postgres
```
2. Add yourself as a superuser:
```bash
postgres=# CREATE ROLE "colin" superuser;
```
The Postgres CLI should respond to a successful execution by echoing the command without the arguments:
```bash
CREATE ROLE
```
3. Grant your new role login privileges:
```bash
postgres=# ALTER ROLE "colin" WITH LOGIN;
```

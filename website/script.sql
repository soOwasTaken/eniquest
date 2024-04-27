
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------

----- install postgre  -----
   https://www.postgresql.org/download/



--run postgre with
   sudo service postgresql start


-------------postgre interface-----------
sudo -i -u postgres
 psql


-------------- check that you are online 
service postgresql status

--------------COMMANDS THAT COULD HELP CREATING DATABASE, TABLES, GRANT PRIVILIGEES -------------
CREATE DATABASE database_name;

CREATE USER username WITH PASSWORD 'password';  --WITH THE QUOTES---

GRANT ALL PRIVILEGES ON DATABASE database_name TO username;

-- Create the 'users' table
CREATE TABLE users (
    id VARCHAR(10) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    verified BOOLEAN NOT NULL,
    level INTEGER NOT NULL,
    loggedin BOOLEAN NOT NULL,
    wantsUpdate BOOLEAN
);

--- add privileges to users tables
GRANT ALL PRIVILEGES ON TABLE users TO username;

---check the privileges 
SELECT grantee, table_name, privilege_type
FROM information_schema.table_privileges
WHERE table_name = 'users';

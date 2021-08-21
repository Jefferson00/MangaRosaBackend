<h2 align="center">
 Backend
</h2>

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-brightgreen">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Jefferson00/lovepetswebbeta">
  <a href="https://www.linkedin.com/in/jefferson-c-silva-aa1b7b1a9/">
    <img alt="Made by Jefferson" src="https://img.shields.io/badge/made%20by-Jefferson-blue">
  </a>
</p>

## 🚀 Tecnologias

- [Nest](https://github.com/nestjs/nest)
- [MySQL](https://www.mysql.com/)

## ℹ️ How To Use

Primeiro, tenha o ambiente [MySql instalado](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-install.html). 

```bash
#Create database
$ mysql> create database if not exists mangarosa_db;

#Create user
$ mysql> create user 'mangarosa_db'@'localhost' identified by 'mangarosa_db_password';

#Grant user all privileges to database created above
$ mysql> grant all privileges on mangarosa_db.* to 'mangarosa_db'@'localhost';

```

```bash
# Clone this repository
$ git clone https://github.com/Jefferson00/MangaRosaBackend.git

# Go into the repository
$ cd mangarosabackend

# Install dependencies
$ yarn install or npm install

# Create the .env file with
$ ADMIN_PASSWORD=
$ SECRET_JWT=
$ PORT=3333

#Run Migrations
$ yarn typeorm migration:run

# Run
# development
$ yarn start or npm run start

# watch mode
$ yarn start:dev or npm run start:dev

# production mode
$ yarn start:prod or npm run start:prod

```

Made with ♥ by Jefferson C Silva :wave: [Get in touch!](https://www.linkedin.com/in/jefferson-c-silva)

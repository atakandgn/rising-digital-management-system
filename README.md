# Rising Digital Management System

## Overview
Rising Digital Management System is a NestJS based project for managing services and orders with user authentication. This project shows you how to apply modularity, authentication, and CRUD operations using NestJS, Sequelize, and SQLite.

## Features
- User Registration and Authentication
- JWT-based Authorization
- CRUD Operations for Services
- Order Management with Balance Check
- Pagination and Filtering for Services
- Comprehensive Error Handling

## Technologies Used
- [NestJS](https://nestjs.com/)
- [Sequelize](https://sequelize.org/)
- [SQLite](https://www.sqlite.org/index.html)
- [Passport](http://www.passportjs.org/) and [JWT](https://jwt.io/) for authentication
- [Jest](https://jestjs.io/) for testing

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/atakandgn/rising-digital-management-system.git
    cd rising-digital-management-system
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```
    &
     ```bash
    yarn install
    ```

3. Run the migrations:
    ```bash
    npx sequelize-cli db:migrate
    ```

## Running the Application

1. Start the development server:
    ```bash
    npm run start:dev
    ```
    or
    ```bash
    yarn nest start --watch
    ```

2. The application will be running on `http://localhost:3000`.

## Running Tests

1. Run unit and e2e tests:
    ```bash
    npm run test
    npm run test:e2e
    ```

## API Endpoints

### Authentication

- **POST /auth/register**
  - Registers a new user.

- **POST /auth/login**
  - Logs in a user and returns a JWT.

### User

- **POST /users/add-balance**
  - Adds balance to the user's account (requires JWT).

- **DELETE /users/:id**
  - Deletes a user (requires JWT).

### Services

- **GET /services**
  - Retrieves all services with pagination and filtering (requires JWT).

- **POST /services/createNewService**
  - Creates a new service (requires JWT).

- **POST /services/updateService**
  - Updates an existing service (requires JWT).

- **DELETE /services/deleteService/:id**
  - Deletes a service (requires JWT).

### Orders

- **GET /orders**
  - Retrieves all orders with pagination and filtering for the logged-in user  (requires JWT).

- **POST /orders/create**
  - Creates a new order if the user has sufficient balance (requires JWT).

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## Contact
For questions or feedback, please reach out to:
- **GitHub**: [Atakan Doğan](https://github.com/atakandgn)
- **LinkedIn**: [Atakan Doğan](https://www.linkedin.com/in/atakandoan/)
- **Email**: [atakandogan.info@gmail.com](mailto:atakandogan.info@gmail.com)
- **Repository**: [GitHub Repository](https://github.com/atakandgn/rising-digital-management-system)

[![Send Email](https://img.shields.io/badge/Send%20Email-atakandogan.info%40gmail.com-blue)](mailto:atakandogan.info@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Atakan%20Doğan-blue)](https://www.linkedin.com/in/atakandoan/)

---

# Rising Digital Management System

## Genel Bakış
Rising Digital Management System, hizmetleri ve siparişleri kullanıcı kimlik doğrulaması ile yönetmek için NestJS tabanlı bir projedir. Bu proje, NestJS, Sequelize ve SQLite kullanarak modülerlik, kimlik doğrulama ve CRUD işlemlerinin nasıl uygulanacağını gösterir.

## Özellikler
- Kullanıcı Kaydı ve Kimlik Doğrulama
- JWT Tabanlı Yetkilendirme
- Hizmetler için CRUD İşlemleri
- Bakiye Kontrolü ile Sipariş Yönetimi
- Hizmetler için Sayfalama ve Filtreleme
- Kapsamlı Hata Yönetimi

## Kullanılan Teknolojiler
- [NestJS](https://nestjs.com/)
- [Sequelize](https://sequelize.org/)
- [SQLite](https://www.sqlite.org/index.html)
- [Passport](http://www.passportjs.org/) ve [JWT](https://jwt.io/) kimlik doğrulama için
- [Jest](https://jestjs.io/) testler için

## Kurulum

1. Depoyu klonlayın:
    ```bash
    git clone https://github.com/atakandgn/rising-digital-management-system.git
    cd rising-digital-management-system
    ```

2. Bağımlılıkları yükleyin:
     ```bash
    npm install
    ```
    veya

     ```bash
    yarn install
    ```

3. Migration işlemlerini çalıştırın:
    ```bash
    npx sequelize-cli db:migrate
    ```

## Uygulamayı Çalıştırma

1. Geliştirme sunucusunu başlatın:
    ```bash
    npm run start:dev
    ```
    veya
    
    ```bash
    yarn nest start --watch
    ```

2. Uygulama `http://localhost:3000` adresinde çalışıyor olacak.

## Testleri Çalıştırma

1. Birim ve uçtan uca testleri çalıştırın:
    ```bash
    npm run test
    npm run test:e2e
    ```

## API Uç Noktaları

### Kimlik Doğrulama

- **POST /auth/register**
  - Yeni bir kullanıcı kaydeder.

- **POST /auth/login**
  - Bir kullanıcıyı giriş yapar ve bir JWT döndürür.

### Kullanıcı

- **POST /users/add-balance**
  - Kullanıcının hesabına bakiye ekler (JWT gerektirir).

- **DELETE /users/:id**
  - Bir kullanıcıyı siler (JWT gerektirir).

### Hizmetler

- **GET /services**
  - Tüm hizmetleri sayfalama ve filtreleme ile birlikte getirir (JWT gerektirir).

- **POST /services/createNewService**
  - Yeni bir hizmet oluşturur (JWT gerektirir).

- **POST /services/updateService**
  - Mevcut bir hizmeti günceller (JWT gerektirir).

- **DELETE /services/deleteService/:id**
  - Bir hizmeti siler (JWT gerektirir).

### Siparişler

- **GET /orders**
  - Giriş yapmış kullanıcı için sayfalama ve filtreleme ile tüm siparişleri getirir (JWT gerektirir).

- **POST /orders/create**
  - Kullanıcının yeterli bakiyesi varsa yeni bir sipariş oluşturur (JWT gerektirir).

## Katkıda Bulunma

1. Depoyu fork edin.
2. Yeni bir dal oluşturun (`git checkout -b feature-branch`).
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik ekle'`).
4. Dalınızı push edin (`git push origin feature-branch`).
5. Yeni bir Pull Request oluşturun.

## İletişim
Sorularınız veya geri bildirimleriniz için lütfen iletişime geçin:
- **GitHub**: [Atakan Doğan](https://github.com/atakandgn)
- **LinkedIn**: [Atakan Doğan](https://www.linkedin.com/in/atakandoan/)
- **Email**: [atakandogan.info@gmail.com](mailto:atakandogan.info@gmail.com)
- **Repository**: [GitHub Repository](https://github.com/atakandgn/rising-digital-management-system)

[![E-posta Gönder](https://img.shields.io/badge/E--posta%20Gönder-atakandogan.info%40gmail.com-blue)](mailto:atakandogan.info@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Atakan%20Doğan-blue)](https://www.linkedin.com/in/atakandoan/)

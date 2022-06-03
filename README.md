# React + Bootstrap Theme SB-Admin

<img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3178C6.svg?&style=for-the-badge&logo=TypeScript&logoColor=white"/>
<img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white"/>
<img alt="Bootstrap" src ="https://img.shields.io/badge/Bootstrap-7952B3.svg?&style=for-the-badge&logo=Bootstrap&logoColor=white"/>

- [bootstrap-sb-admin](https://github.com/StartBootstrap/startbootstrap-sb-admin)
- react 17.0.0
    - @types/react 18.0.8
- react-bootstrap 2.3.1
    - @types/react-bootstrap 0.32.29
- react-redux 8.01
    - @types/react-redux 7.1.24
- redux 4.2.0
    - @types/redux 3.6.0

## Install

```shell

## nvm 설치
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

source ~/.bashrc

## v16.15.0 버전 node 설치
nvm install v16.15.0

## yarn 설치
npm install -g yarn

## git repository 다운
git clone https://{your-github-username}@github.com/testworksPF/nia-15-front.git

## 배포 스크립트 실행
./deploy.sh
## or sh ./deploy.sh
## 배포 스크립트는 react build 후, /var/www/front 폴더로 copy
```

### Configuration

- dotenv

```dotenv
# .env

 # Title에 반영됨
REACT_APP_NAME=NIA15

# api 도메인
REACT_APP_API_SERVER=http://nia15api.aiworks.co.kr
# DEV
# REACT_APP_API_SERVER=http://nia15dapi.aiworks.co.kr
 
# CORS 이슈 때문에 apache 프록시를 이용하여 같은 도메인으로 연결해야 한다.
REACT_APP_BAIKAL_NLP_HOST=/baikalai
REACT_APP_TMKOR_HOST=http://frame.tmkor.com
REACT_APP_TMKOR_TOKEN={auth_token}
```

- apache: http(000-default.conf)

```apacheconf
<VirtualHost *:80>
        ServerName nia15.aiworks.co.kr
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/front

        ErrorLog ${APACHE_LOG_DIR}/error_dev.log
        CustomLog ${APACHE_LOG_DIR}/access_dev.log combined

        proxyPass /baikalai http://localhost:5757/
        proxyPassReverse /baikalai http://localhost:5757/
</VirtualHost>
<VirtualHost *:80>
       
        ServerName nia15api.aiworks.co.kr
        ServerAdmin webmaster@localhost       
     
        ErrorLog ${APACHE_LOG_DIR}/error_dev.log
        CustomLog ${APACHE_LOG_DIR}/access_dev.log combined
   
        proxyPass / http://localhost:8080/
        proxyPassReverse / http://localhost:8080/
</VirtualHost>
```

- apache: ssl(default-ssl.conf)

```apacheconf
<IfModule mod_ssl.c>
        <VirtualHost _default_:443>
                ServerAdmin webmaster@localhost
                DocumentRoot /var/www/front
           
                ErrorLog ${APACHE_LOG_DIR}/error.log
                CustomLog ${APACHE_LOG_DIR}/access.log combined
             
                SSLEngine on            
                SSLCertificateFile      /etc/ssl/aiworks.crt
                SSLCertificateKeyFile   /etc/ssl/aiworks.key
                SSLCACertificateFile    /etc/ssl/aiworks_chain.pem
               
                <FilesMatch "\.(cgi|shtml|phtml|php)$">
                                SSLOptions +StdEnvVars
                </FilesMatch>
                <Directory /usr/lib/cgi-bin>
                                SSLOptions +StdEnvVars
                </Directory>
            
                proxyPass /baikalai/ http://localhost:5757/
                proxyPassReverse /baikalai/ http://localhost:5757/
        </VirtualHost>
        <VirtualHost *:443>
                ServerName nia15dapi.aiworks.co.kr
                ErrorLog ${APACHE_LOG_DIR}/error_dev.log
                CustomLog ${APACHE_LOG_DIR}/access_dev.log combined
                proxyPass / http://localhost:8080/
                proxyPassReverse / http://localhost:8080/
                SSLCertificateFile      /etc/ssl/aiworks.crt
                SSLCertificateKeyFile   /etc/ssl/aiworks.key
                SSLCACertificateFile    /etc/ssl/aiworks_chain.pem
        </VirtualHost>
</IfModule>
```

## Structure

> src 하위만 설명

### assets

> css, 이미지 등

- css
- images
- lang: 언어

### components

> 재사용 가능한 컴포넌트의 집합

- layouts: 기본 레이아웃 구성 요소
- common: 공통으로 사용 가능한 독립적인 컴포넌트의 집합
- modals: modal 컴포넌트의 집합

### config

> 설정 관련 ts파일

**설정할 값들이 많아질 수 있어 설정들을 목적에 맞게 분리하여 사용한다.**

- index.ts: config 루트파일, 분리된 설정 파일들을 모아서 해당 파일을 통해 접근
- layouts.ts: 레이아웃 설정 파일
- menu.ts: 메뉴 설정 파일

### pages

> 실질적인 View

**[pages](./src/pages/README.md)**

- 실제 페이지를 구현하기 위해 필요한 컴포넌트들의 집합

### routes

> 라우팅 관련

- Router.tsx: 기본 라우터

### store

> Redux

- reducers: action, reducer의 집합, ducks패턴
- middleware: redux middleware
- sagas: redux-saga
- store.ts: configuration store

### utils

> 기타 유틸리티

### helpers.ts

utils하위의 JS 함수들을 하나의 모듈로 생성하여 사용할 수 있게

- auth: 로그인 인증 관련
- guard: 조건에 따라 컴포넌트 렌더링 여부와 redirect여부를 선택할 수 있는 컴포넌트, 함수의 집합
- api: api 호출 관련 모듈
- config: config 파일 객체화

## Rule

### Basic

- 기본 변수 및 함수는 camelCase
- React 컴포넌트와 Class는 PascalCase
- 그 외, camelCase

### React

- React 컴포넌트 파일은 .tsx로 작성
- React 컴포넌트가 없는(리엑트 설치 안해도 실행 가능한) 파일은 .ts

### Redux

- Ducks 패턴 참조
- saga로직은 분리

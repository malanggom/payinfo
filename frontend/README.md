# 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 🛠️ 환경변수 설정 (.env)

이 프로젝트는 Oracle DB 및 서버 설정을 `.env` 파일로 관리합니다.  
개발자는 아래의 절차에 따라 `.env` 파일을 생성하고 설정해야 합니다.

### 1. `.env.example` 복사

먼저 템플릿 파일을 복사해 `.env` 파일을 생성하세요:

```bash
cp .env.example .env   # Unix/macOS
# 또는
copy .env.example .env  # Windows CMD
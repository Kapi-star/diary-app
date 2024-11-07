# Use the official Node.js image
FROM node:22

# 作業ディレクトリを /backend に設定
WORKDIR /backend

# package.json と package-lock.json をコピー
COPY package*.json ./

# tsconfig.json をコピー
COPY tsconfig.json ./

# 依存関係をインストール
RUN npm install

# NestJS プロジェクトをビルド
RUN npm run build

# コンパイル後の main.js を実行
CMD ["npm", "start"]

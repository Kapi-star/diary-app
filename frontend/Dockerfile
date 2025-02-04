# Use the official Node.js image
FROM node:22

# 作業ディレクトリを /frontend に設定
WORKDIR /frontend

# package.json と package-lock.json をコピー
COPY package*.json ./

# tsconfig.json をコピー
COPY tsconfig.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# NestJS プロジェクトをビルド
RUN npm run build

# コンパイル後の main.js を実行
CMD ["npm", "run", "dev"]

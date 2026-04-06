# 天気アプリ

React + TypeScript + Tailwind CSS で作成した天気アプリです。
OpenWeatherMap APIを使用して、リアルタイムの天気情報を取得します。

## 使用技術

- React 19
- TypeScript
- Tailwind CSS
- Vite
- OpenWeatherMap API

## 機能

- 都市名での天気検索
- 現在地の天気を自動取得（Geolocation API）
- 現在の天気表示（気温・体感温度・湿度・風速）
- 5日間の天気予報
- 検索履歴の表示（localStorageで保存）
- 天気に応じた背景色の変化

## 起動方法

### 1. OpenWeatherMap APIキーの取得

[OpenWeatherMap](https://openweathermap.org/api) でアカウントを作成し、APIキーを取得してください。

### 2. 環境変数の設定

ルートディレクトリに `.env` ファイルを作成し、以下を記述してください。
VITE_WEATHER_API_KEY=あなたのAPIキー

### 3. インストール・起動
```bash
npm install
npm run dev
```
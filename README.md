# protocol-buffer-sandbox

## 使い方

```sh
// セットアップ
npm ci

// Swagger UI の起動
docker compose up -d

// swagger ファイルの更新とコードの自動生成
npm run generate
```

## やっていること

- `protoc-gen-openapiv2` プラグインを使って、Protocol Buffer を Open API v2 の Spec に変換
- `openapi-generator-cli` を使って、Open API v2 の Spec を v3 へ変換
- orval を使って、API client とモックデータを生成

## 所感

- よかったところ
  - Protocol Buffer の書き味がいい
    - スキーマを書いているというより型を書いている感じに近い
  - Buf によるツールやプラグイン管理の手軽さなどがいい
    - protoc はそのまま使うと、渡す引数がたくさんになって辛いことがある
    - Buf ではそこらへんの定義を yaml でかけて、lint や format も提供してくれる
    - ただ、ここら辺は OpenAPI も
  - API クライアントや Mock データまで生成される
    - ここまで自動化できるとやはり嬉しいなという印象
- 気になるところ
  - OpenAPI 系のツールが v2 / v3 系でエコシステムが分断されている
    - ツール群もメンテされるものを選ばないとマイグレーションコストがかかりそう
  - Protocol Buffer を Open API に変換するツールが少ない
    - v3 系でちゃんとメンテされているものがなさそう
    - v2 系だと `protoc-gen-openapiv2` になるが、[v3 対応しなさそう](https://github.com/grpc-ecosystem/grpc-gateway/issues/441)

Open API の yaml を書くのが辛そうだが、最近だと [Spotlight](https://stoplight.io/) というツールを使うと GUI で編集できたりするらしく、こういったツールで解決はできそうかなという感じがしました。

## 参考資料

- https://github.com/grpc-ecosystem/grpc-gateway
  - `protoc-gen-openapiv2` が OpenAPI v2 Spec への変換ツール
- https://github.com/solo-io/protoc-gen-openapi
  - OpenAPI v3 Spec への変換ツール
- protoc-gen-openapiv2 を使ってみた系の日本語資料
  - [スキーマ定義言語 Protocol Buffers と protoc-gen-swagger を使って Web API のスキマを埋めよう](https://techblog.cartaholdings.co.jp/entry/protoc-gen-swagger)
  - [protoc-gen-openapiv2を使用したprotoから自動生成されるswaggerのカスタマイズ](https://qiita.com/a-kym/items/cadc6c951f8a41fda02c)
  - [gRPC-GatewayのAPIドキュメントを自動生成する](https://tech.yappli.io/entry/grpcgateway_swagger)
  - [ProtobufでREST APIを快適に開発する方法のご紹介](https://tech.tier4.jp/entry/2022/02/02/160000)
- https://orval.dev/
  - OpenAPI Spec から API Client と mock データを作成するツール

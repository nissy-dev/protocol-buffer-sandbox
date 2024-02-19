# protocol-buffer-sandbox

## 使い方

```sh
// セットアップ
npm ci

// Swagger UI の起動
docker compose up -d

// swagger ファイルの更新
npm run generate
```

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

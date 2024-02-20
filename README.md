# protocol-buffers-to-openapi-sandbox

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
- `orval` を使って、API client とモックデータを生成

## 所感

- よかったところ
  - Protocol Buffer の書き味がいい
    - スキーマを書いているというより型を書いている感じに近い
  - Buf によるツールやプラグイン管理の手軽さなどがいい
    - プラグインの option なども yaml でかける
      - protoc はそのまま使うと、コマンドライン引数がたくさんになって辛いことがある
    - linter や formatter も提供してくれる
  - モックデータも自動で生成できた
    - MSW や Jest と組み合わせやすそう (モックサーバーが生成されるより)
- 気になるところ
  - Protocol Buffer を Open API に変換するツールが少ない
    - v3 系でちゃんとメンテされているものがない
    - v2 系だと `protoc-gen-openapiv2` が良さそうに見えるが、[v3 対応しなさそう](https://github.com/grpc-ecosystem/grpc-gateway/issues/441)
  - OpenAPI 系のツールが v2 / v3 系でエコシステムが分断されている
    - ツール群もメンテされるものを選ばないとマイグレーションコストがかかりそう
    - コード生成系のツールで良さそうなものは、v3 対応しかしてない場合もある
    - v3 の方が Swagger UI で生成される API docs の UI も良かった
  - 変換のために扱うツールが増える
    - 最初から Open API Spec を書いていれば、`orval` をインストールするだけで済んだ
  - Protocol Buffer と Open API Spec の差異を理解する必要がある
    - 実質学習コストが２倍になっているように感じる場面があった
      - Protocol Buffer v3 は required の修飾子をサポートしていない
        - 全てのフィールドは optional として扱われる
        - [指定されなかったフィールドにはデフォルト値を入れるようになっている](https://protobuf.dev/programming-guides/proto3/#default)
          - このため、コード生成上の型などは optional にはならない
      - 必須フィールドにしたい場合は、[ここ](https://github.com/nissy-dev/protocol-buffer-sandbox/blob/07b97ac52ba7b97c2e981c7bf007cef92713a1ed/proto/sample/v1/post.proto#L60-L76)のように Protocol Buffer に JSON Schema を書いている
      - Open API Spec を最初から書けばこの差を意識しなくて良いのに...と感じた

Open API の yaml を書くのが辛そうだが、最近だと [Spotlight](https://stoplight.io/) というツールを使うと GUI で編集できたりするらしく、こういったツールで解決はできそうかなという感じがした。Spotlight は、[mock サーバーを作成するツール](https://github.com/stoplightio/prism)や [Spec の linter](https://github.com/stoplightio/spectral) なども公開していて、かなり信頼できそう。

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

# 使い方&インストールガイド

## インストールガイド

### 開発環境編
AWS提供のCloud9を用いる
```Terminal
# バージョンを指定してRailsをインストールする
$ gem install rails -v 6.0.3

# bundlerのバージョンを指定してインストールする
$ gem install bundler -v 2.2.17

# Cloud9環境のディスク容量アップと、クラウドIDEへのYarnインストール
$ source <(curl -sL https://cdn.learnenough.com/resize)
$ source <(curl -sL https://cdn.learnenough.com/yarn_install)
$ yarn install --check-files

# 必要なRubyGemsをインストール
$ bundle install --without production

## node関係でトラブルが発生した場合
$ rm -rf node_modules/
$ rm -rf yarn.lock
$ yarn install

# サーバー起動
$ rails s
```

### 本番環境編
HEROKUへのデプロイ

```Terminal
# 本番用以外のgemをインストールする
$ bundle _2.2.17_ config set --local without 'production'
$ bundle _2.2.17_ install

# HEROKUのインストール
$ source <(curl -sL https://cdn.learnenough.com/heroku_install)

$ heroku login --interactive
$ heroku create
$ git push heroku master
```

## 使い方ガイド